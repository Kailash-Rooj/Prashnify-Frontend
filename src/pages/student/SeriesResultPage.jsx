import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Award, CheckCircle2, Percent, Target, Trophy } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useApp } from '../../context/AppContext';
import StatCard from '../../components/common/StatCard';

export default function SeriesResultPage() {
  const { resultId } = useParams();
  const { testHistory } = useApp();

  const result =
    (resultId ? testHistory.find((r) => r.id === resultId) : testHistory[0]) ||
    testHistory[0];

  if (!result) {
    return (
      <div className="card">
        <h2>No result selected</h2>
        <Link to="/test-series" className="btn btn-primary mt-md">Back to Test Series</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <Link to="/test-series" className="text-sm text-muted flex gap-sm mb-sm" style={{ alignItems: 'center' }}>
            <ArrowLeft size={14} /> Back to Test Series
          </Link>
          <h1 className="page-title">{result.title}</h1>
          <div className="flex gap-sm flex-wrap mt-sm">
            <span className="badge badge-primary">{result.type}</span>
            <span className="badge badge-neutral">{result.exam} · {result.date}</span>
            {result.countedForRank ? (
              <span className="badge badge-success">First Attempt · Live Window (AIR Counted)</span>
            ) : (
              <span className="badge badge-warning">Practice / Retake (Rank Not Updated)</span>
            )}
          </div>
        </div>
        <Link to="/weak-topics" className="btn btn-primary">Review Weak Topics</Link>
      </div>

      <div className="grid grid-4 mb-lg">
        <StatCard label="Score" value={`${result.score} / ${result.maxScore}`} meta={`${result.correctCount} correct · ${result.incorrectCount} wrong`} icon={CheckCircle2} accent="#22C55E" />
        <StatCard label="All-India Rank" value={result.air ? `AIR ${result.air}` : 'Practice'} meta={result.countedForRank ? 'Official live rank' : 'Retakes are for practice'} icon={Trophy} accent="#6C47FF" />
        <StatCard label="Percentile" value={`${result.percentile}%ile`} meta="Compared against live cohort" icon={Percent} accent="#38BDF8" />
        <StatCard label="Accuracy" value={`${result.accuracy}%`} meta={`${result.unattemptedCount} unattempted`} icon={Target} accent="#F59E0B" />
      </div>

      <div className="grid-sidebar-split mb-lg">
        <div className="card">
          <h2 className="card-title mb-md">Subject-Wise Accuracy (%)</h2>
          <div style={{ width: '100%', height: 240 }}>
            <ResponsiveContainer>
              <BarChart data={result.subjectBreakdown || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="subject" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} domain={[0, 100]} />
                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10 }} />
                <Bar dataKey="accuracy" fill="#6C47FF" radius={[8, 8, 0, 0]} name="Accuracy %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h2 className="card-title mb-md">Attempt Summary</h2>
          <div className="flex" style={{ flexDirection: 'column', gap: 12 }}>
            <div className="flex-between text-sm"><span className="text-muted">Correct Answers</span><span className="font-bold text-success">{result.correctCount}</span></div>
            <div className="flex-between text-sm"><span className="text-muted">Incorrect Answers</span><span className="font-bold text-danger">{result.incorrectCount}</span></div>
            <div className="flex-between text-sm"><span className="text-muted">Unattempted</span><span className="font-bold">{result.unattemptedCount}</span></div>
            <div className="flex-between text-sm"><span className="text-muted">Attempt Number</span><span className="font-semibold">#{result.attemptNumber || 1}</span></div>
            {result.warningsRecorded !== undefined && (
              <div className="flex-between text-sm"><span className="text-muted">Window Warnings</span><span className="font-semibold">{result.warningsRecorded} / 3</span></div>
            )}
          </div>
          <div className="alert alert-info mt-lg text-xs">
            <Award size={16} style={{ flexShrink: 0 }} />
            <span>Need help improving your score? Share this report in a 1-on-1 mentorship session (₹299/hr).</span>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title mb-md">Subject Breakdown Table</h2>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Score</th>
                <th>Correct</th>
                <th>Incorrect</th>
                <th>Unattempted</th>
                <th>Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {(result.subjectBreakdown || []).map((row) => (
                <tr key={row.subject}>
                  <td className="font-semibold">{row.subject}</td>
                  <td className="font-bold">{row.score} / {row.maxScore}</td>
                  <td className="text-success">{row.correct}</td>
                  <td className="text-danger">{row.incorrect}</td>
                  <td className="text-muted">{row.unattempted}</td>
                  <td><span className={`badge ${row.accuracy >= 75 ? 'badge-success' : 'badge-warning'}`}>{row.accuracy}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
