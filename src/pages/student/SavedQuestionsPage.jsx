import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, Eye, EyeOff, Play, Save, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import EmptyState from '../../components/common/EmptyState';

export default function SavedQuestionsPage() {
  const navigate = useNavigate();
  const { savedQuestions, questions, toggleBookmark, updateBookmarkNote, setActiveExamConfig } = useApp();
  const [revealed, setRevealed] = useState({});
  const [noteDrafts, setNoteDrafts] = useState({});
  const [savedToast, setSavedToast] = useState('');

  const items = savedQuestions
    .map((entry) => ({
      ...entry,
      question: questions.find((q) => q.id === entry.questionId)
    }))
    .filter((entry) => Boolean(entry.question));

  const handleSaveNote = (questionId) => {
    updateBookmarkNote(questionId, noteDrafts[questionId] ?? '');
    setSavedToast(questionId);
    setTimeout(() => setSavedToast(''), 1800);
  };

  const handlePracticeSaved = () => {
    setActiveExamConfig({
      id: `saved-${Date.now()}`,
      title: 'Saved Questions Revision Drill',
      mode: 'practice',
      durationMinutes: Math.max(10, items.length * 2),
      questions: items.map((i) => i.question)
    });
    navigate('/exam?mode=practice');
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Saved Questions</h1>
          <p className="page-description">Review bookmarked questions, reveal answers on demand, attach personal revision notes, or drill them in learning mode.</p>
        </div>
        {items.length > 0 && (
          <button type="button" className="btn btn-primary" onClick={handlePracticeSaved}>
            <Play size={15} /> Practice Saved ({items.length})
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="No saved questions yet"
          description="Bookmark tricky questions during Practice Sets or Exams to build your personal revision deck."
          actionLabel="Explore Practice Sets"
          onAction={() => navigate('/create-test')}
        />
      ) : (
        <div className="flex" style={{ flexDirection: 'column', gap: 16 }}>
          {items.map(({ questionId, note, question }) => {
            const isShown = Boolean(revealed[questionId]);
            const draftVal = noteDrafts[questionId] !== undefined ? noteDrafts[questionId] : note;
            return (
              <div key={questionId} className="card">
                <div className="flex-between flex-wrap gap-sm mb-sm">
                  <div className="flex gap-sm">
                    <span className="badge badge-primary">{question.topic}</span>
                    <span className="badge badge-info">{question.questionType}</span>
                    <span className="badge badge-neutral">{question.difficulty}</span>
                  </div>
                  <button type="button" className="btn btn-danger-soft btn-sm" onClick={() => toggleBookmark(questionId)}>
                    <Trash2 size={14} /> Remove
                  </button>
                </div>

                <p className="font-semibold mb-md">{question.question}</p>

                {question.options?.length > 0 && (
                  <div className="grid grid-2 mb-md" style={{ gap: 8 }}>
                    {question.options.map((opt) => (
                      <div key={opt.key} className="card card-compact text-sm" style={{ background: 'var(--surface-muted)' }}>
                        <strong>{opt.key}.</strong> {opt.text}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-sm mb-md">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setRevealed((prev) => ({ ...prev, [questionId]: !prev[questionId] }))}
                  >
                    {isShown ? <><EyeOff size={14} /> Hide Answer</> : <><Eye size={14} /> Show Answer &amp; Explanation</>}
                  </button>
                </div>

                {isShown && (
                  <div className="alert alert-success mb-md">
                    <div>
                      <div className="font-bold text-sm">Correct Answer: {question.correctAnswer}</div>
                      <p className="text-sm text-secondary mt-sm">{question.explanation}</p>
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Personal Study Note</label>
                  <div className="flex gap-sm flex-wrap">
                    <input
                      className="form-input"
                      style={{ flex: 1, minWidth: 220 }}
                      placeholder="Add a memory trick or mistake note..."
                      value={draftVal}
                      onChange={(e) => setNoteDrafts((prev) => ({ ...prev, [questionId]: e.target.value }))}
                    />
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => handleSaveNote(questionId)}>
                      <Save size={14} /> {savedToast === questionId ? 'Saved!' : 'Save Note'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
