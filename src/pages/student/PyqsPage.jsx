import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Play, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const PYQ_PAPERS = [
  { id: 'pyq-gatb-2025', exam: 'GAT-B', year: 2025, title: 'GAT-B 2025 Official Question Paper', count: 60, duration: 90 },
  { id: 'pyq-gatb-2024', exam: 'GAT-B', year: 2024, title: 'GAT-B 2024 Official Question Paper', count: 60, duration: 90 },
  { id: 'pyq-jam-2025', exam: 'IIT JAM BT', year: 2025, title: 'IIT JAM Biotechnology 2025 Paper', count: 60, duration: 120 },
  { id: 'pyq-csir-2024', exam: 'CSIR NET LS', year: 2024, title: 'CSIR NET Life Sciences Dec 2024', count: 50, duration: 90 },
  { id: 'pyq-gate-2024', exam: 'GATE XL', year: 2024, title: 'GATE Life Sciences XL 2024', count: 45, duration: 90 }
];

export default function PyqsPage() {
  const navigate = useNavigate();
  const { questions, setActiveExamConfig } = useApp();
  const [tab, setTab] = useState('papers'); // 'papers' | 'topic'
  const [examFilter, setExamFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredPapers = PYQ_PAPERS.filter((p) => {
    const examOk = examFilter === 'All' || p.exam === examFilter;
    const searchOk = p.title.toLowerCase().includes(search.toLowerCase()) || String(p.year).includes(search);
    return examOk && searchOk;
  });

  const filteredQuestions = questions.filter((q) => {
    const examOk = examFilter === 'All' || q.exam === examFilter;
    const searchOk =
      q.question.toLowerCase().includes(search.toLowerCase()) ||
      q.topic.toLowerCase().includes(search.toLowerCase()) ||
      String(q.year).includes(search);
    return examOk && searchOk;
  });

  const launchPaper = (paper) => {
    const pool = questions.filter((q) => q.exam === paper.exam);
    const picked = pool.length >= 8 ? pool.slice(0, 20) : questions.slice(0, 20);
    setActiveExamConfig({
      id: paper.id,
      title: paper.title,
      mode: 'custom',
      durationMinutes: paper.duration,
      questions: picked
    });
    navigate('/exam?mode=custom');
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Previous Year Questions (PYQs)</h1>
          <p className="page-description">Solve full official past papers or browse topic-wise PYQs across GAT-B, IIT JAM BT, CSIR NET, and GATE XL.</p>
        </div>
        <div className="tabs">
          <button type="button" className={`tab-btn ${tab === 'papers' ? 'active' : ''}`} onClick={() => setTab('papers')}>Year-wise Papers</button>
          <button type="button" className={`tab-btn ${tab === 'topic' ? 'active' : ''}`} onClick={() => setTab('topic')}>Topic-wise PYQs</button>
        </div>
      </div>

      <div className="flex-between flex-wrap gap-md mb-lg">
        <div className="input-with-icon" style={{ minWidth: 260, flex: 1, maxWidth: 400 }}>
          <Search size={16} />
          <input className="form-input" placeholder="Search year, topic, or question..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex flex-wrap gap-sm">
          {['All', 'GAT-B', 'IIT JAM BT', 'CSIR NET LS', 'GATE XL'].map((ex) => (
            <button key={ex} type="button" className={`btn btn-sm ${examFilter === ex ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setExamFilter(ex)}>
              {ex}
            </button>
          ))}
        </div>
      </div>

      {tab === 'papers' ? (
        <div className="grid grid-3">
          {filteredPapers.map((paper) => (
            <div key={paper.id} className="card">
              <div className="flex-between mb-sm">
                <span className="badge badge-primary">{paper.exam}</span>
                <span className="badge badge-neutral">{paper.year}</span>
              </div>
              <h3 style={{ fontSize: 17 }}>{paper.title}</h3>
              <p className="text-xs text-muted mt-sm">{paper.count} questions · {paper.duration} minutes · MCQ / MSQ / NAT</p>
              <button type="button" className="btn btn-primary btn-sm mt-lg" style={{ width: '100%' }} onClick={() => launchPaper(paper)}>
                <Play size={14} /> Attempt Paper
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex" style={{ flexDirection: 'column', gap: 14 }}>
          {filteredQuestions.slice(0, 15).map((q) => (
            <div key={q.id} className="card card-compact">
              <div className="flex-between flex-wrap gap-sm mb-sm">
                <div className="flex gap-sm">
                  <span className="badge badge-primary">{q.exam} {q.year}</span>
                  <span className="badge badge-info">{q.questionType}</span>
                  <span className="badge badge-neutral">{q.topic}</span>
                </div>
                <span className="text-xs text-muted">{q.id}</span>
              </div>
              <p className="text-sm font-semibold mb-sm">{q.question}</p>
              <div className="flex-between flex-wrap gap-sm">
                <span className="text-xs text-secondary flex-center"><BookOpen size={13} /> Answer: {q.correctAnswer}</span>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setActiveExamConfig({
                      id: `pyq-topic-${q.topic}`,
                      title: `${q.topic} — PYQ Practice`,
                      mode: 'practice',
                      durationMinutes: 20,
                      questions: questions.filter((x) => x.topic === q.topic).slice(0, 15)
                    });
                    navigate('/exam?mode=practice');
                  }}
                >
                  Practice Topic PYQs
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
