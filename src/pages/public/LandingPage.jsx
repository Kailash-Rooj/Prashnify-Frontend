import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock,
  Layers,
  ShieldCheck,
  Star,
  Users
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const FEATURES = [
  { icon: Layers, title: 'Topic Practice Sets', desc: 'Master one topic at a time in learning mode with pause support, instant Check Answer, and full explanations.' },
  { icon: Clock, title: 'Real Exam Test Series', desc: 'Scheduled national mocks with MCQ, MSQ & NAT formats, non-pausable timers, and All-India Rank on first attempt.' },
  { icon: BarChart3, title: 'Weak Topic Analytics', desc: 'Pinpoint subtopics dragging down your accuracy and launch targeted drills in two clicks.' },
  { icon: Users, title: 'Verified Topper Mentorship', desc: 'Book 1-on-1 sessions at ₹299/hr (pay only after acceptance) or join ₹99/hr monthly cohorts once 5 students enroll.' }
];

const STORIES = [
  { name: 'Ritika Sen', exam: 'GAT-B · AIR 19', quote: 'Practicing single-topic sets like DNA Replication before taking live mocks raised my accuracy from 61% to 88% in six weeks.' },
  { name: 'Karan Verma', exam: 'IIT JAM BT · AIR 34', quote: 'The NAT & MSQ breakdown stopped me from losing easy marks. Having zero negative marking reminders built right into exam instructions helped hugely.' },
  { name: 'Sneha Iyer', exam: 'CSIR NET JRF', quote: 'My 1-on-1 session with an IISc mentor fixed my paper-attempt order in a single hour—and I only paid after she confirmed the slot.' }
];

export default function LandingPage() {
  const { mentors, plans, testSeries } = useApp();

  return (
    <div>
      {/* Hero */}
      <section style={{ padding: '72px 0 56px', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
            <span className="badge badge-primary mb-md">Built for GAT-B · IIT JAM BT · CSIR NET · GATE XL · CUET PG</span>
            <h1 style={{ fontSize: 'clamp(34px, 5vw, 52px)', lineHeight: 1.12, marginTop: 14 }}>
              Practice smarter. Rank nationally. Learn with verified toppers.
            </h1>
            <p className="text-secondary mt-md" style={{ fontSize: 17, maxWidth: 620, margin: '16px auto 0' }}>
              Prashnify combines topic-wise Practice Sets, real-exam All-India Test Series (MCQ, MSQ &amp; NAT), and transparent 1-on-1 &amp; group mentorship in one focused platform.
            </p>
            <div className="flex-center flex-wrap gap-md mt-lg">
              <Link to="/login" className="btn btn-primary btn-lg">
                Start Free Preparation <ArrowRight size={18} />
              </Link>
              <Link to="/dashboard" className="btn btn-secondary btn-lg">
                Explore Student Demo
              </Link>
            </div>
            <div className="flex-center flex-wrap gap-lg mt-lg text-sm text-muted">
              <span className="flex-center"><CheckCircle2 size={15} className="text-success" /> 50+ Free Topic Questions</span>
              <span className="flex-center"><CheckCircle2 size={15} className="text-success" /> Real MCQ / MSQ / NAT Engine</span>
              <span className="flex-center"><CheckCircle2 size={15} className="text-success" /> Pay Only After Mentor Accepts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="flex-between flex-wrap mb-lg">
            <div>
              <h2 style={{ fontSize: 28 }}>Everything you need to crack national exams</h2>
              <p className="text-secondary mt-sm">Designed to separate stress-free learning from strict timed exam simulation.</p>
            </div>
            <Link to="/create-test" className="btn btn-outline btn-sm">Create Custom Test</Link>
          </div>
          <div className="grid grid-4">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="card">
                  <div className="stat-icon mb-md"><Icon size={20} /></div>
                  <h3 style={{ fontSize: 16 }} className="mb-sm">{f.title}</h3>
                  <p className="text-sm text-secondary">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Test Series Highlight */}
      <section style={{ padding: '52px 0', background: 'var(--bg-elevated)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="flex-between flex-wrap mb-lg">
            <div>
              <h2 style={{ fontSize: 28 }}>All-India Test Series</h2>
              <p className="text-secondary mt-sm">First attempt during the live window counts toward All-India Rank. Retakes remain open for practice.</p>
            </div>
            <Link to="/test-series" className="btn btn-primary btn-sm">Browse All Series</Link>
          </div>
          <div className="grid grid-3">
            {testSeries.map((series) => (
              <div key={series.id} className="card">
                <div className="flex-between mb-sm">
                  <span className="badge badge-primary">{series.exam}</span>
                  <span className="text-xs text-muted">{series.aspirantsEnrolled.toLocaleString()} enrolled</span>
                </div>
                <h3 style={{ fontSize: 17 }}>{series.title}</h3>
                <p className="text-sm text-secondary mt-sm">{series.description}</p>
                <div className="flex-between mt-lg">
                  <span className="font-bold">₹{series.price}</span>
                  <Link to="/test-series" className="btn btn-secondary btn-sm">View Schedule</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentorship & Mentors */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="flex-between flex-wrap mb-lg">
            <div>
              <h2 style={{ fontSize: 28 }}>Learn directly from top rankers</h2>
              <p className="text-secondary mt-sm">1-on-1 sessions at ₹299/hr (pay after acceptance) or Group batches at ₹99/hr/student (starts at 5 students).</p>
            </div>
            <Link to="/login" className="btn btn-outline btn-sm">Get Started</Link>
          </div>
          <div className="grid grid-3">
            {mentors.map((m) => (
              <div key={m.id} className="card">
                <div className="flex gap-md mb-md" style={{ alignItems: 'center' }}>
                  <div className="avatar avatar-lg">{m.initials}</div>
                  <div>
                    <h3 style={{ fontSize: 16 }}>{m.name}</h3>
                    <div className="text-xs text-primary font-semibold">{m.rank}</div>
                    <div className="text-xs text-muted">{m.institute}</div>
                  </div>
                </div>
                <p className="text-sm text-secondary mb-md">{m.bio}</p>
                <div className="flex-between">
                  <span className="text-sm flex-center"><Star size={14} className="text-warning" /> {m.rating} ({m.sessionsCompleted} sessions)</span>
                  <Link to="/login" className="btn btn-primary btn-sm">Book ₹299/hr</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Stories */}
      <section style={{ padding: '52px 0', background: 'var(--bg-elevated)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <h2 style={{ fontSize: 28 }} className="mb-lg">Student stories</h2>
          <div className="grid grid-3">
            {STORIES.map((s) => (
              <div key={s.name} className="card">
                <div className="flex gap-sm mb-md" style={{ alignItems: 'center' }}>
                  <Award size={18} className="text-primary" />
                  <div>
                    <div className="font-semibold text-sm">{s.name}</div>
                    <div className="text-xs text-primary">{s.exam}</div>
                  </div>
                </div>
                <p className="text-sm text-secondary">"{s.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 style={{ fontSize: 28 }}>Simple, transparent plans</h2>
            <p className="text-secondary mt-sm">Choose 1, 6, or 12 months. Switch exams or upgrade anytime.</p>
          </div>
          <div className="grid grid-3">
            {plans.map((plan) => (
              <div key={plan.id} className="card" style={plan.months === 6 ? { borderColor: 'var(--primary)' } : undefined}>
                <div className="flex-between mb-sm">
                  <span className="font-bold">{plan.name}</span>
                  <span className="badge badge-primary">{plan.badge}</span>
                </div>
                <div style={{ fontSize: 32, fontWeight: 800, margin: '12px 0' }}>
                  ₹{plan.price} <span className="text-sm text-muted" style={{ fontWeight: 500, textDecoration: 'line-through' }}>₹{plan.originalPrice}</span>
                </div>
                <div className="flex" style={{ flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                  {plan.features.map((feat) => (
                    <div key={feat} className="text-sm text-secondary flex gap-sm" style={{ alignItems: 'center' }}>
                      <CheckCircle2 size={15} className="text-success" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
                <Link to={`/checkout?plan=${plan.id}`} className={`btn ${plan.months === 6 ? 'btn-primary' : 'btn-secondary'}`} style={{ width: '100%' }}>
                  Choose {plan.months} {plan.months === 1 ? 'Month' : 'Months'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: '0 0 24px' }}>
        <div className="container">
          <div className="card flex-between flex-wrap gap-md" style={{ borderColor: 'var(--primary-border)', background: 'var(--primary-soft)' }}>
            <div>
              <h3 style={{ fontSize: 22 }}>Ready to benchmark your rank?</h3>
              <p className="text-sm text-secondary mt-sm">Create your account in 30 seconds and jump straight into DNA Replication or Full Mock 8.</p>
            </div>
            <div className="flex gap-sm">
              <Link to="/login" className="btn btn-primary">Get Started <ArrowRight size={16} /></Link>
              <Link to="/pricing" className="btn btn-secondary"><BookOpen size={16} /> View Pricing</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
