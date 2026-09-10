/**
 * MyAnatomy Candidate Career Hub · Interactive Labs & Feature Demos
 * Includes: Resume Quick-Draft Lab, JD-CV Keyword Matching Lab, Interactive Code Sandbox, and Badge Reveal.
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

  let resumeText = '';
  let cvText = '';
  let jdText = '';
  let customSkills = '';

  // 45+ modern industry skills dictionary
  const skillDictionary = [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue', 'Angular', 'HTML', 'CSS',
    'Tailwind', 'Node.js', 'Express', 'Python', 'Java', 'C++', 'C#', 'SQL', 'PostgreSQL',
    'MongoDB', 'REST API', 'GraphQL', 'Git', 'GitHub', 'Docker', 'Kubernetes', 'AWS',
    'Azure', 'CI/CD', 'Linux', 'Testing', 'Jest', 'Cypress', 'Figma', 'UI Design',
    'UX Research', 'Design Systems', 'Accessibility', 'Data Analysis', 'Excel', 'Power BI',
    'Tableau', 'Communication', 'Problem Solving', 'Teamwork', 'Agile', 'Scrum'
  ];

  function resumeFromProfile(p) {
    if (!p) return '';
    return [
      p.name ? p.name.toUpperCase() : 'CANDIDATE NAME',
      p.role || 'TARGET ROLE',
      [p.email, p.location, p.website].filter(Boolean).join(' | '),
      '------------------------------------------------------------',
      p.bio ? `\nPROFESSIONAL SUMMARY\n${p.bio}\n` : '',
      p.skills && p.skills.length ? `\nCORE SKILLS & TECHNOLOGIES\n${p.skills.join(' · ')}\n` : '',
      p.projects && p.projects.length
        ? `\nSELECTED PROJECTS\n${p.projects.map(x => [
            `• ${x.title || 'Untitled Project'}${x.tech ? ` (${x.tech})` : ''}`,
            x.description ? `  ${x.description}` : '',
            x.url ? `  Link: ${x.url}` : ''
          ].filter(Boolean).join('\n')).join('\n\n')}\n`
        : '',
      p.education ? `\nEDUCATION & CREDENTIALS\n${p.education}\n` : ''
    ].filter(x => x !== undefined && x !== null).join('\n').trim();
  }

  function openResumeLab() {
    if (!resumeText) {
      resumeText = resumeFromProfile(window.CareerDemo?.getProfile()) || `ANANYA RAO
Frontend & UI Engineer
ananya@example.com | Bengaluru, India | github.com/ananya-dev
------------------------------------------------------------

PROFESSIONAL SUMMARY
Passionate frontend developer crafting accessible, performant, and delightful web experiences. Focused on component-driven architectures and intuitive user interfaces.

CORE SKILLS & TECHNOLOGIES
JavaScript · TypeScript · React · HTML5 · CSS3 · Responsive Design · Git

SELECTED PROJECTS
• Finwise Analytics Dashboard (React, CSS Grid)
  Engineered an interactive analytics tool visualizing financial performance metrics with 24% faster task completion.

• Mindful Habits PWA (TypeScript, LocalStorage)
  Built an offline-first productivity application adhering to WCAG 2.1 AA accessibility standards.

EDUCATION & CREDENTIALS
B.Tech in Computer Science · Final Year Student`;
    }

    const labDialog = $('#lab-dialog');
    $('#lab-content').innerHTML = `
      <header class="ex-lab-header">
        <div>
          <span class="eyebrow purple-text">YOUR PROFILE, TRANSFORMED</span>
          <h2 id="ex-lab-title">Resume Quick-Draft Lab</h2>
        </div>
        <button class="ex-close" data-close-lab aria-label="Close resume lab">
          <svg class="icon"><use href="#i-close"/></svg>
        </button>
      </header>
      <div class="ex-resume-lab">
        <div>
          <p>Generate and polish an ATS-friendly, clean text resume. Import your portfolio profile directly or test with a sample.</p>
          <div class="ex-lab-actions">
            <button data-resume-import>Import Saved Portfolio Profile</button>
            <button data-resume-example>Load Sample Tech Profile</button>
            <button data-resume-copy>Copy All to Clipboard</button>
          </div>
          <label for="resume-draft">Editable Resume Content</label>
          <textarea id="resume-draft" maxlength="25000" placeholder="Type or paste your resume content here...">${esc(resumeText)}</textarea>
          <small>Edits remain in your active browser session. Download or copy anytime.</small>
        </div>
        <div class="ex-resume-preview">
          <span>LIVE FORMATTED PREVIEW</span>
          <pre id="resume-paper">${esc(resumeText)}</pre>
        </div>
      </div>
      <footer class="ex-lab-footer">
        <span>Clean plain-text formatting · perfect for job boards, ATS scanners, and email applications.</span>
        <button class="btn btn-primary" data-download-resume>
          Download Resume (.txt) <svg class="icon"><use href="#i-arrow"/></svg>
        </button>
      </footer>
    `;

    $('#resume-draft').addEventListener('input', (e) => {
      resumeText = e.target.value;
      $('#resume-paper').textContent = resumeText || 'Your resume preview will appear here...';
    });

    if (!labDialog.open) labDialog.showModal();
  }

  function openMatchingLab() {
    if (!cvText) {
      cvText = resumeFromProfile(window.CareerDemo?.getProfile()) ||
        'Frontend developer with strong skills in JavaScript, TypeScript, React, HTML, CSS, Git, and REST API integration. Experience building responsive web applications and designing UI components in Figma.';
    }
    if (!jdText) {
      jdText =
        'We are seeking a Frontend Engineer skilled in JavaScript, TypeScript, React, and CSS. The ideal candidate has experience with REST API integration, Git workflows, Docker basics, and Agile collaboration.';
    }

    const labDialog = $('#lab-dialog');
    $('#lab-content').innerHTML = `
      <header class="ex-lab-header">
        <div>
          <span class="eyebrow purple-text">LESS GUESSWORK. MORE INTENT.</span>
          <h2 id="ex-lab-title">JD–CV Keyword Matching Lab</h2>
        </div>
        <button class="ex-close" data-close-lab aria-label="Close matching preview">
          <svg class="icon"><use href="#i-close"/></svg>
        </button>
      </header>
      <div class="ex-matching-lab">
        <div class="ex-match-inputs">
          <label>
            Your Resume / Skills Summary
            <textarea id="match-cv" maxlength="20000" placeholder="Paste your resume or experience text here...">${esc(cvText)}</textarea>
          </label>
          <label>
            Target Job Description (JD)
            <textarea id="match-jd" maxlength="20000" placeholder="Paste the job posting description here...">${esc(jdText)}</textarea>
          </label>
        </div>
        <label class="ex-keywords-label">
          Custom Target Keywords (Optional)
          <small>Comma-separated list. If provided, checks these specific keywords against your resume.</small>
          <input id="match-keywords" maxlength="500" value="${esc(customSkills)}" placeholder="e.g. React, TypeScript, Docker, Agile, GraphQL">
        </label>
        <button class="btn btn-primary" data-analyze-match>
          Compare Keywords & Skills <svg class="icon"><use href="#i-arrow"/></svg>
        </button>
        <div id="match-result" aria-live="polite"></div>
        <p class="ex-disclaimer">
          Transparent algorithmic matching demo. Evaluates keyword overlap and coverage without sending your text to third parties.
        </p>
      </div>
    `;

    if (!labDialog.open) labDialog.showModal();
  }

  function containsSkill(text, skill) {
    const normalized = text.toLowerCase().normalize('NFKC');
    const term = skill.toLowerCase().normalize('NFKC').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp('(?:^|[^a-z0-9])' + term + '(?:$|[^a-z0-9])', 'i').test(normalized);
  }

  function analyzeMatch() {
    cvText = $('#match-cv').value;
    jdText = $('#match-jd').value;
    customSkills = $('#match-keywords').value;
    const result = $('#match-result');

    if (!cvText.trim() || !jdText.trim()) {
      result.innerHTML = '<p class="ex-lab-error">Please enter both your resume text and target job description.</p>';
      return;
    }

    const terms = customSkills.trim()
      ? customSkills.split(',').map(s => s.trim()).filter(Boolean)
      : skillDictionary.filter(s => containsSkill(jdText, s));

    const seen = new Set();
    const targets = terms.filter(t => {
      const key = t.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 40);

    if (!targets.length) {
      result.innerHTML = '<p class="ex-lab-error">No standard industry keywords detected in the job description. Try adding specific keywords in the optional field above.</p>';
      return;
    }

    const found = targets.filter(t => containsSkill(cvText, t));
    const missing = targets.filter(t => !containsSkill(cvText, t));
    const score = Math.round((found.length / targets.length) * 100);

    result.innerHTML = `
      <div class="ex-match-summary">
        <div>
          <strong>${found.length}<small> / ${targets.length}</small></strong>
          <span>Target Keywords Matched (${score}%)<br>Demonstrated Skill Coverage</span>
        </div>
        <div class="ex-match-bar">
          <span style="width: ${score}%"></span>
        </div>
      </div>
      <div class="ex-match-findings">
        <div>
          <h3>Already Highlighted in Your Resume</h3>
          ${found.length
            ? found.map(t => `<span class="found">${esc(t)} ✓</span>`).join('')
            : '<p>No exact keyword matches found yet. Check spelling or phrasing.</p>'}
        </div>
        <div>
          <h3>Identified in Role, Missing in Resume</h3>
          ${missing.length
            ? missing.map(t => `<span class="missing">${esc(t)} +</span>`).join('')
            : '<p>Great job! Every identified skill is reflected in your resume.</p>'}
        </div>
      </div>
      <p class="ex-match-advice">
        💡 <strong>Tip:</strong> Tailor your resume by adding genuine projects or coursework illustrating the missing skills before submitting your application.
      </p>
    `;
  }

  // Interactive Multi-Problem Sandbox
  const sandboxProblems = {
    sum: {
      name: 'Sum Array Elements',
      code: `function total(values) {\n  return values.reduce((sum, n) => sum + n, 0);\n}`,
      placeholder: '3, 7, 12, 8',
      exec: (nums) => nums.reduce((sum, n) => sum + n, 0)
    },
    max: {
      name: 'Find Maximum Value',
      code: `function findMax(values) {\n  return Math.max(...values);\n}`,
      placeholder: '15, 88, 42, 9, 73',
      exec: (nums) => Math.max(...nums)
    },
    doubleEvens: {
      name: 'Filter & Double Evens',
      code: `function doubleEvens(values) {\n  return values.filter(n => n % 2 === 0).map(n => n * 2);\n}`,
      placeholder: '1, 2, 3, 4, 5, 6',
      exec: (nums) => `[${nums.filter(n => n % 2 === 0).map(n => n * 2).join(', ')}]`
    }
  };

  let currentSandboxProblem = 'sum';

  function runSandbox() {
    const inputEl = $('#sandbox-values');
    const outEl = $('#sandbox-result');
    if (!inputEl || !outEl) return;

    const val = inputEl.value.trim();
    if (!val) {
      outEl.textContent = 'Please enter comma-separated numbers.';
      return;
    }

    const parts = val.split(',').map(s => s.trim());
    const nums = parts.map(Number);

    if (parts.some(p => p === '') || nums.some(n => !Number.isFinite(n))) {
      outEl.textContent = 'Invalid input: Please enter valid numbers separated by commas.';
      return;
    }

    if (nums.length > 30) {
      outEl.textContent = 'Please limit inputs to 30 items for this demo.';
      return;
    }

    const problem = sandboxProblems[currentSandboxProblem] || sandboxProblems.sum;
    const result = problem.exec(nums);
    outEl.textContent = `✓ Result: ${result}`;
  }

  // Global listeners for lab events
  document.addEventListener('click', (e) => {
    const b = e.target.closest('button, a');
    if (!b) return;

    if (b.hasAttribute('data-analyze-match')) {
      analyzeMatch();
    }

    if (b.hasAttribute('data-run-sandbox')) {
      runSandbox();
    }

    if (b.hasAttribute('data-resume-import')) {
      const p = window.CareerDemo?.getProfile();
      if (!p) {
        window.CareerDemo?.toast('Save a profile in Portfolio Studio first, or use the sample profile.');
        return;
      }
      resumeText = resumeFromProfile(p);
      openResumeLab();
      window.CareerDemo?.toast('Imported profile into Resume Lab!');
    }

    if (b.hasAttribute('data-resume-example')) {
      resumeText = resumeFromProfile({
        name: 'Ananya Rao — Sample Profile',
        role: 'Frontend & UI Engineer',
        location: 'Bengaluru, India',
        email: 'ananya@example.com',
        website: 'https://github.com/ananya-dev',
        bio: 'Passionate frontend developer crafting accessible, performant, and delightful web experiences.',
        skills: ['JavaScript', 'TypeScript', 'React', 'HTML5', 'CSS3', 'Git', 'Figma'],
        education: 'B.Tech Computer Science · 2025',
        projects: [
          {
            title: 'Finwise Analytics Dashboard',
            description: 'Engineered an interactive analytics tool with 24% improved user comprehension.',
            tech: 'React · Chart.js · CSS'
          }
        ]
      });
      openResumeLab();
      window.CareerDemo?.toast('Loaded sample resume profile.');
    }

    if (b.hasAttribute('data-resume-copy')) {
      if (!resumeText.trim()) {
        window.CareerDemo?.toast('No resume text to copy.');
        return;
      }
      navigator.clipboard.writeText(resumeText).then(() => {
        window.CareerDemo?.toast('📋 Resume text copied to clipboard!');
      }).catch(() => {
        window.CareerDemo?.toast('Failed to copy to clipboard.');
      });
    }

    if (b.hasAttribute('data-download-resume')) {
      if (!resumeText.trim()) {
        window.CareerDemo?.toast('Please write or import a resume draft before downloading.');
        return;
      }
      window.CareerDemo?.download(resumeText, 'myanatomy-resume-draft.txt', 'text/plain').then(ok => {
        if (ok) window.CareerDemo?.toast('🎉 Resume downloaded as text file!');
      });
    }
  });

  window.LabsManager = {
    openResumeLab,
    openMatchingLab,
    resumeFromProfile
  };
})();
