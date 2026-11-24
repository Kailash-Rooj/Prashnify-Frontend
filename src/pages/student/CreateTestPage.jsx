import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Layers, Sliders } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SUBJECTS_WITH_SUBTOPICS } from '../../data/mockData';

export default function CreateTestPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { questions, testSeries, setActiveExamConfig } = useApp();

  const initialTab = searchParams.get('tab') === 'series' ? 'series' : 'custom';
  const preselectedSubject = searchParams.get('subject') || 'Molecular Biology';

  const [tab, setTab] = useState(initialTab);
  const [subject, setSubject] = useState(preselectedSubject);
  const [difficulty, setDifficulty] = useState('All');
  const [types, setTypes] = useState(['MCQ', 'MSQ', 'NAT']);
  const [questionCount, setQuestionCount] = useState(15);
  const [duration, setDuration] = useState(25);

  const toggleType = (t) => {
    setTypes((prev) => (prev.includes(t) ? (prev.length > 1 ? prev.filter((x) => x !== t) : prev) : [...prev, t]));
  };

  const matchingQuestions = questions.filter((q) => {
    const subOk = subject === 'All Subjects' || q.subject === subject || q.topic === subject;
    const diffOk = difficulty === 'All' || q.difficulty === difficulty;
    const typeOk = types.includes(q.questionType);
    return subOk && diffOk && typeOk;
  });

  const handleStartCustom = () => {
    const pool = matchingQuestions.length > 0 ? matchingQuestions : questions;
    const picked = pool.slice(0, Math.min(questionCount, pool.length));
    setActiveExamConfig({
      id: `custom-${Date.now()}`,
      title: `Custom Test — ${subject}`,
      mode: 'custom',
      durationMinutes: duration,
      questions: picked,
      marking: { MCQ: { marks: 1, negative: 0.25 }, MSQ: { marks: 2, negative: 0 }, NAT: { marks: 2, negative: 0 } }
    });
    navigate('/exam?mode=custom');
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Create Test</h1>
          <p className="page-description">Build a custom timed test by subject &amp; question type, or jump straight into an enrolled Test Series mock.</p>
        </div>
        <div className="tabs">
          <button type="button" className={`tab-btn ${tab === 'custom' ? 'active' : ''}`} onClick={() => setTab('custom')}>
            Custom Test
          </button>
          <button type="button" className={`tab-btn ${tab === 'series' ? 'active' : ''}`} onClick={() => setTab('series')}>
            Test Series
          </button>
        </div>
      </div>

      {tab === 'custom' ? (
        <div className="grid-sidebar-split">
          <div className="card flex" style={{ flexDirection: 'column', gap: 20 }}>
            <div className="flex gap-sm" style={{ alignItems: 'center' }}>
              <Sliders size={18} className="text-primary" />
              <h2 style={{ fontSize: 18 }}>Configure Custom Test</h2>
            </div>

            <div className="form-group">
              <label className="form-label">Subject</label>
              <div className="flex flex-wrap gap-sm">
                {['All Subjects', ...SUBJECTS_WITH_SUBTOPICS.map((s) => s.name)].map((sub) => (
                  <button
                    key={sub}
                    type="button"
                    className={`btn btn-sm ${subject === sub ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setSubject(sub)}
                  >
                    {sub}
                  </button>
                ))}
              </div>
              {subject !== 'All Subjects' && (
                <Link to={`/subtopics?subject=${encodeURIComponent(subject)}`} className="text-xs text-primary mt-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  Or pick specific subtopics inside {subject} <ArrowRight size={13} />
                </Link>
              )}
            </div>

            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">Difficulty</label>
                <select className="form-select" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                  <option value="All">Mixed (Easy, Moderate, Difficult)</option>
                  <option value="Easy">Easy</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Difficult">Difficult</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Question Types</label>
                <div className="flex gap-sm">
                  {['MCQ', 'MSQ', 'NAT'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={`btn btn-sm ${types.includes(t) ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => toggleType(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">Number of Questions: {questionCount}</label>
                <input type="range" min={5} max={50} step={5} value={questionCount} onChange={(e) => setQuestionCount(Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label className="form-label">Time Limit: {duration} minutes</label>
                <input type="range" min={10} max={90} step={5} value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
              </div>
            </div>

            <div className="flex gap-sm flex-wrap">
              <button type="button" className="btn btn-primary btn-lg" onClick={handleStartCustom}>
                Review Instructions &amp; Start <ArrowRight size={16} />
              </button>
              {subject !== 'All Subjects' && (
                <Link to={`/subtopics?subject=${encodeURIComponent(subject)}`} className="btn btn-secondary btn-lg">
                  <Layers size={16} /> Pick Subtopics
                </Link>
              )}
            </div>
          </div>

          <div className="card" style={{ alignSelf: 'start' }}>
            <h3 className="card-title mb-md">Test Blueprint Preview</h3>
            <div className="flex" style={{ flexDirection: 'column', gap: 12 }}>
              <div className="flex-between text-sm"><span className="text-muted">Selected Subject</span><span className="font-semibold">{subject}</span></div>
              <div className="flex-between text-sm"><span className="text-muted">Matching Questions in Bank</span><span className="badge badge-primary">{matchingQuestions.length} available</span></div>
              <div className="flex-between text-sm"><span className="text-muted">Question Types</span><span className="font-semibold">{types.join(', ')}</span></div>
              <div className="flex-between text-sm"><span className="text-muted">Duration</span><span className="font-semibold">{duration} mins</span></div>
              <div className="flex-between text-sm"><span className="text-muted">Marking Scheme</span><span className="text-xs text-secondary">MCQ +1/-0.25 · MSQ +2/0 · NAT +2/0</span></div>
            </div>
            <div className="alert alert-info mt-lg text-xs">
              Want scheduled national mocks with All-India Rank? Explore <Link to="/test-series" className="text-primary font-semibold">Test Series</Link>.
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-3">
          {testSeries.map((series) => (
            <div key={series.id} className="card flex" style={{ flexDirection: 'column', justifyContent: 'space-between', gap: 14 }}>
              <div>
                <div className="flex-between mb-sm">
                  <span className="badge badge-primary">{series.exam}</span>
                  {series.enrolled ? (
                    <span className="badge badge-success"><CheckCircle2 size={13} /> Enrolled</span>
                  ) : (
                    <span className="font-bold">₹{series.price}</span>
                  )}
                </div>
                <h3 style={{ fontSize: 17 }}>{series.title}</h3>
                <p className="text-sm text-secondary mt-sm">{series.description}</p>
                <div className="text-xs text-muted mt-md">{series.tests.length} scheduled mocks · Live AIR ranking</div>
              </div>
              <div className="flex gap-sm">
                {series.enrolled ? (
                  <Link to="/test-series" className="btn btn-primary btn-sm" style={{ width: '100%' }}>Open Scheduled Tests</Link>
                ) : (
                  <Link to={`/checkout?series=${series.id}`} className="btn btn-secondary btn-sm" style={{ width: '100%' }}>Enroll for ₹{series.price}</Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
