import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  EXAMS_LIST,
  INITIAL_COUPONS,
  INITIAL_MENTORS,
  INITIAL_NOTIFICATIONS,
  INITIAL_PLANS,
  INITIAL_TEST_SERIES
} from '../data/mockData';

const AppContext = createContext(null);

function loadState(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(() =>
    loadState('prashnify_user', {
      isAuthenticated: true,
      role: 'student',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@student.in',
      phone: '+91 98301 44210',
      college: 'Jadavpur University, Kolkata',
      exam: 'GAT-B',
      attemptYear: '2027',
      level: 'Intermediate',
      dailyGoal: '2 hrs',
      focusArea: 'Timed Mocks',
      plan: '6 Months Pro',
      streak: 9,
      referralCode: 'AARAV-PRASH27'
    })
  );

  const [testSeries, setTestSeries] = useState(() => loadState('prashnify_test_series', INITIAL_TEST_SERIES));
  const [mentors, setMentors] = useState(() => loadState('prashnify_mentors', INITIAL_MENTORS));
  const [notifications, setNotifications] = useState(() => loadState('prashnify_notifications', INITIAL_NOTIFICATIONS));
  const [plans, setPlans] = useState(() => loadState('prashnify_plans', INITIAL_PLANS));
  const [coupons, setCoupons] = useState(() => loadState('prashnify_coupons', INITIAL_COUPONS));
  const [exams, setExams] = useState(() => loadState('prashnify_exams', EXAMS_LIST));

  useEffect(() => { localStorage.setItem('prashnify_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('prashnify_test_series', JSON.stringify(testSeries)); }, [testSeries]);
  useEffect(() => { localStorage.setItem('prashnify_mentors', JSON.stringify(mentors)); }, [mentors]);
  useEffect(() => { localStorage.setItem('prashnify_notifications', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { localStorage.setItem('prashnify_plans', JSON.stringify(plans)); }, [plans]);
  useEffect(() => { localStorage.setItem('prashnify_coupons', JSON.stringify(coupons)); }, [coupons]);
  useEffect(() => { localStorage.setItem('prashnify_exams', JSON.stringify(exams)); }, [exams]);

  const addNotification = (notif) => {
    setNotifications((prev) => [
      { id: `n-${Date.now()}`, read: false, time: 'Just now', ...notif },
      ...prev
    ]);
  };

  const enrollInSeries = (seriesId) => {
    setTestSeries((prev) =>
      prev.map((s) => (s.id === seriesId ? { ...s, enrolled: true } : s))
    );
  };

  return (
    <AppContext.Provider
      value={{
        user, setUser,
        testSeries, setTestSeries,
        mentors, setMentors,
        notifications, setNotifications,
        plans, setPlans,
        coupons, setCoupons,
        exams, setExams,
        addNotification,
        enrollInSeries
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
