import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, CreditCard, Users, XCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function RequestStatusPage() {
  const { mentorRequests, groupBatches } = useApp();

  const joinedGroups = groupBatches.filter((g) => g.userJoined);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Mentorship Request Status</h1>
          <p className="page-description">Track your 1-on-1 requests (Waiting, Accepted, or Declined) and Group batches waiting to reach 5 students.</p>
        </div>
        <div className="flex gap-sm">
          <Link to="/mentorship" className="btn btn-secondary">Browse Mentors</Link>
          <Link to="/mentor/dashboard" className="btn btn-outline">Open Mentor Portal (Test Accept/Decline)</Link>
        </div>
      </div>

      <h2 style={{ fontSize: 18 }} className="mb-md">One-on-One Requests (₹299 / hour)</h2>
      <div className="grid grid-2 mb-lg">
        {mentorRequests.map((req) => (
          <div key={req.id} className="card">
            <div className="flex-between mb-sm">
              <span className="text-xs text-muted">Request #{req.id}</span>
              <span
                className={`badge ${
                  req.paid
                    ? 'badge-success'
                    : req.status === 'Accepted'
                    ? 'badge-primary'
                    : req.status === 'Declined'
                    ? 'badge-danger'
                    : 'badge-warning'
                }`}
              >
                {req.paid ? (
                  <><CheckCircle2 size={12} /> Confirmed &amp; Paid</>
                ) : req.status === 'Accepted' ? (
                  <><CheckCircle2 size={12} /> Accepted — Payment Unlocked</>
                ) : req.status === 'Declined' ? (
                  <><XCircle size={12} /> Declined</>
                ) : (
                  <><Clock size={12} /> Waiting for Mentor</>
                )}
              </span>
            </div>

            <h3 style={{ fontSize: 17 }}>{req.mentorName}</h3>
            <div className="text-sm text-secondary mt-sm">{req.day} · {req.time} (1 hour)</div>
            <p className="text-xs text-muted mt-sm mb-md">Agenda: {req.topic}</p>

            {req.status === 'Accepted' && !req.paid && (
              <Link to={`/mentorship-payment?mode=one-on-one&id=${req.id}`} className="btn btn-primary btn-sm">
                <CreditCard size={14} /> Pay ₹299 to Confirm Session
              </Link>
            )}
            {req.status === 'Waiting' && (
              <div className="text-xs text-warning">Payment is locked until the mentor accepts your slot.</div>
            )}
            {req.status === 'Declined' && (
              <Link to={`/mentor-booking/${req.mentorId}`} className="btn btn-secondary btn-sm">Pick Another Slot</Link>
            )}
            {req.paid && (
              <div className="text-xs text-success font-semibold">Session link unlocked for {req.day}, {req.time}.</div>
            )}
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 18 }} className="mb-md">Your Group Batches (Starts at 5 Students)</h2>
      <div className="grid grid-2">
        {joinedGroups.map((grp) => {
          const isFull = grp.joinedStudents >= grp.minStudents;
          return (
            <div key={grp.id} className="card">
              <div className="flex-between mb-sm">
                <span className="badge badge-primary">{grp.exam}</span>
                <span className={`badge ${isFull ? 'badge-success' : 'badge-warning'}`}>
                  <Users size={12} /> {grp.joinedStudents}/{grp.minStudents} students
                </span>
              </div>
              <h3 style={{ fontSize: 17 }}>{grp.title}</h3>
              <p className="text-xs text-muted mt-sm mb-md">{grp.mentorName} · {grp.schedule}</p>
              {grp.userPaid ? (
                <span className="badge badge-success">Active Monthly Cohort</span>
              ) : isFull ? (
                <Link to={`/mentorship-payment?mode=group&id=${grp.id}`} className="btn btn-primary btn-sm">
                  <CreditCard size={14} /> Group Full — Pay ₹{grp.monthlyTotal}/mo
                </Link>
              ) : (
                <div className="text-xs text-secondary">Waiting for {grp.minStudents - grp.joinedStudents} more student(s). You pay ₹0 until the group reaches 5.</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
