/**
 * MyAnatomy Candidate Career Hub · Core Application Controller
 * Handles Onboarding, Quests, Gamified XP, Constellation, Feature Atlas, and Opportunities.
 */

(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));

  const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;

  const catalog = window.CandidateCatalog;
  const storage = window.AppStorage;

  const rewardValues = {
    profile: 50,
    'quiz-tech': 100,
    'quiz-data': 100,
    'quiz-design': 100,
    portfolio: 200
  };

  const tracks = {
    tech: {
      name: 'Tech & coding',
      short: 'Frontend Foundations',
      desc: 'Put your HTML, JavaScript, and web fundamentals to the test with interactive scenario questions.',
      target: 'Frontend Developer',
      label: 'CODING STARTER',
      project: 'A Project Worth Opening',
      projectDesc: 'Turn that side project into a compelling story. Show what you built and why it matters.',
      questions: [
        {
          q: 'Which HTML element is the most accessible and semantic choice for a clickable user action?',
          options: ['<div onclick="...">', '<button type="button">', '<span role="link">', '<a href="#">'],
          answer: 1,
          why: 'A <button> provides built-in keyboard accessibility (Enter/Space), proper screen-reader roles, and disabled states without extra ARIA.'
        },
        {
          q: 'What does [1, 2, 3].map(n => n * 2) return in JavaScript?',
          options: ['[1, 2, 3, 2]', '6', '[2, 4, 6]', '[1, 4, 9]'],
          answer: 2,
          why: 'The Array.prototype.map method creates a new array by executing the callback on each element, resulting in [2, 4, 6].'
        },
        {
          q: 'Which approach best ensures a web layout adapts seamlessly from mobile screens to 4K displays?',
          options: [
            'Use a rigid fixed 1440px width container',
            'Force all fonts to scale down below 8px',
            'Disable browser zooming with viewport tags',
            'Use responsive CSS Grid/Flexbox and container queries'
          ],
          answer: 3,
          why: 'Fluid grids combined with modern container queries and media breakpoints let content naturally rearrange to suit the available viewport.'
        }
      ]
    },
    data: {
      name: 'Data & analytics',
      short: 'Think Like an Analyst',
      desc: 'Spot patterns, question assumptions, and transform raw numbers into actionable business insights.',
      target: 'Data Analyst',
      label: 'ANALYTICS STARTER',
      project: 'Give Your Data a Story',
      projectDesc: 'Showcase an end-to-end analysis with a hypothesis, data prep steps, and key findings.',
      questions: [
        {
          q: 'What is the median of the following dataset: [2, 3, 4, 5, 100]?',
          options: ['4', '22.8', '5', '100'],
          answer: 0,
          why: 'The median is the middle value of an ordered dataset. Here it is 4, demonstrating that the median is resilient against extreme outliers.'
        },
        {
          q: 'In SQL, which clause is used to filter groups of records after aggregate calculations have occurred?',
          options: ['WHERE', 'ORDER BY', 'HAVING', 'GROUP BY'],
          answer: 2,
          why: 'HAVING filters aggregated groups (e.g. HAVING COUNT(*) > 5), whereas WHERE filters individual rows prior to aggregation.'
        },
        {
          q: 'If quarterly revenue and marketing ad spend rose together, what is the most scientifically sound conclusion?',
          options: [
            'Advertising definitively caused 100% of the revenue surge',
            'Correlation exists, but causation requires controlled testing',
            'Revenue always increases when marketing budgets grow',
            'The tracking telemetry must be flawed'
          ],
          answer: 1,
          why: 'Correlation does not imply causation. Seasonality, macro market shifts, or product launches may have driven both metrics simultaneously.'
        }
      ]
    },
    design: {
      name: 'Design & product',
      short: 'Human-Centered Design',
      desc: 'Explore usability principles, accessibility, and the architectural decisions behind intuitive digital products.',
      target: 'Product Designer',
      label: 'PRODUCT STARTER',
      project: 'Your Process, on Display',
      projectDesc: 'Build a case study making your discovery research, user personas, and interface iterations easy to explore.',
      questions: [
        {
          q: 'When qualitative user testing reveals users struggle to complete a checkout flow, what is the best first response?',
          options: [
            'Add more flashing animations to grab attention',
            'Directly copy a competitor checkout without researching why',
            'Observe user session recordings to uncover cognitive friction points',
            'Remove all explanatory text and field labels'
          ],
          answer: 2,
          why: 'Observing where users encounter friction reveals root causes, preventing the team from building premature or misplaced solutions.'
        },
        {
          q: 'What makes a form validation error message accessible and easy to correct for all users?',
          options: [
            'A faint red outline with no descriptive text',
            'Clear text adjacent to the field explaining the problem and fix',
            'A pop-up modal that disappears after 1 second',
            'Disabling the entire page until refreshed'
          ],
          answer: 1,
          why: 'Explaining what happened and how to fix it directly next to the field satisfies WCAG criteria without relying solely on color.'
        },
        {
          q: 'What is the primary objective of creating a low-fidelity paper or wireframe prototype?',
          options: [
            'Test conceptual interaction flows quickly before investing in visual polish',
            'Replace the need for speaking with real target users',
            'Guarantee product-market fit on day one',
            'Finalize brand typography and exact hex colors'
          ],
          answer: 0,
          why: 'Low-fidelity prototyping enables rapid, low-cost exploration and feedback on core value propositions and navigation flows.'
        }
      ]
    }
  };

  const opportunities = [
    {
      id: 'frontend',
      type: 'internship',
      company: 'Orbit Labs',
      logo: 'O',
      label: 'PRODUCT & ENGINEERING',
      role: 'Frontend Developer Intern',
      tags: ['React', 'TypeScript', 'UI/UX', 'Accessible Web'],
      location: 'Remote · Global',
      term: '3-Month Paid Internship',
      blurb: 'Join an agile product crew building next-generation developer tooling with a heavy focus on high-fidelity interfaces.',
      skills: 'HTML5, CSS3, JavaScript, React basics, Git workflows',
      work: 'Develop accessible UI components, collaborate in code reviews, and ship polished responsive pages to production.'
    },
    {
      id: 'analyst',
      type: 'job',
      company: 'Northstar Insights',
      logo: 'N',
      label: 'DATA & BUSINESS INTELLIGENCE',
      role: 'Associate Data Analyst',
      tags: ['SQL', 'Python', 'Power BI', 'Data Storytelling'],
      location: 'Bengaluru · Hybrid',
      term: 'Full-time · Entry Level',
      blurb: 'Turn raw operational metrics into executive dashboards that drive strategic product and growth initiatives.',
      skills: 'SQL queries, data cleaning, statistical modeling, data visualization',
      work: 'Build automated pipelines, discover funnel opportunities, and present findings in cross-functional syncs.'
    },
    {
      id: 'hackathon',
      type: 'event',
      company: 'Build Together Network',
      logo: '✦',
      label: 'COMMUNITY SPRINT',
      role: 'The Tomorrow Sprint Hackathon',
      tags: ['Collaborative Sprint', 'Portfolio Piece', 'Mentorship'],
      location: 'Online Community Event',
      term: '48-Hour Virtual Sprint',
      blurb: 'Form a cross-disciplinary team, tackle a pressing social good or AI challenge, and demo your working prototype.',
      skills: 'Ideation, rapid prototyping, teamwork, presentation',
      work: 'Define a user problem, build a functional MVP, and publish a case study with mentorship from industry engineers.'
    }
  ];

  // Application State
  let state = storage.load();
  let currentFilter = 'all';
  let toastTimer = null;
  let quiz = null;
  let dockDismissed = false;

  // Path & DNA selection state
  let persona = 'student';
  let group = 'all';
  let query = '';
  let dimension = 'coding';
  const visited = new Set();
  const dimensionAnswers = new Map();

  // Paths mapping
  const paths = {
    student: {
      name: 'I’m a student',
      note: 'Curiosity is your best starting point.',
      icon: 'graduation',
      title: 'Turn campus curiosity into real career momentum.',
      description: 'Build your foundation, experiment with real projects, and make your first work count. You don’t need it all figured out today.',
      features: ['profile', 'courses', 'sandbox', 'ncet', 'campus'],
      label: 'YOUR CAMPUS-TO-CAREER ROUTE'
    },
    fresher: {
      name: 'I’m a fresher',
      note: 'Ready for your first big yes.',
      icon: 'zap',
      title: 'You have real potential. Let’s make it impossible to miss.',
      description: 'Benchmark your readiness, give your projects a stunning home, and build an application that introduces the real you.',
      features: ['profile', 'ncet', 'portfolio', 'resume', 'offcampus'],
      label: 'YOUR FIRST-ROLE ROUTE'
    },
    seeker: {
      name: 'I’m a job seeker',
      note: 'Your next move deserves a real strategy.',
      icon: 'case',
      title: 'Make your applications intentional and impactful.',
      description: 'Pinpoint role expectations, close practical skill gaps, and present a portfolio that demonstrates your capability.',
      features: ['recommendation', 'matching', 'jobready', 'assessments', 'offcampus'],
      label: 'YOUR NEXT-MOVE ROUTE'
    }
  };

  const feature = (id) => catalog.features.find(f => f.id === id);

  const featureNames = {
    profile: 'Profile Builder',
    resume: 'Resume Builder',
    matching: 'JD–CV Matching',
    portfolio: 'Portfolio Studio',
    ncetplus: 'NCET+ Advanced Program',
    campus: 'Campus Drives',
    offcampus: 'Off-campus Roles'
  };

  const title = (f) => featureNames[f.id] || f.title;

  const featureGroups = {
    all: { label: 'All Features', number: '00' },
    identity: { label: 'Create Your Identity', number: '01' },
    growth: { label: 'Build & Prove Skills', number: '02' },
    community: { label: 'Join & Compete', number: '03' },
    career: { label: 'Find Your Next Role', number: '04' },
    recognition: { label: 'Earn Recognition', number: '05' }
  };

  // Notification Toast
  function notify(message) {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 4200);
  }

  // Gamified XP System
  function totalXP() {
    return state.rewards.reduce((sum, id) => sum + (rewardValues[id] || 0), 0);
  }

  function getLevel() {
    const xp = totalXP();
    if (xp >= 350) return { n: 3, name: 'Trailblazer', floor: 350, next: 550 };
    if (xp >= 150) return { n: 2, name: 'Builder', floor: 150, next: 350 };
    return { n: 1, name: 'Explorer', floor: 0, next: 150 };
  }

  function celebrate() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const box = $('#confetti');
    if (!box) return;
    box.replaceChildren();
    for (let i = 0; i < 35; i++) {
      const p = document.createElement('i');
      p.style.setProperty('--x', `${(Math.random() - 0.5) * 750}px`);
      p.style.setProperty('--y', `${(Math.random() - 0.7) * 630}px`);
      p.style.setProperty('--r', `${Math.random() * 960}deg`);
      p.style.animationDelay = `${Math.random() * 0.15}s`;
      box.appendChild(p);
    }
    setTimeout(() => box.replaceChildren(), 2000);
  }

  function reward(id, amount, label) {
    if (!Object.hasOwn(rewardValues, id) || state.rewards.includes(id)) return;
    state.rewards.push(id);
    storage.save(state);
    updateUI();
    renderQuests();
    celebrate();
    notify(`+${rewardValues[id]} XP Earned! · ${label} unlocked.`);
  }

  function updateUI() {
    const xp = totalXP();
    const l = getLevel();

    $('#hero-xp').textContent = xp;
    $('#xp-limit').textContent = l.next;
    $('#hero-xp-bar').style.width = `${Math.min(100, Math.max(0, 100 * (xp - l.floor) / (l.next - l.floor)))}%`;
    $('#level-name').textContent = `Level ${l.n} · ${l.name}`;

    $('#level-help').textContent = xp >= 550
      ? 'All milestone quests complete! Your candidate showcase is ready.'
      : xp
      ? `${l.next - xp} XP needed to reach ${l.n === 3 ? 'Mastery' : 'Level ' + (l.n + 1)}. Keep exploring!`
      : 'Your first quest starts with creating your player profile.';

    if (state.player) {
      $('#greeting').innerHTML = `Hey, ${esc(state.player.name)} <span>✦</span>`;
      const initials = state.player.name.slice(0, 2).toUpperCase();
      $('#avatar').replaceChildren(document.createTextNode(initials), document.createElement('span'));
      $('#mission-button').innerHTML = `Edit player profile ${icon('arrow')}`;
    }

    if (!dockDismissed) {
      $('#progress-dock').hidden = !state.player && xp === 0;
    }
    $('#dock-name').textContent = state.player ? `${state.player.name}’s Career HQ` : 'Your Career HQ';
    $('#dock-progress').textContent = `${xp} XP · Level ${l.n} ${l.name}`;

    $('#saved-count').textContent = state.saved.length;

    $$('[data-track]').forEach(b => {
      const active = b.dataset.track === state.track;
      b.classList.toggle('selected', active);
      b.setAttribute('aria-pressed', String(active));
    });
  }

  function setTrack(t) {
    if (!tracks[t]) return;
    state.track = t;
    storage.save(state);
    updateUI();
    renderQuests();
  }

  // Dialog Helpers
  function openDialog(id) {
    const d = document.getElementById(id);
    if (d && !d.open) d.showModal();
  }

  function closeDialog(id) {
    const d = document.getElementById(id);
    if (d && d.open) d.close();
  }

  // Onboarding Flow
  function openOnboarding() {
    $('#player-name').value = state.player?.name || '';
    $('#player-track').value = state.track;
    $('#player-stage').value = state.player?.stage || 'Student · exploring my options';
    $('#onboard-error').textContent = '';
    openDialog('onboard-dialog');
    setTimeout(() => $('#player-name').focus(), 30);
  }

  function openPortfolioStudio() {
    window.PortfolioBuilder?.open();
  }

  // Quests Rendering
  function renderQuests() {
    const t = tracks[state.track];
    const done = state.rewards.includes(`quiz-${state.track}`);
    const cards = [
      {
        kind: 'challenge',
        icon: 'code',
        color: 'lavender',
        xp: done ? 'COMPLETED ✓' : '+100 XP',
        label: t.label,
        title: t.short,
        desc: t.desc,
        time: '3 Interactive Questions',
        level: 'Beginner Friendly',
        cta: done ? 'Practice Again' : 'Take Challenge'
      },
      {
        kind: 'portfolio',
        icon: 'grid',
        color: 'peach',
        xp: state.rewards.includes('portfolio') ? 'COMPLETED ✓' : '+200 XP',
        label: 'SHOW YOUR WORK',
        title: t.project,
        desc: t.projectDesc,
        time: 'At Your Own Pace',
        level: 'Portfolio Quest',
        cta: 'Build My Showcase'
      },
      {
        kind: 'path',
        icon: 'book',
        color: 'green',
        xp: 'STRATEGIC GUIDE',
        label: 'MAKE A PLAN',
        title: 'Your Growth Roadmap',
        desc: `Explore the core skills expected of a modern ${t.target.toLowerCase()} and map your next steps.`,
        time: '3 Practical Phases',
        level: 'Career Strategy',
        cta: 'Explore Roadmap'
      }
    ];

    $('#quest-cards').innerHTML = cards.map(c => `
      <article class="quest-card">
        <div class="quest-card-top">
          <span class="quest-card-icon ${c.color}">${icon(c.icon)}</span>
          <span class="card-xp">${c.xp}</span>
        </div>
        <span class="small-caps">${c.label}</span>
        <h3>${c.title}</h3>
        <p>${c.desc}</p>
        <div class="quest-meta">
          <span>${icon('clock')}${c.time}</span>
          <span>◦ ${c.level}</span>
        </div>
        <button class="btn" data-action="${c.kind}">${c.cta} ${icon('arrow')}</button>
      </article>
    `).join('');
  }

  // Quiz Modal Engine
  function startQuiz() {
    quiz = {
      track: state.track,
      index: 0,
      answers: [],
      selected: null
    };
    renderQuiz();
    openDialog('quiz-dialog');
  }

  function renderQuiz() {
    const t = tracks[quiz.track];
    const q = t.questions[quiz.index];
    const answered = quiz.selected !== null;

    $('#quiz-content').innerHTML = `
      <span class="dialog-emblem">${icon('zap')}</span>
      <span class="eyebrow purple-text">PRACTICE QUEST · ${t.name.toUpperCase()}</span>
      <div class="quiz-progress" aria-label="Question ${quiz.index + 1} of 3">
        ${t.questions.map((_, i) => `<i class="${i <= quiz.index ? 'done' : ''}"></i>`).join('')}
      </div>
      <span class="small-caps">QUESTION ${quiz.index + 1} OF 3 · +100 XP FOR PASSING</span>
      <h3 class="quiz-question">${esc(q.q)}</h3>
      <div class="quiz-options" aria-label="Answer choices">
        ${q.options.map((o, i) => `
          <button class="quiz-option ${answered && i === q.answer ? 'correct' : ''} ${answered && i === quiz.selected && i !== q.answer ? 'wrong' : ''}" data-answer="${i}" ${answered ? 'disabled' : ''}>
            <span>${String.fromCharCode(65 + i)}</span>${esc(o)}
          </button>
        `).join('')}
      </div>
      ${answered ? `
        <div class="quiz-explanation" role="status">
          <b>${quiz.selected === q.answer ? '✓ Correct!' : '💡 Learning Moment:'}</b> ${esc(q.why)}
        </div>
        <button class="btn btn-primary quiz-next" id="quiz-next">
          ${quiz.index === 2 ? 'See My Results' : 'Next Question'} ${icon('arrow')}
        </button>
      ` : '<p class="form-privacy">Untimed practice challenge. Review and learn at your own rhythm.</p>'}
    `;
  }

  function chooseAnswer(answer) {
    if (!quiz || quiz.selected !== null || !Number.isInteger(answer) || answer < 0 || answer > 3) return;
    quiz.selected = answer;
    quiz.answers.push(answer);
    renderQuiz();
    $('#quiz-next')?.focus();
  }

  function nextQuestion() {
    if (!quiz || quiz.selected === null) return;
    if (quiz.index < 2) {
      quiz.index++;
      quiz.selected = null;
      renderQuiz();
      $('.quiz-option')?.focus();
    } else {
      finishQuiz();
    }
  }

  function finishQuiz() {
    const t = tracks[quiz.track];
    const score = quiz.answers.reduce((s, a, i) => s + (a === t.questions[i].answer ? 1 : 0), 0);
    const passed = score >= 2;
    const wasDone = state.rewards.includes(`quiz-${quiz.track}`);

    if (passed) {
      reward(`quiz-${quiz.track}`, 100, `${t.name} Mastery Quest`);
    }

    $('#quiz-content').innerHTML = `
      <div class="quiz-result">
        <span class="result-medal">${icon(passed ? 'badge' : 'book')}</span>
        <span class="eyebrow purple-text" style="justify-content:center">${score} OF 3 CORRECT · ${passed ? 'QUEST PASSED' : 'CONTINUE LEARNING'}</span>
        <h2>${passed ? 'Outstanding Effort!' : 'Every Attempt Sharpens Your Mind.'}</h2>
        <p>
          ${passed
            ? (wasDone
              ? 'You have already collected this badge. Excellent work keeping your skills razor-sharp.'
              : 'You unlocked 100 XP and added a new badge to your achievements collection!')
            : 'Scoring at least 2/3 unlocks the achievement badge. Review the concepts and give it another spin!'}
          <br><small>Practice evaluation · not an accredited certification.</small>
        </p>
        <button class="btn btn-primary" data-quiz-result="${passed ? 'portfolio' : 'retry'}">
          ${passed ? 'Showcase Skills in Portfolio' : 'Retry Quest Challenge'} ${icon('arrow')}
        </button>
        <button class="btn btn-outline" data-close="quiz-dialog">Return to Hub</button>
      </div>
    `;
  }

  // Progress & Badges Dialog
  function showProgress() {
    const l = getLevel();
    const badges = [
      ['profile', 'First Step', 'Create your candidate profile', 'star'],
      ['quiz-tech', 'Code Curious', 'Pass the Tech & Coding challenge', 'code'],
      ['quiz-data', 'Pattern Finder', 'Pass the Data & Analytics challenge', 'zap'],
      ['quiz-design', 'Design Thinker', 'Pass the Design & Product challenge', 'book'],
      ['portfolio', 'Show, Don’t Tell', 'Build and export your portfolio', 'grid']
    ];

    $('#progress-content').innerHTML = `
      <span class="eyebrow purple-text">THE POWER OF SMALL WINS</span>
      <h2>Your Progress.<br><span class="serif-word">Your Momentum.</span></h2>
      <div class="progress-total">
        <b>${totalXP()} XP</b>
        <span>Level ${l.n} · ${l.name}</span>
        <div class="xp-track">
          <div style="width:${Math.min(100, Math.max(0, 100 * (totalXP() - l.floor) / (l.next - l.floor)))}%"></div>
        </div>
      </div>
      <p class="dialog-copy">
        ${totalXP() >= 550 ? '🎉 Incredible! You have completed every milestone quest in the candidate demo!' : `${l.next - totalXP()} XP until your next level milestone.`}
        Badges recognize effort, exploration, and practice on the MyAnatomy demo platform.
      </p>
      <div class="badge-grid">
        ${badges.map(([id, name, desc, ic]) => `
          <div class="achievement ${state.rewards.includes(id) ? '' : 'locked'}">
            <span>${icon(ic)}</span>
            <b>${name}${state.rewards.includes(id) ? ' ✓' : ''}</b>
            <p>${desc}</p>
          </div>
        `).join('')}
      </div>
    `;
    openDialog('progress-dialog');
  }

  // Roadmap Dialog
  function showRoadmap() {
    const t = tracks[state.track];
    const steps = {
      tech: [
        'Master Semantic HTML5, Modern CSS (Flexbox/Grid), and ES6+ JavaScript fundamentals.',
        'Engineer a responsive, accessible single-page web app and document your problem-solving process.',
        'Curate your source code, architecture decisions, and live demo inside your Portfolio Studio.'
      ],
      data: [
        'Solidify spreadsheet manipulation, statistical foundations, and SQL relational querying.',
        'Explore a public dataset, formulate a business question, and surface high-value insights.',
        'Assemble a data case study highlighting visualizations, metrics, and methodology limitations.'
      ],
      design: [
        'Conduct generative user interviews and distill findings into actionable user journey maps.',
        'Iterate from paper wireframes to interactive Figma prototypes testing core assumptions.',
        'Document research rationale, component design systems, and usability lessons in your portfolio.'
      ]
    };

    $('#opportunity-content').innerHTML = `
      <span class="dialog-emblem">${icon('book')}</span>
      <span class="eyebrow purple-text">${t.name.toUpperCase()} · STRATEGIC ROADMAP</span>
      <h2>A Clear Route.<br><span class="serif-word">Real Momentum.</span></h2>
      <p class="dialog-copy">A structured roadmap tailored for candidates pursuing ${t.target.toLowerCase()} positions.</p>
      <ul class="detail-list">
        ${steps[state.track].map((s, i) => `<li><strong>Phase 0${i + 1}</strong><br>${s}</li>`).join('')}
      </ul>
      <button class="btn btn-primary full-width" data-path-start>
        Take Practice Challenge Now ${icon('arrow')}
      </button>
    `;
    openDialog('opportunity-dialog');
  }

  // Opportunities Section
  function renderOpportunities() {
    const items = opportunities.filter(o =>
      currentFilter === 'all' || (currentFilter === 'saved' ? state.saved.includes(o.id) : o.type === currentFilter)
    );

    $('#opportunity-cards').innerHTML = items.length ? items.map(o => `
      <article class="opportunity-card">
        <div class="opportunity-top">
          <span class="company-logo">${o.logo}</span>
          <div class="company-info">
            <b>${o.company}</b>
            <span>${o.label}</span>
          </div>
          <button class="icon-btn save-btn ${state.saved.includes(o.id) ? 'saved' : ''}" data-save="${o.id}" aria-label="${state.saved.includes(o.id) ? 'Unsave' : 'Save'} ${o.role}" aria-pressed="${state.saved.includes(o.id)}">
            ${icon('save')}
          </button>
        </div>
        <h3>${o.role}</h3>
        <div class="job-tags">${o.tags.map(t => `<span>${t}</span>`).join('')}</div>
        <div class="opportunity-bottom">
          <span>${o.location}</span>
          <button class="text-btn" data-opportunity="${o.id}">View Details ${icon('up')}</button>
        </div>
      </article>
    `).join('') : `
      <div class="empty-state">
        <h3>Your Shortlist is Currently Empty</h3>
        <p>Click the bookmark icon on any opportunity or challenge to save it here for quick access.</p>
      </div>
    `;

    $('#saved-count').textContent = state.saved.length;
    $$('[data-filter]').forEach(b => {
      const active = b.dataset.filter === currentFilter;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });
  }

  function toggleSaveOpportunity(id) {
    if (state.saved.includes(id)) {
      state.saved = state.saved.filter(x => x !== id);
      notify('Removed from your saved shortlist.');
    } else {
      state.saved.push(id);
      notify('Saved to your shortlist! Great career direction.');
    }
    storage.save(state);
    renderOpportunities();
  }

  function showOpportunityDetail(id) {
    const o = opportunities.find(x => x.id === id);
    if (!o) return;

    $('#opportunity-content').innerHTML = `
      <span class="dialog-emblem">${icon('case')}</span>
      <span class="eyebrow purple-text">OPPORTUNITY DETAIL · ${o.type.toUpperCase()}</span>
      <h2>${o.role}</h2>
      <p class="dialog-copy">${o.company} · ${o.location}<br>${o.blurb}</p>
      <ul class="detail-list">
        <li><strong>Format & Duration</strong><br>${o.term}</li>
        <li><strong>Demonstrated Skills Expected</strong><br>${o.skills}</li>
        <li><strong>Role Responsibilities</strong><br>${o.work}</li>
      </ul>
      <button class="btn btn-primary full-width" data-detail-save="${o.id}">
        ${state.saved.includes(id) ? 'Remove from Shortlist' : 'Bookmark this Opportunity'} ${icon('save')}
      </button>
      <p class="form-privacy">Interactive prototype preview. Live applications connect via production recruitment feeds.</p>
    `;
    openDialog('opportunity-dialog');
  }

  // Candidate Path Experience
  function renderPath() {
    const p = paths[persona];
    $('#path-experience').innerHTML = `
      <div class="ex-path-intro">
        <div>
          <span class="eyebrow purple-text">EVERY JOURNEY IS UNIQUE</span>
          <h2>Start Where You Are.<br><span class="serif-word">Go Where You Dream.</span></h2>
        </div>
        <p>You bring the ambition.<br>We’ll help you chart your roadmap.</p>
        <span class="ex-path-doodle" aria-hidden="true">↳</span>
      </div>
      <div class="ex-personas" aria-label="Select your candidate persona">
        ${Object.entries(paths).map(([id, x]) => `
          <button class="ex-persona ${id === persona ? 'is-selected' : ''}" data-persona="${id}" aria-pressed="${id === persona}">
            <span class="ex-persona-icon">${icon(x.icon)}</span>
            <span><b>${x.name}</b><small>${x.note}</small></span>
            <span class="ex-choice-dot">${id === persona ? '✓' : ''}</span>
          </button>
        `).join('')}
      </div>
      <div class="ex-route">
        <div class="ex-route-copy">
          <span class="eyebrow">${p.label}</span>
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <a href="https://match.myanatomy.in/signup" target="_blank" rel="noopener noreferrer" class="text-btn">
            Make this my official starting point ${icon('up')}
          </a>
        </div>
        <div class="ex-route-stops">
          ${p.features.map((id, i) => `
            <button data-feature="${id}" class="ex-stop">
              <span class="ex-stop-node">${icon(feature(id).icon)}<i>${i + 1}</i></span>
              <b>${title(feature(id))}</b>
              <span>Explore ↗</span>
            </button>
          `).join('')}
          <p>Curated progression · click any tool to inspect its capabilities.</p>
        </div>
      </div>
    `;
  }

  // Skill DNA Constellation
  function renderDNA() {
    const cx = 250;
    const cy = 215;
    const r = 139;
    const nodes = catalog.dimensions.map((d, i) => {
      const a = (-90 + i * 60) * Math.PI / 180;
      return {
        ...d,
        x: cx + Math.cos(a) * r,
        y: cy + Math.sin(a) * r
      };
    });

    $('#dna-experience').innerHTML = `
      <div class="section-heading">
        <div>
          <span class="eyebrow purple-text">DISCOVER YOUR SKILL CONSTELlATION</span>
          <h2>You’re Not Just One Skill.<br><span class="serif-word">You’re a Whole Constellation.</span></h2>
          <p>Six essential dimensions. Balanced evaluation. A comprehensive perspective on your strengths.</p>
        </div>
        <button class="text-btn" data-feature="ncet">Discover NCET Assessment ${icon('arrow')}</button>
      </div>
      <div class="ex-dna-layout">
        <div class="ex-constellation">
          <svg viewBox="0 0 500 450" class="ex-star-map" aria-hidden="true">
            <defs>
              <radialGradient id="dna-glow">
                <stop stop-color="#dcc9f5" stop-opacity=".65"/>
                <stop offset="1" stop-color="#f6f1fb" stop-opacity="0"/>
              </radialGradient>
            </defs>
            <circle cx="250" cy="215" r="210" fill="url(#dna-glow)"/>
            <circle class="ex-orbit-path" cx="250" cy="215" r="174"/>
            <circle class="ex-orbit-path inner" cx="250" cy="215" r="100"/>
            <polygon class="ex-hex" points="${nodes.map(n => `${n.x},${n.y}`).join(' ')}"/>
            ${nodes.map(n => `<path class="ex-spoke" d="M250 215L${n.x} ${n.y}"/>`).join('')}
            <g class="ex-dna-orbit">
              <circle cx="250" cy="41" r="4"/>
              <circle cx="250" cy="389" r="3"/>
            </g>
          </svg>
          <div class="ex-dna-core">
            <span class="ex-core-icon">${icon('star')}</span>
            <small>HOLISTIC TALENT RADAR</small>
            <b>Explore Your<br><em>Strengths.</em></b>
          </div>
          ${nodes.map(d => `
            <button class="ex-dna-node ${d.id === dimension ? 'active' : ''}" data-dimension="${d.id}" aria-pressed="${d.id === dimension}" style="left:${d.x / 5}%;top:${d.y / 4.5}%">
              <span>${icon(d.id === 'coding' ? 'code' : d.id === 'domain' ? 'book' : d.id === 'aptitude' ? 'star' : d.id === 'cognitive' ? 'star' : d.id === 'eq' ? 'badge' : 'file')}</span>
              <b>${d.id === 'eq' ? 'EQ' : d.title}</b>
              <i>${dimensionAnswers.has(d.id) ? '✓' : '+'}</i>
            </button>
          `).join('')}
          <p class="ex-constellation-note">SELECT ANY DIMENSION · TRY A SAMPLE QUESTION</p>
        </div>
        <div class="ex-dna-detail" id="dna-detail"></div>
      </div>
    `;
    renderDimensionDetail();
  }

  function renderDimensionDetail() {
    const d = catalog.dimensions.find(x => x.id === dimension);
    if (!d) return;

    $('#dna-detail').innerHTML = `
      <div class="ex-dimension-top">
        <span class="ex-small-tag">${String(catalog.dimensions.indexOf(d) + 1).padStart(2, '0')} / 06</span>
        <span class="ex-dimension-dots">
          ${catalog.dimensions.map(x => `<i class="${x.id === dimension ? 'on' : ''}"></i>`).join('')}
        </span>
      </div>
      <span class="eyebrow purple-text">${esc(d.tagline).toUpperCase()}</span>
      <h3>${esc(d.title)} <span>↗</span></h3>
      <p>${esc(d.description)}</p>
      <ul class="ex-measures">
        ${d.measures.map(m => `<li>${icon('check')} ${esc(m)}</li>`).join('')}
      </ul>
      <button class="btn btn-primary" data-sample-dimension="${d.id}">
        Try a Sample Question ${icon('arrow')}
      </button>
      <span class="ex-disclaimer">Interactive preview · reflects real assessment methodology</span>
      <div class="ex-dna-foot">
        <span>${dimensionAnswers.size} of 6 dimensions tested</span>
        <a href="https://match.myanatomy.in/login" target="_blank" rel="noopener noreferrer">Sign in for official NCET ↗</a>
      </div>
    `;

    $$('[data-dimension]').forEach(n => {
      n.classList.toggle('active', n.dataset.dimension === dimension);
      n.setAttribute('aria-pressed', String(n.dataset.dimension === dimension));
      const dot = n.querySelector('i');
      if (dot) dot.textContent = dimensionAnswers.has(n.dataset.dimension) ? '✓' : '+';
    });
  }

  function openDimensionLab(id) {
    dimension = id;
    const d = catalog.dimensions.find(x => x.id === id);
    if (!d) return;

    const labDialog = $('#lab-dialog');
    $('#lab-content').innerHTML = `
      <header class="ex-lab-header">
        <div>
          <span class="eyebrow purple-text">SAMPLE QUESTION · ${esc(d.title).toUpperCase()}</span>
          <h2 id="ex-lab-title">${esc(d.question)}</h2>
        </div>
        <button class="ex-close" data-close-lab aria-label="Close question preview">
          ${icon('close')}
        </button>
      </header>
      <div class="ex-lab-main">
        <span class="ex-small-tag">${esc(d.tagline)}</span>
        <div class="ex-dimension-options" style="margin-top:20px;">
          ${d.options.map((v, i) => `
            <button data-dimension-answer="${i}">
              <span>${String.fromCharCode(65 + i)}</span>${esc(v)}
            </button>
          `).join('')}
        </div>
        <div id="dimension-feedback" aria-live="polite"></div>
        <p class="ex-disclaimer">
          Single illustrative question. Actual NCET evaluations contain multi-tiered, adaptive question sets.
        </p>
      </div>
    `;
    if (!labDialog.open) labDialog.showModal();
  }

  function answerDimensionQuestion(ans) {
    const d = catalog.dimensions.find(x => x.id === dimension);
    if (!d) return;

    dimensionAnswers.set(d.id, ans);
    $$('[data-dimension-answer]').forEach(b => {
      b.disabled = true;
      const i = Number(b.dataset.dimensionAnswer);
      b.classList.toggle('correct', i === d.answer);
      b.classList.toggle('incorrect', i === ans && ans !== d.answer);
    });

    $('#dimension-feedback').innerHTML = `
      <div class="ex-answer-feedback">
        <b>${ans === d.answer ? '✓ Excellent deduction!' : '💡 Conceptual Explanation:'}</b>
        <p>${esc(d.explanation)}</p>
      </div>
      <div class="ex-lab-next">
        <button class="btn btn-primary" data-next-dimension>
          Try Next Dimension (${catalog.dimensions[(catalog.dimensions.findIndex(x => x.id === dimension) + 1) % 6].title}) ${icon('arrow')}
        </button>
        <a href="https://match.myanatomy.in/login" target="_blank" rel="noopener noreferrer">Take full NCET on MyAnatomy ↗</a>
      </div>
    `;
    renderDimensionDetail();
  }

  // Platform Feature Atlas
  function renderFeatures() {
    const counts = Object.fromEntries(
      Object.keys(featureGroups).map(g => [
        g,
        g === 'all' ? catalog.features.length : catalog.features.filter(f => f.group === g).length
      ])
    );

    $('#feature-experience').innerHTML = `
      <div class="section-heading">
        <div>
          <span class="eyebrow purple-text">ONE UNIFIED CAREER ECOSYSTEM</span>
          <h2>Your Entire Career Toolkit.<br><span class="serif-word">Not 18 Disconnected Tabs.</span></h2>
          <p>Everything you need from identity to interviews, unified in one platform.</p>
        </div>
        <div class="ex-passport" id="discovery-passport"></div>
      </div>
      <div class="ex-atlas-toolbar">
        <div class="ex-group-tabs" aria-label="Filter feature categories">
          ${Object.entries(featureGroups).map(([id, g]) => `
            <button data-group="${id}" class="${group === id ? 'active' : ''}" aria-pressed="${group === id}">
              ${g.label} <span>${counts[id]}</span>
            </button>
          `).join('')}
        </div>
        <label class="ex-search">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/></svg>
          <input id="feature-search" type="search" value="${esc(query)}" placeholder="Search 18 career tools…" aria-label="Search features">
        </label>
      </div>
      <div class="ex-atlas-info">
        <span id="feature-result-count" aria-live="polite"></span>
        <span>Click any tool to preview its interface and capabilities.</span>
      </div>
      <div class="ex-feature-grid" id="feature-grid"></div>
      <div class="ex-atlas-signin">
        <span>${icon('star')} Connect all 18 tools with your free candidate account.</span>
        <a class="btn btn-dark" href="https://match.myanatomy.in/login" target="_blank" rel="noopener noreferrer">
          Sign In to MyAnatomy ${icon('up')}
        </a>
      </div>
    `;

    renderFeatureCards();
    renderPassport();

    $('#feature-search').addEventListener('input', (e) => {
      query = e.target.value;
      renderFeatureCards();
    });
  }

  function renderFeatureCards() {
    const q = query.trim().toLowerCase();
    const items = catalog.features.filter(f =>
      (group === 'all' || group === f.group) &&
      `${title(f)} ${f.summary} ${f.details.join(' ')}`.toLowerCase().includes(q)
    );

    $('#feature-result-count').textContent = `${items.length} ${items.length === 1 ? 'feature' : 'features'} available`;

    $('#feature-grid').innerHTML = items.length ? items.map((f, i) => `
      <button class="ex-feature-card ex-group-${f.group} ${visited.has(f.id) ? 'visited' : ''}" data-feature="${f.id}" style="--card-delay:${Math.min(i, 5) * 35}ms">
        <span class="ex-feature-top">
          <span class="ex-feature-icon">${icon(f.icon)}</span>
          <span class="ex-card-category">${featureGroups[f.group].number} · ${f.eyebrow}</span>
          <span class="ex-seen">${visited.has(f.id) ? '✓' : '↗'}</span>
        </span>
        <h3>${title(f)}</h3>
        <p>${esc(f.summary)}</p>
        <span class="ex-feature-bottom">
          <span>${f.id === 'assessments' ? '6 Skill Dimensions' : f.id === 'portfolio' ? 'Live Portfolio Studio' : f.id === 'matching' ? 'Interactive Matching Lab' : f.id === 'resume' ? 'Live Resume Lab' : featureGroups[f.group].label}</span>
          <b>Explore Tool ${icon('arrow')}</b>
        </span>
      </button>
    `).join('') : `
      <div class="empty-state">
        <h3>No matching tools found</h3>
        <p>Try searching for "resume", "skills", "NCET", or "portfolio".</p>
        <button class="text-btn" data-clear-search>View All 18 Features →</button>
      </div>
    `;

    $$('[data-group]').forEach(b => {
      b.classList.toggle('active', b.dataset.group === group);
      b.setAttribute('aria-pressed', String(b.dataset.group === group));
    });
  }

  function renderPassport() {
    const node = $('#discovery-passport');
    if (node) {
      node.innerHTML = `
        <span class="ex-passport-stamp">${icon(visited.size === 18 ? 'badge' : 'star')}</span>
        <div>
          <span>CANDIDATE PASSPORT</span>
          <b>${visited.size}<small> / 18 Explored</small></b>
          <div class="ex-passport-line">
            <i style="width:${(visited.size / 18) * 100}%"></i>
          </div>
          <small>Interactive session discovery tracker</small>
        </div>
      `;
    }
  }

  function previewForFeature(f) {
    if (f.id === 'resume') {
      return `
        <div class="ex-paper-demo">
          <span class="ex-paper-cap">PROFILE → ATS RESUME</span>
          <h3>${esc(state.player?.name || 'Your Name')}</h3>
          <p>${esc(tracks[state.track]?.target || 'Target Role')}</p>
          <i></i><i></i><i class="short"></i>
          <b>EXPERIENCE & IMPACT</b>
          <i></i><i></i>
          <b>CORE SKILLS & TECH</b>
          <div class="ex-mini-tags"><span>JAVASCRIPT</span><span>REACT</span><span>GIT</span></div>
          <span class="ex-paper-seal">100%<small>MATCH READY</small></span>
        </div>
      `;
    }
    if (f.id === 'matching') {
      return `
        <div class="ex-match-art">
          <div><span>YOUR RESUME</span><b>JavaScript</b><b>React</b><b>HTML/CSS</b></div>
          <i>⇄</i>
          <div><span>JOB TARGET</span><b class="matched">JavaScript ✓</b><b class="matched">React ✓</b><b class="missing">Docker +</b></div>
          <p>Instant keyword overlap analysis.<br><small>Identifies targeted strengths and actionable gaps.</small></p>
        </div>
      `;
    }
    if (f.id === 'sandbox') {
      return `
        <div class="ex-code-demo">
          <div><span>sandbox.js</span><i>LIVE INTERACTIVE EXECUTION</i></div>
          <pre><span>// Live JavaScript Sandbox</span>\nfunction total(values) {\n  return values.reduce((sum, n) => sum + n, 0);\n}</pre>
          <label>Test Array Input:<input id="sandbox-values" value="12, 28, 45, 15" aria-label="Comma-separated numbers"></label>
          <button class="btn btn-lime" data-run-sandbox>Execute Code ${icon('arrow')}</button>
          <output id="sandbox-result">Ready for input.</output>
        </div>
      `;
    }
    if (f.id === 'badges') {
      return `
        <div class="ex-badges-art">
          <span>DISCOVERABLE MILESTONES</span>
          <div>
            ${['star', 'code', 'badge'].map((x, i) => `
              <button data-reveal-badge="${i}" aria-label="Reveal badge ${i + 1}">
                ${icon(x)}
                <span>Tap to Flip</span>
              </button>
            `).join('')}
          </div>
          <p id="badge-reveal-copy">Tap any badge above to inspect milestone criteria.</p>
        </div>
      `;
    }
    if (f.id === 'certificates') {
      return `
        <div class="ex-certificate-art">
          <span>PORTABLE ACCREDITATION</span>
          <div>${icon('badge')}</div>
          <h3>Certificate of Completion</h3>
          <i>Your Name Here</i>
          <p>Issued upon verified completion of platform skill programs.</p>
          <b>VERIFIABLE DIGITAL CREDENTIAL</b>
        </div>
      `;
    }
    if (f.id === 'leaderboard') {
      return `
        <div class="ex-leaderboard-art">
          <span>CHALLENGE SPRINT STANDINGS</span>
          <h3>Community Momentum</h3>
          ${['Ananya R.', 'Kavya S.', 'Rohan M.'].map((n, i) => `
            <div><b>0${i + 1}</b><span>${n}</span><i>${[920, 840, 780][i]} XP</i></div>
          `).join('')}
          <small>Friendly challenge standings celebrate active practice.</small>
        </div>
      `;
    }
    if (f.id === 'portfolio') {
      return `
        <div class="ex-portfolio-art">
          <span class="ex-portfolio-mini-nav">PORTFOLIO STUDIO <i>CANVAS · MIDNIGHT · EDITORIAL</i></span>
          <h3>Proof Over Promises.</h3>
          <div><span>01<br>LIVE CASE STUDY</span><span>02<br>INTERACTIVE DEMO</span></div>
          <p>Exportable single-page website builder with zero code required.</p>
        </div>
      `;
    }

    return `
      <div class="ex-checklist-art">
        <span>${featureGroups[f.group].number} · STRATEGIC IMPLEMENTATION PLAN</span>
        <div class="ex-preview-emblem">${icon(f.icon)}</div>
        <h3>${esc(f.headline)}</h3>
        <p>Actionable preparation steps:</p>
        ${f.details.map(d => `<label><input type="checkbox" data-preview-check><span>${esc(d)}</span></label>`).join('')}
        <small id="preview-check-status">Check off tasks as you progress.</small>
      </div>
    `;
  }

  function openFeatureDetail(id) {
    const f = feature(id);
    if (!f) return;

    visited.add(id);
    renderFeatureCards();
    renderPassport();

    const quickActions = {
      profile: ['Launch Profile Setup', 'profile'],
      resume: ['Open Resume Quick-Draft Lab', 'resume'],
      matching: ['Open JD–CV Matching Lab', 'matching'],
      portfolio: ['Launch Portfolio Studio', 'portfolio'],
      assessments: ['Explore 6 Skill Dimensions', 'dimensions'],
      ncet: ['Explore NCET Dimensions', 'dimensions']
    };
    const action = quickActions[id];

    $('#feature-detail-content').innerHTML = `
      <div class="ex-detail-header">
        <span class="ex-detail-brand">MYANATOMY · CAREER ECOSYSTEM</span>
        <button class="ex-close" data-close-feature aria-label="Close feature details">${icon('close')}</button>
      </div>
      <div class="ex-detail-body">
        <div class="ex-detail-copy">
          <span class="ex-detail-icon ex-group-${f.group}">${icon(f.icon)}</span>
          <span class="eyebrow purple-text">${featureGroups[f.group].label.toUpperCase()} · ${esc(f.eyebrow).toUpperCase()}</span>
          <h2 id="ex-detail-title">${title(f)}</h2>
          <h3>${esc(f.headline)}</h3>
          <p>${esc(f.summary)}</p>
          <ol>
            ${f.details.map((x, i) => `<li><span>0${i + 1}</span>${esc(x)}</li>`).join('')}
          </ol>
          <div class="ex-outcome">
            ${icon('check')} <span>${esc(f.outcome)}</span>
          </div>
        </div>
        <div class="ex-detail-preview">
          <span class="ex-preview-label">INTERACTIVE PREVIEW</span>
          ${previewForFeature(f)}
          ${action ? `
            <button class="btn btn-white" data-open-demo="${action[1]}">
              ${action[0]} ${icon('arrow')}
            </button>
          ` : ''}
        </div>
      </div>
      <div class="ex-detail-footer">
        <div>
          <b>Ready to unlock ${title(f)}?</b>
          <span>Official assessments, live hiring drives, and verified certifications are available on MyAnatomy.</span>
        </div>
        <a class="btn btn-primary" href="https://match.myanatomy.in/login" target="_blank" rel="noopener noreferrer">
          Sign In to Access ${icon('up')}
        </a>
        <a class="ex-create-link" href="https://match.myanatomy.in/signup" target="_blank" rel="noopener noreferrer">
          New here? Create account
        </a>
      </div>
    `;

    openDialog('feature-dialog');
  }

  // Community Section
  function renderCommunity() {
    const cards = [
      {
        id: 'events',
        kicker: 'DISCOVER EVENTS',
        title: 'Hiring Drives, Sprints & Masterclasses',
        desc: 'Connect with college recruitment drives, corporate technical webinars, and skill workshops on a unified calendar.',
        art: 'calendar'
      },
      {
        id: 'hackathons',
        kicker: 'BUILD TOGETHER',
        title: 'Real-World Hackathons & Sprints',
        desc: 'Collaborate with fellow candidates, solve company briefs, and produce verified portfolio projects.',
        art: 'trophy'
      },
      {
        id: 'leaderboard',
        kicker: 'TRACK GROWTH',
        title: 'Gamified Growth & Skill Milestones',
        desc: 'Measure your progress against yourself. Earn milestone badges and official verifiable program certificates.',
        art: 'badge'
      }
    ];

    $('#community-experience').innerHTML = `
      <div class="section-heading">
        <div>
          <span class="eyebrow">A THRIVING TALENT COMMUNITY</span>
          <h2>Don’t Just Prepare.<br><span class="serif-word">Participate and Thrive.</span></h2>
        </div>
        <p>Momentum accelerates when you build<br>alongside ambitious peers.</p>
      </div>
      <div class="ex-community-grid">
        ${cards.map((c, i) => `
          <article class="ex-community-card">
            <div class="ex-community-art ex-art-${c.art}" aria-hidden="true">
              ${i === 0 ? `
                <div class="ex-calendar-art">
                  <span>UPCOMING RECRUITMENT CALENDAR</span>
                  <div><i></i><i></i><i></i><i class="on">✦</i><i></i><i></i><i></i><i></i><i class="on">↗</i><i></i><i></i><i></i></div>
                </div>
              ` : i === 1 ? `
                <div class="ex-build-art">
                  <span>&lt;/&gt;</span><span>✦</span><span>{ }</span>
                  <i>BUILD SOMETHING REMARKABLE</i>
                </div>
              ` : `
                <div class="ex-podium-art">
                  <span><i>↗</i><b>LEARN</b></span>
                  <span><i>✳</i><b>BUILD</b></span>
                  <span><i>✦</i><b>GROW</b></span>
                </div>
              `}
            </div>
            <span class="eyebrow">${c.kicker}</span>
            <h3>${c.title}</h3>
            <p>${c.desc}</p>
            <button class="text-btn" data-feature="${c.id}">
              Explore ${c.id} ${icon('arrow')}
            </button>
          </article>
        `).join('')}
      </div>
      <div class="ex-recognition-strip">
        <span>${icon('badge')} Every milestone you achieve is verified and shareable.</span>
        <button data-feature="badges">Explore Badges ${icon('up')}</button>
        <button data-feature="certificates">Inspect Certificates ${icon('up')}</button>
      </div>
    `;
  }

  // Motion & Scroll Observers
  let motionPaused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setMotion(paused) {
    motionPaused = paused;
    document.documentElement.classList.toggle('ex-motion-paused', paused);
    const btn = $('#motion-toggle');
    if (btn) {
      btn.setAttribute('aria-pressed', String(paused));
      btn.setAttribute('aria-label', paused ? 'Play decorative animations' : 'Pause decorative animations');
      btn.innerHTML = `${paused ? '▷' : 'Ⅱ'} <span>${paused ? 'Play motion' : 'Pause motion'}</span>`;
    }
  }

  function wireMotion() {
    setMotion(motionPaused);
    $('#motion-toggle')?.addEventListener('click', () => setMotion(!motionPaused));

    const sections = $$('.section-heading, .ex-route, .ex-community-card, .portfolio-copy, .portfolio-showcase, .final-cta');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('ex-in-view');
            observer.unobserve(e.target);
          }
        });
      }, { threshold: 0.08 });

      sections.forEach(el => {
        el.classList.add('ex-reveal');
        observer.observe(el);
      });
    }

    let scheduled = false;
    window.addEventListener('scroll', () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        const bar = $('#reading-progress');
        if (bar) {
          bar.style.width = `${h > 0 ? Math.min(100, Math.max(0, (window.scrollY / h) * 100)) : 0}%`;
        }
        scheduled = false;
      });
    }, { passive: true });

    // 3D Card tilt on hero dashboard card
    const art = $('.hero-art');
    if (art && window.matchMedia('(pointer:fine)').matches) {
      art.addEventListener('pointermove', (e) => {
        if (motionPaused) return;
        const r = art.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        art.style.setProperty('--ex-tilt-x', `${-y * 6}deg`);
        art.style.setProperty('--ex-tilt-y', `${x * 8}deg`);
      });
      art.addEventListener('pointerleave', () => {
        art.style.setProperty('--ex-tilt-x', '0deg');
        art.style.setProperty('--ex-tilt-y', '0deg');
      });
    }
  }

  // Universal Dialog Light-Dismiss (Backdrop click)
  function wireDialogLightDismiss() {
    $$('dialog').forEach(d => {
      d.addEventListener('click', (e) => {
        if (e.target !== d) return;
        const r = d.getBoundingClientRect();
        if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
          d.close();
        }
      });
    });
  }

  // Global Event Delegator
  function wireEvents() {
    // Form submission for player profile onboarding
    $('#onboard-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = $('#player-name').value.trim();
      if (!name) {
        $('#onboard-error').textContent = 'Please provide your first name to begin.';
        return;
      }

      const isUpdate = !!state.player;
      state.player = {
        name,
        track: $('#player-track').value,
        stage: $('#player-stage').value
      };
      state.track = state.player.track;
      storage.save(state);

      closeDialog('onboard-dialog');
      reward('profile', 50, 'First Move Milestone');
      updateUI();
      renderQuests();

      if (isUpdate) {
        notify('Your player profile has been updated.');
      }
    });

    // Mobile menu toggle
    $('#menu-toggle')?.addEventListener('click', () => {
      const links = $('#nav-links');
      const open = links.classList.toggle('open');
      $('#menu-toggle').setAttribute('aria-expanded', String(open));
    });

    // Progress dock close
    $('#dock-close')?.addEventListener('click', () => {
      dockDismissed = true;
      $('#progress-dock').hidden = true;
    });

    // Delegated click listener
    document.addEventListener('click', (e) => {
      const b = e.target.closest('button, a');
      if (!b) return;

      // Direct Action Attributes
      if (b.dataset.action) {
        const act = b.dataset.action;
        if (act === 'start') openOnboarding();
        else if (act === 'portfolio') openPortfolioStudio();
        else if (act === 'challenge') startQuiz();
        else if (act === 'path') showRoadmap();
        else if (act === 'progress') showProgress();
      }

      // Close dialog button
      if (b.dataset.close) {
        closeDialog(b.dataset.close);
      }

      // Track switchers
      if (b.dataset.track) {
        setTrack(b.dataset.track);
      }

      // Landing Showcase Portfolio Template Choice
      if (b.dataset.template && b.closest('.template-switch')) {
        const t = b.dataset.template;
        const showcase = $('#sample-portfolio');
        if (showcase) showcase.className = `sample-portfolio ${t}`;
        $$('.template-switch [data-template]').forEach(x => {
          const active = x === b;
          x.classList.toggle('active', active);
          x.setAttribute('aria-pressed', String(active));
        });
      }

      // Opportunities filter tabs
      if (b.dataset.filter) {
        currentFilter = b.dataset.filter;
        renderOpportunities();
      }

      // Save/bookmark opportunity
      if (b.dataset.save) {
        toggleSaveOpportunity(b.dataset.save);
      }

      // Opportunity details modal
      if (b.dataset.opportunity) {
        showOpportunityDetail(b.dataset.opportunity);
      }
      if (b.dataset.detailSave) {
        toggleSaveOpportunity(b.dataset.detailSave);
        showOpportunityDetail(b.dataset.detailSave);
      }

      // Quiz Answer selection
      if (b.dataset.answer !== undefined) {
        chooseAnswer(Number(b.dataset.answer));
      }
      if (b.id === 'quiz-next') {
        nextQuestion();
      }
      if (b.dataset.quizResult) {
        if (b.dataset.quizResult === 'retry') {
          startQuiz();
        } else {
          closeDialog('quiz-dialog');
          openPortfolioStudio();
        }
      }

      // Roadmap quick start
      if (b.hasAttribute('data-path-start')) {
        closeDialog('opportunity-dialog');
        startQuiz();
      }

      // Candidate Path Persona
      if (b.dataset.persona) {
        persona = b.dataset.persona;
        renderPath();
      }

      // Feature Atlas category filter
      if (b.dataset.group) {
        group = b.dataset.group;
        renderFeatureCards();
      }
      if (b.hasAttribute('data-clear-search')) {
        query = '';
        group = 'all';
        const sInput = $('#feature-search');
        if (sInput) sInput.value = '';
        renderFeatureCards();
      }

      // Feature Detail Open
      if (b.dataset.feature) {
        openFeatureDetail(b.dataset.feature);
      }
      if (b.hasAttribute('data-close-feature')) {
        e.preventDefault();
        closeDialog('feature-dialog');
      }
      if (b.hasAttribute('data-close-lab')) {
        closeDialog('lab-dialog');
      }

      // Feature Detail Demo Buttons
      if (b.dataset.openDemo) {
        closeDialog('feature-dialog');
        const act = b.dataset.openDemo;
        if (act === 'portfolio') openPortfolioStudio();
        else if (act === 'profile') openOnboarding();
        else if (act === 'resume') window.LabsManager?.openResumeLab();
        else if (act === 'matching') window.LabsManager?.openMatchingLab();
        else if (act === 'dimensions') {
          document.getElementById('skill-dna')?.scrollIntoView({ behavior: motionPaused ? 'auto' : 'smooth' });
        }
      }

      // Skill DNA Dimension
      if (b.dataset.dimension) {
        dimension = b.dataset.dimension;
        renderDimensionDetail();
      }
      if (b.dataset.sampleDimension) {
        openDimensionLab(b.dataset.sampleDimension);
      }
      if (b.dataset.dimensionAnswer !== undefined) {
        answerDimensionQuestion(Number(b.dataset.dimensionAnswer));
      }
      if (b.hasAttribute('data-next-dimension')) {
        const nextIdx = (catalog.dimensions.findIndex(d => d.id === dimension) + 1) % 6;
        openDimensionLab(catalog.dimensions[nextIdx].id);
      }

      // Badges Demo Reveal Flip
      if (b.dataset.revealBadge !== undefined) {
        const labels = [
          'First Step Milestone · The courage to start.',
          'Curious Mind Milestone · Expanding your perspective.',
          'Master Builder Milestone · Transforming ideas into reality.'
        ];
        $('#badge-reveal-copy').textContent = labels[Number(b.dataset.revealBadge)];
        b.classList.add('revealed');
        b.querySelector('span').textContent = ['First Step', 'Curious Mind', 'Master Builder'][Number(b.dataset.revealBadge)];
      }

      // Mobile nav auto-close on link click
      if (b.closest('#nav-links')) {
        $('#nav-links')?.classList.remove('open');
        $('#menu-toggle')?.setAttribute('aria-expanded', 'false');
      }
    });

    // Checkbox checklist status in feature preview
    document.addEventListener('change', (e) => {
      if (e.target.matches('[data-preview-check]')) {
        const count = $$('[data-preview-check]:checked').length;
        const statusEl = $('#preview-check-status');
        if (statusEl) {
          statusEl.textContent = `${count} of 3 tasks completed in your readiness plan.`;
        }
      }
    });
  }

  // Public bridge for Labs & Portfolio Studio
  window.CareerDemo = {
    openPortfolio: openPortfolioStudio,
    openOnboarding,
    showProgress,
    startQuiz,
    download: storage.download,
    toast: notify,
    getProfile: () => state.portfolio,
    getPlayer: () => state.player
  };

  // Initialize Portfolio Studio Host
  window.PortfolioBuilder?.init({
    getProfile: () => state.portfolio,
    saveProfile: (p) => {
      state.portfolio = p;
      const ok = storage.save(state);
      updateUI();
      return Promise.resolve(ok);
    },
    reward,
    download: storage.download,
    toast: notify
  });

  // Boot Application
  function init() {
    updateUI();
    renderQuests();
    renderOpportunities();
    renderPath();
    renderDNA();
    renderFeatures();
    renderCommunity();
    wireMotion();
    wireDialogLightDismiss();
    wireEvents();
    document.body.dataset.appReady = 'true';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
