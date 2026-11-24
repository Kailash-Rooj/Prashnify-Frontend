import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import PublicLayout from '../layouts/PublicLayout';
import StudentLayout from '../layouts/StudentLayout';

// Phase 1: Public / Start & Sign-up (Pages 1–6)
import LandingPage from '../pages/public/LandingPage';
import LoginPage from '../pages/public/LoginPage';
import OnboardingPage from '../pages/public/OnboardingPage';
import PricingPage from '../pages/public/PricingPage';
import CheckoutPage from '../pages/public/CheckoutPage';
import ChooseExamPage from '../pages/public/ChooseExamPage';

// Phase 2: Practice (Pages 7–17)
import DashboardPage from '../pages/student/DashboardPage';
import CreateTestPage from '../pages/student/CreateTestPage';
import SubtopicsPage from '../pages/student/SubtopicsPage';
import ExamScreenPage from '../pages/student/ExamScreenPage';
import TestHistoryPage from '../pages/student/TestHistoryPage';
import WeakTopicsPage from '../pages/student/WeakTopicsPage';
import PyqsPage from '../pages/student/PyqsPage';
import SavedQuestionsPage from '../pages/student/SavedQuestionsPage';
import PerformancePage from '../pages/student/PerformancePage';
import RecommendationsPage from '../pages/student/RecommendationsPage';
import LeaderboardPage from '../pages/student/LeaderboardPage';

// Phase 3: Test Series (Pages 18–19)
import TestSeriesPage from '../pages/student/TestSeriesPage';
import SeriesResultPage from '../pages/student/SeriesResultPage';

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

      {/* Full-Screen Exam Screen (Page 10 — No Sidebar) */}
      <Route path="/exam" element={<ExamScreenPage />} />
      <Route path="/exam/:mode/:id" element={<ExamScreenPage />} />

      {/* Phases 2–3: Student Application Area (With Left Sidebar + Mobile Bottom Nav) */}
      <Route element={<StudentLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/create-test" element={<CreateTestPage />} />
        <Route path="/subtopics" element={<SubtopicsPage />} />
        <Route path="/test-history" element={<TestHistoryPage />} />
        <Route path="/weak-topics" element={<WeakTopicsPage />} />
        <Route path="/pyqs" element={<PyqsPage />} />
        <Route path="/saved-questions" element={<SavedQuestionsPage />} />
        <Route path="/performance" element={<PerformancePage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/test-series" element={<TestSeriesPage />} />
        <Route path="/series-result" element={<SeriesResultPage />} />
        <Route path="/series-result/:resultId" element={<SeriesResultPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
