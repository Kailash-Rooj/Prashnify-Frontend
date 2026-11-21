import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const QUESTIONS = [
  {
    key: 'exam',
    title: '1. Which exam are you preparing for?',
    subtitle: 'We will tailor your practice sets, PYQs, and test series.',
    options: ['GAT-B', 'IIT JAM BT', 'CSIR NET LS', 'GATE XL', 'CUET PG']
  },
  {
    key: 'attemptYear',
    title: '2. What is your target attempt year?',
    subtitle: 'Helps pace your weekly study plan and mock schedule.',
    options: ['2027', '2028', '2029']
  },
  {
    key: 'level',
    title: '3. How would you rate your current preparation level?',
    subtitle: 'We calibrate starting practice set difficulty accordingly.',
    options: ['Beginner — Starting from basics', 'Intermediate — Covered ~50% syllabus', 'Advanced — Revision & timed mocks']
  },
  {
    key: 'dailyGoal',
    title: '4. What is your realistic daily study goal?',
    subtitle: 'Used to track your daily streak and activity calendar.',
    options: ['1 hr / day (20 Qs)', '2 hrs / day (40 Qs)', '3 hrs / day (60 Qs)', '4+ hrs / day (80+ Qs)']
  },
  {
    key: 'focusArea',
    title: '5. What do you want to improve first?',
    subtitle: 'We will highlight matching tools on your home dashboard.',
    options: ['Concept Building (Practice Sets)', 'Speed & All-India Rank (Test Series)', 'Previous Year Papers (PYQs)', '1-on-1 Topper Mentorship']
  }
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { user, setUser } = useApp();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    exam: user.exam || 'GAT-B',
    attemptYear: user.attemptYear || '2027',
    level: 'Intermediate — Covered ~50% syllabus',
    dailyGoal: '2 hrs / day (40 Qs)',
    focusArea: 'Speed & All-India Rank (Test Series)'
  });

  const current = QUESTIONS[step];
  const pct = Math.round(((step + 1) / QUESTIONS.length) * 100);

  const handleSelect = (option) => {
    setAnswers((prev) => ({ ...prev, [current.key]: option }));
  };

  const handleNext = () => {
    if (step < QUESTIONS.length - 1) {
      setStep((s) => s + 1);
    } else {
      setUser((prev) => ({
        ...prev,
        exam: answers.exam,
        attemptYear: answers.attemptYear,
        level: answers.level.split(' — ')[0],
        dailyGoal: answers.dailyGoal.split(' / ')[0],
        focusArea: answers.focusArea
      }));
      navigate('/pricing');
    }
  };

  return (
    <div className="container" style={{ maxWidth: 640, padding: '56px 20px' }}>
      <div className="card">
        <div className="flex-between mb-sm">
          <span className="badge badge-primary">Step {step + 1} of {QUESTIONS.length}</span>
          <span className="text-xs text-muted">{pct}% complete</span>
        </div>
        <div className="progress-track mb-lg">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>

        <h1 style={{ fontSize: 22 }}>{current.title}</h1>
        <p className="text-sm text-secondary mt-sm mb-lg">{current.subtitle}</p>

        <div className="flex" style={{ flexDirection: 'column', gap: 10 }}>
          {current.options.map((opt) => {
            const active = answers[current.key] === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => handleSelect(opt)}
                className={`exam-option ${active ? 'selected' : ''}`}
                style={{ width: '100%', textAlign: 'left', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span className="font-semibold text-sm">{opt}</span>
                {active && <Check size={17} className="text-primary" />}
              </button>
            );
          })}
        </div>

        <div className="flex-between mt-lg">
          <button type="button" className="btn btn-secondary" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
            <ArrowLeft size={16} /> Back
          </button>
          <button type="button" className="btn btn-primary" onClick={handleNext}>
            {step === QUESTIONS.length - 1 ? 'Continue to Plans' : 'Next Question'} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
