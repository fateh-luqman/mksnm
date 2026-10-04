(() => {
  'use strict';

  const data = window.CIVIC_DATA;
  if (!data || !Array.isArray(data.topics)) {
    console.error('Data kandungan tidak ditemui.');
    return;
  }

  const topics = data.topics;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const valueMeta = {
    'Kasih Sayang': {
      icon: '♡', accent: '#e83e6d', soft: '#fff0f5',
      description: 'Peka, prihatin dan menghargai orang serta alam sekitar.'
    },
    'Hormat-Menghormati': {
      icon: '✦', accent: '#1f8fd5', soft: '#eef8ff',
      description: 'Menghargai diri, orang lain, peraturan dan kepelbagaian.'
    },
    'Bertanggungjawab': {
      icon: '✓', accent: '#1f9c6d', soft: '#effaf6',
      description: 'Melaksanakan amanah dengan jujur, tertib dan berdisiplin.'
    },
    'Kegembiraan': {
      icon: '☀', accent: '#f1a915', soft: '#fff8e6',
      description: 'Membina hubungan positif, rasa syukur dan semangat kebersamaan.'
    }
  };

  const monthValue = {
    Jun: 'Kasih Sayang', Julai: 'Hormat-Menghormati', Ogos: 'Bertanggungjawab',
    September: 'Kegembiraan', Oktober: 'Kasih Sayang', November: 'Hormat-Menghormati'
  };

  const els = {
    valueGrid: $('#valueGrid'), monthTimeline: $('#monthTimeline'), topicGrid: $('#topicGrid'),
    search: $('#searchInput'), valueFilter: $('#valueFilter'), monthFilter: $('#monthFilter'),
    reset: $('#resetFilters'), emptyReset: $('#emptyReset'), emptyState: $('#emptyState'),
    summary: $('#resultSummary'), dialog: $('#topicDialog'), dialogContent: $('#dialogContent'),
    dialogClose: $('#dialogClose'), progressRing: $('#progressRing'), progressNumber: $('#progressNumber'),
    completedCount: $('#completedCount'), randomTopic: $('#randomTopic'), toast: $('#toast'),
    fontPlus: $('#fontPlus'), fontMinus: $('#fontMinus'), heroValueLabel: $('#heroValueLabel'),
    heroValueText: $('#heroValueText')
  };

  const state = {
    query: '', value: 'all', month: 'all',
    completed: loadJSON('civic-completed', []),
    fontScale: Number(localStorage.getItem('civic-font-scale') || '1')
  };

  function loadJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function saveCompleted() {
    try { localStorage.setItem('civic-completed', JSON.stringify(state.completed)); } catch {}
  }

  function escapeHTML(value = '') {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function safeURL(value = '') {
    try {
      const url = new URL(value);
      return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
    } catch { return null; }
  }

  function listHTML(items) {
    return `<ul>${items.map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ul>`;
  }

  function topicSearchText(topic) {
    return [
      topic.title, topic.month, topic.value, topic.aspect, topic.practice,
      ...(topic.idea || []), ...(topic.focus || []), ...(topic.suggestions || []), ...(topic.info || [])
    ].join(' ').toLocaleLowerCase('ms');
  }

  function getFilteredTopics() {
    const q = state.query.trim().toLocaleLowerCase('ms');
    return topics.filter(topic => {
      const matchesQuery = !q || topicSearchText(topic).includes(q);
      const matchesValue = state.value === 'all' || topic.value === state.value;
      const matchesMonth = state.month === 'all' || topic.month === state.month;
      return matchesQuery && matchesValue && matchesMonth;
    });
  }

  function renderValueCards() {
    const values = Object.keys(valueMeta);
    els.valueGrid.innerHTML = values.map(value => {
      const meta = valueMeta[value];
      const count = topics.filter(t => t.value === value).length;
      return `
        <article class="value-card" role="button" tabindex="0" data-filter-value="${escapeHTML(value)}" style="--accent:${meta.accent};--soft:${meta.soft}">
          <div class="value-icon" aria-hidden="true">${meta.icon}</div>
          <h3>${escapeHTML(value)}</h3>
          <p>${escapeHTML(meta.description)}</p>
          <span class="count">${count} topik · klik untuk jelajah</span>
        </article>`;
    }).join('');

    $$('.value-card', els.valueGrid).forEach(card => {
      const selectValue = () => {
        state.value = card.dataset.filterValue;
        els.valueFilter.value = state.value;
        state.month = 'all'; els.monthFilter.value = 'all';
        state.query = ''; els.search.value = '';
        renderTopics();
        document.querySelector('#topik').scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
      card.addEventListener('click', selectValue);
      card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectValue(); }
      });
    });
  }

  function renderTimeline() {
    const months = ['Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November'];
    els.monthTimeline.innerHTML = months.map(month => {
      const value = monthValue[month];
      const meta = valueMeta[value];
      const count = topics.filter(t => t.month === month).length;
      return `
        <button class="month-card" type="button" data-month="${month}" style="--accent:${meta.accent};--soft:${meta.soft}">
          <span class="month-dot" aria-hidden="true"></span>
          <strong>${month}</strong>
          <small>${escapeHTML(value)} · ${count} topik</small>
        </button>`;
    }).join('');

    $$('.month-card', els.monthTimeline).forEach(button => {
      button.addEventListener('click', () => {
        state.month = button.dataset.month;
        state.value = 'all';
        state.query = '';
        els.monthFilter.value = state.month;
        els.valueFilter.value = 'all';
        els.search.value = '';
        renderTopics();
        document.querySelector('#topik').scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function topicCardHTML(topic) {
    const done = state.completed.includes(topic.id);
    const shortIdea = topic.idea?.[0] || '';
    const shortSuggestion = topic.suggestions?.[0] || '';
    return `
      <article class="topic-card ${done ? 'completed' : ''}" data-value="${escapeHTML(topic.value)}" data-topic-id="${escapeHTML(topic.id)}">
        <div class="topic-card-accent"></div>
        <div class="topic-card-body">
          <div class="topic-meta">
            <span class="tag"><span class="tag-dot"></span>${escapeHTML(topic.value)}</span>
            <span class="month-label">${escapeHTML(topic.month)}</span>
          </div>
          <h3>${escapeHTML(topic.title)}</h3>
          <p class="topic-aspect">${escapeHTML(topic.aspect)}</p>
          <div class="topic-snippets">
            <div class="snippet"><span class="snippet-icon">I</span><span>${escapeHTML(shortIdea)}</span></div>
            <div class="snippet"><span class="snippet-icon">S</span><span>${escapeHTML(shortSuggestion)}</span></div>
          </div>
        </div>
        <div class="topic-card-footer">
          <button class="card-button open-topic" type="button">Baca Topik</button>
          <button class="complete-button" type="button" aria-label="${done ? 'Tandakan belum selesai' : 'Tandakan selesai'}" aria-pressed="${done}">${done ? '✓' : '○'}</button>
        </div>
      </article>`;
  }

  function renderTopics() {
    const filtered = getFilteredTopics();
    els.topicGrid.innerHTML = filtered.map(topicCardHTML).join('');
    els.emptyState.hidden = filtered.length > 0;
    els.summary.textContent = filtered.length === topics.length
      ? `Memaparkan semua ${topics.length} topik.`
      : `Memaparkan ${filtered.length} daripada ${topics.length} topik.`;

    $$('.topic-card', els.topicGrid).forEach(card => {
      const id = card.dataset.topicId;
      $('.open-topic', card).addEventListener('click', () => openTopic(id));
      $('.complete-button', card).addEventListener('click', event => {
        event.stopPropagation();
        toggleComplete(id);
      });
    });
    updateProgress();
  }

  function sourceHTML(sources = []) {
    if (!sources.length) return '';
    return `<div class="info-source"><strong>Sumber dalam manual:</strong>${sources.map(source => {
      const url = safeURL(source);
      return url
        ? `<a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(source)}</a>`
        : `<span>${escapeHTML(source)}</span>`;
    }).join('')}</div>`;
  }

  function openTopic(id, updateURL = true) {
    const topic = topics.find(t => t.id === id);
    if (!topic) return;
    const done = state.completed.includes(topic.id);
    const meta = valueMeta[topic.value];

    els.dialogContent.innerHTML = `
      <div class="dialog-hero" data-value="${escapeHTML(topic.value)}" style="--accent:${meta.accent};--soft:${meta.soft}">
        <span class="tag"><span class="tag-dot"></span>${escapeHTML(topic.value)} · ${escapeHTML(topic.month)}</span>
        <h2 id="dialogTitle">${escapeHTML(topic.title)}</h2>
        <p>${escapeHTML(topic.aspect)}</p>
      </div>
      <div class="dialog-body" data-value="${escapeHTML(topic.value)}" style="--accent:${meta.accent};--soft:${meta.soft}">
        <div class="dialog-grid">
          <section class="info-panel"><h3><span>I</span> Idea</h3>${listHTML(topic.idea)}</section>
          <section class="info-panel"><h3><span>F</span> Fokus</h3>${listHTML(topic.focus)}</section>
          <section class="info-panel"><h3><span>S</span> Saranan</h3>${listHTML(topic.suggestions)}</section>
        </div>
        <div class="practice-panel"><strong>Amalan berterusan:</strong> ${escapeHTML(topic.practice)}</div>
        ${topic.info?.length ? `<section class="info-panel" style="margin-top:14px"><h3><span>i</span> Info daripada manual</h3>${listHTML(topic.info)}${sourceHTML(topic.sources)}</section>` : sourceHTML(topic.sources)}
        <div class="dialog-actions">
          <span class="dialog-page">Rujukan halaman topik manual: ${escapeHTML(topic.page)}</span>
          <button class="button dialog-complete" type="button" id="dialogComplete" style="--accent:${meta.accent}" aria-pressed="${done}">${done ? '✓ Topik Selesai' : 'Tandakan Selesai'}</button>
        </div>
      </div>`;

    $('#dialogComplete').addEventListener('click', () => {
      toggleComplete(topic.id);
      const nowDone = state.completed.includes(topic.id);
      const button = $('#dialogComplete');
      button.setAttribute('aria-pressed', String(nowDone));
      button.textContent = nowDone ? '✓ Topik Selesai' : 'Tandakan Selesai';
    });

    if (typeof els.dialog.showModal === 'function') {
      els.dialog.showModal();
      document.body.classList.add('modal-open');
    } else {
      els.dialog.setAttribute('open', '');
    }

    if (updateURL) {
      const url = new URL(window.location.href);
      url.searchParams.set('topik', topic.id);
      history.replaceState({}, '', url);
    }
  }

  function closeDialog(updateURL = true) {
    if (els.dialog.open && typeof els.dialog.close === 'function') els.dialog.close();
    else els.dialog.removeAttribute('open');
    document.body.classList.remove('modal-open');
    if (updateURL) {
      const url = new URL(window.location.href);
      url.searchParams.delete('topik');
      history.replaceState({}, '', url.pathname + url.search + url.hash);
    }
  }

  function toggleComplete(id) {
    const index = state.completed.indexOf(id);
    const topic = topics.find(t => t.id === id);
    if (index >= 0) {
      state.completed.splice(index, 1);
      showToast('Tanda selesai dibatalkan.');
    } else {
      state.completed.push(id);
      showToast(`Bagus! “${topic?.title || 'Topik'}” ditandakan selesai.`);
    }
    saveCompleted();
    renderTopics();
  }

  function updateProgress() {
    state.completed = state.completed.filter(id => topics.some(t => t.id === id));
    const count = state.completed.length;
    const percent = Math.round((count / topics.length) * 100);
    els.completedCount.textContent = String(count);
    els.progressNumber.textContent = `${percent}%`;
    els.progressRing.style.setProperty('--progress', `${percent * 3.6}deg`);
  }

  function resetFilters() {
    state.query = ''; state.value = 'all'; state.month = 'all';
    els.search.value = ''; els.valueFilter.value = 'all'; els.monthFilter.value = 'all';
    renderTopics();
  }

  let toastTimer;
  function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => els.toast.classList.remove('show'), 2400);
  }

  function renderManualContent() {
    $('#fpkText').textContent = data.meta.fpk;
    $('#visionText').textContent = data.meta.vision;
    $('#missionText').textContent = data.meta.mission;
    $('#sourceNote').textContent = data.meta.notes;
    $('#backgroundList').innerHTML = data.meta.background.map(item => `<li>${escapeHTML(item)}</li>`).join('');

    const creditGroups = [
      ['Penasihat', data.credits.advisor],
      ['Pasukan Tindak Susul', data.credits.followUp],
      ['Panel Penulis Manual Sekolah Rendah', data.credits.primaryAuthors]
    ];
    $('#creditsBlock').innerHTML = creditGroups.map(([title, names]) => `
      <div class="credit-group"><h4>${escapeHTML(title)}</h4><ul class="credit-list">${names.map(name => `<li>${escapeHTML(name)}</li>`).join('')}</ul></div>
    `).join('');
  }

  function setFontScale(next) {
    state.fontScale = Math.min(1.18, Math.max(.92, Number(next.toFixed(2))));
    document.documentElement.style.setProperty('--font-scale', state.fontScale);
    try { localStorage.setItem('civic-font-scale', String(state.fontScale)); } catch {}
    showToast(`Saiz teks: ${Math.round(state.fontScale * 100)}%`);
  }

  function setupHeroValues() {
    $$('[data-hero-value]').forEach(button => {
      button.addEventListener('click', () => {
        const value = button.dataset.heroValue;
        const meta = valueMeta[value];
        $$('[data-hero-value]').forEach(item => item.classList.remove('active'));
        button.classList.add('active');
        els.heroValueLabel.textContent = value;
        els.heroValueText.textContent = meta.description;
      });
    });
  }

  function setupReveal() {
    const items = $$('.reveal');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(item => item.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    items.forEach(item => observer.observe(item));
  }

  els.search.addEventListener('input', event => { state.query = event.target.value; renderTopics(); });
  els.valueFilter.addEventListener('change', event => { state.value = event.target.value; renderTopics(); });
  els.monthFilter.addEventListener('change', event => { state.month = event.target.value; renderTopics(); });
  els.reset.addEventListener('click', resetFilters);
  els.emptyReset.addEventListener('click', resetFilters);
  els.dialogClose.addEventListener('click', () => closeDialog());
  els.dialog.addEventListener('click', event => { if (event.target === els.dialog) closeDialog(); });
  els.dialog.addEventListener('cancel', event => { event.preventDefault(); closeDialog(); });
  els.randomTopic.addEventListener('click', () => openTopic(topics[Math.floor(Math.random() * topics.length)].id));
  els.fontPlus.addEventListener('click', () => setFontScale(state.fontScale + .06));
  els.fontMinus.addEventListener('click', () => setFontScale(state.fontScale - .06));

  document.documentElement.style.setProperty('--font-scale', state.fontScale);
  renderValueCards();
  renderTimeline();
  renderTopics();
  renderManualContent();
  setupHeroValues();
  setupReveal();

  const requestedTopic = new URL(window.location.href).searchParams.get('topik');
  if (requestedTopic && topics.some(t => t.id === requestedTopic)) {
    setTimeout(() => openTopic(requestedTopic, false), 80);
  }
})();
