import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, GraduationCap } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ChooseExamPage() {
  const navigate = useNavigate();
  const { exams, user, setUser } = useApp();
  const [selected, setSelected] = useState(user.exam || 'GAT-B');

  const handleContinue = () => {
    setUser((prev) => ({ ...prev, exam: selected }));
    navigate('/dashboard');
  };

  return (
    <div className="container" style={{ maxWidth: 920, padding: '52px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <span className="badge badge-primary">Step 6 · Exam Workspace</span>
        <h1 style={{ fontSize: 30, marginTop: 10 }}>Pick which exam to start with</h1>
        <p className="text-secondary mt-sm">You can switch exams anytime from the left sidebar or your Profile.</p>
      </div>

      <div className="grid grid-3 mb-lg">
        {exams.filter((e) => e.active).map((exam) => {
          const isSelected = selected === exam.name;
          return (
            <button
              key={exam.id}
              type="button"
              onClick={() => setSelected(exam.name)}
              className="card card-interactive"
              style={{
                textAlign: 'left',
                borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                background: isSelected ? 'var(--primary-soft)' : 'var(--surface)'
              }}
            >
              <div className="flex-between mb-md">
                <div className="stat-icon"><GraduationCap size={18} /></div>
                {isSelected && <CheckCircle2 size={20} className="text-primary" />}
              </div>
              <h2 style={{ fontSize: 18 }}>{exam.name}</h2>
              <p className="text-sm text-secondary mt-sm">{exam.fullName}</p>
              <div className="flex-between mt-md text-xs text-muted">
                <span>{exam.aspirants} aspirants</span>
                <span>{exam.papers} papers</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex-center">
        <button type="button" className="btn btn-primary btn-lg" onClick={handleContinue}>
          Enter {selected} Dashboard <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
