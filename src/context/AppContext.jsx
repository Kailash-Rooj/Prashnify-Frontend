import React, { createContext, useContext, useEffect, useState } from 'react';
import { INITIAL_QUESTION_BANK } from '../data/mockQuestions';
import {
  EXAMS_LIST,
  INITIAL_BLOGS,
  INITIAL_COUPONS,
  INITIAL_GROUP_BATCHES,
  INITIAL_MENTOR_REQUESTS,
  INITIAL_MENTORS,
  INITIAL_NOTIFICATIONS,
  INITIAL_PAYOUTS,
  INITIAL_PENDING_MENTORS,
  INITIAL_PLANS,
  INITIAL_REFUNDS,
  INITIAL_STUDENTS_ADMIN,
  INITIAL_SUPPORT_TICKETS,
  INITIAL_TEST_HISTORY,
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

  const [questions, setQuestions] = useState(() => loadState('prashnify_questions', INITIAL_QUESTION_BANK));
  const [testSeries, setTestSeries] = useState(() => loadState('prashnify_test_series', INITIAL_TEST_SERIES));
  const [testHistory, setTestHistory] = useState(() => loadState('prashnify_test_history', INITIAL_TEST_HISTORY));
  const [savedQuestions, setSavedQuestions] = useState(() =>
    loadState('prashnify_saved_questions', [
      { questionId: 'GATB-DNA-001', note: 'Remember DnaA binds 9-mer repeats; DnaB is the helicase.' },
      { questionId: 'IMM-003', note: 'MSQ trap: Type I is IgE mediated, not CD8+ T cells.' },
      { questionId: 'BIO-001', note: 'Competitive inhibitor -> Km up, Vmax same.' }
    ])
  );
  
  const [mentors, setMentors] = useState(() => loadState('prashnify_mentors', INITIAL_MENTORS));
  const [groupBatches, setGroupBatches] = useState(() => loadState('prashnify_groups', INITIAL_GROUP_BATCHES));
  const [mentorRequests, setMentorRequests] = useState(() => loadState('prashnify_mentor_requests', INITIAL_MENTOR_REQUESTS));
  const [notifications, setNotifications] = useState(() => loadState('prashnify_notifications', INITIAL_NOTIFICATIONS));
  const [blogs, setBlogs] = useState(() => loadState('prashnify_blogs', INITIAL_BLOGS));
  const [plans, setPlans] = useState(() => loadState('prashnify_plans', INITIAL_PLANS));
  const [coupons, setCoupons] = useState(() => loadState('prashnify_coupons', INITIAL_COUPONS));
  const [studentsAdmin, setStudentsAdmin] = useState(() => loadState('prashnify_students_admin', INITIAL_STUDENTS_ADMIN));
  const [pendingMentors, setPendingMentors] = useState(() => loadState('prashnify_pending_mentors', INITIAL_PENDING_MENTORS));
  const [payouts, setPayouts] = useState(() => loadState('prashnify_payouts', INITIAL_PAYOUTS));
  const [refunds, setRefunds] = useState(() => loadState('prashnify_refunds', INITIAL_REFUNDS));
  const [supportTickets, setSupportTickets] = useState(() => loadState('prashnify_support_tickets', INITIAL_SUPPORT_TICKETS));
  const [exams, setExams] = useState(() => loadState('prashnify_exams', EXAMS_LIST));
  const [activeExamConfig, setActiveExamConfig] = useState(() => loadState('prashnify_active_exam', null));
  const [activityLog, setActivityLog] = useState(() =>
    loadState('prashnify_activity_log', [
      { id: 'log-1', actor: 'Super Admin', action: 'Published Full Mock 8 live window', time: '2026-11-18 10:15 AM' },
      { id: 'log-2', actor: 'Content Manager', action: 'Verified 50 DNA Replication GAT-B questions', time: '2026-11-17 04:40 PM' }
    ])
  );

  useEffect(() => { localStorage.setItem('prashnify_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('prashnify_questions', JSON.stringify(questions)); }, [questions]);
  useEffect(() => { localStorage.setItem('prashnify_test_series', JSON.stringify(testSeries)); }, [testSeries]);
  useEffect(() => { localStorage.setItem('prashnify_test_history', JSON.stringify(testHistory)); }, [testHistory]);
  useEffect(() => { localStorage.setItem('prashnify_saved_questions', JSON.stringify(savedQuestions)); }, [savedQuestions]);
  useEffect(() => { localStorage.setItem('prashnify_mentors', JSON.stringify(mentors)); }, [mentors]);
  useEffect(() => { localStorage.setItem('prashnify_groups', JSON.stringify(groupBatches)); }, [groupBatches]);
  useEffect(() => { localStorage.setItem('prashnify_mentor_requests', JSON.stringify(mentorRequests)); }, [mentorRequests]);
  useEffect(() => { localStorage.setItem('prashnify_notifications', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { localStorage.setItem('prashnify_blogs', JSON.stringify(blogs)); }, [blogs]);
  useEffect(() => { localStorage.setItem('prashnify_plans', JSON.stringify(plans)); }, [plans]);
  useEffect(() => { localStorage.setItem('prashnify_coupons', JSON.stringify(coupons)); }, [coupons]);
  useEffect(() => { localStorage.setItem('prashnify_students_admin', JSON.stringify(studentsAdmin)); }, [studentsAdmin]);
  useEffect(() => { localStorage.setItem('prashnify_pending_mentors', JSON.stringify(pendingMentors)); }, [pendingMentors]);
  useEffect(() => { localStorage.setItem('prashnify_payouts', JSON.stringify(payouts)); }, [payouts]);
  useEffect(() => { localStorage.setItem('prashnify_refunds', JSON.stringify(refunds)); }, [refunds]);
  useEffect(() => { localStorage.setItem('prashnify_support_tickets', JSON.stringify(supportTickets)); }, [supportTickets]);
  useEffect(() => { localStorage.setItem('prashnify_exams', JSON.stringify(exams)); }, [exams]);
  useEffect(() => { localStorage.setItem('prashnify_active_exam', JSON.stringify(activeExamConfig)); }, [activeExamConfig]);
  useEffect(() => { localStorage.setItem('prashnify_activity_log', JSON.stringify(activityLog)); }, [activityLog]);

  const addNotification = (notif) => {
    setNotifications((prev) => [
      { id: `n-${Date.now()}`, read: false, time: 'Just now', ...notif },
      ...prev
    ]);
  };

  const logAdminAction = (actor, action) => {
    setActivityLog((prev) => [
      { id: `log-${Date.now()}`, actor, action, time: new Date().toLocaleString() },
      ...prev
    ]);
  };

  const toggleBookmark = (questionId) => {
    setSavedQuestions((prev) => {
      const exists = prev.some((item) => item.questionId === questionId);
      if (exists) return prev.filter((item) => item.questionId !== questionId);
      return [{ questionId, note: '' }, ...prev];
    });
  };

  const updateBookmarkNote = (questionId, note) => {
    setSavedQuestions((prev) =>
      prev.map((item) => (item.questionId === questionId ? { ...item, note } : item))
    );
  };

  const recordTestResult = (resultObj) => {
    setTestHistory((prev) => [resultObj, ...prev]);
    if (resultObj.seriesId && resultObj.testId) {
      setTestSeries((prev) =>
        prev.map((series) => {
          if (series.id !== resultObj.seriesId) return series;
          return {
            ...series,
            tests: series.tests.map((t) =>
              t.id === resultObj.testId
                ? { ...t, status: 'Completed', attemptsUsed: (t.attemptsUsed || 0) + 1 }
                : t
            )
          };
        })
      );
    }
  };

  const enrollInSeries = (seriesId) => {
    setTestSeries((prev) =>
      prev.map((s) => (s.id === seriesId ? { ...s, enrolled: true } : s))
    );
  };

  const createMentorRequest = (req) => {
    const newReq = {
      id: `req-${Date.now().toString().slice(-4)}`,
      studentName: user.name,
      status: 'Waiting',
      paid: false,
      amount: 299,
      createdAt: new Date().toISOString().slice(0, 10),
      ...req
    };
    setMentorRequests((prev) => [newReq, ...prev]);
    addNotification({
      category: 'Mentorship',
      title: '1-on-1 Request Sent',
      message: `Your request to ${req.mentorName} for ${req.day} at ${req.time} is awaiting mentor confirmation. No payment is charged until accepted.`,
      link: '/request-status'
    });
    return newReq;
  };

  const updateMentorRequestStatus = (reqId, status) => {
    setMentorRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status } : r))
    );
    const target = mentorRequests.find((r) => r.id === reqId);
    if (target) {
      addNotification({
        category: 'Mentorship',
        title: `Mentorship Request ${status}`,
        message:
          status === 'Accepted'
            ? `${target.mentorName} accepted your session (${target.day}, ${target.time}). Complete ₹299 payment to confirm.`
            : `${target.mentorName} could not accept ${target.day}, ${target.time}. Choose another available slot.`,
        link: '/request-status'
      });
    }
  };

  const markMentorRequestPaid = (reqId) => {
    setMentorRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, paid: true } : r))
    );
  };

  const joinGroupBatch = (groupId) => {
    setGroupBatches((prev) =>
      prev.map((g) => {
        if (g.id !== groupId || g.userJoined) return g;
        const nextCount = Math.min(g.maxStudents, g.joinedStudents + 1);
        const reached = nextCount >= g.minStudents;
        return {
          ...g,
          joinedStudents: nextCount,
          userJoined: true,
          status: reached ? `Ready to Start (${nextCount}/${g.minStudents})` : `Filling (${nextCount}/${g.minStudents})`
        };
      })
    );
  };

  const markGroupPaid = (groupId) => {
    setGroupBatches((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, userPaid: true } : g))
    );
  };

  const createSupportTicket = (ticket) => {
    const newTicket = {
      id: `TKT-${Math.floor(2050 + Math.random() * 8900)}`,
      status: 'Open',
      createdAt: new Date().toISOString().slice(0, 10),
      replies: [],
      ...ticket
    };
    setSupportTickets((prev) => [newTicket, ...prev]);
    return newTicket;
  };

  return (
    <AppContext.Provider
      value={{
        user, setUser,
        questions, setQuestions,
        testSeries, setTestSeries,
        testHistory, setTestHistory,
        savedQuestions, setSavedQuestions,
        mentors, setMentors,
        groupBatches, setGroupBatches,
        mentorRequests, setMentorRequests,
        notifications, setNotifications,
        blogs, setBlogs,
        plans, setPlans,
        coupons, setCoupons,
        studentsAdmin, setStudentsAdmin,
        pendingMentors, setPendingMentors,
        payouts, setPayouts,
        refunds, setRefunds,
        supportTickets, setSupportTickets,
        exams, setExams,
        activeExamConfig, setActiveExamConfig,
        activityLog, logAdminAction,
        addNotification,
        toggleBookmark, updateBookmarkNote,
        recordTestResult, enrollInSeries,
        createMentorRequest, updateMentorRequestStatus, markMentorRequestPaid,
        joinGroupBatch, markGroupPaid,
        createSupportTicket
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
