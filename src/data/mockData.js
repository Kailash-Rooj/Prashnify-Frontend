export const EXAMS_LIST = [
  { id: 'gat-b', name: 'GAT-B', fullName: 'Graduate Aptitude Test – Biotechnology', aspirants: '18,400+', papers: 24, active: true },
  { id: 'iit-jam-bt', name: 'IIT JAM BT', fullName: 'IIT Joint Admission Test – Biotechnology', aspirants: '22,100+', papers: 30, active: true },
  { id: 'csir-net-ls', name: 'CSIR NET LS', fullName: 'CSIR UGC NET – Life Sciences', aspirants: '41,500+', papers: 36, active: true },
  { id: 'gate-xl', name: 'GATE XL', fullName: 'GATE Life Sciences', aspirants: '29,000+', papers: 28, active: true },
  { id: 'cuet-pg', name: 'CUET PG', fullName: 'CUET PG Life Sciences & Biotech', aspirants: '35,800+', papers: 20, active: true }
];

export const INITIAL_TEST_SERIES = [
  {
    id: 'ts-gatb-2027',
    title: 'GAT-B 2027 All-India Mock Test Series',
    exam: 'GAT-B',
    price: 799,
    enrolled: true,
    totalTests: 10,
    completedTests: 7,
    aspirantsEnrolled: 4820,
    description: 'Full-length national mocks following the exact GAT-B section blueprint with MCQ, MSQ, and NAT questions.',
    tests: [
      {
        id: 'full-mock-8',
        name: 'Full Mock 8 — National Live Test',
        status: 'Live Now',
        liveWindow: 'Nov 18 – Nov 22, 2026',
        durationMinutes: 90,
        questionCount: 60,
        sections: ['Molecular Biology', 'Immunology', 'Biochemistry', 'Genetics', 'Cell Biology', 'Microbiology'],
        marking: { MCQ: { marks: 1, negative: 0.25 }, MSQ: { marks: 2, negative: 0 }, NAT: { marks: 2, negative: 0 } },
        attemptsUsed: 0
      },
      {
        id: 'full-mock-7',
        name: 'Full Mock 7 — Molecular & Cell Biology Focus',
        status: 'Completed',
        liveWindow: 'Nov 10 – Nov 14, 2026',
        durationMinutes: 90,
        questionCount: 60,
        sections: ['Molecular Biology', 'Cell Biology', 'Biochemistry'],
        marking: { MCQ: { marks: 1, negative: 0.25 }, MSQ: { marks: 2, negative: 0 }, NAT: { marks: 2, negative: 0 } },
        attemptsUsed: 1
      },
      {
        id: 'full-mock-9',
        name: 'Full Mock 9 — Grand Revision Paper',
        status: 'Upcoming',
        liveWindow: 'Nov 28 – Dec 2, 2026',
        durationMinutes: 90,
        questionCount: 60,
        sections: ['All Subjects'],
        marking: { MCQ: { marks: 1, negative: 0.25 }, MSQ: { marks: 2, negative: 0 }, NAT: { marks: 2, negative: 0 } },
        attemptsUsed: 0
      }
    ]
  },
  {
    id: 'ts-jam-bt-2027',
    title: 'IIT JAM Biotechnology 2027 Ranker Series',
    exam: 'IIT JAM BT',
    price: 999,
    enrolled: false,
    totalTests: 12,
    completedTests: 0,
    aspirantsEnrolled: 6150,
    description: '12 scheduled mocks calibrated to IIT JAM BT difficulty with NAT calculator drills and AIR leaderboards.',
    tests: [
      {
        id: 'jam-mock-1',
        name: 'IIT JAM BT Mock 1 — Foundation',
        status: 'Live Now',
        liveWindow: 'Nov 17 – Nov 24, 2026',
        durationMinutes: 120,
        questionCount: 60,
        sections: ['Biology', 'Biochemistry', 'Genetics'],
        marking: { MCQ: { marks: 1, negative: 0.25 }, MSQ: { marks: 2, negative: 0 }, NAT: { marks: 2, negative: 0 } },
        attemptsUsed: 0
      }
    ]
  },
  {
    id: 'ts-csir-2027',
    title: 'CSIR NET Life Sciences Part B & C Series',
    exam: 'CSIR NET LS',
    price: 1199,
    enrolled: false,
    totalTests: 8,
    completedTests: 0,
    aspirantsEnrolled: 3940,
    description: 'Experimental and analytical questions designed for CSIR NET JRF qualification.',
    tests: [
      {
        id: 'csir-mock-1',
        name: 'CSIR NET Unit 1–4 Cumulative Test',
        status: 'Upcoming',
        liveWindow: 'Dec 1 – Dec 5, 2026',
        durationMinutes: 120,
        questionCount: 60,
        sections: ['Molecular Biology', 'Cell Biology', 'Immunology'],
        marking: { MCQ: { marks: 2, negative: 0.5 }, MSQ: { marks: 2, negative: 0 }, NAT: { marks: 2, negative: 0 } },
        attemptsUsed: 0
      }
    ]
  }
];

export const INITIAL_MENTORS = [
  {
    id: 'm-ananya',
    name: 'Dr. Ananya Deshmukh',
    initials: 'AD',
    rank: 'AIR 4 — GAT-B & IIT JAM BT',
    institute: 'IISc Bengaluru (PhD Scholar)',
    exams: ['GAT-B', 'IIT JAM BT', 'CSIR NET LS'],
    specialties: ['Molecular Biology', 'Immunology', 'Exam Strategy'],
    rating: 4.9,
    sessionsCompleted: 148,
    oneOnOnePrice: 299,
    groupPrice: 99,
    bio: 'Mentoring Life Sciences aspirants for 4+ years with structured weekly revision targets and paper-solving frameworks.',
    availableSlots: ['Mon 7:00 PM', 'Wed 8:00 PM', 'Fri 6:30 PM', 'Sat 11:00 AM', 'Sun 5:00 PM'],
    status: 'Active',
    verified: true
  },
  {
    id: 'm-rohan',
    name: 'Rohan Kulkarni',
    initials: 'RK',
    rank: 'AIR 11 — IIT JAM BT',
    institute: 'IIT Bombay (M.Sc. Biotechnology)',
    exams: ['IIT JAM BT', 'GATE XL', 'GAT-B'],
    specialties: ['Biochemistry', 'Enzyme Kinetics', 'NAT Numericals'],
    rating: 4.8,
    sessionsCompleted: 112,
    oneOnOnePrice: 299,
    groupPrice: 99,
    bio: 'Specializes in turning quantitative biochemistry, Hardy-Weinberg, and NAT numericals into guaranteed scoring areas.',
    availableSlots: ['Tue 7:30 PM', 'Thu 8:00 PM', 'Sat 4:00 PM', 'Sun 10:30 AM'],
    status: 'Active',
    verified: true
  },
  {
    id: 'm-meera',
    name: 'Meera Nair',
    initials: 'MN',
    rank: 'AIR 7 — CSIR NET JRF',
    institute: 'NCBS Bengaluru',
    exams: ['CSIR NET LS', 'GATE XL', 'CUET PG'],
    specialties: ['Genetics', 'Cell Signaling', 'Part C Experimental Qs'],
    rating: 4.95,
    sessionsCompleted: 96,
    oneOnOnePrice: 299,
    groupPrice: 99,
    bio: 'Helps students decode experimental graphs, pedigree analysis, and three-point mapping under timed pressure.',
    availableSlots: ['Mon 8:30 PM', 'Thu 7:00 PM', 'Sat 6:00 PM'],
    status: 'Active',
    verified: true
  }
];

export const INITIAL_NOTIFICATIONS = [
  { id: 'n-1', category: 'Mentorship', title: 'Mentor Request Accepted!', message: 'Dr. Ananya Deshmukh accepted your 1-on-1 session for Fri 6:30 PM. Complete ₹299 payment to confirm.', time: '25m ago', read: false, link: '/request-status' },
  { id: 'n-2', category: 'Tests', title: 'Full Mock 8 is Live Now', message: 'Attempt Full Mock 8 before Nov 22 to qualify for All-India Rank on your first attempt.', time: '2h ago', read: false, link: '/test-series' },
  { id: 'n-3', category: 'Mentorship', title: 'Group Batch Reached 5 Students', message: 'IIT JAM BT Numericals Group is full (5/5). Complete your monthly payment to unlock session links.', time: '5h ago', read: false, link: '/mentorship-payment?mode=group&id=grp-jam-num' },
  { id: 'n-4', category: 'Rewards', title: '7-Day Study Streak Badge Unlocked', message: 'You solved questions for 7 consecutive days. Keep your momentum going!', time: '1d ago', read: true, link: '/profile' }
];

export const INITIAL_PLANS = [
  { id: 'plan-1m', name: '1 Month Starter', months: 1, price: 499, originalPrice: 699, badge: 'Flexible', features: ['Unlimited Custom Tests & PYQs', 'All Practice Sets with Explanations', 'Full Analytics & Weak Topic Radar', '2 Live Test Series Mocks'] },
  { id: 'plan-6m', name: '6 Months Pro', months: 6, price: 2199, originalPrice: 2994, badge: 'Most Popular', features: ['Everything in 1 Month Starter', 'All-India Test Series Access (All Exams)', 'Priority 1-on-1 Mentor Slot Alerts', 'Detailed AIR & Percentile Reports'] },
  { id: 'plan-12m', name: '12 Months Ranker', months: 12, price: 3599, originalPrice: 5988, badge: 'Best Value · Save 40%', features: ['Everything in 6 Months Pro', '1 Free 1-on-1 Strategy Session (₹299 value)', 'Full Year Live Mock Calendar', 'Downloadable Performance Summaries'] }
];

export const INITIAL_COUPONS = [
  { code: 'PRASH20', discountType: 'percent', value: 20, active: true, uses: 312 },
  { code: 'GATB100', discountType: 'flat', value: 100, active: true, uses: 145 },
  { code: 'CAMPUS15', discountType: 'percent', value: 15, active: true, uses: 89 }
];
