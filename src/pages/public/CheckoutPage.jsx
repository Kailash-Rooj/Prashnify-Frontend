import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Building2, CheckCircle2, CreditCard, ShieldCheck, Smartphone, Tag } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { plans, coupons, testSeries, setUser, enrollInSeries } = useApp();

  const planId = searchParams.get('plan');
  const seriesId = searchParams.get('series');
  const selectedSeries = seriesId ? testSeries.find((s) => s.id === seriesId) : null;
  const selectedPlan = plans.find((p) => p.id === planId) || plans[1];

  const basePrice = selectedSeries ? selectedSeries.price : selectedPlan.price;
  const itemTitle = selectedSeries ? selectedSeries.title : selectedPlan.name;

  const [method, setMethod] = useState('upi');
  const [upiId, setUpiId] = useState('aarav@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8841');
  const [bank, setBank] = useState('State Bank of India');
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMsg, setCouponMsg] = useState('');
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);

  const discount = appliedCoupon
    ? appliedCoupon.discountType === 'percent'
      ? Math.round((basePrice * appliedCoupon.value) / 100)
      : Math.min(basePrice, appliedCoupon.value)
    : 0;
  const finalAmount = Math.max(0, basePrice - discount);

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    const match = coupons.find((c) => c.code.toUpperCase() === code && c.active);
    if (!match) {
      setAppliedCoupon(null);
      setCouponMsg('Invalid or inactive coupon. Try PRASH20 or GATB100.');
      return;
    }
    setAppliedCoupon(match);
    setCouponMsg(`Coupon ${match.code} applied!`);
  };

  const handleSimulatePayment = (e) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setPaid(true);
      if (selectedSeries) {
        enrollInSeries(selectedSeries.id);
      } else {
        setUser((prev) => ({ ...prev, plan: selectedPlan.name }));
      }
    }, 650);
  };

  if (paid) {
    return (
      <div className="container" style={{ maxWidth: 540, padding: '64px 20px' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div className="empty-state-icon" style={{ margin: '0 auto 14px', background: 'var(--success-soft)', color: 'var(--success)' }}>
            <CheckCircle2 size={28} />
          </div>
          <h1 style={{ fontSize: 26 }}>Payment Successful (Simulated)</h1>
          <p className="text-sm text-secondary mt-sm">
            Your order for <strong>{itemTitle}</strong> (₹{finalAmount}) is active. No real money was charged.
          </p>
          <div className="card card-compact mt-lg mb-lg" style={{ textAlign: 'left', background: 'var(--surface-muted)' }}>
            <div className="flex-between text-sm mb-sm"><span className="text-muted">Order ID</span><span className="font-semibold">PRSH-{Date.now().toString().slice(-6)}</span></div>
            <div className="flex-between text-sm mb-sm"><span className="text-muted">Payment Method</span><span className="font-semibold">{method.toUpperCase()}</span></div>
            <div className="flex-between text-sm"><span className="text-muted">Amount Paid</span><span className="font-bold text-success">₹{finalAmount}</span></div>
          </div>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            style={{ width: '100%' }}
            onClick={() => navigate(selectedSeries ? '/test-series' : '/choose-exam')}
          >
            {selectedSeries ? 'Go to Test Series' : 'Continue to Choose Exam'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: 960, padding: '44px 20px' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Checkout</h1>
          <p className="page-description">Pay by UPI, Card, or Netbanking. Frontend payment simulation only — no real transaction occurs.</p>
        </div>
        <Link to="/pricing" className="btn btn-outline btn-sm">Change Plan</Link>
      </div>

      <div className="grid-sidebar-split">
        <form onSubmit={handleSimulatePayment} className="card flex" style={{ flexDirection: 'column', gap: 18 }}>
          <h2 style={{ fontSize: 18 }}>1. Select Payment Method</h2>
          <div className="grid grid-3" style={{ gap: 10 }}>
            {[
              { id: 'upi', label: 'UPI', icon: Smartphone },
              { id: 'card', label: 'Debit / Credit Card', icon: CreditCard },
              { id: 'netbanking', label: 'Netbanking', icon: Building2 }
            ].map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setMethod(opt.id)}
                  className={`exam-option ${method === opt.id ? 'selected' : ''}`}
                  style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                >
                  <Icon size={20} className={method === opt.id ? 'text-primary' : 'text-muted'} />
                  <span className="text-sm font-semibold">{opt.label}</span>
                </button>
              );
            })}
          </div>

          {method === 'upi' && (
            <div className="form-group">
              <label className="form-label">UPI ID</label>
              <input className="form-input" value={upiId} onChange={(e) => setUpiId(e.target.value)} required />
            </div>
          )}

          {method === 'card' && (
            <div className="grid grid-2">
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Card Number (Demo)</label>
                <input className="form-input" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Expiry</label>
                <input className="form-input" defaultValue="08/29" required />
              </div>
              <div className="form-group">
                <label className="form-label">CVV</label>
                <input className="form-input" defaultValue="412" maxLength={4} required />
              </div>
            </div>
          )}

          {method === 'netbanking' && (
            <div className="form-group">
              <label className="form-label">Select Bank</label>
              <select className="form-select" value={bank} onChange={(e) => setBank(e.target.value)}>
                <option>State Bank of India</option>
                <option>HDFC Bank</option>
                <option>ICICI Bank</option>
                <option>Axis Bank</option>
              </select>
            </div>
          )}

          <div className="alert alert-info">
            <ShieldCheck size={18} style={{ flexShrink: 0 }} />
            <span className="text-sm">Demo Mode: Clicking "Pay" simulates an instant confirmation and updates your LocalStorage plan.</span>
          </div>

          <button type="submit" className="btn btn-primary btn-lg" disabled={processing}>
            {processing ? 'Processing simulated payment...' : `Pay ₹${finalAmount} Now`}
          </button>
        </form>

        <div className="card" style={{ alignSelf: 'start' }}>
          <h2 style={{ fontSize: 18 }} className="mb-md">Order Summary</h2>
          <div className="flex-between mb-sm">
            <span className="text-sm text-secondary">{itemTitle}</span>
            <span className="font-semibold">₹{basePrice}</span>
          </div>
          {discount > 0 && (
            <div className="flex-between mb-sm text-success">
              <span className="text-sm">Coupon ({appliedCoupon.code})</span>
              <span className="font-semibold">-₹{discount}</span>
            </div>
          )}
          <div className="flex-between mt-md" style={{ borderTop: '1px solid var(--border)', paddingTop: 14 }}>
            <span className="font-bold">Total Payable</span>
            <span style={{ fontSize: 22, fontWeight: 800 }}>₹{finalAmount}</span>
          </div>

          <div className="mt-lg">
            <label className="form-label mb-sm" style={{ display: 'block' }}>Have a coupon code?</label>
            <div className="flex gap-sm">
              <input
                className="form-input"
                placeholder="Try PRASH20 or GATB100"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
              />
              <button type="button" className="btn btn-secondary" onClick={handleApplyCoupon}>
                <Tag size={15} /> Apply
              </button>
            </div>
            {couponMsg && (
              <p className={`text-xs mt-sm ${appliedCoupon ? 'text-success' : 'text-danger'}`}>{couponMsg}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
