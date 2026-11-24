export const REQUIRED_UPLOAD_COLUMNS = [
  'Question ID',
  'Exam',
  'Paper Code',
  'Year',
  'Topic',
  'Sub-topic',
  'Micro-concept',
  'Question Type',
  'Difficulty',
  'Question',
  'Option A',
  'Option B',
  'Option C',
  'Option D',
  'Correct Answer',
  'Marks',
  'Negative Marks',
  'Explanation'
];

const VALID_TYPES = ['MCQ', 'MSQ', 'NAT'];
const VALID_DIFFICULTIES = ['Easy', 'Moderate', 'Difficult'];
const VALID_OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export function parseCsvText(csvText) {
  const rows = [];
  let current = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i += 1) {
    const ch = csvText[i];
    const next = csvText[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        cell += '"';
        i += 1;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cell += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      current.push(cell.trim());
      cell = '';
    } else if (ch === '\r' && next === '\n') {
      current.push(cell.trim());
      if (current.some((c) => c !== '')) rows.push(current);
      current = [];
      cell = '';
      i += 1;
    } else if (ch === '\n' || ch === '\r') {
      current.push(cell.trim());
      if (current.some((c) => c !== '')) rows.push(current);
      current = [];
      cell = '';
    } else {
      cell += ch;
    }
  }
  if (cell.length > 0 || current.length > 0) {
    current.push(cell.trim());
    if (current.some((c) => c !== '')) rows.push(current);
  }

  if (rows.length === 0) return { headers: [], records: [] };
  const headers = rows[0].map((h) => h.replace(/^\uFEFF/, '').trim());
  const records = rows.slice(1).map((cols) => {
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = cols[idx] !== undefined ? cols[idx] : '';
    });
    return obj;
  });
  return { headers, records };
}

export function validateQuestionRows(headers, records, existingIds = []) {
  const errors = [];
  const warnings = [];
  const validQuestions = [];

  const missingColumns = REQUIRED_UPLOAD_COLUMNS.filter((col) => !headers.includes(col));
  if (missingColumns.length > 0) {
    errors.push({
      row: 1,
      field: 'Header',
      message: `Missing required columns: ${missingColumns.join(', ')}`
    });
    return { errors, warnings, validQuestions, missingColumns };
  }

  const seenIds = new Set(existingIds.map((id) => String(id).trim().toUpperCase()));
  const seenQuestions = new Set();

  records.forEach((rec, index) => {
    const rowNum = index + 2; // 1-based including header row
    const rowErrors = [];

    const qId = String(rec['Question ID'] || '').trim();
    const exam = String(rec['Exam'] || '').trim();
    const paperCode = String(rec['Paper Code'] || '').trim();
    const year = String(rec['Year'] || '').trim();
    const topic = String(rec['Topic'] || '').trim();
    const subTopic = String(rec['Sub-topic'] || '').trim();
    const microConcept = String(rec['Micro-concept'] || '').trim();
    const qType = String(rec['Question Type'] || '').trim().toUpperCase();
    const difficulty = String(rec['Difficulty'] || '').trim();
    const questionText = String(rec['Question'] || '').trim();
    const optA = String(rec['Option A'] || '').trim();
    const optB = String(rec['Option B'] || '').trim();
    const optC = String(rec['Option C'] || '').trim();
    const optD = String(rec['Option D'] || '').trim();
    const correctAns = String(rec['Correct Answer'] || '').trim();
    const marksRaw = String(rec['Marks'] || '').trim();
    const negRaw = String(rec['Negative Marks'] || '').trim();
    const explanation = String(rec['Explanation'] || '').trim();

    if (!qId) {
      rowErrors.push({ row: rowNum, field: 'Question ID', message: 'Question ID is required.' });
    } else if (seenIds.has(qId.toUpperCase())) {
      rowErrors.push({ row: rowNum, field: 'Question ID', message: `Duplicate Question ID "${qId}".` });
    } else {
      seenIds.add(qId.toUpperCase());
    }

    if (!questionText) {
      rowErrors.push({ row: rowNum, field: 'Question', message: 'Question text cannot be empty.' });
    } else {
      const normalizedQ = questionText.toLowerCase().replace(/\s+/g, ' ');
      if (seenQuestions.has(normalizedQ)) {
        warnings.push({ row: rowNum, field: 'Question', message: 'Duplicate question text detected in file.' });
      }
      seenQuestions.add(normalizedQ);
    }

    if (!VALID_TYPES.includes(qType)) {
      rowErrors.push({ row: rowNum, field: 'Question Type', message: `Invalid Question Type "${rec['Question Type']}". Use MCQ, MSQ, or NAT.` });
    }

    if (!VALID_DIFFICULTIES.includes(difficulty)) {
      rowErrors.push({ row: rowNum, field: 'Difficulty', message: `Invalid Difficulty "${difficulty}". Use Easy, Moderate, or Difficult.` });
    }

    if (qType === 'MCQ' || qType === 'MSQ') {
      if (!optA || !optB || !optC || !optD) {
        rowErrors.push({ row: rowNum, field: 'Options', message: `${qType} requires non-empty Option A, B, C, and D.` });
      }
    }

    if (qType === 'MCQ') {
      if (!VALID_OPTION_LETTERS.includes(correctAns.toUpperCase())) {
        rowErrors.push({ row: rowNum, field: 'Correct Answer', message: `MCQ Correct Answer must be a single letter (A, B, C, or D). Got "${correctAns}".` });
      }
    } else if (qType === 'MSQ') {
      const parts = correctAns.split(',').map((p) => p.trim().toUpperCase()).filter(Boolean);
      const allValid = parts.length >= 1 && parts.every((p) => VALID_OPTION_LETTERS.includes(p));
      if (!allValid) {
        rowErrors.push({ row: rowNum, field: 'Correct Answer', message: `MSQ Correct Answer must be comma-separated letters like A,C. Got "${correctAns}".` });
      }
    } else if (qType === 'NAT') {
      if (optA || optB || optC || optD) {
        rowErrors.push({ row: rowNum, field: 'Options', message: 'NAT questions must have empty Option A–D columns.' });
      }
      const isRange = /^-?\d+(\.\d+)?\s*-\s*-?\d+(\.\d+)?$/.test(correctAns);
      const isNum = correctAns !== '' && !Number.isNaN(Number(correctAns));
      if (!isRange && !isNum) {
        rowErrors.push({ row: rowNum, field: 'Correct Answer', message: `NAT Correct Answer must be a number or range (e.g. 2.5-3). Got "${correctAns}".` });
      }
    }

    const marks = Number(marksRaw);
    const neg = Number(negRaw === '' ? 0 : negRaw);
    if (marksRaw === '' || Number.isNaN(marks) || marks <= 0) {
      rowErrors.push({ row: rowNum, field: 'Marks', message: `Invalid Marks "${marksRaw}". Must be a positive number.` });
    }
    if (Number.isNaN(neg) || neg < 0) {
      rowErrors.push({ row: rowNum, field: 'Negative Marks', message: `Invalid Negative Marks "${negRaw}". Must be 0 or a positive deduction value.` });
    } else {
      if ((qType === 'MSQ' || qType === 'NAT') && neg > 0) {
        warnings.push({ row: rowNum, field: 'Negative Marks', message: `Unusual negative marking (${neg}) on ${qType} question (standard is 0).` });
      } else if (qType === 'MCQ' && !Number.isNaN(marks) && neg > marks) {
        warnings.push({ row: rowNum, field: 'Negative Marks', message: `Unusual negative marking (${neg}) exceeds positive marks (${marks}).` });
      }
    }

    if (!explanation) {
      warnings.push({ row: rowNum, field: 'Explanation', message: 'Missing explanation for student review.' });
    }

    if (rowErrors.length > 0) {
      errors.push(...rowErrors);
    } else {
      validQuestions.push({
        id: qId,
        exam: exam || 'GAT-B',
        paperCode: paperCode || 'GATB-2025',
        year: Number(year) || 2025,
        subject: topic === 'DNA Replication' ? 'Molecular Biology' : (topic || 'General'),
        topic: topic || 'DNA Replication',
        subTopic: subTopic || 'Core Concepts',
        microConcept: microConcept || 'General Mechanism',
        questionType: qType,
        difficulty,
        question: questionText,
        options: qType === 'NAT' ? [] : [
          { key: 'A', text: optA },
          { key: 'B', text: optB },
          { key: 'C', text: optC },
          { key: 'D', text: optD }
        ],
        correctAnswer: qType === 'NAT' ? correctAns : correctAns.toUpperCase(),
        marks,
        negativeMarks: neg,
        explanation
      });
    }
  });

  return { errors, warnings, validQuestions, missingColumns: [] };
}

export function generateDnaReplication50SampleRows() {
  const concepts = [
    { sub: 'Prokaryotic Replication', micro: 'OriC & DnaA binding', q: 'Which initiator protein binds to 9-mer repeats at OriC in E. coli to initiate DNA unwinding?', opts: ['DnaA', 'DnaB', 'DnaC', 'DnaG'], ans: 'A', exp: 'DnaA-ATP binds to 9-mer DnaA boxes at OriC, causing melting of the adjacent AT-rich 13-mer region.' },
    { sub: 'Enzymes of Replication', micro: 'DNA Polymerase III holoenzyme', q: 'Which subunit of E. coli DNA Polymerase III confers high processivity by forming a sliding clamp?', opts: ['Alpha subunit', 'Beta clamp', 'Epsilon subunit', 'Gamma complex'], ans: 'B', exp: 'The homodimeric beta-clamp encircles duplex DNA and tethers Pol III core for high processivity.' },
    { sub: 'Enzymes of Replication', micro: 'Proofreading activity', q: 'The 3\' to 5\' exonuclease proofreading activity of E. coli DNA Polymerase III resides in which subunit?', opts: ['Alpha (dnaE)', 'Epsilon (dnaQ)', 'Theta (holE)', 'Tau (dnaX)'], ans: 'B', exp: 'The epsilon subunit encoded by dnaQ performs 3\' to 5\' exonuclease proofreading.' },
    { sub: 'Leading & Lagging Strand', micro: 'Okazaki fragments', q: 'RNA primers on the lagging strand in E. coli are primarily removed by which enzyme activity?', opts: ['5\' to 3\' exonuclease of DNA Pol I', '3\' to 5\' exonuclease of DNA Pol III', 'DNA ligase', 'Topoisomerase II'], ans: 'A', exp: 'DNA Polymerase I removes RNA primers via its 5\' to 3\' exonuclease activity while filling gaps.' },
    { sub: 'Topoisomerases', micro: 'DNA Gyrase', q: 'Which topoisomerase introduces negative supercoils ahead of the replication fork in bacteria?', opts: ['Topoisomerase I', 'DNA Gyrase (Topoisomerase II)', 'Helicase DnaB', 'RNase H'], ans: 'B', exp: 'DNA Gyrase relieves positive supercoiling by introducing ATP-dependent negative supercoils.' },
    { sub: 'Eukaryotic Replication', micro: 'Polymerase switching', q: 'In eukaryotic DNA replication, which polymerase synthesizes the majority of the leading strand?', opts: ['DNA Pol alpha', 'DNA Pol delta', 'DNA Pol epsilon', 'DNA Pol gamma'], ans: 'C', exp: 'DNA Polymerase epsilon is the primary leading-strand polymerase in eukaryotes.' },
    { sub: 'Telomere Maintenance', micro: 'Telomerase mechanism', q: 'Telomerase solves the end-replication problem by acting as a:', opts: ['RNA-dependent DNA polymerase', 'DNA-dependent RNA polymerase', 'ATP-dependent ligase', 'Site-specific recombinase'], ans: 'A', exp: 'Telomerase carries an intrinsic RNA template (TERC) and reverse-transcribes telomeric repeats.' },
    { sub: 'Replication Licensing', micro: 'MCM2-7 helicase', q: 'Which statements are true regarding eukaryotic pre-replicative complex (pre-RC) licensing?', opts: ['Occurs during G1 phase when CDK activity is low', 'Requires ORC, Cdc6, and Cdt1 to load MCM2-7', 'Permits re-replication within the same S phase', 'MCM2-7 acts as the replicative helicase'], ans: 'A,B,D', type: 'MSQ', exp: 'Pre-RC licensing occurs in low-CDK G1 phase via ORC/Cdc6/Cdt1 loading MCM2-7 and prevents re-replication.' },
    { sub: 'Replication Kinetics', micro: 'Fork rate calculation', q: 'If an E. coli circular chromosome of 4.6 x 10^6 bp replicates bidirectionally at 1000 bp/s per fork, approximately how many minutes are needed for one complete round (enter value between 37 and 39)?', opts: [], ans: '37-39', type: 'NAT', exp: 'Total speed = 2000 bp/s. Time = 4,600,000 / 2000 = 2300 s ≈ 38.3 minutes.' },
    { sub: 'Fidelity & Repair', micro: 'Mismatch repair', q: 'In E. coli methyl-directed mismatch repair, which protein recognizes the mismatch and recruits MutL?', opts: ['MutS', 'MutH', 'Dam methylase', 'UvrA'], ans: 'A', exp: 'MutS scans newly synthesized DNA, binds base mismatches, and recruits MutL and MutH.' }
  ];

  const difficulties = ['Easy', 'Moderate', 'Difficult'];
  const records = [];

  for (let i = 0; i < 50; i += 1) {
    const base = concepts[i % concepts.length];
    const variant = Math.floor(i / concepts.length) + 1;
    const qType = base.type || 'MCQ';
    const difficulty = difficulties[i % 3];
    const marks = qType === 'MCQ' ? 1 : 2;
    const neg = qType === 'MCQ' ? 0.25 : 0;
    const idNum = String(i + 1).padStart(3, '0');

    records.push({
      'Question ID': `GATB-DNA-${idNum}`,
      'Exam': 'GAT-B',
      'Paper Code': 'GATB-BT',
      'Year': String(2020 + (i % 6)),
      'Topic': 'DNA Replication',
      'Sub-topic': base.sub,
      'Micro-concept': base.micro,
      'Question Type': qType,
      'Difficulty': difficulty,
      'Question': variant === 1 ? base.q : `[Set ${variant}] ${base.q}`,
      'Option A': qType === 'NAT' ? '' : base.opts[0],
      'Option B': qType === 'NAT' ? '' : base.opts[1],
      'Option C': qType === 'NAT' ? '' : base.opts[2],
      'Option D': qType === 'NAT' ? '' : base.opts[3],
      'Correct Answer': base.ans,
      'Marks': String(marks),
      'Negative Marks': String(neg),
      'Explanation': base.exp
    });
  }

  return { headers: [...REQUIRED_UPLOAD_COLUMNS], records };
}

export function generateBrokenSampleRows() {
  return {
    headers: [...REQUIRED_UPLOAD_COLUMNS],
    records: [
      {
        'Question ID': 'ERR-001',
        'Exam': 'GAT-B',
        'Paper Code': 'GATB-BT',
        'Year': '2025',
        'Topic': 'DNA Replication',
        'Sub-topic': 'Enzymes',
        'Micro-concept': 'Pol III',
        'Question Type': 'MCQ',
        'Difficulty': 'Easy',
        'Question': 'Which enzyme synthesizes DNA in the 5\' to 3\' direction?',
        'Option A': 'DNA Pol III',
        'Option B': 'Helicase',
        'Option C': '',
        'Option D': 'Ligase',
        'Correct Answer': 'Z',
        'Marks': '1',
        'Negative Marks': '0.25',
        'Explanation': ''
      },
      {
        'Question ID': 'ERR-001',
        'Exam': 'GAT-B',
        'Paper Code': 'GATB-BT',
        'Year': '2025',
        'Topic': 'DNA Replication',
        'Sub-topic': 'Enzymes',
        'Micro-concept': 'NAT Check',
        'Question Type': 'NAT',
        'Difficulty': 'Moderate',
        'Question': 'How many replication forks form at OriC?',
        'Option A': '2',
        'Option B': '',
        'Option C': '',
        'Option D': '',
        'Correct Answer': 'two',
        'Marks': '-2',
        'Negative Marks': '0.5',
        'Explanation': 'Bidirectional replication forms 2 forks.'
      }
    ]
  };
}
