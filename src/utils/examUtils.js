export const DEFAULT_MARKING = {
  MCQ: { marks: 1, negative: 0.25 },
  MSQ: { marks: 2, negative: 0 },
  NAT: { marks: 2, negative: 0 }
};

export function normalizeMsqAnswer(ans) {
  if (!ans) return [];
  if (Array.isArray(ans)) {
    return [...new Set(ans.map((x) => String(x).trim().toUpperCase()))].sort();
  }
  return [...new Set(String(ans).split(',').map((x) => x.trim().toUpperCase()).filter(Boolean))].sort();
}

export function isNatCorrect(userVal, correctSpec) {
  if (userVal === undefined || userVal === null || String(userVal).trim() === '') return false;
  const num = Number(String(userVal).trim());
  if (Number.isNaN(num)) return false;

  const spec = String(correctSpec).trim();
  if (spec.includes('-') && !spec.startsWith('-')) {
    const [minStr, maxStr] = spec.split('-').map((s) => s.trim());
    const min = Number(minStr);
    const max = Number(maxStr);
    if (!Number.isNaN(min) && !Number.isNaN(max)) {
      return num >= min && num <= max;
    }
  }
  const target = Number(spec);
  if (Number.isNaN(target)) return false;
  return Math.abs(num - target) <= 0.01;
}

export function evaluateQuestion(question, userAnswer, scheme = DEFAULT_MARKING) {
  const type = question.questionType || 'MCQ';
  const rules = scheme[type] || DEFAULT_MARKING[type] || DEFAULT_MARKING.MCQ;
  const marks = question.marks !== undefined ? Number(question.marks) : rules.marks;
  const negative = type === 'MCQ'
    ? (question.negativeMarks !== undefined ? Number(question.negativeMarks) : rules.negative)
    : 0; // MSQ and NAT have no negative marks

  const isEmpty =
    userAnswer === undefined ||
    userAnswer === null ||
    (Array.isArray(userAnswer) && userAnswer.length === 0) ||
    (!Array.isArray(userAnswer) && String(userAnswer).trim() === '');

  if (isEmpty) {
    return { status: 'unattempted', score: 0, maxMarks: marks };
  }

  if (type === 'MCQ') {
    const isCorrect = String(userAnswer).trim().toUpperCase() === String(question.correctAnswer).trim().toUpperCase();
    return {
      status: isCorrect ? 'correct' : 'incorrect',
      score: isCorrect ? marks : -Math.abs(negative),
      maxMarks: marks
    };
  }

  if (type === 'MSQ') {
    const userSet = normalizeMsqAnswer(userAnswer);
    const correctSet = normalizeMsqAnswer(question.correctAnswer);
    const isExact =
      userSet.length === correctSet.length &&
      userSet.every((val, idx) => val === correctSet[idx]);
    // MSQ: +2 only when ALL correct options are selected, no partial or negative marks
    return {
      status: isExact ? 'correct' : 'incorrect',
      score: isExact ? marks : 0,
      maxMarks: marks
    };
  }

  // NAT: +2, no negative marks
  const natCorrect = isNatCorrect(userAnswer, question.correctAnswer);
  return {
    status: natCorrect ? 'correct' : 'incorrect',
    score: natCorrect ? marks : 0,
    maxMarks: marks
  };
}

export function evaluateExamSubmission(questions, answers, scheme = DEFAULT_MARKING) {
  let totalScore = 0;
  let maxScore = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;
  const subjectMap = {};
  const questionResults = [];

  questions.forEach((q) => {
    const evalRes = evaluateQuestion(q, answers[q.id], scheme);
    totalScore += evalRes.score;
    maxScore += evalRes.maxMarks;

    if (evalRes.status === 'correct') correctCount += 1;
    else if (evalRes.status === 'incorrect') incorrectCount += 1;
    else unattemptedCount += 1;

    const subject = q.subject || q.topic || 'General';
    if (!subjectMap[subject]) {
      subjectMap[subject] = {
        subject,
        total: 0,
        correct: 0,
        incorrect: 0,
        unattempted: 0,
        score: 0,
        maxScore: 0
      };
    }
    subjectMap[subject].total += 1;
    subjectMap[subject].score += evalRes.score;
    subjectMap[subject].maxScore += evalRes.maxMarks;
    subjectMap[subject][evalRes.status] += 1;

    questionResults.push({
      questionId: q.id,
      userAnswer: answers[q.id],
      ...evalRes
    });
  });

  const attempted = correctCount + incorrectCount;
  const accuracy = attempted > 0 ? Math.round((correctCount / attempted) * 100) : 0;
  const pct = maxScore > 0 ? Math.max(0, Math.min(100, (totalScore / maxScore) * 100)) : 0;
  const percentile = Number(Math.min(99.9, Math.max(12, pct * 0.94 + 8)).toFixed(1));
  const air = Math.max(1, Math.round((100 - percentile) * 48));

  const subjectBreakdown = Object.values(subjectMap).map((s) => ({
    ...s,
    score: Number(s.score.toFixed(2)),
    accuracy: s.correct + s.incorrect > 0 ? Math.round((s.correct / (s.correct + s.incorrect)) * 100) : 0
  }));

  return {
    totalScore: Number(totalScore.toFixed(2)),
    maxScore: Number(maxScore.toFixed(2)),
    correctCount,
    incorrectCount,
    unattemptedCount,
    accuracy,
    percentile,
    air,
    subjectBreakdown,
    questionResults
  };
}

export function formatTimeMMSS(totalSeconds) {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const hrs = Math.floor(safe / 3600);
  const mins = Math.floor((safe % 3600) / 60);
  const secs = safe % 60;
  const pad = (n) => String(n).padStart(2, '0');
  if (hrs > 0) return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  return `${pad(mins)}:${pad(secs)}`;
}
