import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckSquare, Square } from 'lucide-react';
import { SUBJECTS_WITH_SUBTOPICS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export default function SubtopicsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { questions, setActiveExamConfig } = useApp();

  const subjectParam = searchParams.get('subject') || 'Immunology';
  const [activeSubjectName, setActiveSubjectName] = useState(subjectParam);

  const subjectObj =
    SUBJECTS_WITH_SUBTOPICS.find((s) => s.name.toLowerCase() === activeSubjectName.toLowerCase()) ||
    SUBJECTS_WITH_SUBTOPICS[0];

  const [selectedIds, setSelectedIds] = useState(subjectObj.subtopics.slice(0, 2).map((st) => st.id));

  const toggleSubtopic = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleLaunch = () => {
    const picked = questions.filter((q) => q.subject.toLowerCase() === subjectObj.name.toLowerCase());
    const finalQs = picked.length > 0 ? picked : questions.slice(0, 10);
    setActiveExamConfig({
      id: `subtopic-${Date.now()}`,
      title: `${subjectObj.name} — Selected Subtopics`,
      mode: 'custom',
      durationMinutes: Math.max(10, finalQs.length * 2),
      questions: finalQs,
      marking: { MCQ: { marks: 1, negative: 0.25 }, MSQ: { marks: 2, negative: 0 }, NAT: { marks: 2, negative: 0 } }
    });
    navigate('/exam?mode=custom');
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <Link to="/create-test" className="text-sm text-muted flex gap-sm mb-sm" style={{ alignItems: 'center' }}>
            <ArrowLeft size={14} /> Back to Create Test
          </Link>
          <h1 className="page-title">{subjectObj.name} — Subtopics</h1>
          <p className="page-description">Pick the exact subtopics you want to drill. Low-accuracy areas are highlighted in amber.</p>
        </div>
        <button type="button" className="btn btn-primary" disabled={selectedIds.length === 0} onClick={handleLaunch}>
          Start Drill ({selectedIds.length} selected) <ArrowRight size={16} />
        </button>
      </div>

      <div className="flex flex-wrap gap-sm mb-lg">
        {SUBJECTS_WITH_SUBTOPICS.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`btn btn-sm ${s.name === subjectObj.name ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => {
              setActiveSubjectName(s.name);
              setSelectedIds([s.subtopics[0].id]);
            }}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="grid grid-2">
        {subjectObj.subtopics.map((st) => {
          const checked = selectedIds.includes(st.id);
          return (
            <button
              key={st.id}
              type="button"
              onClick={() => toggleSubtopic(st.id)}
              className={`card card-compact ${checked ? '' : ''}`}
              style={{
                textAlign: 'left',
                borderColor: checked ? 'var(--primary)' : 'var(--border)',
                background: checked ? 'var(--primary-soft)' : 'var(--surface)'
              }}
            >
              <div className="flex-between mb-sm">
                <div className="flex gap-sm" style={{ alignItems: 'center' }}>
                  {checked ? <CheckSquare size={18} className="text-primary" /> : <Square size={18} className="text-muted" />}
                  <span className="font-semibold">{st.name}</span>
                </div>
                <span className={`badge ${st.accuracy < 60 ? 'badge-warning' : 'badge-success'}`}>{st.accuracy}% acc</span>
              </div>
              <div className="flex-between text-xs text-muted mt-sm">
                <span>{st.count} questions available</span>
                <span>Difficulty: {st.difficulty}</span>
              </div>
              <div className="progress-track mt-sm">
                <div className="progress-fill" style={{ width: `${st.accuracy}%` }} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
