import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, CheckCircle2, Info, Lock, Play, Trophy } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FULL_MOCK_8_QUESTIONS } from '../../data/mockQuestions';

export default function TestSeriesPage() {
  const navigate = useNavigate();
  const { testSeries, setActiveExamConfig } = useApp();

  const handleLaunchTest = (series, test) => {
    setActiveExamConfig({
      id: test.id,
      testId: test.id,
      seriesId: series.id,
      title: test.name,
      mode: 'series',
      durationMinutes: test.durationMinutes,
      questions: FULL_MOCK_8_QUESTIONS.slice(0, test.questionCount || 60),
      marking: test.marking
    });
    navigate(`/exam?mode=series&seriesId=${series.id}&testId=${test.id}`);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">All-India Test Series</h1>
          <p className="page-description">Scheduled national mocks under real exam conditions with MCQ, MSQ &amp; NAT sections and All-India Rank.</p>
        </div>
        <Link to="/create-test" className="btn btn-secondary">Build Custom Test</Link>
      </div>

      <div className="alert alert-info mb-lg">
        <Info size={18} style={{ flexShrink: 0 }} />
        <div className="text-sm">
          <strong>First-Attempt Ranking Rule:</strong> All-India Rank &amp; Percentile count <strong>only on your first attempt during the live window</strong>. Retakes remain open for practice, timers cannot be paused, and leaving the exam window triggers auto-submit after 3 warnings.
        </div>
      </div>

      <div className="flex" style={{ flexDirection: 'column', gap: 22 }}>
        {testSeries.map((series) => {
          const pct = Math.round((series.completedTests / Math.max(1, series.totalTests)) * 100);
          return (
            <div key={series.id} className="card">
              <div className="flex-between flex-wrap gap-md mb-md">
                <div>
                  <div className="flex gap-sm mb-sm">
                    <span className="badge badge-primary">{series.exam}</span>
                    {series.enrolled ? (
                      <span className="badge badge-success"><CheckCircle2 size={13} /> Enrolled</span>
                    ) : (
                      <span className="badge badge-warning">₹{series.price}</span>
                    )}
                    <span className="text-xs text-muted">{series.aspirantsEnrolled.toLocaleString()} aspirants</span>
                  </div>
                  <h2 style={{ fontSize: 20 }}>{series.title}</h2>
                  <p className="text-sm text-secondary mt-sm">{series.description}</p>
                </div>

                {!series.enrolled && (
                  <Link to={`/checkout?series=${series.id}`} className="btn btn-primary">
                    Enroll Now · ₹{series.price}
                  </Link>
                )}
              </div>

              {series.enrolled && (
                <div className="mb-lg">
                  <div className="flex-between text-xs text-muted mb-sm">
                    <span>Series Progress: {series.completedTests} of {series.totalTests} tests completed</span>
                    <span>{pct}%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )}

              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Test Paper</th>
                      <th>Live Window</th>
                      <th>Format</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {series.tests.map((t) => (
                      <tr key={t.id}>
                        <td className="font-semibold">{t.name}</td>
                        <td className="text-sm text-secondary"><span className="flex gap-sm" style={{ alignItems: 'center' }}><Calendar size={14} /> {t.liveWindow}</span></td>
                        <td className="text-xs text-muted">{t.questionCount} Qs · {t.durationMinutes} min</td>
                        <td>
                          <span className={`badge ${t.status === 'Live Now' ? 'badge-success' : t.status === 'Completed' ? 'badge-primary' : 'badge-warning'}`}>
                            {t.status}
                          </span>
                        </td>
                        <td>
                          {!series.enrolled ? (
                            <Link to={`/checkout?series=${series.id}`} className="btn btn-secondary btn-sm"><Lock size={13} /> Unlock</Link>
                          ) : t.status === 'Upcoming' ? (
                            <button type="button" className="btn btn-secondary btn-sm" disabled>Opens Soon</button>
                          ) : (
                            <div className="flex gap-sm">
                              <button type="button" className="btn btn-primary btn-sm" onClick={() => handleLaunchTest(series, t)}>
                                <Play size={13} /> {t.attemptsUsed > 0 ? 'Retake (Practice)' : 'Start Live Test'}
                              </button>
                              {t.attemptsUsed > 0 && (
                                <Link to="/series-result" className="btn btn-secondary btn-sm"><Trophy size={13} /> Result</Link>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
