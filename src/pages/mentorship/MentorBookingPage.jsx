import React, { useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Calendar, CheckCircle2, Clock, Star, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const DAYS = ['Thu, Nov 19', 'Fri, Nov 20', 'Sat, Nov 21', 'Sun, Nov 22', 'Mon, Nov 23'];

export default function MentorBookingPage() {
  const { mentorId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { mentors, groupBatches, createMentorRequest, joinGroupBatch } = useApp();

  const initialMode = searchParams.get('mode') === 'group' ? 'group' : 'one-on-one';
  const groupIdParam = searchParams.get('groupId');

  const mentor = mentors.find((m) => m.id === mentorId) || mentors[0];
  const groupBatch =
    groupBatches.find((g) => g.id === groupIdParam) ||
    groupBatches.find((g) => g.mentorId === mentor.id) ||
    groupBatches[0];

  const [mode, setMode] = useState(initialMode);
  const [selectedDay, setSelectedDay] = useState(DAYS[1]);
  const [selectedTime, setSelectedTime] = useState(mentor.availableSlots[0] || '7:00 PM');
  const [topic, setTopic] = useState('');
  const [error, setError] = useState('');

  const handleRequestOneOnOne = (e) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Please describe what you want to cover in this 1-hour session.');
      return;
    }
    createMentorRequest({
      mentorId: mentor.id,
      mentorName: mentor.name,
      day: selectedDay,
      time: selectedTime,
      topic: topic.trim()
    });
    navigate('/request-status');
  };

  const handleJoinGroup = () => {
    const willBeFull = groupBatch.joinedStudents + 1 >= groupBatch.minStudents;
    joinGroupBatch(groupBatch.id);
    if (willBeFull) {
      navigate(`/mentorship-payment?mode=group&id=${groupBatch.id}`);
    } else {
      navigate('/request-status');
    }
  };

  return (
    <div>
      <Link to="/mentorship" className="text-sm text-muted flex gap-sm mb-md" style={{ alignItems: 'center' }}>
        <ArrowLeft size={14} /> Back to Mentorship
      </Link>

      <div className="grid-sidebar-split">
        {/* Mentor Profile */}
        <div className="card">
          <div className="flex gap-md mb-lg" style={{ alignItems: 'center' }}>
            <div className="avatar avatar-lg">{mentor.initials}</div>
            <div>
              <h1 style={{ fontSize: 22 }}>{mentor.name}</h1>
              <div className="text-sm text-primary font-semibold">{mentor.rank}</div>
              <div className="text-xs text-muted">{mentor.institute}</div>
            </div>
          </div>

          <p className="text-sm text-secondary mb-lg">{mentor.bio}</p>

          <div className="grid grid-3 mb-lg" style={{ gap: 12 }}>
            <div className="card card-compact" style={{ background: 'var(--surface-muted)' }}>
              <div className="text-xs text-muted">Rating</div>
              <div className="font-bold flex gap-sm mt-sm" style={{ alignItems: 'center' }}><Star size={15} className="text-warning" /> {mentor.rating} / 5.0</div>
            </div>
            <div className="card card-compact" style={{ background: 'var(--surface-muted)' }}>
              <div className="text-xs text-muted">Completed</div>
              <div className="font-bold mt-sm">{mentor.sessionsCompleted} sessions</div>
            </div>
            <div className="card card-compact" style={{ background: 'var(--surface-muted)' }}>
              <div className="text-xs text-muted">1-on-1 Rate</div>
              <div className="font-bold mt-sm text-primary">₹299 / hour</div>
            </div>
          </div>

          <h3 className="card-title mb-sm">Exams &amp; Specialties</h3>
          <div className="flex flex-wrap gap-sm">
            {mentor.exams.map((ex) => <span key={ex} className="badge badge-primary">{ex}</span>)}
            {mentor.specialties.map((sp) => <span key={sp} className="badge badge-neutral">{sp}</span>)}
          </div>
        </div>

        {/* Booking Panel */}
        <div className="card" style={{ alignSelf: 'start' }}>
          <div className="tabs mb-lg" style={{ width: '100%' }}>
            <button type="button" className={`tab-btn ${mode === 'one-on-one' ? 'active' : ''}`} style={{ flex: 1 }} onClick={() => setMode('one-on-one')}>
              1-on-1 (₹299)
            </button>
            <button type="button" className={`tab-btn ${mode === 'group' ? 'active' : ''}`} style={{ flex: 1 }} onClick={() => setMode('group')}>
              Group (₹99/hr)
            </button>
          </div>

          {mode === 'one-on-one' ? (
            <form onSubmit={handleRequestOneOnOne} className="flex" style={{ flexDirection: 'column', gap: 16 }}>
              <div>
                <h2 style={{ fontSize: 18 }}>Request 1-on-1 Session</h2>
                <p className="text-xs text-muted mt-sm">One day at a time · No monthly commitment · Pay ₹299 ONLY after {mentor.name.split(' ')[0]} accepts.</p>
              </div>

              {error && <div className="alert alert-danger text-sm">{error}</div>}

              <div className="form-group">
                <label className="form-label flex gap-sm" style={{ alignItems: 'center' }}><Calendar size={14} /> Choose Day</label>
                <div className="flex flex-wrap gap-sm">
                  {DAYS.map((d) => (
                    <button key={d} type="button" className={`btn btn-sm ${selectedDay === d ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setSelectedDay(d)}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label flex gap-sm" style={{ alignItems: 'center' }}><Clock size={14} /> Choose Available Slot</label>
                <div className="flex flex-wrap gap-sm">
                  {mentor.availableSlots.map((slot) => (
                    <button key={slot} type="button" className={`btn btn-sm ${selectedTime === slot ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setSelectedTime(slot)}>
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Session Agenda / Doubts</label>
                <textarea
                  className="form-textarea"
                  placeholder="e.g. Review Mock 7 errors in Immunology and build a 30-day revision timetable."
                  value={topic}
                  onChange={(e) => { setTopic(e.target.value); setError(''); }}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                Send Request (₹0 Payable Now)
              </button>
            </form>
          ) : (
            <div className="flex" style={{ flexDirection: 'column', gap: 14 }}>
              <div>
                <span className="badge badge-primary mb-sm">{groupBatch.exam}</span>
                <h2 style={{ fontSize: 18 }}>{groupBatch.title}</h2>
                <p className="text-xs text-muted mt-sm">{groupBatch.schedule}</p>
              </div>

              <div className="card card-compact" style={{ background: 'var(--surface-muted)' }}>
                <div className="flex-between text-sm mb-sm">
                  <span className="text-muted">Rate</span>
                  <span className="font-semibold">₹{groupBatch.pricePerHour}/hr per student</span>
                </div>
                <div className="flex-between text-sm mb-sm">
                  <span className="text-muted">Monthly Total ({groupBatch.hoursPerMonth} hrs)</span>
                  <span className="font-bold">₹{groupBatch.monthlyTotal}/month</span>
                </div>
                <div className="flex-between text-sm">
                  <span className="text-muted">Seats Filled</span>
                  <span className="badge badge-info"><Users size={12} /> {groupBatch.joinedStudents} / {groupBatch.minStudents} required</span>
                </div>
              </div>

              <div className="alert alert-info text-xs">
                Group starts ONLY when 5 students join. If it does not reach 5, you pay nothing.
              </div>

              {groupBatch.userJoined ? (
                <div className="badge badge-success" style={{ justifyContent: 'center', padding: 12 }}>
                  <CheckCircle2 size={16} /> You have already joined this group
                </div>
              ) : (
                <button type="button" className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={handleJoinGroup}>
                  {groupBatch.joinedStudents + 1 >= groupBatch.minStudents
                    ? 'Join as 5th Student & Proceed to Payment'
                    : 'Reserve Seat in Group (₹0 Charged Now)'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
