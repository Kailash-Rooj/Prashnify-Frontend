import React, { useState } from 'react';
import { CalendarClock, CheckCircle2, IndianRupee, Plus, Trash2, Users, XCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import StatCard from '../../components/common/StatCard';

export default function MentorDashboardPage() {
  const { mentors, setMentors, mentorRequests, updateMentorRequestStatus, groupBatches } = useApp();
  const activeMentor = mentors[0];
  const [newSlot, setNewSlot] = useState('');

  const waitingReqs = mentorRequests.filter((r) => r.status === 'Waiting');
  const acceptedReqs = mentorRequests.filter((r) => r.status === 'Accepted');

  const handleAddSlot = (e) => {
    e.preventDefault();
    if (!newSlot.trim()) return;
    setMentors((prev) =>
      prev.map((m, idx) =>
        idx === 0 ? { ...m, availableSlots: [...m.availableSlots, newSlot.trim()] } : m
      )
    );
    setNewSlot('');
  };

  const handleRemoveSlot = (slot) => {
    setMentors((prev) =>
      prev.map((m, idx) =>
        idx === 0 ? { ...m, availableSlots: m.availableSlots.filter((s) => s !== slot) } : m
      )
    );
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Mentor Dashboard</h1>
          <p className="page-description">Accept or decline 1-on-1 requests (students pay ₹299 only after you accept), manage availability, and track 5-student group batches.</p>
        </div>
      </div>

      <div className="grid grid-4 mb-lg">
        <StatCard label="Pending Requests" value={waitingReqs.length} meta="Awaiting your response" icon={CalendarClock} accent="#F59E0B" />
        <StatCard label="Accepted Sessions" value={acceptedReqs.length} meta="₹299/hr 1-on-1" icon={CheckCircle2} accent="#22C55E" />
        <StatCard label="Active Group Batches" value={groupBatches.length} meta="Starts at 5 students" icon={Users} accent="#6C47FF" />
        <StatCard label="Est. Monthly Payout" value="₹11,420" meta="After 15% platform fee" icon={IndianRupee} accent="#38BDF8" />
      </div>

      {/* 1-on-1 Request Queue */}
      <div id="mentor-requests" className="card mb-lg">
        <div className="card-header">
          <div>
            <h2 className="card-title">Incoming One-on-One Requests</h2>
            <p className="card-subtitle">Accepting immediately unlocks ₹299 payment on the student's Request Status page</p>
          </div>
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Requested Slot</th>
                <th>Agenda</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {mentorRequests.map((req) => (
                <tr key={req.id}>
                  <td className="font-semibold">{req.studentName}</td>
                  <td className="text-sm">{req.day} · {req.time}</td>
                  <td className="text-sm text-secondary">{req.topic}</td>
                  <td>
                    <span className={`badge ${req.status === 'Accepted' ? 'badge-success' : req.status === 'Declined' ? 'badge-danger' : 'badge-warning'}`}>
                      {req.status}{req.paid ? ' · Paid' : ''}
                    </span>
                  </td>
                  <td>
                    {req.status === 'Waiting' ? (
                      <div className="flex gap-sm">
                        <button type="button" className="btn btn-success btn-sm" onClick={() => updateMentorRequestStatus(req.id, 'Accepted')}>
                          <CheckCircle2 size={14} /> Accept
                        </button>
                        <button type="button" className="btn btn-danger-soft btn-sm" onClick={() => updateMentorRequestStatus(req.id, 'Declined')}>
                          <XCircle size={14} /> Decline
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-muted">Decision recorded</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-2">
        {/* Availability Manager */}
        <div id="mentor-availability" className="card">
          <h2 className="card-title mb-sm">Your Weekly Availability</h2>
          <p className="text-xs text-muted mb-md">Students can only request open 1-hour slots listed here.</p>

          <div className="flex flex-wrap gap-sm mb-md">
            {activeMentor.availableSlots.map((slot) => (
              <span key={slot} className="badge badge-neutral" style={{ padding: '6px 10px' }}>
                {slot}
                <button
                  type="button"
                  onClick={() => handleRemoveSlot(slot)}
                  style={{ background: 'none', border: 'none', padding: 0, marginLeft: 4, color: 'var(--danger)' }}
                  aria-label={`Remove ${slot}`}
                >
                  <Trash2 size={12} />
                </button>
              </span>
            ))}
          </div>

          <form onSubmit={handleAddSlot} className="flex gap-sm">
            <input
              className="form-input"
              placeholder="e.g. Tue 6:00 PM"
              value={newSlot}
              onChange={(e) => setNewSlot(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-sm"><Plus size={14} /> Add Slot</button>
          </form>
        </div>

        {/* Group Batches */}
        <div id="mentor-groups" className="card">
          <h2 className="card-title mb-sm">Group Batches (5-Student Minimum)</h2>
          <p className="text-xs text-muted mb-md">Batches activate and bill ₹99/hr monthly once 5 students enroll.</p>
          <div className="flex" style={{ flexDirection: 'column', gap: 12 }}>
            {groupBatches.map((g) => (
              <div key={g.id} className="card card-compact" style={{ background: 'var(--surface-muted)' }}>
                <div className="flex-between mb-sm">
                  <span className="font-semibold text-sm">{g.title}</span>
                  <span className={`badge ${g.joinedStudents >= 5 ? 'badge-success' : 'badge-warning'}`}>
                    {g.joinedStudents} / 5 min
                  </span>
                </div>
                <div className="text-xs text-muted">{g.schedule} · ₹{g.monthlyTotal}/student/mo</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
