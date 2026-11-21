import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// Step 0: Shared Layouts (Public Shell + Authenticated Sidebar & Mobile Bottom Nav)
import PublicLayout from '../layouts/PublicLayout';
import StudentLayout from '../layouts/StudentLayout';

// Phase 1: Start & Sign-up (Pages 1–6)
import LandingPage from '../pages/public/LandingPage';
import LoginPage from '../pages/public/LoginPage';
import OnboardingPage from '../pages/public/OnboardingPage';
import PricingPage from '../pages/public/PricingPage';
import CheckoutPage from '../pages/public/CheckoutPage';
import ChooseExamPage from '../pages/public/ChooseExamPage';

// Lightweight placeholder so Step 0 StudentLayout (sidebar + mobile nav) can be previewed live
import PhasePlaceholderPage from '../pages/PhasePlaceholderPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Phase 1: Public Area (No Authenticated Sidebar) */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/choose-exam" element={<ChooseExamPage />} />
      </Route>

      {/* Step 0 Preview: Shared Student Sidebar + Mobile Bottom Navigation */}
      <Route element={<StudentLayout />}>
        <Route path="/dashboard" element={<PhasePlaceholderPage title="Student Dashboard" phase="Phase 2" />} />
        <Route path="/create-test" element={<PhasePlaceholderPage title="Create Test" phase="Phase 2" />} />
        <Route path="/practice-sets" element={<PhasePlaceholderPage title="Practice Sets" phase="Phase 6" />} />
        <Route path="/test-series" element={<PhasePlaceholderPage title="Test Series" phase="Phase 3" />} />
        <Route path="/pyqs" element={<PhasePlaceholderPage title="PYQs" phase="Phase 2" />} />
        <Route path="/mentorship" element={<PhasePlaceholderPage title="Mentorship" phase="Phase 4" />} />
        <Route path="/mentor-booking/:mentorId" element={<PhasePlaceholderPage title="Mentor Booking" phase="Phase 4" />} />
        <Route path="/performance" element={<PhasePlaceholderPage title="Performance" phase="Phase 2" />} />
        <Route path="/weak-topics" element={<PhasePlaceholderPage title="Weak Topics" phase="Phase 2" />} />
        <Route path="/test-history" element={<PhasePlaceholderPage title="Test History" phase="Phase 2" />} />
        <Route path="/saved-questions" element={<PhasePlaceholderPage title="Saved Questions" phase="Phase 2" />} />
        <Route path="/recommendations" element={<PhasePlaceholderPage title="Recommendations" phase="Phase 2" />} />
        <Route path="/leaderboard" element={<PhasePlaceholderPage title="Leaderboard" phase="Phase 2" />} />
        <Route path="/blogs" element={<PhasePlaceholderPage title="Blogs" phase="Phase 5" />} />
        <Route path="/refer-earn" element={<PhasePlaceholderPage title="Refer & Earn" phase="Phase 5" />} />
        <Route path="/campus-ambassador" element={<PhasePlaceholderPage title="Campus Ambassador" phase="Phase 5" />} />
        <Route path="/profile" element={<PhasePlaceholderPage title="Profile" phase="Phase 5" />} />
        <Route path="/notifications" element={<PhasePlaceholderPage title="Notifications" phase="Phase 5" />} />
        <Route path="/settings" element={<PhasePlaceholderPage title="Settings" phase="Phase 5" />} />
      </Route>

      {/* Redirect any unbuilt routes back to Landing Page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
