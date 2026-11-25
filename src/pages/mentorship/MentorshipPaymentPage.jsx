import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, CreditCard, ShieldCheck, Smartphone, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function MentorshipPaymentPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { mentorRequests, groupBatches, markMentorRequestPaid, markGroupPaid } = useApp();

  const initialMode = searchParams.get('mode') === 'group' ? 'group' : 'one-on-one';
  const idParam = searchParams.get('id');

  const [mode, setMode] = useState(initialMode);
  const [payMethod, setPayMethod] = useState('upi');
  const [paidSuccess, setPaidSuccess] = useState(false);

  const req =
    mentorRequests.find((r) => r.id === idParam) ||
    mentorRequests.find((r) => r.status === 'Accepted' && !r.paid) ||
    mentorRequests[0];

  const grp =
    groupBatches.find((g) => g.id === idParam) ||
    groupBatches.find((g) => g.joinedStudents >= g.minStudents) ||
    groupBatches[0];

  const canPayOneOnOne = req && req.status === 'Accepted' && !req.paid;
  const canPayGroup = grp && grp.joinedStudents >= grp.minStudents && !grp.userPaid;

  const amount = mode === 'one-on-one' ? 299 : grp.monthlyTotal;

  const handlePay = (e) => {
    e.preventDefault();
    if (mode === 'one-on-one' && req) {
      markMentorRequestPaid(req.id);
    } else if (mode === 'group' && grp) {
      markGroupPaid(grp.id);
    }
    setPaidSuccess(true);
  };

  if (paidSuccess) {
    return (
      <div className="card" style={{ maxWidth: 520, margin: '28px auto', textAlign: 'center' }}>
        <div className="empty-state-icon" style={{ margin: '0 auto 14px', background: 'var(--success-soft)', color: 'var(--success)' }}>
          <CheckCircle2 size={28} />
        </div>
        <h2>Mentorship Payment Confirmed (Simulated)</h2>
        <p className="text-sm text-secondary mt-sm mb-lg">
          {mode === 'one-on-one'
            ? `Your 1-on-1 session with ${req.mentorName} (${req.day} at ${req.time}) is confirmed for ₹299.`
            : `Your monthly seat in ${grp.title} is active for ₹${grp.monthlyTotal}/month.`}
        </p>
        <button type="button" className="btn btn-primary" onClick={() => navigate('/mentorship')}>
          Back to Mentorship
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Mentorship Payment</h1>
          <p className="page-description">One page, two modes — pay for an accepted 1-on-1 session or a full 5-student group batch.</p>
        </div>
        <div className="tabs">
          <button type="button" className={`tab-btn ${mode === 'one-on-one' ? 'active' : ''}`} onClick={() => setMode('one-on-one')}>
            One-on-One (₹299)
          </button>
          <button type="button" className={`tab-btn ${mode === 'group' ? 'active' : ''}`} onClick={() => setMode('group')}>
            Group Batch (₹99/hr)
          </button>
        </div>
      </div>

      <div className="grid-sidebar-split">
        <form onSubmit={handlePay} className="card flex" style={{ flexDirection: 'column', gap: 16 }}>
          <h2 style={{ fontSize: 18 }}>Simulated Payment Method</h2>
          <div className="grid grid-2" style={{ gap: 10 }}>
            <button type="button" className={`exam-option ${payMethod === 'upi' ? 'selected' : ''}`} onClick={() => setPayMethod('upi')}>
              <Smartphone size={18} className="text-primary" />
              <span className="font-semibold text-sm">UPI (Instant)</span>
            </button>
            <button type="button" className={`exam-option ${payMethod === 'card' ? 'selected' : ''}`} onClick={() => setPayMethod('card')}>
              <CreditCard size={18} className="text-primary" />
              <span className="font-semibold text-sm">Card / Netbanking</span>
            </button>
          </div>

          <div className="alert alert-info text-xs">
            <ShieldCheck size={16} style={{ flexShrink: 0 }} />
            <span>Frontend simulation only — no real card or UPI transaction is executed.</span>
          </div>

          {mode === 'one-on-one' && !canPayOneOnOne && (
            <div className="alert alert-warning text-sm">
              Payment is only available after the mentor accepts your request. <Link to="/request-status" className="text-primary font-semibold">Check Request Status</Link>.
            </div>
          )}

          {mode === 'group' && !canPayGroup && (
            <div className="alert alert-warning text-sm">
              Group payment unlocks only when 5 students have joined (and you have not already paid).
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={mode === 'one-on-one' ? !canPayOneOnOne : !canPayGroup}
          >
            Pay ₹{amount} Now
          </button>
        </form>

        <div className="card" style={{ alignSelf: 'start' }}>
          <h3 className="card-title mb-md">Booking Summary</h3>
          {mode === 'one-on-one' && req ? (
            <div className="flex" style={{ flexDirection: 'column', gap: 10 }}>
              <div className="flex-between text-sm"><span className="text-muted">Mode</span><span className="badge badge-primary">1-on-1 Session</span></div>
              <div className="flex-between text-sm"><span className="text-muted">Mentor</span><span className="font-semibold">{req.mentorName}</span></div>
              <div className="flex-between text-sm"><span className="text-muted">Slot</span><span>{req.day} · {req.time}</span></div>
              <div className="flex-between text-sm"><span className="text-muted">Status</span><span className="badge badge-success">{req.status}</span></div>
              <div className="flex-between mt-sm" style={{ borderTop: '1px solid var(--border)', paddingTop: 12 }}>
                <span className="font-bold">Total</span>
                <span style={{ fontSize: 22, fontWeight: 800 }}>₹299</span>
              </div>
            </div>
          ) : (
            <div className="flex" style={{ flexDirection: 'column', gap: 10 }}>
              <div className="flex-between text-sm"><span className="text-muted">Mode</span><span className="badge badge-info"><Users size={12} /> Group Monthly</span></div>
              <div className="flex-between text-sm"><span className="text-muted">Batch</span><span className="font-semibold">{grp.title}</span></div>
              <div className="flex-between text-sm"><span className="text-muted">Rate</span><span>₹99/hr × {grp.hoursPerMonth} hrs/mo</span></div>
              <div className="flex-between text-sm"><span className="text-muted">Students Joined</span><span className="badge badge-success">{grp.joinedStudents}/{grp.minStudents}</span></div>
              <div className="flex-between mt-sm" style={{ borderTop: '1px solid var(--border)', paddingTop: 12 }}>
                <span className="font-bold">Monthly Payable</span>
                <span style={{ fontSize: 22, fontWeight: 800 }}>₹{grp.monthlyTotal}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
