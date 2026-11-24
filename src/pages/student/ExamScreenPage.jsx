import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  AlertTriangle,
  Bookmark,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flag,
  Pause,
  Play,
  Send
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FULL_MOCK_8_QUESTIONS, DNA_REPLICATION_QUESTIONS } from '../../data/mockQuestions';
import { DEFAULT_MARKING, evaluateExamSubmission, evaluateQuestion, formatTimeMMSS } from '../../utils/examUtils';
import Modal from '../../components/common/Modal';

export default function ExamScreenPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { activeExamConfig, questions, savedQuestions, toggleBookmark, recordTestResult, testSeries } = useApp();

  const modeParam = searchParams.get('mode') || activeExamConfig?.mode || 'series';
  const isPracticeMode = modeParam === 'practice';
  const isTestSeriesMode = modeParam === 'series';

  const examQuestions = useMemo(() => {
    if (activeExamConfig?.questions?.length) return activeExamConfig.questions;
    if (isPracticeMode) return DNA_REPLICATION_QUESTIONS;
    if (isTestSeriesMode) return FULL_MOCK_8_QUESTIONS;
    return questions.slice(0, 15);
  }, [activeExamConfig, isPracticeMode, isTestSeriesMode, questions]);

  const examTitle =
    activeExamConfig?.title ||
    (isPracticeMode ? 'DNA Replication — GAT-B Practice Set (50 Qs)' : 'Full Mock 8 — National Live Test');
  const markingScheme = activeExamConfig?.marking || DEFAULT_MARKING;
  const initialSeconds = (activeExamConfig?.durationMinutes || (isPracticeMode ? 45 : 90)) * 60;

  const sections = useMemo(() => {
    const uniq = [...new Set(examQuestions.map((q) => q.subject || q.topic))];
    return uniq;
  }, [examQuestions]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [visited, setVisited] = useState({ 0: true });
  const [marked, setMarked] = useState({});
  const [checkedMap, setCheckedMap] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isPaused, setIsPaused] = useState(false);
  const [warnings, setWarnings] = useState(0);
  const [warningModal, setWarningModal] = useState(false);
  const [submitModal, setSubmitModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const currentQ = examQuestions[currentIdx] || examQuestions[0];
  const isBookmarked = savedQuestions.some((s) => s.questionId === currentQ?.id);

  const finalizeSubmit = useCallback(
    (reason = 'manual') => {
      if (submitted) return;
      setSubmitted(true);
      const evaluation = evaluateExamSubmission(examQuestions, answers, markingScheme);

      // First-attempt live window rule
      let countedForRank = false;
      let attemptNumber = 1;
      if (isTestSeriesMode) {
        const series = testSeries.find((s) => s.id === (activeExamConfig?.seriesId || 'ts-gatb-2027'));
        const testMeta = series?.tests.find((t) => t.id === (activeExamConfig?.testId || 'full-mock-8'));
        const priorAttempts = testMeta?.attemptsUsed || 0;
        attemptNumber = priorAttempts + 1;
        countedForRank = priorAttempts === 0;
      }

      const resultId = `res-${Date.now().toString().slice(-6)}`;
      const resultObj = {
        id: resultId,
        testId: activeExamConfig?.testId || (isPracticeMode ? 'ps-dna-rep' : 'full-mock-8'),
        seriesId: isTestSeriesMode ? (activeExamConfig?.seriesId || 'ts-gatb-2027') : null,
        title: examTitle,
        type: isPracticeMode ? 'Practice Set' : isTestSeriesMode ? 'Test Series' : 'Custom Test',
        exam: currentQ?.exam || 'GAT-B',
        date: new Date().toISOString().slice(0, 10),
        score: evaluation.totalScore,
        maxScore: evaluation.maxScore,
        accuracy: evaluation.accuracy,
        correctCount: evaluation.correctCount,
        incorrectCount: evaluation.incorrectCount,
        unattemptedCount: evaluation.unattemptedCount,
        air: countedForRank ? evaluation.air : null,
        percentile: evaluation.percentile,
        countedForRank,
        attemptNumber,
        submitReason: reason,
        warningsRecorded: warnings,
        subjectBreakdown: evaluation.subjectBreakdown,
        questionResults: evaluation.questionResults
      };

      recordTestResult(resultObj);
      navigate(`/series-result/${resultId}`);
    },
    [submitted, examQuestions, answers, markingScheme, isTestSeriesMode, testSeries, activeExamConfig, examTitle, isPracticeMode, currentQ, warnings, recordTestResult, navigate]
  );

  // Countdown Timer (cannot pause in Test Series; auto-submits at 0)
  useEffect(() => {
    if (submitted || (isPracticeMode && isPaused)) return undefined;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finalizeSubmit('time_expired');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted, isPracticeMode, isPaused, finalizeSubmit]);

  // Proctoring window-leave monitor in Test Series mode (auto-submit after 3 warnings)
  useEffect(() => {
    if (!isTestSeriesMode || submitted) return undefined;
    const handleVisibility = () => {
      if (document.hidden) {
        setWarnings((prev) => {
          const next = prev + 1;
          if (next >= 3) {
            finalizeSubmit('window_leave_3_warnings');
          } else {
            setWarningModal(true);
          }
          return next;
        });
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [isTestSeriesMode, submitted, finalizeSubmit]);

  const goToQuestion = (idx) => {
    setCurrentIdx(idx);
    setVisited((prev) => ({ ...prev, [idx]: true }));
  };

  const handleMcqSelect = (optKey) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: optKey }));
  };

  const handleMsqToggle = (optKey) => {
    setAnswers((prev) => {
      const curr = Array.isArray(prev[currentQ.id]) ? prev[currentQ.id] : [];
      const next = curr.includes(optKey) ? curr.filter((k) => k !== optKey) : [...curr, optKey];
      return { ...prev, [currentQ.id]: next };
    });
  };

  const handleNatChange = (val) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: val }));
  };

  const clearResponse = () => {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[currentQ.id];
      return next;
    });
  };

  const toggleMark = () => {
    setMarked((prev) => ({ ...prev, [currentIdx]: !prev[currentIdx] }));
  };

  const getPaletteStatus = (idx) => {
    const q = examQuestions[idx];
    const ans = answers[q.id];
    const hasAns = Array.isArray(ans) ? ans.length > 0 : ans !== undefined && String(ans).trim() !== '';
    const isMarked = Boolean(marked[idx]);
    if (hasAns && isMarked) return 'answered-marked';
    if (isMarked) return 'marked';
    if (hasAns) return 'answered';
    if (visited[idx]) return 'not-answered';
    return 'not-visited';
  };

  const answeredCount = examQuestions.filter((q) => {
    const ans = answers[q.id];
    return Array.isArray(ans) ? ans.length > 0 : ans !== undefined && String(ans).trim() !== '';
  }).length;

  const markedCount = Object.values(marked).filter(Boolean).length;
  const practiceEval = isPracticeMode && checkedMap[currentQ.id]
    ? evaluateQuestion(currentQ, answers[currentQ.id], markingScheme)
    : null;

  return (
    <div className="exam-shell">
      {/* Top Bar */}
      <header className="exam-topbar">
        <div className="flex gap-md" style={{ alignItems: 'center', minWidth: 0 }}>
          <span className="brand-mark">P</span>
          <div style={{ minWidth: 0 }}>
            <div className="font-bold text-sm" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {examTitle}
            </div>
            <div className="text-xs text-muted">
              {isPracticeMode ? 'Practice Set · Learning Mode (Pause Allowed)' : 'Test Series · Real Exam Conditions'}
            </div>
          </div>
        </div>

        <div className="flex gap-sm" style={{ alignItems: 'center' }}>
          {isTestSeriesMode && (
            <span className={`badge ${warnings > 0 ? 'badge-danger' : 'badge-neutral'}`}>
              <AlertTriangle size={13} /> Warnings: {warnings}/3
            </span>
          )}
          <span className={`badge ${secondsLeft < 300 ? 'badge-danger' : 'badge-primary'}`} style={{ fontSize: 14, padding: '6px 12px' }}>
            <Clock size={15} /> {formatTimeMMSS(secondsLeft)}
          </span>
          {isPracticeMode && (
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => setIsPaused((p) => !p)}>
              {isPaused ? <><Play size={14} /> Resume</> : <><Pause size={14} /> Pause</>}
            </button>
          )}
          <button type="button" className="btn btn-primary btn-sm" onClick={() => setSubmitModal(true)}>
            <Send size={14} /> Submit
          </button>
        </div>
      </header>

      {/* Section Tabs (for mixed-subject Test Series) */}
      {sections.length > 1 && (
        <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface-muted)', padding: '10px 24px' }}>
          <div className="flex flex-wrap gap-sm" style={{ maxWidth: 1440, margin: '0 auto' }}>
            {sections.map((sec) => {
              const firstIdx = examQuestions.findIndex((q) => (q.subject || q.topic) === sec);
              const isActive = (currentQ.subject || currentQ.topic) === sec;
              return (
                <button
                  key={sec}
                  type="button"
                  className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => goToQuestion(firstIdx)}
                >
                  {sec}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Body */}
      <div className="exam-body">
        {/* Question Card */}
        <div className="card flex" style={{ flexDirection: 'column', justifyContent: 'space-between', gap: 20 }}>
          {isPracticeMode && isPaused ? (
            <div className="empty-state" style={{ margin: '40px 0' }}>
              <Pause size={30} className="text-primary" />
              <h3>Practice Set Paused</h3>
              <p className="text-sm text-secondary">Your timer is paused. Resume whenever you are ready to continue.</p>
              <button type="button" className="btn btn-primary" onClick={() => setIsPaused(false)}>
                <Play size={15} /> Resume Practice
              </button>
            </div>
          ) : (
            <div>
              <div className="flex-between flex-wrap gap-sm mb-md" style={{ borderBottom: '1px solid var(--border)', paddingBottom: 14 }}>
                <div className="flex gap-sm flex-wrap" style={{ alignItems: 'center' }}>
                  <span className="badge badge-primary">Q {currentIdx + 1} of {examQuestions.length}</span>
                  <span className="badge badge-info">{currentQ.questionType}</span>
                  <span className="badge badge-neutral">{currentQ.difficulty}</span>
                  <span className="text-xs text-muted">{currentQ.topic} · {currentQ.subTopic}</span>
                </div>
                <div className="flex gap-sm" style={{ alignItems: 'center' }}>
                  <span className="text-xs text-secondary">
                    +{currentQ.marks} / {currentQ.questionType === 'MCQ' ? `-${currentQ.negativeMarks}` : '0 neg'}
                  </span>
                  <button
                    type="button"
                    className={`btn btn-sm ${isBookmarked ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => toggleBookmark(currentQ.id)}
                  >
                    <Bookmark size={14} /> {isBookmarked ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>

              <p style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.6 }} className="mb-lg">
                {currentQ.question}
              </p>

              {/* MCQ Options */}
              {currentQ.questionType === 'MCQ' && (
                <div className="flex" style={{ flexDirection: 'column', gap: 10 }}>
                  {currentQ.options.map((opt) => {
                    const selected = answers[currentQ.id] === opt.key;
                    let cls = 'exam-option';
                    if (practiceEval) {
                      if (opt.key === currentQ.correctAnswer) cls += ' correct';
                      else if (selected) cls += ' wrong';
                    } else if (selected) {
                      cls += ' selected';
                    }
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        className={cls}
                        style={{ width: '100%', textAlign: 'left' }}
                        onClick={() => handleMcqSelect(opt.key)}
                      >
                        <span className="badge badge-neutral">{opt.key}</span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* MSQ Options */}
              {currentQ.questionType === 'MSQ' && (
                <div>
                  <p className="text-xs text-muted mb-sm">MSQ — Select ALL correct options (+2 only if exact set selected, no negative or partial marks).</p>
                  <div className="flex" style={{ flexDirection: 'column', gap: 10 }}>
                    {currentQ.options.map((opt) => {
                      const curr = Array.isArray(answers[currentQ.id]) ? answers[currentQ.id] : [];
                      const selected = curr.includes(opt.key);
                      const correctKeys = currentQ.correctAnswer.split(',').map((s) => s.trim());
                      let cls = 'exam-option';
                      if (practiceEval) {
                        if (correctKeys.includes(opt.key)) cls += ' correct';
                        else if (selected) cls += ' wrong';
                      } else if (selected) {
                        cls += ' selected';
                      }
                      return (
                        <button
                          key={opt.key}
                          type="button"
                          className={cls}
                          style={{ width: '100%', textAlign: 'left' }}
                          onClick={() => handleMsqToggle(opt.key)}
                        >
                          <input type="checkbox" readOnly checked={selected} style={{ marginTop: 3 }} />
                          <span className="badge badge-neutral">{opt.key}</span>
                          <span>{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* NAT Input */}
              {currentQ.questionType === 'NAT' && (
                <div className="card card-compact" style={{ background: 'var(--surface-muted)', maxWidth: 420 }}>
                  <label className="form-label mb-sm" style={{ display: 'block' }}>
                    Numerical Answer Type (NAT) — Enter numeric value (+2, no negative marks)
                  </label>
                  <input
                    type="text"
                    inputMode="decimal"
                    className="form-input"
                    placeholder="Type numerical answer (e.g. 38 or 5.97)"
                    value={answers[currentQ.id] || ''}
                    onChange={(e) => handleNatChange(e.target.value)}
                  />
                </div>
              )}

              {/* Practice Mode Instant Check Answer */}
              {isPracticeMode && (
                <div className="mt-lg">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setCheckedMap((prev) => ({ ...prev, [currentQ.id]: true }))}
                  >
                    <CheckCircle2 size={15} /> Check Answer &amp; Explanation
                  </button>

                  {practiceEval && (
                    <div className={`alert mt-md ${practiceEval.status === 'correct' ? 'alert-success' : 'alert-warning'}`}>
                      <div>
                        <div className="font-bold text-sm mb-sm">
                          {practiceEval.status === 'correct'
                            ? `Correct! (+${practiceEval.score} marks)`
                            : `Correct Answer: ${currentQ.correctAnswer}`}
                        </div>
                        <p className="text-sm text-secondary">{currentQ.explanation}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Bottom Controls */}
          <div className="flex-between flex-wrap gap-sm" style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
            <div className="flex gap-sm flex-wrap">
              <button type="button" className="btn btn-secondary btn-sm" disabled={currentIdx === 0} onClick={() => goToQuestion(currentIdx - 1)}>
                <ChevronLeft size={15} /> Previous
              </button>
              <button type="button" className="btn btn-secondary btn-sm" onClick={toggleMark}>
                <Flag size={14} /> {marked[currentIdx] ? 'Unmark Review' : 'Mark for Review'}
              </button>
              <button type="button" className="btn btn-ghost btn-sm" onClick={clearResponse}>
                Clear Response
              </button>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                if (currentIdx < examQuestions.length - 1) goToQuestion(currentIdx + 1);
                else setSubmitModal(true);
              }}
            >
              {currentIdx < examQuestions.length - 1 ? <>Save &amp; Next <ChevronRight size={15} /></> : 'Review & Submit'}
            </button>
          </div>
        </div>

        {/* Question Navigation Palette */}
        <aside className="card" style={{ alignSelf: 'start' }}>
          <h3 className="card-title mb-sm">Question Palette</h3>
          <p className="text-xs text-muted mb-md">
            Answered: {answeredCount} / {examQuestions.length} · Marked: {markedCount}
          </p>

          <div className="palette-grid mb-lg" style={{ maxHeight: 340, overflowY: 'auto', padding: 2 }}>
            {examQuestions.map((q, idx) => (
              <button
                key={q.id}
                type="button"
                className={`palette-btn ${getPaletteStatus(idx)} ${idx === currentIdx ? 'current' : ''}`}
                onClick={() => goToQuestion(idx)}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <div className="grid grid-2 text-xs text-secondary" style={{ gap: 8 }}>
            <span className="flex gap-sm" style={{ alignItems: 'center' }}><span style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--palette-answered)' }} /> Answered</span>
            <span className="flex gap-sm" style={{ alignItems: 'center' }}><span style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--palette-not-answered)' }} /> Not Answered</span>
            <span className="flex gap-sm" style={{ alignItems: 'center' }}><span style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--palette-marked)' }} /> Marked</span>
            <span className="flex gap-sm" style={{ alignItems: 'center' }}><span style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--palette-answered-marked)' }} /> Ans &amp; Marked</span>
          </div>

          {isTestSeriesMode && (
            <button
              type="button"
              className="btn btn-outline btn-sm mt-lg"
              style={{ width: '100%' }}
              onClick={() => {
                const next = warnings + 1;
                setWarnings(next);
                if (next >= 3) finalizeSubmit('window_leave_3_warnings');
                else setWarningModal(true);
              }}
            >
              Simulate Tab Leave Warning ({warnings}/3)
            </button>
          )}
        </aside>
      </div>

      {/* Proctoring Warning Modal */}
      <Modal
        isOpen={warningModal}
        onClose={() => setWarningModal(false)}
        title={`Exam Window Warning (${warnings} of 3)`}
        subtitle="Leaving the exam window is recorded during Test Series mocks."
        footer={
          <button type="button" className="btn btn-primary" onClick={() => setWarningModal(false)}>
            Return to Exam
          </button>
        }
      >
        <div className="alert alert-warning">
          <AlertTriangle size={18} style={{ flexShrink: 0 }} />
          <span className="text-sm">
            Warning {warnings} recorded. After 3 warnings, your test will be automatically submitted.
          </span>
        </div>
      </Modal>

      {/* Submit Confirmation Modal */}
      <Modal
        isOpen={submitModal}
        onClose={() => setSubmitModal(false)}
        title="Submit Test?"
        subtitle="Review your attempt summary before finalizing."
        footer={
          <>
            <button type="button" className="btn btn-secondary" onClick={() => setSubmitModal(false)}>Continue Test</button>
            <button type="button" className="btn btn-primary" onClick={() => finalizeSubmit('manual')}>Confirm &amp; Submit</button>
          </>
        }
      >
        <div className="grid grid-3" style={{ gap: 10 }}>
          <div className="card card-compact" style={{ textAlign: 'center', background: 'var(--surface-muted)' }}>
            <div className="font-bold" style={{ fontSize: 20 }}>{answeredCount}</div>
            <div className="text-xs text-muted">Answered</div>
          </div>
          <div className="card card-compact" style={{ textAlign: 'center', background: 'var(--surface-muted)' }}>
            <div className="font-bold" style={{ fontSize: 20 }}>{examQuestions.length - answeredCount}</div>
            <div className="text-xs text-muted">Unanswered</div>
          </div>
          <div className="card card-compact" style={{ textAlign: 'center', background: 'var(--surface-muted)' }}>
            <div className="font-bold" style={{ fontSize: 20 }}>{markedCount}</div>
            <div className="text-xs text-muted">Marked</div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
