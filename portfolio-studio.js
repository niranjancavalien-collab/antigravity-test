/**
 * MyAnatomy Candidate Career Hub · Portfolio Studio
 * Full-featured interactive portfolio builder, live reactive preview, and standalone HTML exporter.
 */

(() => {
  'use strict';

  const dialog = document.getElementById('portfolio-dialog');
  const root = document.getElementById('portfolio-root');
  if (!dialog || !root) return;

  const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));

  const clone = (p) => JSON.parse(JSON.stringify({
    name: '',
    role: '',
    location: '',
    email: '',
    bio: '',
    skills: [],
    education: '',
    website: '',
    template: 'canvas',
    projects: [],
    ...(p || {})
  }));

  const blankProject = () => ({
    id: 'p-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
    title: '',
    description: '',
    url: '',
    tech: ''
  });

  let host = null;
  let profile = clone(null);
  let step = 1;
  let error = '';
  let status = '';
  let busy = false;

  const validUrl = (url) => {
    if (!url) return true;
    try {
      const u = new URL(url);
      return (u.protocol === 'http:' || u.protocol === 'https:') && !!u.hostname;
    } catch (_) {
      return false;
    }
  };

  const safeHref = (url) => validUrl(url) ? esc(url) : '#';

  const normalize = (p) => {
    const x = clone(p);
    ['name', 'role', 'location', 'email', 'bio', 'education', 'website'].forEach(k => {
      x[k] = String(x[k] || '');
    });
    x.template = ['canvas', 'midnight', 'editorial'].includes(x.template) ? x.template : 'canvas';
    x.skills = Array.isArray(x.skills)
      ? x.skills.filter(Boolean).map(String)
      : String(x.skills || '').split(',').map(s => s.trim()).filter(Boolean);
    x.projects = Array.isArray(x.projects)
      ? x.projects.slice(0, 6).map(q => {
          const item = { ...blankProject(), ...(q || {}) };
          Object.keys(item).forEach(k => item[k] = String(item[k] || ''));
          return item;
        })
      : [];
    return x;
  };

  const calculateCompletion = () => {
    const checks = [
      profile.name.trim(),
      profile.role.trim(),
      profile.bio.trim(),
      profile.skills.length,
      profile.projects.some(p => p.title.trim() && p.description.trim())
    ];
    return Math.round(checks.filter(Boolean).length / checks.length * 100);
  };

  function preview() {
    const projects = profile.projects.filter(p => p.title.trim() || p.description.trim());
    return `
      <div class="pb-preview-top">
        <span class="pb-live"><i class="pb-dot"></i>Live Preview</span>
        <span class="pb-completion">${calculateCompletion()}% complete</span>
      </div>
      <div class="pb-card pb-theme-${esc(profile.template)}">
        <div class="pb-hero">
          <div class="pb-preview-eyebrow">Portfolio · ${esc(profile.location || 'Your next chapter')}</div>
          <div class="pb-preview-name">${esc(profile.name || 'Your Name')}</div>
          <div class="pb-preview-role">${esc(profile.role || 'Your role or creative direction')}</div>
        </div>
        <div class="pb-preview-content">
          <p class="pb-preview-bio">${esc(profile.bio || 'A short introduction will appear here. Tell recruiters and collaborators what you care about and what you are building.')}</p>
          ${profile.skills.length ? `
            <section class="pb-preview-section">
              <h4>Toolkit & Skills</h4>
              <div class="pb-skills">
                ${profile.skills.map(s => `<span class="pb-skill">${esc(s)}</span>`).join('')}
              </div>
            </section>
          ` : ''}
          <section class="pb-preview-section">
            <h4>Selected Work</h4>
            ${projects.length ? `
              <div class="pb-project-grid">
                ${projects.map(p => `
                  <article class="pb-project-card">
                    <h5>${esc(p.title || 'Untitled Project')}</h5>
                    <p>${esc(p.description || 'Project description')}</p>
                    ${p.tech ? `<div class="pb-tech">${esc(p.tech)}</div>` : ''}
                    ${p.url && validUrl(p.url) ? `<a class="pb-link" href="${safeHref(p.url)}" target="_blank" rel="noopener">View project ↗</a>` : ''}
                  </article>
                `).join('')}
              </div>
            ` : '<div class="pb-empty">Your projects will take center stage here. Add one in Step 2!</div>'}
          </section>
          ${profile.education ? `
            <section class="pb-preview-section">
              <h4>Learning & Credentials</h4>
              <p class="pb-preview-bio">${esc(profile.education)}</p>
            </section>
          ` : ''}
          <section class="pb-preview-section">
            <h4>Connect</h4>
            ${profile.email ? `<a class="pb-link" href="mailto:${esc(profile.email)}">${esc(profile.email)}</a>` : '<span class="pb-hint">Add an email or website to make it easy to reach you.</span>'}
            ${profile.website && validUrl(profile.website) ? ` <a class="pb-link" href="${safeHref(profile.website)}" target="_blank" rel="noopener">Website ↗</a>` : ''}
          </section>
        </div>
      </div>
      <p class="pb-hint" style="margin-top:12px;text-align:center;">Standalone HTML export · ready to host anywhere</p>
    `;
  }

  function editor() {
    const tabs = `
      <div class="pb-tabs">
        ${[
          ['01', 'About you'],
          ['02', 'Your projects'],
          ['03', 'Make it yours']
        ].map((t, i) => `
          <button type="button" class="pb-tab ${step === i + 1 ? 'active' : ''}" data-step="${i + 1}">
            <strong>${t[0]}</strong>${t[1]}
          </button>
        `).join('')}
      </div>
    `;

    let content = '';
    if (step === 1) {
      content = `
        <h2 class="pb-step-title">Tell your story</h2>
        <p class="pb-step-note">Start with the essentials. You can refine everything anytime.</p>
        <div class="pb-grid-2">
          <div class="pb-field">
            <label for="pb-name">Name <span class="pb-required">*</span></label>
            <input id="pb-name" data-field="name" maxlength="80" value="${esc(profile.name)}" placeholder="e.g. Alex Rivera">
          </div>
          <div class="pb-field">
            <label for="pb-role">Target Role <span class="pb-required">*</span></label>
            <input id="pb-role" data-field="role" maxlength="100" value="${esc(profile.role)}" placeholder="e.g. Frontend Developer">
          </div>
        </div>
        <div class="pb-grid-2">
          <div class="pb-field">
            <label for="pb-location">Location</label>
            <input id="pb-location" data-field="location" maxlength="100" value="${esc(profile.location)}" placeholder="e.g. New York, NY / Remote">
          </div>
          <div class="pb-field">
            <label for="pb-email">Contact Email</label>
            <input id="pb-email" data-field="email" type="email" maxlength="160" value="${esc(profile.email)}" placeholder="alex@example.com">
          </div>
        </div>
        <div class="pb-field">
          <label for="pb-bio">Professional Bio</label>
          <textarea id="pb-bio" data-field="bio" maxlength="600" placeholder="A little about your work, problem-solving mindset, and what drives you...">${esc(profile.bio)}</textarea>
        </div>
        <div class="pb-field">
          <label for="pb-skills">Core Skills</label>
          <input id="pb-skills" data-field="skills" maxlength="300" value="${esc(profile.skills.join(', '))}" placeholder="JavaScript, React, CSS, Node.js, UI Design">
          <p class="pb-hint">Separate skills with commas.</p>
        </div>
        <div class="pb-field">
          <label for="pb-education">Education / Bootcamps</label>
          <input id="pb-education" data-field="education" maxlength="180" value="${esc(profile.education)}" placeholder="B.S. Computer Science · Class of 2025">
        </div>
        <div class="pb-field">
          <label for="pb-website">Website / GitHub / LinkedIn</label>
          <input id="pb-website" data-field="website" type="url" maxlength="300" value="${esc(profile.website)}" placeholder="https://github.com/username">
          <p class="pb-hint">Must start with http:// or https://</p>
        </div>
      `;
    } else if (step === 2) {
      content = `
        <h2 class="pb-step-title">Show your work</h2>
        <p class="pb-step-note">Add up to 6 projects. Specific problems, your role, and clear outcomes beat hype.</p>
        ${profile.projects.map((p, i) => `
          <article class="pb-project">
            <div class="pb-project-head">
              <span class="pb-project-name">Project ${i + 1}</span>
              <button type="button" class="pb-remove" data-remove="${esc(p.id)}">Remove</button>
            </div>
            <div class="pb-field">
              <label for="pt-${esc(p.id)}">Project Title</label>
              <input id="pt-${esc(p.id)}" data-project="${esc(p.id)}" data-key="title" maxlength="100" value="${esc(p.title)}" placeholder="e.g. CloudOps Metrics Dashboard">
            </div>
            <div class="pb-field">
              <label for="pd-${esc(p.id)}">Description & Problem Solved</label>
              <textarea id="pd-${esc(p.id)}" data-project="${esc(p.id)}" data-key="description" maxlength="400" placeholder="What challenge did you tackle, what was your approach, and what was the impact?">${esc(p.description)}</textarea>
            </div>
            <div class="pb-grid-2">
              <div class="pb-field">
                <label for="pu-${esc(p.id)}">Live Demo / Repo Link</label>
                <input id="pu-${esc(p.id)}" data-project="${esc(p.id)}" data-key="url" type="url" maxlength="300" value="${esc(p.url)}" placeholder="https://github.com/...">
              </div>
              <div class="pb-field">
                <label for="px-${esc(p.id)}">Technologies Used</label>
                <input id="px-${esc(p.id)}" data-project="${esc(p.id)}" data-key="tech" maxlength="160" value="${esc(p.tech)}" placeholder="e.g. React, TypeScript, Chart.js">
              </div>
            </div>
          </article>
        `).join('')}
        ${!profile.projects.length ? '<div class="pb-empty" style="margin-bottom:11px">No projects added yet. Add your first showcase piece!</div>' : ''}
        <button type="button" class="pb-add" data-add ${profile.projects.length >= 6 ? 'disabled' : ''}>
          ＋ Add project ${profile.projects.length >= 6 ? '(Maximum 6 reached)' : ''}
        </button>
      `;
    } else if (step === 3) {
      content = `
        <h2 class="pb-step-title">Make it yours</h2>
        <p class="pb-step-note">Select a theme that best reflects your personality and career target.</p>
        <div class="pb-templates">
          ${[
            ['canvas', 'Canvas', 'Bright, modern, energetic'],
            ['midnight', 'Midnight', 'Deep, tech-focused, dark mode'],
            ['editorial', 'Editorial', 'Warm, thoughtful, classic serif']
          ].map(t => `
            <button type="button" class="pb-template ${profile.template === t[0] ? 'active' : ''}" data-template="${t[0]}">
              <div class="pb-template-swatch sw-${t[0]}"></div>
              <strong>${t[1]}</strong>
              <span>${t[2]}</span>
            </button>
          `).join('')}
        </div>
        <div style="margin-top:28px" class="pb-empty">
          <strong>Export when ready</strong><br>
          You will get a single, fully responsive standalone HTML file ready to host on GitHub Pages, Netlify, Vercel, or send directly to employers.
        </div>
      `;
    }

    return tabs + (error ? `<div class="pb-error" role="alert">${esc(error)}</div>` : '') + (status ? `<p class="pb-status success" role="status">${esc(status)}</p>` : '') + content;
  }

  function render() {
    root.innerHTML = `
      <div class="pb-shell">
        <header class="pb-header">
          <div>
            <p class="pb-kicker">MyAnatomy · Portfolio Studio</p>
            <h1 class="pb-title">Candidate Portfolio Builder</h1>
            <p class="pb-subtitle">A living showcase for the projects, skills, and outcomes you want recruiters to remember.</p>
          </div>
          <button type="button" class="pb-close" aria-label="Close portfolio studio">×</button>
        </header>
        <div class="pb-body">
          <section class="pb-editor" aria-label="Portfolio editor">${editor()}</section>
          <section class="pb-preview-wrap" aria-label="Portfolio preview">${preview()}</section>
        </div>
        <footer class="pb-footer">
          <span class="pb-footer-note">${busy ? 'Saving changes…' : 'Your draft is stored safely in your browser session.'}</span>
          <button type="button" class="pb-sample" data-sample>Load Sample Profile</button>
          <div class="pb-actions">
            <button type="button" class="pb-btn" data-save>Save Draft</button>
            <button type="button" class="pb-btn primary" data-export>Export Portfolio (.html)</button>
          </div>
        </footer>
      </div>
    `;
    bind();
  }

  function refreshPreview() {
    error = '';
    status = '';
    root.querySelector('.pb-error')?.remove();
    root.querySelector('.pb-status')?.remove();
    root.querySelector('.pb-preview-wrap').innerHTML = preview();
  }

  function setValue(el) {
    const field = el.dataset.field;
    if (field === 'skills') {
      profile.skills = el.value.split(',').map(s => s.trim()).filter(Boolean);
    } else {
      profile[field] = el.value;
    }
    refreshPreview();
  }

  function bind() {
    root.querySelector('.pb-close').onclick = close;

    root.querySelectorAll('[data-step]').forEach(b => {
      b.onclick = () => {
        step = Number(b.dataset.step);
        error = '';
        status = '';
        render();
      };
    });

    root.querySelectorAll('[data-field]').forEach(el => {
      el.addEventListener('input', () => setValue(el));
    });

    root.querySelectorAll('[data-project]').forEach(el => {
      el.addEventListener('input', () => {
        const p = profile.projects.find(x => x.id === el.dataset.project);
        if (p) p[el.dataset.key] = el.value;
        refreshPreview();
      });
    });

    root.querySelectorAll('[data-remove]').forEach(b => {
      b.onclick = () => {
        profile.projects = profile.projects.filter(p => p.id !== b.dataset.remove);
        render();
      };
    });

    const addBtn = root.querySelector('[data-add]');
    if (addBtn) {
      addBtn.onclick = () => {
        if (profile.projects.length < 6) {
          profile.projects.push(blankProject());
          render();
          root.querySelector('.pb-project:last-of-type input')?.focus();
        }
      };
    }

    root.querySelectorAll('[data-template]').forEach(b => {
      b.onclick = () => {
        profile.template = b.dataset.template;
        render();
      };
    });

    root.querySelector('[data-sample]').onclick = () => {
      profile = normalize({
        name: 'Ananya Rao',
        role: 'Aspiring Frontend & UI Engineer',
        location: 'Bengaluru, India',
        email: 'ananya.rao@example.com',
        bio: 'Passionate frontend developer crafting accessible, performant, and delightful web experiences. I bridge the gap between design systems and clean modular code.',
        skills: ['JavaScript (ES6+)', 'TypeScript', 'React', 'CSS Grid/Flexbox', 'Figma', 'Web Accessibility (a11y)'],
        education: 'B.Tech in Computer Science · Final Year',
        website: 'https://github.com',
        template: 'canvas',
        projects: [
          {
            id: 'sample-1',
            title: 'Finwise Analytics Dashboard',
            description: 'Designed and implemented an interactive financial dashboard translating complex transactional streams into intuitive visual charts with 24% improved user comprehension.',
            tech: 'React · Chart.js · Responsive CSS',
            url: 'https://example.com'
          },
          {
            id: 'sample-2',
            title: 'Mindful Habits Productivity App',
            description: 'Created a habit-tracking progressive web app focused on micro-habits, keyboard-first accessibility, and offline data sync using LocalStorage.',
            tech: 'TypeScript · Vanilla CSS · PWA',
            url: 'https://example.com'
          }
        ]
      });
      step = 1;
      error = '';
      status = 'Sample profile loaded! Feel free to customize every detail.';
      render();
    };

    root.querySelector('[data-save]').onclick = () => save(false);
    root.querySelector('[data-export]').onclick = () => save(true);

    if (busy) {
      root.querySelectorAll('input,textarea,button').forEach(el => {
        if (!el.classList.contains('pb-close')) el.disabled = true;
      });
    }
  }

  function validate(exporting) {
    if (!profile.name.trim() || !profile.role.trim()) {
      return 'Please provide your name and target role before saving.';
    }
    if (profile.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      return 'Please enter a valid email address.';
    }
    if (!validUrl(profile.website) || profile.projects.some(p => !validUrl(p.url))) {
      return 'Links must start with http:// or https://.';
    }
    if (exporting && !profile.projects.some(p => p.title.trim() && p.description.trim())) {
      return 'Please add at least one project with a title and description before exporting.';
    }
    return '';
  }

  async function save(exporting) {
    if (busy) return;
    error = validate(exporting);
    status = '';
    if (error) {
      render();
      root.querySelector('.pb-editor').scrollTop = 0;
      return;
    }
    const snapshot = normalize(profile);
    busy = true;
    render();

    try {
      const ok = await host.saveProfile(snapshot);
      if (!ok) {
        error = 'Could not save draft. Changes are kept in active memory.';
      } else {
        status = 'Draft saved successfully.';
      }

      if (exporting) {
        const html = exportHtml(snapshot);
        const downloaded = await host.download(html, 'myanatomy-portfolio.html', 'text/html');
        if (downloaded) {
          host.reward('portfolio', 200, 'Portfolio Builder Quest');
          status = 'Portfolio exported as myanatomy-portfolio.html!';
          host.toast('🎉 Portfolio downloaded! Standalone website ready to share.');
        } else {
          error = 'Export failed to download. Your draft is still saved.';
        }
      } else {
        host.toast('Portfolio draft saved successfully.');
      }
    } catch (e) {
      console.error('Portfolio save exception:', e);
      error = 'An error occurred while saving. Please try again.';
      host.toast(error);
    } finally {
      busy = false;
      render();
    }
  }

  function exportHtml(p) {
    const projects = p.projects.filter(x => x.title.trim() || x.description.trim());
    const tags = p.skills.map(s => `<span>${esc(s)}</span>`).join('');

    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.name || 'Candidate Portfolio')} · ${esc(p.role || 'Portfolio')}</title>
<meta name="description" content="${esc(p.bio || 'Professional Portfolio')}">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fontsource-variable/manrope@5.2.8/index.css">
<style>
  :root {
    --font: 'Manrope Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: var(--font);
    background: #fbfaf7;
    color: #231c3c;
    line-height: 1.6;
    overflow-wrap: anywhere;
  }
  main {
    max-width: 960px;
    margin: auto;
    padding: 60px 24px;
  }
  .hero {
    padding: 48px;
    border-radius: 24px;
    background: linear-gradient(135deg, #6941df, #8c6df1);
    color: #fff;
    position: relative;
    overflow: hidden;
  }
  .hero::after {
    content: '';
    position: absolute;
    width: 220px;
    height: 220px;
    background: rgba(211, 248, 121, 0.25);
    border-radius: 50%;
    right: -60px;
    top: -70px;
    pointer-events: none;
  }
  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.14em;
    font-size: 11px;
    font-weight: 800;
    opacity: 0.85;
  }
  .name {
    font-size: clamp(38px, 6vw, 68px);
    line-height: 1.05;
    margin: 16px 0 8px;
    letter-spacing: -0.04em;
    font-weight: 800;
  }
  .role {
    font-size: 20px;
    opacity: 0.92;
  }
  .content {
    padding: 42px 10px;
  }
  .bio {
    font-size: 18px;
    max-width: 700px;
    color: #484253;
    white-space: pre-line;
    margin-bottom: 32px;
  }
  .skills-wrap {
    margin-bottom: 40px;
  }
  .skills-wrap h3 {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #706b7f;
    margin-bottom: 12px;
  }
  .skills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .skills span {
    background: #eef9d4;
    color: #3b501a;
    border-radius: 99px;
    padding: 7px 14px;
    font-size: 13px;
    font-weight: 700;
  }
  .section-title {
    font-size: 24px;
    letter-spacing: -0.02em;
    margin: 40px 0 20px;
    font-weight: 800;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }
  .project {
    border: 1px solid #e8e4ef;
    background: #fff;
    border-radius: 18px;
    padding: 24px;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .project:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(35, 28, 60, 0.08);
  }
  .project h2 {
    font-size: 18px;
    margin: 0 0 10px;
  }
  .project p {
    color: #706b7f;
    font-size: 13px;
    line-height: 1.55;
    margin: 0 0 14px;
    white-space: pre-line;
  }
  .project small {
    display: block;
    font-size: 11px;
    color: #6941df;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .project a {
    color: #6941df;
    font-weight: 700;
    text-decoration: none;
    font-size: 13px;
  }
  .project a:hover {
    text-decoration: underline;
  }
  .connect {
    margin-top: 50px;
    padding: 28px;
    border-radius: 18px;
    background: #f1edfa;
  }
  .connect h3 {
    margin: 0 0 8px;
    font-size: 16px;
  }
  .connect a {
    color: #6941df;
    font-weight: 700;
    margin-right: 18px;
    text-decoration: none;
  }
  .connect a:hover {
    text-decoration: underline;
  }
  footer {
    margin-top: 60px;
    text-align: center;
    font-size: 12px;
    color: #8c7e98;
  }

  /* Midnight Theme */
  [data-theme="midnight"] {
    background: #17142c;
    color: #f7f4ff;
  }
  [data-theme="midnight"] .hero {
    background: linear-gradient(135deg, #241d3b, #453472);
  }
  [data-theme="midnight"] .bio {
    color: #c9c2dc;
  }
  [data-theme="midnight"] .skills span {
    background: #39305c;
    color: #e9e2ff;
  }
  [data-theme="midnight"] .project {
    background: #211d38;
    border-color: #4d4568;
  }
  [data-theme="midnight"] .project p {
    color: #c9c2dc;
  }
  [data-theme="midnight"] .project small,
  [data-theme="midnight"] .project a,
  [data-theme="midnight"] .connect a {
    color: #d3f879;
  }
  [data-theme="midnight"] .connect {
    background: #262040;
  }

  /* Editorial Theme */
  [data-theme="editorial"] {
    background: #fffaf3;
    color: #231c3c;
    font-family: Georgia, serif;
  }
  [data-theme="editorial"] .hero {
    background: linear-gradient(135deg, #ead4bd, #b67c68);
    color: #231c3c;
  }
  [data-theme="editorial"] .name,
  [data-theme="editorial"] .role {
    font-family: Georgia, serif;
  }
  [data-theme="editorial"] .skills span {
    background: #f3dfca;
    color: #493d32;
    font-family: var(--font);
  }
  [data-theme="editorial"] .project {
    border-color: #e3d4c3;
    background: #fff;
  }
  [data-theme="editorial"] .project a,
  [data-theme="editorial"] .connect a {
    color: #995a41;
  }
  [data-theme="editorial"] .connect {
    background: #f5ebe0;
  }

  @media (max-width: 600px) {
    main { padding: 30px 16px; }
    .hero { padding: 32px 24px; }
    .name { font-size: 36px; }
  }
</style>
</head>
<body data-theme="${esc(p.template)}">
<main>
  <header class="hero">
    <div class="eyebrow">${esc(p.location || 'Portfolio')}</div>
    <div class="name">${esc(p.name || 'Candidate Portfolio')}</div>
    <div class="role">${esc(p.role || '')}</div>
  </header>
  <div class="content">
    ${p.bio ? `<p class="bio">${esc(p.bio)}</p>` : ''}
    ${tags ? `
      <div class="skills-wrap">
        <h3>Skills & Toolkit</h3>
        <div class="skills">${tags}</div>
      </div>
    ` : ''}
    ${projects.length ? `
      <h2 class="section-title">Selected Work</h2>
      <div class="grid">
        ${projects.map(x => `
          <article class="project">
            <h2>${esc(x.title)}</h2>
            <p>${esc(x.description)}</p>
            ${x.tech ? `<small>${esc(x.tech)}</small>` : ''}
            ${x.url && validUrl(x.url) ? `<p><a href="${safeHref(x.url)}" target="_blank" rel="noopener">View Project ↗</a></p>` : ''}
          </article>
        `).join('')}
      </div>
    ` : ''}
    ${p.education ? `
      <h2 class="section-title">Education & Learning</h2>
      <p class="bio" style="font-size:15px">${esc(p.education)}</p>
    ` : ''}
    <div class="connect">
      <h3>Let's Connect</h3>
      ${p.email ? `<a href="mailto:${esc(p.email)}">✉ ${esc(p.email)}</a>` : ''}
      ${p.website && validUrl(p.website) ? `<a href="${safeHref(p.website)}" target="_blank" rel="noopener">🌐 Website ↗</a>` : ''}
    </div>
  </div>
  <footer>
    <p>Created with MyAnatomy Portfolio Studio · © ${new Date().getFullYear()} ${esc(p.name || '')}</p>
  </footer>
</main>
</body>
</html>`;
  }

  function close() {
    if (dialog.open) dialog.close();
  }

  function open() {
    if (!host) return;
    try {
      profile = normalize(host.getProfile());
    } catch (e) {
      console.error('Failed to load portfolio profile:', e);
      profile = clone(null);
    }
    step = 1;
    error = '';
    status = '';
    render();
    if (!dialog.open) dialog.showModal();
  }

  dialog.addEventListener('cancel', (e) => {
    e.preventDefault();
    close();
  });

  // Light dismiss fallback
  dialog.addEventListener('click', (e) => {
    if (e.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
      close();
    }
  });

  window.PortfolioBuilder = {
    init(h) {
      host = h;
    },
    open,
    close
  };
})();
