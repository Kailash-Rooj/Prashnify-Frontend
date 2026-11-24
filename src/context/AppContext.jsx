import React, { createContext, useContext, useEffect, useState } from 'react';
import { INITIAL_QUESTION_BANK } from '../data/mockQuestions';
import {
  EXAMS_LIST,
  INITIAL_COUPONS,
  INITIAL_MENTORS,
  INITIAL_PLANS,
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
  const [mentors] = useState(() => loadState('prashnify_mentors', INITIAL_MENTORS));
  const [plans] = useState(() => loadState('prashnify_plans', INITIAL_PLANS));
  const [coupons] = useState(() => loadState('prashnify_coupons', INITIAL_COUPONS));
  const [exams] = useState(() => loadState('prashnify_exams', EXAMS_LIST));
  const [activeExamConfig, setActiveExamConfig] = useState(() => loadState('prashnify_active_exam', null));

  useEffect(() => { localStorage.setItem('prashnify_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('prashnify_questions', JSON.stringify(questions)); }, [questions]);
  useEffect(() => { localStorage.setItem('prashnify_test_series', JSON.stringify(testSeries)); }, [testSeries]);
  useEffect(() => { localStorage.setItem('prashnify_test_history', JSON.stringify(testHistory)); }, [testHistory]);
  useEffect(() => { localStorage.setItem('prashnify_saved_questions', JSON.stringify(savedQuestions)); }, [savedQuestions]);
  useEffect(() => { localStorage.setItem('prashnify_active_exam', JSON.stringify(activeExamConfig)); }, [activeExamConfig]);

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

  return (
    <AppContext.Provider
      value={{
        user, setUser,
        questions, setQuestions,
        testSeries, setTestSeries,
        testHistory, setTestHistory,
        savedQuestions, setSavedQuestions,
        mentors,
        plans,
        coupons,
        exams,
        activeExamConfig, setActiveExamConfig,
        toggleBookmark, updateBookmarkNote,
        recordTestResult, enrollInSeries
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
