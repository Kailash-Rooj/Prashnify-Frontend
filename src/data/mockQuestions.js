import { generateDnaReplication50SampleRows } from '../utils/uploadValidator.js';

function convertUploadRecordToQuestion(rec) {
  const qType = rec['Question Type'];
  return {
    id: rec['Question ID'],
    exam: rec['Exam'],
    paperCode: rec['Paper Code'],
    year: Number(rec['Year']),
    subject: 'Molecular Biology',
    topic: rec['Topic'],
    subTopic: rec['Sub-topic'],
    microConcept: rec['Micro-concept'],
    questionType: qType,
    difficulty: rec['Difficulty'],
    question: rec['Question'],
    options: qType === 'NAT' ? [] : [
      { key: 'A', text: rec['Option A'] },
      { key: 'B', text: rec['Option B'] },
      { key: 'C', text: rec['Option C'] },
      { key: 'D', text: rec['Option D'] }
    ],
    correctAnswer: rec['Correct Answer'],
    marks: Number(rec['Marks']),
    negativeMarks: Number(rec['Negative Marks']),
    explanation: rec['Explanation']
  };
}

export const DNA_REPLICATION_QUESTIONS = generateDnaReplication50SampleRows().records.map(convertUploadRecordToQuestion);

export const OTHER_SUBJECT_QUESTIONS = [
  {
    id: 'IMM-001', exam: 'GAT-B', paperCode: 'GATB-BT', year: 2024, subject: 'Immunology', topic: 'Immunology', subTopic: 'Antibody Structure', microConcept: 'Immunoglobulin classes', questionType: 'MCQ', difficulty: 'Easy',
    question: 'Which immunoglobulin class is the first to be secreted during a primary immune response and exists primarily as a pentamer in serum?',
    options: [{ key: 'A', text: 'IgG' }, { key: 'B', text: 'IgM' }, { key: 'C', text: 'IgA' }, { key: 'D', text: 'IgE' }],
    correctAnswer: 'B', marks: 1, negativeMarks: 0.25,
    explanation: 'IgM is the first antibody isotype produced in a primary humoral response and circulates as a pentamer joined by a J chain.'
  },
  {
    id: 'IMM-002', exam: 'GAT-B', paperCode: 'GATB-BT', year: 2023, subject: 'Immunology', topic: 'Immunology', subTopic: 'MHC Presentation', microConcept: 'MHC Class I vs II', questionType: 'MCQ', difficulty: 'Moderate',
    question: 'Endogenous viral antigens synthesized inside a nucleated host cell are presented to CD8+ cytotoxic T cells via:',
    options: [{ key: 'A', text: 'MHC Class I molecules' }, { key: 'B', text: 'MHC Class II molecules' }, { key: 'C', text: 'CD1d receptors' }, { key: 'D', text: 'Complement receptor CR2' }],
    correctAnswer: 'A', marks: 1, negativeMarks: 0.25,
    explanation: 'Cytosolic/endogenous peptides are degraded by the proteasome, transported via TAP into the ER, and loaded onto MHC Class I.'
  },
  {
    id: 'IMM-003', exam: 'IIT JAM BT', paperCode: 'BT-2024', year: 2024, subject: 'Immunology', topic: 'Immunology', subTopic: 'Hypersensitivity', microConcept: 'Type I–IV mechanisms', questionType: 'MSQ', difficulty: 'Moderate',
    question: 'Which of the following statements are CORRECT regarding Type I hypersensitivity reactions?',
    options: [{ key: 'A', text: 'Mediated by IgE antibodies bound to FcεRI on mast cells' }, { key: 'B', text: 'Histamine release causes vasodilation and bronchoconstriction' }, { key: 'C', text: 'Primarily driven by CD8+ cytotoxic T lymphocytes' }, { key: 'D', text: 'Anaphylaxis is a systemic manifestation' }],
    correctAnswer: 'A,B,D', marks: 2, negativeMarks: 0,
    explanation: 'Type I (immediate) hypersensitivity is IgE-mediated via mast cell/basophil degranulation releasing histamine; CD8+ T cells mediate Type IV.'
  },
  {
    id: 'IMM-004', exam: 'CSIR NET LS', paperCode: 'LS-2025', year: 2025, subject: 'Immunology', topic: 'Immunology', subTopic: 'Complement System', microConcept: 'C3 convertase', questionType: 'MCQ', difficulty: 'Difficult',
    question: 'In the classical complement pathway, the C3 convertase enzyme complex is composed of:',
    options: [{ key: 'A', text: 'C4b2a' }, { key: 'B', text: 'C3bBb' }, { key: 'C', text: 'C5b67' }, { key: 'D', text: 'C1qrs' }],
    correctAnswer: 'A', marks: 1, negativeMarks: 0.25,
    explanation: 'C1s cleaves C4 and C2 to assemble the classical/lectin pathway C3 convertase, C4b2a.'
  },
  {
    id: 'IMM-005', exam: 'GAT-B', paperCode: 'GATB-BT', year: 2022, subject: 'Immunology', topic: 'Immunology', subTopic: 'V(D)J Recombination', microConcept: 'RAG1/RAG2', questionType: 'MCQ', difficulty: 'Moderate',
    question: 'Somatic V(D)J recombination in developing B and T lymphocytes is initiated by:',
    options: [{ key: 'A', text: 'RAG-1 and RAG-2 recombinases' }, { key: 'B', text: 'AID (Activation-induced cytidine deaminase)' }, { key: 'C', text: 'DNA Pol beta' }, { key: 'D', text: 'Reverse transcriptase' }],
    correctAnswer: 'A', marks: 1, negativeMarks: 0.25,
    explanation: 'RAG-1 and RAG-2 recognize recombination signal sequences (RSS) and create double-strand breaks to initiate V(D)J joining.'
  },
  {
    id: 'IMM-006', exam: 'GATE XL', paperCode: 'XL-2024', year: 2024, subject: 'Immunology', topic: 'Immunology', subTopic: 'Antibody Structure', microConcept: 'Antigen-binding valency', questionType: 'NAT', difficulty: 'Easy',
    question: 'How many antigen-binding sites (Fab paratopes) are theoretically present on a single secretory IgM pentamer molecule?',
    options: [], correctAnswer: '10', marks: 2, negativeMarks: 0,
    explanation: 'Each IgM monomer has 2 antigen-binding sites; a pentamer has 5 × 2 = 10 binding sites.'
  },
  {
    id: 'BIO-001', exam: 'GAT-B', paperCode: 'GATB-BT', year: 2025, subject: 'Biochemistry', topic: 'Enzyme Kinetics', subTopic: 'Michaelis-Menten', microConcept: 'Km and Vmax', questionType: 'MCQ', difficulty: 'Easy',
    question: 'In competitive enzyme inhibition, how are the apparent Km and Vmax affected?',
    options: [{ key: 'A', text: 'Apparent Km increases, Vmax remains unchanged' }, { key: 'B', text: 'Apparent Km decreases, Vmax decreases' }, { key: 'C', text: 'Apparent Km unchanged, Vmax decreases' }, { key: 'D', text: 'Both Km and Vmax increase' }],
    correctAnswer: 'A', marks: 1, negativeMarks: 0.25,
    explanation: 'A competitive inhibitor binds the active site; high substrate overcomes it (Vmax unchanged), but more substrate is required for half-maximal velocity (apparent Km increases).'
  },
  {
    id: 'BIO-002', exam: 'IIT JAM BT', paperCode: 'BT-2025', year: 2025, subject: 'Biochemistry', topic: 'Enzyme Kinetics', subTopic: 'Catalytic Efficiency', microConcept: 'kcat/Km calculation', questionType: 'NAT', difficulty: 'Moderate',
    question: 'An enzyme has Vmax = 120 µM/s at an enzyme concentration of 2 µM. What is its turnover number (kcat) in s^-1?',
    options: [], correctAnswer: '60', marks: 2, negativeMarks: 0,
    explanation: 'kcat = Vmax / [E]total = 120 µM/s / 2 µM = 60 s^-1.'
  },
  {
    id: 'BIO-003', exam: 'GAT-B', paperCode: 'GATB-BT', year: 2023, subject: 'Biochemistry', topic: 'Metabolism', subTopic: 'Glycolysis', microConcept: 'Rate-limiting enzyme', questionType: 'MCQ', difficulty: 'Easy',
    question: 'Which enzyme catalyzes the committed, rate-limiting step of glycolysis?',
    options: [{ key: 'A', text: 'Hexokinase' }, { key: 'B', text: 'Phosphofructokinase-1 (PFK-1)' }, { key: 'C', text: 'Pyruvate kinase' }, { key: 'D', text: 'Aldolase' }],
    correctAnswer: 'B', marks: 1, negativeMarks: 0.25,
    explanation: 'PFK-1 converts fructose-6-phosphate to fructose-1,6-bisphosphate and is the primary allosteric control point of glycolysis.'
  },
  {
    id: 'BIO-004', exam: 'GATE XL', paperCode: 'XL-2023', year: 2023, subject: 'Biochemistry', topic: 'Amino Acids', subTopic: 'Isoelectric Point', microConcept: 'pI calculation', questionType: 'NAT', difficulty: 'Moderate',
    question: 'Glycine has pKa1 (carboxyl) = 2.34 and pKa2 (amino) = 9.60. Calculate its isoelectric point (pI) (acceptable range 5.9-6.0).',
    options: [], correctAnswer: '5.9-6.0', marks: 2, negativeMarks: 0,
    explanation: 'For a neutral amino acid, pI = (pKa1 + pKa2) / 2 = (2.34 + 9.60) / 2 = 5.97.'
  },
  {
    id: 'BIO-005', exam: 'CSIR NET LS', paperCode: 'LS-2024', year: 2024, subject: 'Biochemistry', topic: 'Protein Structure', subTopic: 'Ramachandran Plot', microConcept: 'Allowed phi/psi angles', questionType: 'MSQ', difficulty: 'Difficult',
    question: 'Which statements accurately describe the Ramachandran plot of polypeptide conformations?',
    options: [{ key: 'A', text: 'Glycine occupies the largest allowed conformational area' }, { key: 'B', text: 'Proline has the most restricted phi angle due to its cyclic side chain' }, { key: 'C', text: 'Right-handed alpha-helices lie in the lower-left quadrant' }, { key: 'D', text: 'Steric clashes explain disallowed regions' }],
    correctAnswer: 'A,B,C,D', marks: 2, negativeMarks: 0,
    explanation: 'All four statements are foundational features of the Ramachandran plot.'
  },
  {
    id: 'BIO-006', exam: 'GAT-B', paperCode: 'GATB-BT', year: 2024, subject: 'Biochemistry', topic: 'Metabolism', subTopic: 'Oxidative Phosphorylation', microConcept: 'ETC inhibitors', questionType: 'MCQ', difficulty: 'Moderate',
    question: 'Rotenone inhibits electron transfer specifically at which complex of the mitochondrial electron transport chain?',
    options: [{ key: 'A', text: 'Complex I (NADH dehydrogenase)' }, { key: 'B', text: 'Complex II (Succinate dehydrogenase)' }, { key: 'C', text: 'Complex III (Cytochrome bc1)' }, { key: 'D', text: 'Complex IV (Cytochrome c oxidase)' }],
    correctAnswer: 'A', marks: 1, negativeMarks: 0.25,
    explanation: 'Rotenone blocks electron transfer from Fe-S centers in Complex I to ubiquinone.'
  },
  {
    id: 'GEN-001', exam: 'GAT-B', paperCode: 'GATB-BT', year: 2025, subject: 'Genetics', topic: 'Mendelian Genetics', subTopic: 'Epistasis', microConcept: '9:3:4 ratio', questionType: 'MCQ', difficulty: 'Easy',
    question: 'A modified F2 dihybrid phenotypic ratio of 9:3:4 is characteristic of which type of gene interaction?',
    options: [{ key: 'A', text: 'Recessive epistasis' }, { key: 'B', text: 'Dominant epistasis' }, { key: 'C', text: 'Duplicate dominant genes' }, { key: 'D', text: 'Complementary gene action' }],
    correctAnswer: 'A', marks: 1, negativeMarks: 0.25,
    explanation: 'In recessive epistasis, homozygosity for a recessive allele at one locus masks expression at the second locus, yielding 9:3:4.'
  },
  {
    id: 'GEN-002', exam: 'IIT JAM BT', paperCode: 'BT-2024', year: 2024, subject: 'Genetics', topic: 'Population Genetics', subTopic: 'Hardy-Weinberg', microConcept: 'Carrier frequency', questionType: 'NAT', difficulty: 'Moderate',
    question: 'In a Hardy-Weinberg population, an autosomal recessive disorder affects 1 in 100 individuals (q^2 = 0.01). What percentage (%) of the population are heterozygous carriers?',
    options: [], correctAnswer: '18', marks: 2, negativeMarks: 0,
    explanation: 'q = sqrt(0.01) = 0.1, p = 0.9. Carrier frequency 2pq = 2 × 0.9 × 0.1 = 0.18 = 18%.'
  },
  {
    id: 'GEN-003', exam: 'CSIR NET LS', paperCode: 'LS-2023', year: 2023, subject: 'Genetics', topic: 'Linkage & Mapping', subTopic: 'Three-point cross', microConcept: 'Recombination frequency', questionType: 'MCQ', difficulty: 'Difficult',
    question: 'In a three-point test cross, the double crossover (DCO) progeny classes are always identified as:',
    options: [{ key: 'A', text: 'The two least frequent phenotypic classes' }, { key: 'B', text: 'The two most frequent phenotypic classes' }, { key: 'C', text: 'Equal in number to parental classes' }, { key: 'D', text: 'Always 25% of total progeny' }],
    correctAnswer: 'A', marks: 1, negativeMarks: 0.25,
    explanation: 'Simultaneous crossovers in both adjacent intervals occur with the lowest probability, making DCO classes the rarest.'
  },
  {
    id: 'GEN-004', exam: 'GAT-B', paperCode: 'GATB-BT', year: 2024, subject: 'Genetics', topic: 'Gene Regulation', subTopic: 'Lac Operon', microConcept: 'Merodiploids', questionType: 'MSQ', difficulty: 'Moderate',
    question: 'Which mutations in the E. coli lac operon result in constitutive expression of beta-galactosidase in a haploid strain?',
    options: [{ key: 'A', text: 'lacI-' }, { key: 'B', text: 'lacOc' }, { key: 'C', text: 'lacIs (super-repressor)' }, { key: 'D', text: 'lacP-' }],
    correctAnswer: 'A,B', marks: 2, negativeMarks: 0,
    explanation: 'Loss of functional repressor (lacI-) or operator unable to bind repressor (lacOc) causes constitutive expression.'
  },
  {
    id: 'GEN-005', exam: 'GATE XL', paperCode: 'XL-2025', year: 2025, subject: 'Genetics', topic: 'Pedigree Analysis', subTopic: 'X-linked inheritance', microConcept: 'Transmission patterns', questionType: 'MCQ', difficulty: 'Easy',
    question: 'Which inheritance pattern is ruled out immediately when an affected father transmits a trait to his son?',
    options: [{ key: 'A', text: 'X-linked dominant' }, { key: 'B', text: 'Autosomal dominant' }, { key: 'C', text: 'Autosomal recessive' }, { key: 'D', text: 'Y-linked' }],
    correctAnswer: 'A', marks: 1, negativeMarks: 0.25,
    explanation: 'Fathers pass their Y chromosome—not their X chromosome—to sons, ruling out X-linked transmission.'
  },
  {
    id: 'GEN-006', exam: 'GAT-B', paperCode: 'GATB-BT', year: 2022, subject: 'Genetics', topic: 'Mendelian Genetics', subTopic: 'Chi-Square Test', microConcept: 'Degrees of freedom', questionType: 'NAT', difficulty: 'Easy',
    question: 'What is the degrees of freedom (df) for a chi-square goodness-of-fit test on a 9:3:3:1 dihybrid cross?',
    options: [], correctAnswer: '3', marks: 2, negativeMarks: 0,
    explanation: 'Degrees of freedom df = number of phenotypic classes - 1 = 4 - 1 = 3.'
  },
  {
    id: 'CEL-001', exam: 'GAT-B', paperCode: 'GATB-BT', year: 2025, subject: 'Cell Biology', topic: 'Cell Cycle', subTopic: 'Checkpoints', microConcept: 'MPF complex', questionType: 'MCQ', difficulty: 'Easy',
    question: 'Maturation Promoting Factor (MPF), which drives entry into mitosis, consists of:',
    options: [{ key: 'A', text: 'CDK1 and Cyclin B' }, { key: 'B', text: 'CDK4 and Cyclin D' }, { key: 'C', text: 'CDK2 and Cyclin E' }, { key: 'D', text: 'p53 and p21' }],
    correctAnswer: 'A', marks: 1, negativeMarks: 0.25,
    explanation: 'MPF is the active heterodimer of CDK1 (Cdc2) and mitotic Cyclin B.'
  },
  {
    id: 'CEL-002', exam: 'IIT JAM BT', paperCode: 'BT-2023', year: 2023, subject: 'Cell Biology', topic: 'Protein Sorting', subTopic: 'Vesicular Transport', microConcept: 'COPII vs COPI', questionType: 'MCQ', difficulty: 'Moderate',
    question: 'Anterograde transport of proteins from the rough ER to the cis-Golgi network is mediated by vesicles coated with:',
    options: [{ key: 'A', text: 'COPII' }, { key: 'B', text: 'COPI' }, { key: 'C', text: 'Clathrin' }, { key: 'D', text: 'Caveolin' }],
    correctAnswer: 'A', marks: 1, negativeMarks: 0.25,
    explanation: 'COPII mediates ER-to-Golgi anterograde transport, whereas COPI mediates retrograde retrieval.'
  },
  {
    id: 'CEL-003', exam: 'CSIR NET LS', paperCode: 'LS-2024', year: 2024, subject: 'Cell Biology', topic: 'Cell Signaling', subTopic: 'GPCR Pathway', microConcept: 'Second messengers', questionType: 'MSQ', difficulty: 'Moderate',
    question: 'Activation of Phospholipase C-beta (PLC-β) by Gq protein directly generates which two second messengers from PIP2?',
    options: [{ key: 'A', text: 'Inositol 1,4,5-trisphosphate (IP3)' }, { key: 'B', text: 'Diacylglycerol (DAG)' }, { key: 'C', text: 'Cyclic AMP (cAMP)' }, { key: 'D', text: 'Nitric oxide (NO)' }],
    correctAnswer: 'A,B', marks: 2, negativeMarks: 0,
    explanation: 'PLC-β hydrolyzes membrane PIP2 into soluble IP3 (releases ER Ca2+) and membrane-bound DAG (activates PKC).'
  },
  {
    id: 'MIC-001', exam: 'GAT-B', paperCode: 'GATB-BT', year: 2024, subject: 'Microbiology', topic: 'Microbial Growth', subTopic: 'Generation Time', microConcept: 'Exponential growth', questionType: 'NAT', difficulty: 'Moderate',
    question: 'A bacterial culture starts with 100 cells/mL and reaches 3,200 cells/mL in 150 minutes during log phase. What is the generation time in minutes?',
    options: [], correctAnswer: '30', marks: 2, negativeMarks: 0,
    explanation: '3200 / 100 = 32 = 2^5, so 5 generations occurred. Generation time = 150 / 5 = 30 minutes.'
  },
  {
    id: 'MIC-002', exam: 'GATE XL', paperCode: 'XL-2024', year: 2024, subject: 'Microbiology', topic: 'Bacterial Genetics', subTopic: 'Horizontal Gene Transfer', microConcept: 'Conjugation', questionType: 'MCQ', difficulty: 'Easy',
    question: 'Transfer of bacterial DNA from a donor to a recipient via a bacteriophage vector is known as:',
    options: [{ key: 'A', text: 'Transduction' }, { key: 'B', text: 'Transformation' }, { key: 'C', text: 'Conjugation' }, { key: 'D', text: 'Transposition' }],
    correctAnswer: 'A', marks: 1, negativeMarks: 0.25,
    explanation: 'Transduction uses bacteriophages to carry host DNA fragments between bacteria.'
  },
  {
    id: 'MIC-003', exam: 'GAT-B', paperCode: 'GATB-BT', year: 2025, subject: 'Microbiology', topic: 'Antibiotics', subTopic: 'Mode of Action', microConcept: 'Cell wall synthesis', questionType: 'MCQ', difficulty: 'Easy',
    question: 'Penicillin exerts its bactericidal effect primarily by inhibiting:',
    options: [{ key: 'A', text: 'Transpeptidase cross-linking of peptidoglycan' }, { key: 'B', text: '30S ribosomal subunit binding' }, { key: 'C', text: 'Bacterial RNA polymerase' }, { key: 'D', text: 'Folic acid synthesis' }],
    correctAnswer: 'A', marks: 1, negativeMarks: 0.25,
    explanation: 'Beta-lactam antibiotics bind penicillin-binding proteins (transpeptidases), blocking peptidoglycan cross-linking.'
  }
];

export const INITIAL_QUESTION_BANK = [
  ...DNA_REPLICATION_QUESTIONS,
  ...OTHER_SUBJECT_QUESTIONS
];

// Full Mock 8 demo paper: 60 questions (36 from DNA Replication + 24 from other subjects) per PDF developer notes
export const FULL_MOCK_8_QUESTIONS = [
  ...DNA_REPLICATION_QUESTIONS.slice(0, 36),
  ...OTHER_SUBJECT_QUESTIONS
];
