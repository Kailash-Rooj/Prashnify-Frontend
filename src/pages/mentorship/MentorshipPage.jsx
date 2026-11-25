import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle2, Clock, Info, Star, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function MentorshipPage() {
  const { mentors, groupBatches, mentorRequests } = useApp();
  const [mode, setMode] = useState('one-on-one'); // 'one-on-one' | 'group'
  const [examFilter, setExamFilter] = useState('All');

  const pendingCount = mentorRequests.filter((r) => r.status === 'Waiting' || (r.status === 'Accepted' && !r.paid)).length;

  const filteredMentors = mentors.filter((m) => examFilter === 'All' || m.exams.includes(examFilter));
  const filteredGroups = groupBatches.filter((g) => examFilter === 'All' || g.exam === examFilter);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Mentorship</h1>
          <p className="page-description">Connect with verified top rankers from IISc, IITs, and NCBS in 1-on-1 or monthly group cohorts.</p>
        </div>
        <div className="flex gap-sm flex-wrap">
          <Link to="/request-status" className="btn btn-secondary">
            Request Status {pendingCount > 0 && <span className="badge badge-primary">{pendingCount}</span>}
          </Link>
          <div className="tabs">
            <button type="button" className={`tab-btn ${mode === 'one-on-one' ? 'active' : ''}`} onClick={() => setMode('one-on-one')}>
              One-on-One (₹299/hr)
            </button>
            <button type="button" className={`tab-btn ${mode === 'group' ? 'active' : ''}`} onClick={() => setMode('group')}>
              Group (₹99/hr)
            </button>
          </div>
        </div>
      </div>

      {/* Exact Business Rules Banner */}
      <div className="alert alert-info mb-lg">
        <Info size={18} style={{ flexShrink: 0 }} />
        <div className="text-sm">
          {mode === 'one-on-one' ? (
            <>
              <strong>One-on-One Rules:</strong> ₹299 for 1 hour · One day at a time, no monthly plan · Pick a day &amp; time and send a request · <strong>You pay ONLY after the mentor accepts.</strong>
            </>
          ) : (
            <>
              <strong>Group Mentorship Rules:</strong> ₹99/hour per student, billed monthly · <strong>A group starts only when 5 students join.</strong> You are charged only when the group fills—if it does not reach 5, you pay ₹0.
            </>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-sm mb-lg">
        {['All', 'GAT-B', 'IIT JAM BT', 'CSIR NET LS', 'GATE XL'].map((ex) => (
          <button key={ex} type="button" className={`btn btn-sm ${examFilter === ex ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setExamFilter(ex)}>
            {ex}
          </button>
        ))}
      </div>

      {mode === 'one-on-one' ? (
        <div className="grid grid-3">
          {filteredMentors.map((mentor) => (
            <div key={mentor.id} className="card flex" style={{ flexDirection: 'column', justifyContent: 'space-between', gap: 14 }}>
              <div>
                <div className="flex gap-md mb-md" style={{ alignItems: 'center' }}>
                  <div className="avatar avatar-lg">{mentor.initials}</div>
                  <div>
                    <h3 style={{ fontSize: 17 }}>{mentor.name}</h3>
                    <div className="text-xs text-primary font-semibold">{mentor.rank}</div>
                    <div className="text-xs text-muted">{mentor.institute}</div>
                  </div>
                </div>
                <p className="text-sm text-secondary mb-md">{mentor.bio}</p>
                <div className="flex flex-wrap gap-sm mb-md">
                  {mentor.specialties.map((sp) => (
                    <span key={sp} className="badge badge-neutral">{sp}</span>
                  ))}
                </div>
                <div className="flex-between text-xs text-muted">
                  <span className="flex-center"><Star size={14} className="text-warning" /> {mentor.rating} ({mentor.sessionsCompleted} sessions)</span>
                  <span className="font-bold text-primary" style={{ fontSize: 15 }}>₹299 / hr</span>
                </div>
              </div>
              <Link to={`/mentor-booking/${mentor.id}?mode=one-on-one`} className="btn btn-primary" style={{ width: '100%' }}>
                Select Day &amp; Request
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-3">
          {filteredGroups.map((grp) => {
            const pct = Math.min(100, Math.round((grp.joinedStudents / grp.minStudents) * 100));
            const isFull = grp.joinedStudents >= grp.minStudents;
            return (
              <div key={grp.id} className="card flex" style={{ flexDirection: 'column', justifyContent: 'space-between', gap: 14 }}>
                <div>
                  <div className="flex-between mb-sm">
                    <span className="badge badge-primary">{grp.exam}</span>
                    <span className={`badge ${isFull ? 'badge-success' : 'badge-warning'}`}>
                      <Users size={12} /> {grp.joinedStudents} / {grp.minStudents} min
                    </span>
                  </div>
                  <h3 style={{ fontSize: 17 }}>{grp.title}</h3>
                  <div className="text-xs text-secondary mt-sm">Mentor: <strong>{grp.mentorName}</strong></div>
                  <div className="text-xs text-muted mt-sm flex gap-sm" style={{ alignItems: 'center' }}><Calendar size={13} /> {grp.schedule}</div>
                  <div className="mt-md">
                    <div className="flex-between text-xs mb-sm">
                      <span>{isFull ? 'Group ready to start!' : `${grp.minStudents - grp.joinedStudents} more needed to start`}</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${pct}%`, background: isFull ? 'var(--success)' : 'var(--primary)' }} />
                    </div>
                  </div>
                  <div className="flex-between mt-md text-sm">
                    <span className="text-muted">₹{grp.pricePerHour}/hr · Monthly</span>
                    <span className="font-bold">₹{grp.monthlyTotal}/mo</span>
                  </div>
                </div>
                {grp.userJoined ? (
                  grp.userPaid ? (
                    <span className="badge badge-success" style={{ justifyContent: 'center', padding: 10 }}><CheckCircle2 size={15} /> Enrolled &amp; Active</span>
                  ) : isFull ? (
                    <Link to={`/mentorship-payment?mode=group&id=${grp.id}`} className="btn btn-primary" style={{ width: '100%' }}>
                      Group Full — Complete Payment
                    </Link>
                  ) : (
                    <span className="badge badge-warning" style={{ justifyContent: 'center', padding: 10 }}>
                      <Clock size={14} /> Joined · Waiting for 5 students (₹0 charged)
                    </span>
                  )
                ) : (
                  <Link to={`/mentor-booking/${grp.mentorId}?mode=group&groupId=${grp.id}`} className="btn btn-primary" style={{ width: '100%' }}>
                    View &amp; Join Group
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
