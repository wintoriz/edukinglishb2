/**
 * Edukinglish Pathfinders (CEFR B2) - Interactive Web Platform
 * GitHub Pages + Google Sheets (JSONP & Fetch dual loader)
 */

const CONFIG = {
  CURRICULUM_SHEET_ID: '17-VgtVh04zZDI2fNdK9s41HOY_jXJ-AgL6UweVASY5M',
  STUDENTS_SHEET_ID: '1YQlsfhsyaMw5XK8Vmh3g5dnJo6UeAG76OjLBejhmWmk',
  APPS_SCRIPT_WEBHOOK_URL: '',
  EXERCISES_PER_DAY: 7,
  DAYS_PER_MODULE: 3
};

const CHARACTERS = {
  Kai: {
    initials: 'K',
    colorClass: 'kai',
    role: 'Dynamic Podcast Host & Tech Trendsetter',
    bio: 'Kai hosts "Future Pulse", a fast-paced English podcast exploring AI, media literacy, and modern dilemmas.',
    aiGreeting: "Hey! I'm Kai. Welcome to my podcast studio. Let's sharpen your B2 speaking—tell me, what's a recent trend or piece of news that made you think twice?"
  },
  Diana: {
    initials: 'D',
    colorClass: 'diana',
    role: 'Singer & Children’s Creative Workshop Leader',
    bio: 'Diana brings vocal clarity, emotional intelligence, and creative storytelling to every workshop she leads.',
    aiGreeting: "Hi there! I'm Diana. As a singer and workshop teacher, I love clear expression and rhythm. Tell me about a creative project or event you recently organized!"
  },
  Maria: {
    initials: 'M',
    colorClass: 'maria',
    role: 'Educator & Mindful Lifestyle Curator',
    bio: 'Maria blends pedagogy with sustainable travel, well-being, and intentional living around the globe.',
    aiGreeting: "Hello! I'm Maria. I'm passionate about education and balanced living. If you could redesign your daily routine to make it healthier and more inspiring, what would you change?"
  },
  Matias: {
    initials: 'MT',
    colorClass: 'matias',
    role: '36-Year-Old Stylish Business Strategist (B2 Fellow Learner)',
    bio: 'Matias has sharp business instincts and impeccable style—though he occasionally stumbles over English idioms!',
    aiGreeting: "Good to see you! I'm Matias. Look, I know business inside out, though English idioms still trip me up sometimes. How do you handle difficult negotiations or tough decisions at work?"
  }
};

const FALLBACK_STUDENTS = [
  { id: 'EDUKINGLISH26', name: 'EDUKINGLISH', status: 'Activo', unlockedModule: 10 },
  { id: 'EDU-001', name: 'Victor Emanuel Desales Anaya', status: 'Activo', unlockedModule: 2 },
  { id: 'EDU-002', name: 'Mayte Elizabeth Desales Anaya', status: 'Activo', unlockedModule: 5 },
  { id: 'EDU-003', name: 'Dylan Leonardo Lugo Ponce', status: 'Activo', unlockedModule: 1 }
];

const FALLBACK_MODULES = [
  { id: 'MOD-B2-01', num: 1, title: 'Modern Work & Career Trends', guide: 'Matias', desc: 'Navigating leadership dilemmas, nuanced feedback, and strategic decision-making.', videoUrl: '' },
  { id: 'MOD-B2-02', num: 2, title: 'Technology & Digital Life', guide: 'Kai', desc: 'Evaluating online narratives, podcast debates, and persuasive rhetoric.', videoUrl: '' },
  { id: 'MOD-B2-03', num: 3, title: 'Global Travel & Cultural Experiences', guide: 'Maria', desc: 'Exploring sustainable lifestyles, cross-cultural etiquette, and personal balance.', videoUrl: '' },
  { id: 'MOD-B2-04', num: 4, title: 'Environment & Urban Living', guide: 'Maria', desc: 'Analyzing 15-minute cities, clean energy, and sustainable habits.', videoUrl: '' },
  { id: 'MOD-B2-05', num: 5, title: 'Personal Growth & Mindset', guide: 'Diana', desc: 'Habit architecture, emotional agility, and overcoming cognitive biases.', videoUrl: '' },
  { id: 'MOD-B2-06', num: 6, title: 'Entertainment & Media Culture', guide: 'Kai', desc: 'Audio journalism, streaming narratives, and critical news literacy.', videoUrl: '' },
  { id: 'MOD-B2-07', num: 7, title: 'Society & Modern Lifestyle', guide: 'Matias', desc: 'Financial literacy, wellness biology, and modern culinary culture.', videoUrl: '' },
  { id: 'MOD-B2-08', num: 8, title: 'Science & Innovation', guide: 'Kai', desc: 'Debating frontier science, biotechnology, and future ethics.', videoUrl: '' },
  { id: 'MOD-B2-09', num: 9, title: 'Art, Literature & Creative Writing', guide: 'Diana', desc: 'Storytelling craft, architectural design, and objective art criticism.', videoUrl: '' },
  { id: 'MOD-B2-10', num: 10, title: 'Global Issues & Debates', guide: 'Diana', desc: 'Glocalization, vocational models, and structured Oxford-style debates.', videoUrl: '' }
];

const FALLBACK_EXERCISES = [
  {
    id: 'B2-D01-E01', module: 1, day: 1, order: 1, skill: 'Reading', character: 'Matias',
    title: 'The Quarterly Strategy Pivot',
    stimulus: `During Tuesday's executive review, Matias presented a bold proposal to shift thirty percent of the agency's marketing budget from traditional print campaigns into interactive digital storytelling. Although his tailored suit projected effortless confidence, he accidentally spilled espresso on the quarterly forecast sheet just as the board members leaned in to examine the projected margins.\n\nRather than losing his composure, Matias acknowledged the mishap with dry humor and pivoted directly to the core data. He pointed out that while print readership had declined steadily over six quarters, customer acquisition costs on interactive platforms had dropped by eighteen percent, provided campaigns prioritized authentic educational value over aggressive sales tactics.\n\nSeveral senior partners remained skeptical, arguing that older demographics still trusted tangible publications. Matias conceded that an abrupt withdrawal could alienate legacy clients, proposing instead a phased six-month transition with clear performance benchmarks at the ninety-day mark.`,
    question: 'Based on the passage, what demonstrates Matias’s sound business judgment despite his initial clumsiness?',
    options: [
      'A) He immediately abandoned print advertising to cut costs across all departments.',
      'B) He proposed a gradual, data-backed transition with measurable milestones to protect legacy clients.',
      'C) He blamed the printing team for the coffee spill to divert attention from declining sales.',
      'D) He insisted that older demographics would quickly adapt to aggressive digital ads.'
    ],
    correct: 'B',
    feedbackError: 'Not quite. Notice how Matias recognized the risk of alienating legacy clients and suggested a phased six-month transition with 90-day benchmarks rather than an abrupt change.',
    feedbackSuccess: 'Spot on! B2 reading requires spotting nuance: Matias balanced innovation with risk management through a phased, measurable rollout.'
  },
  {
    id: 'B2-D01-E02', module: 1, day: 1, order: 2, skill: 'Reading', character: 'Maria',
    title: 'The Hidden Cost of Constant Availability',
    stimulus: `In an era where remote collaboration tools keep teams connected across time zones, many professionals equate immediate responsiveness with dedication. Maria recently surveyed forty educators and creative freelancers and discovered that those who checked messages late into the evening reported significantly higher burnout rates without any measurable increase in output quality.\n\nWhen employees feel compelled to reply within minutes, deep cognitive work is fractured into shallow, reactive tasks. Over time, this culture of urgency erodes strategic thinking, because team members spend their peak mental energy triaging minor notifications instead of solving complex structural problems.\n\nTo counter this trend, Maria introduced "asynchronous focus blocks" in her own studio, establishing clear response windows and reserving mornings strictly for uninterrupted curriculum design. Within a month, project delivery times improved while stress levels dropped noticeably.`,
    question: 'What is the primary flaw in equating instant messaging responsiveness with high productivity?',
    options: [
      'A) It fragments deep concentration into reactive tasks, weakening long-term strategic problem-solving.',
      'B) It prevents teams from working across international time zones effectively.',
      'C) It forces managers to hire additional administrative staff to answer emails.',
      'D) It eliminates the need for scheduled curriculum planning meetings.'
    ],
    correct: 'A',
    feedbackError: 'Re-read the second paragraph carefully. The text explains that constant responsiveness fractures deep cognitive work into shallow tasks, eroding strategic thinking.',
    feedbackSuccess: 'Excellent comprehension! You identified the causal link between constant interruptions and the loss of deep strategic work.'
  },
  {
    id: 'B2-D01-E03', module: 1, day: 1, order: 3, skill: 'Listening', character: 'Kai',
    title: 'Podcast Clip: The Viral Headline Trap',
    stimulus: `Welcome back to Future Pulse! I'm Kai, and today we're unpacking a phenomenon that catches even savvy professionals off guard: emotional headline framing. Earlier this week, a viral post claimed that a major tech firm was replacing its entire customer support division with autonomous bots by Friday.\n\nNaturally, outrage spread within hours, and thousands of users boycotted the brand before checking the primary source. Had they read the actual shareholder memo, they would have realized the company was merely piloting an after-hours triage assistant while retraining existing staff for complex case resolution.\n\nAs critical thinkers at a B2 level and beyond, our responsibility isn't to react the fastest—it's to verify context before amplifying a narrative. Whenever a headline triggers immediate anger or panic, that's your cue to pause and look for what's been left out.`,
    question: 'According to Kai’s podcast segment, what is the wisest response when encountering a headline that provokes immediate outrage?',
    options: [
      'A) Share it immediately so others can debate its accuracy in the comments.',
      'B) Boycott the organization involved until they issue a public apology.',
      'C) Pause to consult primary sources and check for omitted context before reacting.',
      'D) Assume all corporate memos are completely fabricated.'
    ],
    correct: 'C',
    feedbackError: 'Listen closely to Kai’s main takeaway: strong emotional triggers are a signal to pause, verify primary sources, and look for missing context.',
    feedbackSuccess: 'Great listening! You captured both the factual correction in the story and Kai’s broader critical-thinking advice.'
  },
  {
    id: 'B2-D01-E04', module: 1, day: 1, order: 4, skill: 'Listening', character: 'Diana',
    title: 'Workshop Debrief: Encouraging Quiet Voices',
    stimulus: `During yesterday's youth theater and vocal workshop, Diana noticed a familiar group dynamic. Two outspoken participants eagerly volunteered for every improvisation prompt, while three thoughtful students hung back near the stage curtain, hesitant to risk making a mistake in front of their peers.\n\nInstead of putting the quieter students on the spot with a solo performance, Diana restructured the activity into small, low-stakes pairs where each person had to build on their partner's idea using the "Yes, and..." principle. Within ten minutes, the room was buzzing with collaborative energy, and one of the shyest students delivered the funniest line of the afternoon.\n\nTrue leadership in any classroom or workplace isn't about amplifying the loudest voices; it's about designing an environment where reserved thinkers feel safe enough to contribute.`,
    question: 'Why did Diana avoid calling on the quiet students for an immediate solo performance?',
    options: [
      'A) She believed only outspoken students had natural talent for improvisation.',
      'B) She wanted to lower psychological pressure first through collaborative pair work.',
      'C) She ran out of time before the workshop ended.',
      'D) The quieter students refused to participate in any group exercises.'
    ],
    correct: 'B',
    feedbackError: 'Think about Diana’s pedagogical judgment: putting hesitant learners on the spot increases anxiety, whereas low-stakes pairs build psychological safety.',
    feedbackSuccess: 'Well done! You understood the interpersonal insight behind Diana’s workshop adjustment.'
  },
  {
    id: 'B2-D01-E05', module: 1, day: 1, order: 5, skill: 'Grammar', character: 'Matias',
    title: 'Regret & Past Hypotheticals (Mixed Conditionals)',
    stimulus: '',
    question: 'Matias forgot to double-check the currency conversion before signing the supplier contract. Which B2 sentence accurately expresses this past mistake and its present consequence?',
    options: [
      'A) If Matias checked the exchange rate yesterday, the budget wouldn’t be tight today.',
      'B) If Matias had checked the exchange rate yesterday, the budget wouldn’t be so tight today.',
      'C) Had Matias check the exchange rate, the budget will not be tight today.',
      'D) If Matias would have checked the exchange rate, the budget hadn’t been tight.'
    ],
    correct: 'B',
    feedbackError: 'Check your conditional structure! For an unreal past condition ("had checked") affecting a present result ("wouldn’t be"), use a Mixed Conditional: If + Past Perfect, would + base verb.',
    feedbackSuccess: 'Spot on! "If + had checked ... wouldn’t be" accurately links a past oversight to a current financial consequence.'
  },
  {
    id: 'B2-D01-E06', module: 1, day: 1, order: 6, skill: 'Grammar', character: 'Kai',
    title: 'Nuanced Deduction in Professional Contexts',
    stimulus: '',
    question: 'The client hasn’t replied to our revised proposal after four days, even though they said the project was urgent. Which deduction sounds most natural and logical at a B2 level?',
    options: [
      'A) They must have encountered an unexpected internal delay or budget freeze.',
      'B) They must encounter an unexpected delay last week.',
      'C) They can’t have been urgent about the project at all.',
      'D) They should have encounter a budget freeze.'
    ],
    correct: 'A',
    feedbackError: 'Remember: to express a strong, logical deduction about a past event, use "must have + past participle" ("must have encountered").',
    feedbackSuccess: 'Nailed it! "Must have encountered" is the exact B2 modal structure for drawing a logical conclusion about the past.'
  },
  {
    id: 'B2-D01-E07', module: 1, day: 1, order: 7, skill: 'Writing', character: 'Maria',
    title: 'Diplomatic Pushback in Written Communication',
    stimulus: '',
    question: 'A colleague sends an unclear last-minute request at 6:30 PM expecting deliverables by 8:00 AM. Which written reply demonstrates the best B2 professional tone and common sense?',
    options: [
      'A) Why didn’t you send this earlier? It’s impossible to finish by tomorrow morning.',
      'B) Sure, I’ll stay up all night and guess what details you wanted.',
      'C) Thanks for flagging this. To ensure accuracy, could you clarify the top two priorities? I can deliver an initial draft by noon tomorrow.',
      'D) I don’t read messages after 6 PM. Send it again next week.'
    ],
    correct: 'C',
    feedbackError: 'In B2 workplace writing, effective pushback combines politeness, a request for clarification, and a realistic counter-proposal rather than blunt refusal or sarcasm.',
    feedbackSuccess: 'Outstanding! Option C sets healthy boundaries while remaining constructive, clear, and solution-oriented.'
  }
];

let state = {
  student: null,
  modules: [...FALLBACK_MODULES],
  exercises: [...FALLBACK_EXERCISES],
  selectedModule: 1,
  selectedDay: 1,
  currentExIndex: 0,
  records: {},
  completedDays: {},
  aiPartner: 'Kai'
};

const $ = (id) => document.getElementById(id);

function loadLocalProgress(studentId) {
  const raw = localStorage.getItem(`edukinglish_b2_${studentId}`);
  if (!raw) return;
  try {
    const saved = JSON.parse(raw);
    state.records = saved.records || {};
    state.completedDays = saved.completedDays || {};
    if (saved.unlockedModule && state.student) {
      state.student.unlockedModule = Math.max(state.student.unlockedModule || 1, saved.unlockedModule);
    }
  } catch (e) {
    console.warn('Could not parse saved progress', e);
  }
}

function saveLocalProgress() {
  if (!state.student) return;
  const payload = {
    studentId: state.student.id,
    studentName: state.student.name,
    unlockedModule: state.student.unlockedModule,
    records: state.records,
    completedDays: state.completedDays,
    updatedAt: new Date().toISOString()
  };
  localStorage.setItem(`edukinglish_b2_${state.student.id}`, JSON.stringify(payload));

  if (CONFIG.APPS_SCRIPT_WEBHOOK_URL) {
    fetch(CONFIG.APPS_SCRIPT_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(() => {});
  }
}

// JSONP + FETCH DUAL LOADER WITH TIMEOUT (Never hangs if Google Sheets is private or slow!)
function loadSheetViaJsonp(sheetId, sheetName = '', timeoutMs = 4500) {
  return new Promise((resolve, reject) => {
    const cbName = 'gvizCb_' + Math.random().toString(36).substring(2, 10);
    const script = document.createElement('script');
    let settled = false;

    const cleanup = () => {
      settled = true;
      delete window[cbName];
      if (script.parentNode) script.parentNode.removeChild(script);
    };

    const timer = setTimeout(() => {
      if (!settled) {
        cleanup();
        reject(new Error('Timeout loading Google Sheet'));
      }
    }, timeoutMs);

    window[cbName] = (response) => {
      clearTimeout(timer);
      cleanup();
      if (!response || response.status === 'error' || !response.table) {
        reject(new Error('Google Sheet returned error or restricted access'));
        return;
      }
      const rows = (response.table.rows || []).map(r =>
        (r.c || []).map(cell => (cell && cell.v !== null && cell.v !== undefined ? String(cell.v).trim() : ''))
      );
      resolve(rows);
    };

    const sheetParam = sheetName ? `&sheet=${encodeURIComponent(sheetName)}` : '';
    script.src = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json;responseHandler:${cbName}${sheetParam}`;
    script.onerror = () => {
      clearTimeout(timer);
      cleanup();
      reject(new Error('Network error loading Google Sheet'));
    };
    document.head.appendChild(script);
  });
}

async function fetchSheetRows(sheetId, sheetName = '') {
  const matrix = await loadSheetViaJsonp(sheetId, sheetName);
  if (!matrix || !matrix.length) return [];

  // Auto-detect real header row (handles merged title rows at top of sheet)
  let headerIdx = matrix.findIndex(row =>
    row.some(val => /^(ID Alumno|Modulo_ID|Ejercicio_ID)$/i.test(val))
  );
  if (headerIdx === -1) headerIdx = 0;

  const headers = matrix[headerIdx];
  return matrix.slice(headerIdx + 1).map(row => {
    const obj = {};
    headers.forEach((h, i) => {
      const key = h || `col_${i}`;
      obj[key] = row[i] || '';
    });
    return obj;
  });
}

async function syncAllGoogleSheets() {
  try {
    const modRows = await fetchSheetRows(CONFIG.CURRICULUM_SHEET_ID, 'Modulos_Videos');
    const parsedMods = modRows
      .filter(r => r.Modulo_ID && r.Modulo_ID.startsWith('MOD-'))
      .map((r, i) => ({
        id: r.Modulo_ID,
        num: i + 1,
        title: r.Titulo_Modulo || `Module ${i + 1}`,
        guide: CHARACTERS[r.Personaje_Guia] ? r.Personaje_Guia : 'Kai',
        desc: r.Descripcion_Tema || '',
        videoUrl: r.URL_Video_Minileccion || ''
      }));
    if (parsedMods.length > 0) state.modules = parsedMods;
  } catch (e) {
    console.warn('Using bundled modules:', e.message);
  }

  try {
    const exRows = await fetchSheetRows(CONFIG.CURRICULUM_SHEET_ID, 'Banco_Ejercicios_B2');
    const parsedEx = exRows
      .filter(r => r.Ejercicio_ID && r.Pregunta_o_Consigna)
      .map(r => ({
        id: r.Ejercicio_ID,
        module: parseInt(r.Modulo, 10) || 1,
        day: parseInt(r.Dia, 10) || 1,
        order: parseInt(r.Orden, 10) || 1,
        skill: r.Habilidad || 'Reading',
        character: CHARACTERS[r.Personaje] ? r.Personaje : 'Kai',
        title: r.Titulo_Ejercicio || 'B2 Practice',
        stimulus: r.Texto_Lectura_o_Audio || '',
        question: r.Pregunta_o_Consigna,
        options: [
          r.Opcion_A ? (r.Opcion_A.startsWith('A)') ? r.Opcion_A : `A) ${r.Opcion_A}`) : '',
          r.Opcion_B ? (r.Opcion_B.startsWith('B)') ? r.Opcion_B : `B) ${r.Opcion_B}`) : '',
          r.Opcion_C ? (r.Opcion_C.startsWith('C)') ? r.Opcion_C : `C) ${r.Opcion_C}`) : '',
          r.Opcion_D ? (r.Opcion_D.startsWith('D)') ? r.Opcion_D : `D) ${r.Opcion_D}`) : ''
        ].filter(Boolean),
        correct: (r.Respuesta_Correcta || 'A').trim().charAt(0).toUpperCase(),
        feedbackError: r.Retroalimentacion_Error_EN || 'Review the context carefully and try again.',
        feedbackSuccess: r.Explicacion_Acierto_EN || 'Well done! Your reasoning aligns with B2 standards.'
      }));
    if (parsedEx.length > 0) state.exercises = parsedEx;
  } catch (e) {
    console.warn('Using bundled exercises:', e.message);
  }
}

// LOGIN HANDLER (Bound both to form submit AND direct button click)
async function processStudentLogin(e) {
  if (e) e.preventDefault();
  const nameRaw = $('student-name').value.trim();
  const codeRaw = $('student-code').value.trim().toUpperCase();
  const btn = $('login-btn');
  const status = $('login-status');

  if (!nameRaw || !codeRaw) {
    status.textContent = 'Por favor escribe tu Nombre Completo y tu Código de Acceso (ID Alumno).';
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Verifying credentials...';
  status.textContent = '';

  let roster = [...FALLBACK_STUDENTS];
  try {
    const sheetStudents = await fetchSheetRows(CONFIG.STUDENTS_SHEET_ID, 'Hoja 1');
    const mapped = sheetStudents
      .filter(r => r['ID Alumno'])
      .map(r => {
        const id = r['ID Alumno'].toUpperCase();
        const name = r['Nombre Completo'] || '';
        const estatus = r['Estatus'] || 'Activo';
        const misionStr = r['Misión Actual Desbloqueada'] || '1';
        const misionNum = parseInt(misionStr.replace(/\D/g, ''), 10) || 1;
        return { id, name, status: estatus, unlockedModule: misionNum };
      });
    if (mapped.length > 0) roster = mapped;
  } catch (err) {
    console.warn('Sheet lookup skipped/timed out, checking local roster:', err.message);
  }

  const nameLower = nameRaw.toLowerCase();
  const matched = roster.find(s =>
    s.id === codeRaw &&
    (s.name.toLowerCase().includes(nameLower) || nameLower.includes(s.name.toLowerCase()))
  );

  if (!matched) {
    status.textContent = 'Nombre o Código de Acceso no encontrado. Verifica tus datos (ej. EDUKINGLISH / EDUKINGLISH26).';
    btn.disabled = false;
    btn.textContent = 'Enter Pathfinders';
    return;
  }

  if (matched.status.toLowerCase() !== 'activo') {
    status.textContent = 'Tu suscripción está marcada como Inactiva. Contacta a Edukinglish.';
    btn.disabled = false;
    btn.textContent = 'Enter Pathfinders';
    return;
  }

  state.student = matched;
  loadLocalProgress(matched.id);

  // Enter dashboard immediately, then sync exercises in background
  $('display-student-name').textContent = state.student.name;
  $('display-student-id').textContent = state.student.id;
  $('login-view').classList.remove('active');
  $('app-view').classList.add('active');

  btn.disabled = false;
  btn.textContent = 'Enter Pathfinders';

  state.selectedModule = Math.min(state.student.unlockedModule || 1, state.modules.length);
  state.selectedDay = (state.selectedModule - 1) * CONFIG.DAYS_PER_MODULE + 1;
  renderDashboard();

  await syncAllGoogleSheets();
  renderDashboard();
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = $('login-form');
  const loginBtn = $('login-btn');
  if (loginForm) loginForm.addEventListener('submit', processStudentLogin);
  if (loginBtn) loginBtn.addEventListener('click', processStudentLogin);
});

$('logout-btn').addEventListener('click', () => {
  window.speechSynthesis.cancel();
  state.student = null;
  $('app-view').classList.remove('active');
  $('login-view').classList.add('active');
});

$('sync-sheets-btn').addEventListener('click', async () => {
  $('sync-sheets-btn').textContent = 'Syncing...';
  await syncAllGoogleSheets();
  renderDashboard();
  $('sync-sheets-btn').textContent = '↻ Sync Google Sheets';
});

function renderDashboard() {
  updateStats();
  renderModulesGrid();
  renderActiveModulePanel();
  renderExerciseWorkspace();
}

function updateStats() {
  const unlocked = state.student?.unlockedModule || 1;
  $('stat-unlocked-mod').textContent = `Module ${unlocked} of ${state.modules.length}`;

  const allRecords = Object.values(state.records);
  const firstCorrectCount = allRecords.filter(r => r.firstAttemptCorrect).length;
  const accuracy = allRecords.length > 0 ? Math.round((firstCorrectCount / allRecords.length) * 100) : 0;
  $('stat-first-score').textContent = `${accuracy}% (${firstCorrectCount}/${allRecords.length})`;

  const completedCount = Object.keys(state.completedDays).length;
  $('stat-days-done').textContent = `${completedCount} / 30`;
  $('overall-progress-bar').style.width = `${Math.min(100, Math.round((completedCount / 30) * 100))}%`;
}

function renderModulesGrid() {
  const grid = $('modules-grid');
  grid.innerHTML = '';
  const unlocked = state.student?.unlockedModule || 1;

  state.modules.forEach(mod => {
    const isLocked = mod.num > unlocked;
    const isActive = mod.num === state.selectedModule;
    const card = document.createElement('button');
    card.type = 'button';
    card.className = `mod-card ${isActive ? 'active' : ''} ${isLocked ? 'locked' : ''}`;
    card.innerHTML = `
      <div class="mod-card-top">
        <span>MODULE ${mod.num}</span>
        <span>${isLocked ? '🔒 Locked' : '✅ Open'}</span>
      </div>
      <h4>${mod.title}</h4>
      <small>Guide: <strong>${mod.guide}</strong></small>
    `;
    if (!isLocked) {
      card.addEventListener('click', () => {
        window.speechSynthesis.cancel();
        state.selectedModule = mod.num;
        state.selectedDay = (mod.num - 1) * CONFIG.DAYS_PER_MODULE + 1;
        state.currentExIndex = 0;
        renderDashboard();
      });
    }
    grid.appendChild(card);
  });
}

function renderActiveModulePanel() {
  const mod = state.modules.find(m => m.num === state.selectedModule) || state.modules[0];
  const charInfo = CHARACTERS[mod.guide] || CHARACTERS.Kai;

  $('active-mod-badge').textContent = `MODULE ${mod.num} • PATHFINDERS B2`;
  $('active-mod-title').textContent = mod.title;
  $('active-mod-desc').textContent = mod.desc;
  $('active-guide-bio').textContent = `Guide: ${mod.guide} — ${charInfo.bio}`;

  const av = $('guide-avatar');
  av.className = `guide-avatar ${charInfo.colorClass}`;
  av.textContent = charInfo.initials;

  const videoBox = $('video-container');
  const url = (mod.videoUrl || '').trim();
  if (url && !url.includes('PENDIENTE') && !url.includes('youtube.com/watch?v=PENDIENTE') && (url.startsWith('http://') || url.startsWith('https://'))) {
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    if (ytMatch) {
      videoBox.innerHTML = `<iframe src="https://www.youtube.com/embed/${ytMatch[1]}" allowfullscreen></iframe>`;
    } else {
      videoBox.innerHTML = `
        <strong>🎬 Mini-Lesson Video Ready</strong>
        <p class="muted">Watch ${mod.guide}'s topic introduction before practicing.</p>
        <a href="${url}" target="_blank" rel="noopener" class="btn primary small">Watch Mini-Lesson ↗</a>
      `;
    }
  } else {
    videoBox.innerHTML = `
      <strong>🎬 Mini-Lesson Video Slot (Module ${mod.num})</strong>
      <p class="muted">Add your YouTube or Google Drive link in Google Sheets (<code>Modulos_Videos → URL_Video_Minileccion</code>) and it will appear here automatically.</p>
    `;
  }

  const daysBar = $('days-bar');
  daysBar.innerHTML = '';
  const startDay = (mod.num - 1) * CONFIG.DAYS_PER_MODULE + 1;
  for (let d = startDay; d < startDay + CONFIG.DAYS_PER_MODULE; d++) {
    const btn = document.createElement('button');
    btn.type = 'button';
    const isDone = !!state.completedDays[d];
    btn.className = `day-btn ${state.selectedDay === d ? 'active' : ''} ${isDone ? 'completed' : ''}`;
    btn.textContent = `Day ${d} ${isDone ? '✓' : ''}`;
    btn.addEventListener('click', () => {
      window.speechSynthesis.cancel();
      state.selectedDay = d;
      state.currentExIndex = 0;
      renderActiveModulePanel();
      renderExerciseWorkspace();
    });
    daysBar.appendChild(btn);
  }
}

function getExercisesForCurrentDay() {
  const filtered = state.exercises
    .filter(e => e.day === state.selectedDay)
    .sort((a, b) => a.order - b.order);
  if (filtered.length > 0) return filtered;

  return [{
    id: `B2-D${String(state.selectedDay).padStart(2, '0')}-E01`,
    module: state.selectedModule,
    day: state.selectedDay,
    order: 1,
    skill: 'Reading',
    character: 'Kai',
    title: `Day ${state.selectedDay} — Syncing From Google Sheets`,
    stimulus: `To load all 210 exercises from your Google Sheet automatically, make sure your spreadsheet "Edukinglish B2 Course Syllabus & Exercise Plan" is shared as "Anyone with the link can view", then click "↻ Sync Google Sheets" above.`,
    question: 'Ready to sync your Google Sheet?',
    options: [
      'A) Yes, let’s sync now!',
      'B) Practice Day 1 first.',
      'C) Open the AI Speaking Lab.',
      'D) All of the above.'
    ],
    correct: 'D',
    feedbackError: 'Select D to continue.',
    feedbackSuccess: 'Great! Click "↻ Sync Google Sheets" at the top right once sharing is enabled.'
  }];
}

function renderExerciseWorkspace() {
  const dayExercises = getExercisesForCurrentDay();
  if (state.currentExIndex >= dayExercises.length) state.currentExIndex = 0;
  const ex = dayExercises[state.currentExIndex];
  const rec = state.records[ex.id];

  $('ex-progress-label').textContent = `MODULE ${state.selectedModule} • DAY ${state.selectedDay} • EXERCISE ${state.currentExIndex + 1} OF ${dayExercises.length}`;
  $('ex-title').textContent = ex.title;
  $('ex-skill-badge').textContent = ex.skill.toUpperCase();
  $('ex-char-badge').textContent = `With ${ex.character}`;

  if (rec) {
    $('ex-attempt-badge').textContent = `1st Try: ${rec.firstAttemptCorrect ? '✅ Passed' : '❌ Missed'} • Attempts: ${rec.attempts}`;
  } else {
    $('ex-attempt-badge').textContent = '1st Attempt (Counts Toward Score)';
  }

  const stepper = $('exercise-stepper');
  stepper.innerHTML = '';
  dayExercises.forEach((item, idx) => {
    const dot = document.createElement('div');
    const r = state.records[item.id];
    dot.className = `step-dot ${idx === state.currentExIndex ? 'current' : ''} ${r ? (r.firstAttemptCorrect ? 'correct' : 'wrong') : ''}`;
    dot.title = `Exercise ${idx + 1}: ${item.title}`;
    dot.addEventListener('click', () => {
      window.speechSynthesis.cancel();
      state.currentExIndex = idx;
      renderExerciseWorkspace();
    });
    stepper.appendChild(dot);
  });

  const stimBox = $('stimulus-box');
  const stimText = $('stimulus-text');
  const audioCtrls = $('audio-controls');

  if (ex.stimulus) {
    stimBox.classList.remove('hidden');
    const paragraphs = ex.stimulus.split(/\n+/).filter(Boolean).map(p => `<p>${p}</p>`).join('');
    stimText.innerHTML = paragraphs;

    if (ex.skill.toLowerCase() === 'listening') {
      $('stimulus-label').textContent = `🎧 LISTENING TRACK (${ex.character.toUpperCase()})`;
      audioCtrls.classList.remove('hidden');
      stimText.classList.add('hidden');
    } else {
      $('stimulus-label').textContent = '📖 B2 READING PASSAGE';
      audioCtrls.classList.add('hidden');
      stimText.classList.remove('hidden');
    }
  } else {
    stimBox.classList.add('hidden');
  }

  $('ex-question').textContent = ex.question;

  const optList = $('options-list');
  optList.innerHTML = '';
  const isLockedAnswered = rec && !rec.practicingAgain;

  ex.options.forEach(optStr => {
    const letter = optStr.charAt(0).toUpperCase();
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option-btn';
    btn.innerHTML = `<span class="opt-letter">${letter})</span><span>${optStr.slice(2).trim()}</span>`;

    if (isLockedAnswered) {
      btn.disabled = true;
      if (letter === ex.correct) btn.classList.add('selected-correct');
      else if (letter === rec.lastChoice && letter !== ex.correct) btn.classList.add('selected-wrong');
    } else {
      btn.addEventListener('click', () => handleAnswerSelection(ex, letter));
    }
    optList.appendChild(btn);
  });

  const fbBox = $('feedback-box');
  const retryBtn = $('retry-ex-btn');
  if (isLockedAnswered) {
    const wasRight = rec.lastChoice === ex.correct;
    fbBox.classList.remove('hidden', 'ok', 'err');
    fbBox.classList.add(wasRight ? 'ok' : 'err');
    $('feedback-title').textContent = wasRight ? '✅ Excellent B2 Judgment!' : '💡 Review & Feedback (English)';
    $('feedback-body').textContent = wasRight ? ex.feedbackSuccess : ex.feedbackError;
    $('feedback-record-note').textContent = `Official 1st-attempt record preserved: ${rec.firstAttemptCorrect ? 'Correct' : 'Incorrect'} (${rec.firstChoice}).`;
    retryBtn.classList.remove('hidden');
  } else {
    fbBox.classList.add('hidden');
    retryBtn.classList.add('hidden');
  }

  $('prev-ex-btn').disabled = state.currentExIndex === 0;
  $('next-ex-btn').textContent = state.currentExIndex === dayExercises.length - 1 ? 'Finish Day & View Report →' : 'Next Exercise →';
}

function handleAnswerSelection(ex, chosenLetter) {
  const isCorrect = chosenLetter === ex.correct;
  const existing = state.records[ex.id];

  if (!existing) {
    state.records[ex.id] = {
      firstAttemptCorrect: isCorrect,
      firstChoice: chosenLetter,
      lastChoice: chosenLetter,
      attempts: 1,
      practicingAgain: false
    };
  } else {
    existing.lastChoice = chosenLetter;
    existing.attempts += 1;
    existing.practicingAgain = false;
  }

  saveLocalProgress();
  updateStats();
  renderExerciseWorkspace();
}

$('retry-ex-btn').addEventListener('click', () => {
  const dayExercises = getExercisesForCurrentDay();
  const ex = dayExercises[state.currentExIndex];
  if (state.records[ex.id]) {
    state.records[ex.id].practicingAgain = true;
    renderExerciseWorkspace();
  }
});

$('play-audio-btn').addEventListener('click', () => {
  const ex = getExercisesForCurrentDay()[state.currentExIndex];
  if (!ex || !ex.stimulus) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(ex.stimulus);
  utter.lang = 'en-US';
  utter.rate = 0.96;
  window.speechSynthesis.speak(utter);
});

$('stop-audio-btn').addEventListener('click', () => window.speechSynthesis.cancel());
$('toggle-transcript-btn').addEventListener('click', () => {
  $('stimulus-text').classList.toggle('hidden');
});

$('prev-ex-btn').addEventListener('click', () => {
  window.speechSynthesis.cancel();
  if (state.currentExIndex > 0) {
    state.currentExIndex--;
    renderExerciseWorkspace();
  }
});

$('next-ex-btn').addEventListener('click', () => {
  window.speechSynthesis.cancel();
  const dayExercises = getExercisesForCurrentDay();
  if (state.currentExIndex < dayExercises.length - 1) {
    state.currentExIndex++;
    renderExerciseWorkspace();
  } else {
    completeCurrentDay(dayExercises);
  }
});

function completeCurrentDay(dayExercises) {
  state.completedDays[state.selectedDay] = true;

  const startDay = (state.selectedModule - 1) * CONFIG.DAYS_PER_MODULE + 1;
  let allModuleDaysDone = true;
  for (let d = startDay; d < startDay + CONFIG.DAYS_PER_MODULE; d++) {
    if (!state.completedDays[d]) allModuleDaysDone = false;
  }

  let unlockedMessage = `Module ${state.selectedModule} In Progress`;
  if (allModuleDaysDone && state.student && state.student.unlockedModule <= state.selectedModule) {
    state.student.unlockedModule = Math.min(state.modules.length, state.selectedModule + 1);
    unlockedMessage = `🎉 Module ${state.student.unlockedModule} Unlocked!`;
  }

  saveLocalProgress();
  renderDashboard();

  let firstCorrect = 0;
  const skillMap = {};
  dayExercises.forEach(ex => {
    const r = state.records[ex.id];
    const ok = r ? r.firstAttemptCorrect : false;
    if (ok) firstCorrect++;
    if (!skillMap[ex.skill]) skillMap[ex.skill] = { ok: 0, total: 0 };
    skillMap[ex.skill].total++;
    if (ok) skillMap[ex.skill].ok++;
  });

  const pct = Math.round((firstCorrect / dayExercises.length) * 100);
  $('summary-heading').textContent = `Day ${state.selectedDay} Completed!`;
  $('summary-sub').textContent = `Great consistency! Aim for at least 4 study days per week (~10 mins/day).`;
  $('sum-first-score').textContent = `${firstCorrect} / ${dayExercises.length}`;
  $('sum-accuracy').textContent = `${pct}%`;
  $('sum-status').textContent = unlockedMessage;

  const breakdownHtml = Object.entries(skillMap)
    .map(([skill, v]) => `<p><strong>${skill}:</strong> ${v.ok}/${v.total} on 1st attempt</p>`)
    .join('');
  $('sum-skill-breakdown').innerHTML = breakdownHtml;

  $('sum-coach-feedback').textContent = pct >= 80
    ? 'B2 Coach Assessment: Strong upper-intermediate comprehension and sound critical judgment. You are ready for the next session!'
    : 'B2 Coach Assessment: Solid effort! Use the "Practice Again" button on any missed questions to review the English explanations without affecting your official score.';

  $('summary-modal').classList.remove('hidden');
}

$('close-summary-btn').addEventListener('click', () => {
  $('summary-modal').classList.add('hidden');
});

// AI CONVERSATION & PRONUNCIATION LAB
const AI_PROMPTS_BY_PARTNER = {
  Kai: [
    "Interesting perspective! How would you defend that viewpoint if a skeptical journalist questioned your assumptions?",
    "That makes sense. Could you rephrase that using a stronger B2 connector like 'nevertheless' or 'on the contrary'?",
    "Great point! What long-term consequences do you think this could have over the next five years?"
  ],
  Diana: [
    "I love the energy in your answer! Try emphasizing the key verbs when you speak—what emotion were you aiming to convey?",
    "Wonderful! How would you explain that same idea to someone who completely disagrees with you, while keeping a calm tone?",
    "That was super clear. What inspired you to think about it from that angle?"
  ],
  Maria: [
    "That sounds very thoughtful. How do you balance personal well-being with professional responsibilities in situations like that?",
    "I completely agree. If you were advising a friend moving abroad, what practical tip would you give them?",
    "Lovely phrasing! Can you give me a concrete example from your own experience?"
  ],
  Matias: [
    "Aha, smart thinking! From a business standpoint, what would be the biggest risk of doing that?",
    "Hold on—let me make sure I got that idiom right! So you're saying we should weigh the pros and cons first, correct?",
    "Impressive! If you had to pitch that idea to an investor in thirty seconds, how would you summarize it?"
  ]
};

function appendChatMessage(sender, text) {
  const win = $('ai-chat-window');
  const div = document.createElement('div');
  div.className = `chat-msg ${sender}`;
  div.textContent = text;
  win.appendChild(div);
  win.scrollTop = win.scrollHeight;
}

function speakAsPartner(text) {
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-US';
  utter.rate = 0.98;
  window.speechSynthesis.speak(utter);
}

function startAiConversation(partnerName) {
  state.aiPartner = partnerName;
  $('ai-chat-window').innerHTML = '';
  const greeting = CHARACTERS[partnerName].aiGreeting;
  appendChatMessage('ai', `${partnerName}: ${greeting}`);
  speakAsPartner(greeting);
}

$('open-ai-tutor-btn').addEventListener('click', () => {
  $('ai-lab-modal').classList.remove('hidden');
  startAiConversation(state.aiPartner);
});

$('close-ai-lab-btn').addEventListener('click', () => {
  window.speechSynthesis.cancel();
  $('ai-lab-modal').classList.add('hidden');
});

document.querySelectorAll('.partner-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.partner-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    startAiConversation(btn.dataset.partner);
  });
});

function handleUserAiTurn(transcript, confidence = null) {
  if (!transcript.trim()) return;
  appendChatMessage('user', transcript);

  if (confidence !== null) {
    const pct = Math.round(confidence * 100);
    $('pronunciation-score').textContent = `${pct}% Clarity`;
    $('pronunciation-tip').textContent = pct >= 85
      ? 'Great articulation and pacing! Your B2 pronunciation was clearly recognized.'
      : 'Tip: Slow down slightly on multi-syllable words and enunciate word endings clearly.';
  } else {
    $('pronunciation-score').textContent = 'Text Mode';
    $('pronunciation-tip').textContent = 'Tip: Use the microphone button to get real-time speech recognition clarity scoring.';
  }

  const replies = AI_PROMPTS_BY_PARTNER[state.aiPartner] || AI_PROMPTS_BY_PARTNER.Kai;
  const reply = replies[Math.floor(Math.random() * replies.length)];
  setTimeout(() => {
    appendChatMessage('ai', `${state.aiPartner}: ${reply}`);
    speakAsPartner(reply);
  }, 500);
}

$('ai-send-btn').addEventListener('click', () => {
  const input = $('ai-text-input');
  handleUserAiTurn(input.value);
  input.value = '';
});

$('ai-text-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    handleUserAiTurn(e.target.value);
    e.target.value = '';
  }
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  $('mic-record-btn').addEventListener('click', () => {
    window.speechSynthesis.cancel();
    $('mic-record-btn').textContent = '🔴 Listening... Speak now';
    recognition.start();
  });

  recognition.onresult = (event) => {
    const res = event.results[0][0];
    $('mic-record-btn').textContent = '🎤 Click to Speak';
    handleUserAiTurn(res.transcript, res.confidence);
  };

  recognition.onerror = () => {
    $('mic-record-btn').textContent = '🎤 Click to Speak';
    $('pronunciation-tip').textContent = 'Microphone unavailable or blocked. Please allow mic permissions or type below.';
  };
} else {
  $('mic-record-btn').addEventListener('click', () => {
    $('pronunciation-tip').textContent = 'Speech recognition is best supported in Google Chrome or Microsoft Edge.';
  });
}
