export const EXAMS_LIST = [
  { id: 'gat-b', name: 'GAT-B', fullName: 'Graduate Aptitude Test – Biotechnology', aspirants: '18,400+', papers: 24, active: true },
  { id: 'iit-jam-bt', name: 'IIT JAM BT', fullName: 'IIT Joint Admission Test – Biotechnology', aspirants: '22,100+', papers: 30, active: true },
  { id: 'csir-net-ls', name: 'CSIR NET LS', fullName: 'CSIR UGC NET – Life Sciences', aspirants: '41,500+', papers: 36, active: true },
  { id: 'gate-xl', name: 'GATE XL', fullName: 'GATE Life Sciences', aspirants: '29,000+', papers: 28, active: true },
  { id: 'cuet-pg', name: 'CUET PG', fullName: 'CUET PG Life Sciences & Biotech', aspirants: '35,800+', papers: 20, active: true }
];

export const SUBJECTS_WITH_SUBTOPICS = [
  {
    id: 'immunology',
    name: 'Immunology',
    questionCount: 145,
    accuracy: 64,
    subtopics: [
      { id: 'imm-ab', name: 'Antibody Structure & Isotypes', count: 32, accuracy: 78, difficulty: 'Easy' },
      { id: 'imm-mhc', name: 'MHC Class I & II Antigen Presentation', count: 28, accuracy: 58, difficulty: 'Moderate' },
      { id: 'imm-hyp', name: 'Hypersensitivity (Types I–IV)', count: 24, accuracy: 52, difficulty: 'Moderate' },
      { id: 'imm-comp', name: 'Complement Pathways', count: 31, accuracy: 49, difficulty: 'Difficult' },
      { id: 'imm-vdj', name: 'V(D)J Recombination & B-Cell Maturation', count: 30, accuracy: 68, difficulty: 'Difficult' }
    ]
  },
  {
    id: 'molecular-biology',
    name: 'Molecular Biology',
    questionCount: 210,
    accuracy: 79,
    subtopics: [
      { id: 'mol-rep', name: 'DNA Replication (Prokaryotic & Eukaryotic)', count: 50, accuracy: 84, difficulty: 'Moderate' },
      { id: 'mol-trans', name: 'Transcription & RNA Processing', count: 48, accuracy: 76, difficulty: 'Moderate' },
      { id: 'mol-trsl', name: 'Translation & Genetic Code', count: 42, accuracy: 81, difficulty: 'Easy' },
      { id: 'mol-rep2', name: 'DNA Repair & Recombination', count: 36, accuracy: 69, difficulty: 'Difficult' },
      { id: 'mol-reg', name: 'Gene Regulation & Operons', count: 34, accuracy: 74, difficulty: 'Moderate' }
    ]
  },
  {
    id: 'biochemistry',
    name: 'Biochemistry',
    questionCount: 185,
    accuracy: 71,
    subtopics: [
      { id: 'bio-enz', name: 'Enzyme Kinetics & Inhibition', count: 44, accuracy: 62, difficulty: 'Moderate' },
      { id: 'bio-met', name: 'Glycolysis, TCA & Oxidative Phosphorylation', count: 52, accuracy: 79, difficulty: 'Easy' },
      { id: 'bio-aa', name: 'Amino Acids, pI & Titration Curves', count: 38, accuracy: 66, difficulty: 'Moderate' },
      { id: 'bio-prot', name: 'Protein Folding & Ramachandran Plot', count: 29, accuracy: 59, difficulty: 'Difficult' },
      { id: 'bio-nuc', name: 'Nucleotide & Lipid Metabolism', count: 22, accuracy: 75, difficulty: 'Moderate' }
    ]
  },
  {
    id: 'genetics',
    name: 'Genetics',
    questionCount: 160,
    accuracy: 58,
    subtopics: [
      { id: 'gen-mend', name: 'Mendelian Ratios & Epistasis', count: 40, accuracy: 72, difficulty: 'Easy' },
      { id: 'gen-pop', name: 'Population Genetics & Hardy-Weinberg', count: 34, accuracy: 54, difficulty: 'Moderate' },
      { id: 'gen-map', name: 'Three-Point Cross & Linkage Mapping', count: 36, accuracy: 44, difficulty: 'Difficult' },
      { id: 'gen-ped', name: 'Pedigree Analysis', count: 26, accuracy: 64, difficulty: 'Moderate' },
      { id: 'gen-mut', name: 'Chromosomal Aberrations & Mutations', count: 24, accuracy: 57, difficulty: 'Moderate' }
    ]
  },
  {
    id: 'cell-biology',
    name: 'Cell Biology',
    questionCount: 130,
    accuracy: 76,
    subtopics: [
      { id: 'cel-cyc', name: 'Cell Cycle & Checkpoints', count: 35, accuracy: 82, difficulty: 'Easy' },
      { id: 'cel-sort', name: 'Protein Sorting & Vesicular Traffic', count: 33, accuracy: 71, difficulty: 'Moderate' },
      { id: 'cel-sig', name: 'GPCR, RTK & Intracellular Signaling', count: 38, accuracy: 68, difficulty: 'Difficult' },
      { id: 'cel-cyt', name: 'Cytoskeleton & Motor Proteins', count: 24, accuracy: 80, difficulty: 'Easy' }
    ]
  }
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

export const INITIAL_TEST_HISTORY = [
  {
    id: 'res-101',
    testId: 'full-mock-7',
    title: 'Full Mock 7 — Molecular & Cell Biology Focus',
    type: 'Test Series',
    exam: 'GAT-B',
    date: '2026-11-12',
    score: 52.5,
    maxScore: 76,
    accuracy: 81,
    correctCount: 41,
    incorrectCount: 10,
    unattemptedCount: 9,
    air: 142,
    percentile: 96.4,
    countedForRank: true,
    attemptNumber: 1,
    subjectBreakdown: [
      { subject: 'Molecular Biology', score: 26, maxScore: 34, correct: 22, incorrect: 4, unattempted: 2, accuracy: 85 },
      { subject: 'Immunology', score: 9.5, maxScore: 14, correct: 7, incorrect: 3, unattempted: 2, accuracy: 70 },
      { subject: 'Biochemistry', score: 10, maxScore: 14, correct: 7, incorrect: 2, unattempted: 3, accuracy: 78 },
      { subject: 'Genetics', score: 7, maxScore: 14, correct: 5, incorrect: 1, unattempted: 2, accuracy: 83 }
    ]
  },
  {
    id: 'res-102',
    testId: 'custom-imm-01',
    title: 'Custom Test — Immunology & Genetics',
    type: 'Custom Test',
    exam: 'GAT-B',
    date: '2026-11-15',
    score: 14.25,
    maxScore: 22,
    accuracy: 73,
    correctCount: 11,
    incorrectCount: 4,
    unattemptedCount: 1,
    air: null,
    percentile: 84.2,
    countedForRank: false,
    attemptNumber: 1,
    subjectBreakdown: [
      { subject: 'Immunology', score: 7.5, maxScore: 11, correct: 6, incorrect: 2, unattempted: 0, accuracy: 75 },
      { subject: 'Genetics', score: 6.75, maxScore: 11, correct: 5, incorrect: 2, unattempted: 1, accuracy: 71 }
    ]
  },
  {
    id: 'res-103',
    testId: 'ps-dna-rep',
    title: 'DNA Replication — GAT-B Practice Set',
    type: 'Practice Set',
    exam: 'GAT-B',
    date: '2026-11-17',
    score: 48,
    maxScore: 60,
    accuracy: 88,
    correctCount: 38,
    incorrectCount: 5,
    unattemptedCount: 7,
    air: null,
    percentile: 91.0,
    countedForRank: false,
    attemptNumber: 1,
    subjectBreakdown: [
      { subject: 'Molecular Biology', score: 48, maxScore: 60, correct: 38, incorrect: 5, unattempted: 7, accuracy: 88 }
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

export const LEADERBOARD_DATA = {
  weekly: [
    { rank: 1, name: 'Sneha Iyer', exam: 'GAT-B', score: 942, accuracy: 93, streak: 19, tests: 9 },
    { rank: 2, name: 'Karan Verma', exam: 'IIT JAM BT', score: 918, accuracy: 91, streak: 14, tests: 8 },
    { rank: 3, name: 'Ritika Sen', exam: 'GAT-B', score: 895, accuracy: 89, streak: 22, tests: 8 },
    { rank: 4, name: 'Devansh Joshi', exam: 'CSIR NET LS', score: 860, accuracy: 86, streak: 11, tests: 7 },
    { rank: 5, name: 'Aarav Sharma', exam: 'GAT-B', score: 834, accuracy: 84, streak: 9, tests: 7, isCurrentUser: true },
    { rank: 6, name: 'Neha Banerjee', exam: 'GATE XL', score: 812, accuracy: 82, streak: 10, tests: 6 },
    { rank: 7, name: 'Siddharth Rao', exam: 'IIT JAM BT', score: 790, accuracy: 80, streak: 6, tests: 6 }
  ],
  monthly: [
    { rank: 1, name: 'Ritika Sen', exam: 'GAT-B', score: 3640, accuracy: 91, streak: 22, tests: 31 },
    { rank: 2, name: 'Sneha Iyer', exam: 'GAT-B', score: 3590, accuracy: 92, streak: 19, tests: 29 },
    { rank: 3, name: 'Karan Verma', exam: 'IIT JAM BT', score: 3420, accuracy: 89, streak: 14, tests: 28 },
    { rank: 4, name: 'Aarav Sharma', exam: 'GAT-B', score: 3185, accuracy: 83, streak: 9, tests: 25, isCurrentUser: true },
    { rank: 5, name: 'Neha Banerjee', exam: 'GATE XL', score: 3090, accuracy: 82, streak: 10, tests: 24 }
  ],
  allTime: [
    { rank: 1, name: 'Sneha Iyer', exam: 'GAT-B', score: 12480, accuracy: 92, streak: 19, tests: 98 },
    { rank: 2, name: 'Ritika Sen', exam: 'GAT-B', score: 11920, accuracy: 90, streak: 22, tests: 94 },
    { rank: 3, name: 'Devansh Joshi', exam: 'CSIR NET LS', score: 11340, accuracy: 87, streak: 11, tests: 89 },
    { rank: 12, name: 'Aarav Sharma', exam: 'GAT-B', score: 9420, accuracy: 82, streak: 9, tests: 71, isCurrentUser: true }
  ]
};

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
