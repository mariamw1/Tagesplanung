const STORAGE_KEY = "tagesplanung-session";

const defaultPlanning = {
  totalMinutes: 180,
  main: 50,
  side: 20,
  breaks: 10,
  balance: 10,
  buffer: 10,
};

const defaultRoutineSections = [
  {
    id: "section-1",
    title: "Schlafzimmer",
    steps: [
      { id: "step-1", text: "Aufstehen", note: "", modes: ["full", "minimal", "catchup"] },
      { id: "step-2", text: "Fenster im Schlafzimmer öffnen", note: "", modes: ["full", "minimal"] },
      { id: "step-3", text: "Bettdecke zurückschlagen", note: "", modes: ["full"] },
    ],
  },
  {
    id: "section-2",
    title: "Bad",
    steps: [
      { id: "step-4", text: "Toilette", note: "", modes: ["full", "minimal"] },
      { id: "step-5", text: "Zähne putzen", note: "", modes: ["full", "minimal"] },
      { id: "step-6", text: "Gesicht waschen", note: "", modes: ["full", "minimal"] },
      { id: "step-7", text: "Deo benutzen", note: "", modes: ["full", "minimal"] },
      { id: "step-8", text: "Haare bürsten oder ordnen", note: "", modes: ["full"] },
      { id: "step-9", text: "Duschen", note: "Nur an Tagen, an denen es wirklich dazugehört.", modes: ["full", "catchup"] },
    ],
  },
  {
    id: "section-3",
    title: "Schlafzimmer",
    steps: [
      { id: "step-10", text: "Anziehen", note: "", modes: ["full", "minimal"] },
      { id: "step-11", text: "Schlafsachen ordentlich hinlegen", note: "", modes: ["full"] },
      { id: "step-12", text: "Bett grob richten", note: "", modes: ["full", "catchup"] },
    ],
  },
  {
    id: "section-4",
    title: "Küche",
    steps: [
      { id: "step-13", text: "Wasserflasche auffüllen", note: "", modes: ["full", "minimal"] },
      { id: "step-14", text: "Etwas trinken", note: "", modes: ["full", "minimal"] },
      { id: "step-15", text: "Frühstück oder Tee oder Kaffee vorbereiten", note: "", modes: ["full"] },
      { id: "step-16", text: "Frühstück essen oder Tee oder Kaffee trinken", note: "", modes: ["full"] },
    ],
  },
  {
    id: "section-5",
    title: "Tagesstart",
    steps: [
      { id: "step-17", text: "Hauptfokus für heute festlegen", note: "", modes: ["full", "minimal"] },
      { id: "step-18", text: "Wichtige Dinge für heute hinlegen", note: "", modes: ["full"] },
      { id: "step-19", text: "Arbeitsplatz oder Tagesstart kurz vorbereiten", note: "", modes: ["full", "minimal", "catchup"] },
    ],
  },
];

const state = loadState();

const elements = {
  tabButtons: Array.from(document.querySelectorAll("[data-tab-target]")),
  tabPanels: Array.from(document.querySelectorAll("[data-tab-panel]")),
  totalMinutes: document.getElementById("total-minutes"),
  mainPercent: document.getElementById("percent-main"),
  sidePercent: document.getElementById("percent-side"),
  breaksPercent: document.getElementById("percent-breaks"),
  balancePercent: document.getElementById("percent-balance"),
  bufferPercent: document.getElementById("percent-buffer"),
  percentSummary: document.getElementById("percent-summary"),
  calculateButton: document.getElementById("calculate-button"),
  resetPlanningButton: document.getElementById("reset-planning-button"),
  planningResults: document.getElementById("planning-results"),
  routineFilterButtons: document.getElementById("routine-filter-buttons"),
  routineSections: document.getElementById("routine-sections"),
  routineProgressBar: document.getElementById("routine-progress-bar"),
  routineProgressText: document.getElementById("routine-progress-text"),
  resetRoutineButton: document.getElementById("reset-routine-button"),
  toggleEditModeButton: document.getElementById("toggle-edit-mode"),
  editPanel: document.getElementById("edit-panel"),
  addSectionButton: document.getElementById("add-section-button"),
  editorSections: document.getElementById("editor-sections"),
};

bindEvents();
renderAll();

function loadState() {
  const raw = window.sessionStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return createDefaultState();
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      ...createDefaultState(),
      ...parsed,
      planning: {
        ...defaultPlanning,
        ...(parsed.planning || {}),
      },
      routineSections: Array.isArray(parsed.routineSections) ? parsed.routineSections : cloneRoutineSections(defaultRoutineSections),
      completedSteps: Array.isArray(parsed.completedSteps) ? parsed.completedSteps : [],
    };
  } catch {
    return createDefaultState();
  }
}

function createDefaultState() {
  return {
    activeTab: "planung",
    planning: { ...defaultPlanning },
    planningResults: calculatePlanning(defaultPlanning),
    routineMode: "full",
    completedSteps: [],
    routineSections: cloneRoutineSections(defaultRoutineSections),
    editMode: false,
  };
}

function saveState() {
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function bindEvents() {
  elements.tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.activeTab = button.dataset.tabTarget;
      saveState();
      renderTabs();
    });
  });

  [
    ["totalMinutes", "totalMinutes"],
    ["mainPercent", "main"],
    ["sidePercent", "side"],
    ["breaksPercent", "breaks"],
    ["balancePercent", "balance"],
    ["bufferPercent", "buffer"],
  ].forEach(([elementKey, stateKey]) => {
    elements[elementKey].addEventListener("input", (event) => {
      const value = Number(event.target.value);
      state.planning[stateKey] = Number.isFinite(value) ? value : 0;
      saveState();
      renderPlanningSummary();
    });
  });

  elements.calculateButton.addEventListener("click", () => {
    if (getPlanningPercentSum() !== 100) {
      renderPlanningSummary();
      return;
    }

    state.planningResults = calculatePlanning(state.planning);
    saveState();
    renderPlanningResults();
  });

  elements.resetPlanningButton.addEventListener("click", () => {
    state.planning = { ...defaultPlanning };
    state.planningResults = calculatePlanning(defaultPlanning);
    saveState();
    syncPlanningInputs();
    renderPlanningSummary();
    renderPlanningResults();
  });

  elements.resetRoutineButton.addEventListener("click", () => {
    state.completedSteps = [];
    saveState();
    renderRoutine();
  });

  elements.toggleEditModeButton.addEventListener("click", () => {
    state.editMode = !state.editMode;
    saveState();
    renderEditMode();
  });

  elements.addSectionButton.addEventListener("click", () => {
    state.routineSections.push({
      id: createId("section"),
      title: "Neuer Raum",
      steps: [],
    });
    saveState();
    renderRoutine();
    renderEditor();
  });
}

function renderAll() {
  syncPlanningInputs();
  renderTabs();
  renderPlanningSummary();
  renderPlanningResults();
  renderRoutineFilters();
  renderRoutine();
  renderEditMode();
}

function syncPlanningInputs() {
  elements.totalMinutes.value = state.planning.totalMinutes;
  elements.mainPercent.value = state.planning.main;
  elements.sidePercent.value = state.planning.side;
  elements.breaksPercent.value = state.planning.breaks;
  elements.balancePercent.value = state.planning.balance;
  elements.bufferPercent.value = state.planning.buffer;
}

function renderTabs() {
  elements.tabButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tabTarget === state.activeTab);
  });

  elements.tabPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.tabPanel === state.activeTab);
  });
}

function getPlanningPercentSum() {
  return state.planning.main +
    state.planning.side +
    state.planning.breaks +
    state.planning.balance +
    state.planning.buffer;
}

function renderPlanningSummary() {
  const percentSum = getPlanningPercentSum();
  elements.percentSummary.className = "summary-box";

  if (percentSum === 100) {
    elements.percentSummary.classList.add("is-valid");
    elements.percentSummary.textContent = "Summe: 100 %. Die Verteilung ist gültig und kann berechnet werden.";
  } else {
    elements.percentSummary.classList.add("is-invalid");
    elements.percentSummary.textContent = `Summe: ${percentSum} %. Bitte passe die Werte auf genau 100 % an.`;
  }
}

function calculatePlanning(planning) {
  return [
    { label: "Hauptfokus", note: "Wichtigster Block des Tages", minutes: getMinutes(planning.totalMinutes, planning.main) },
    { label: "Nebenfokus", note: "Zweiter klarer Arbeitsblock", minutes: getMinutes(planning.totalMinutes, planning.side) },
    { label: "Pausen", note: "Kurze Unterbrechungen zum Durchatmen", minutes: getMinutes(planning.totalMinutes, planning.breaks) },
    { label: "Bewegung oder Abwechslung", note: "Kurzer Wechsel für Kopf und Körper", minutes: getMinutes(planning.totalMinutes, planning.balance) },
    { label: "Pufferzeit", note: "Falls etwas länger dauert als gedacht", minutes: getMinutes(planning.totalMinutes, planning.buffer) },
  ];
}

function getMinutes(totalMinutes, percent) {
  return Math.round((Math.max(0, totalMinutes) * Math.max(0, percent)) / 100);
}

function renderPlanningResults() {
  elements.planningResults.innerHTML = "";

  state.planningResults.forEach((item) => {
    const row = document.createElement("div");
    row.className = "result-item";
    row.innerHTML = `
      <div>
        <strong>${escapeHtml(item.label)}</strong>
        <p class="result-item-note">${escapeHtml(item.note)}</p>
      </div>
      <strong>${item.minutes} Min</strong>
    `;
    elements.planningResults.appendChild(row);
  });
}

function renderRoutineFilters() {
  const filters = [
    { id: "full", label: "Vollroutine" },
    { id: "minimal", label: "Minimalroutine" },
    { id: "catchup", label: "Später nachholen" },
  ];

  elements.routineFilterButtons.innerHTML = "";

  filters.forEach((filter) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `chip-button${state.routineMode === filter.id ? " is-active" : ""}`;
    button.textContent = filter.label;
    button.addEventListener("click", () => {
      state.routineMode = filter.id;
      saveState();
      renderRoutineFilters();
      renderRoutine();
    });
    elements.routineFilterButtons.appendChild(button);
  });
}

function renderRoutine() {
  const visibleSections = getVisibleRoutineSections();
  const visibleSteps = visibleSections.flatMap((section) => section.steps);
  const completedVisibleSteps = visibleSteps.filter((step) => state.completedSteps.includes(step.id));
  const progress = visibleSteps.length === 0 ? 0 : Math.round((completedVisibleSteps.length / visibleSteps.length) * 100);

  elements.routineSections.innerHTML = "";
  elements.routineProgressBar.style.width = `${progress}%`;
  elements.routineProgressText.textContent = `${completedVisibleSteps.length} von ${visibleSteps.length} Schritten erledigt`;

  visibleSections.forEach((section) => {
    const sectionElement = document.createElement("section");
    sectionElement.className = "routine-section";

    const title = document.createElement("h3");
    title.textContent = section.title;
    sectionElement.appendChild(title);

    const list = document.createElement("div");
    list.className = "routine-list";

    section.steps.forEach((step) => {
      const checked = state.completedSteps.includes(step.id);
      const item = document.createElement("label");
      item.className = `routine-item${checked ? " is-done" : ""}`;
      item.innerHTML = `
        <input type="checkbox" ${checked ? "checked" : ""}>
        <div>
          <p class="routine-step-title">${escapeHtml(step.text)}</p>
          ${step.note ? `<p class="routine-step-note">${escapeHtml(step.note)}</p>` : ""}
        </div>
      `;

      item.querySelector("input").addEventListener("change", () => {
        toggleStep(step.id);
      });

      list.appendChild(item);
    });

    sectionElement.appendChild(list);
    elements.routineSections.appendChild(sectionElement);
  });

  renderEditor();
}

function getVisibleRoutineSections() {
  return state.routineSections
    .map((section) => ({
      ...section,
      steps: section.steps.filter((step) => step.modes.includes(state.routineMode)),
    }))
    .filter((section) => section.steps.length > 0);
}

function toggleStep(stepId) {
  if (state.completedSteps.includes(stepId)) {
    state.completedSteps = state.completedSteps.filter((id) => id !== stepId);
  } else {
    state.completedSteps.push(stepId);
  }

  saveState();
  renderRoutine();
}

function renderEditMode() {
  elements.editPanel.classList.toggle("is-hidden", !state.editMode);
  elements.toggleEditModeButton.textContent = state.editMode ? "Bearbeiten schließen" : "Bearbeiten";

  if (state.editMode) {
    renderEditor();
  }
}

function renderEditor() {
  if (!state.editMode) {
    elements.editorSections.innerHTML = "";
    return;
  }

  elements.editorSections.innerHTML = "";

  state.routineSections.forEach((section, sectionIndex) => {
    const sectionElement = document.createElement("section");
    sectionElement.className = "editor-section";

    const sectionRow = document.createElement("div");
    sectionRow.className = "editor-row";
    sectionRow.innerHTML = `
      <input type="text" value="${escapeAttribute(section.title)}" aria-label="Raumtitel">
      <div class="editor-section-actions">
        <button type="button" data-action="move-section-up">↑</button>
        <button type="button" data-action="move-section-down">↓</button>
        <button type="button" data-action="delete-section">Löschen</button>
        <button type="button" data-action="add-step">Schritt hinzufügen</button>
      </div>
    `;

    sectionRow.querySelector("input").addEventListener("input", (event) => {
      section.title = event.target.value;
      saveState();
      renderRoutine();
    });

    bindSectionAction(sectionRow, sectionIndex);
    sectionElement.appendChild(sectionRow);

    const stepContainer = document.createElement("div");
    stepContainer.className = "editor-steps";

    section.steps.forEach((step, stepIndex) => {
      const stepElement = document.createElement("div");
      stepElement.className = "editor-step";
      stepElement.innerHTML = `
        <input type="text" value="${escapeAttribute(step.text)}" aria-label="Schritt">
        <input type="text" value="${escapeAttribute(step.note || "")}" aria-label="Hinweis">
        <div class="editor-step-meta">
          <label class="meta-toggle">
            <input type="checkbox" data-mode="full" ${step.modes.includes("full") ? "checked" : ""}>
            <span>Vollroutine</span>
          </label>
          <label class="meta-toggle">
            <input type="checkbox" data-mode="minimal" ${step.modes.includes("minimal") ? "checked" : ""}>
            <span>Minimalroutine</span>
          </label>
          <label class="meta-toggle">
            <input type="checkbox" data-mode="catchup" ${step.modes.includes("catchup") ? "checked" : ""}>
            <span>Später nachholen</span>
          </label>
        </div>
        <div class="editor-step-actions">
          <button type="button" data-action="move-step-up">↑</button>
          <button type="button" data-action="move-step-down">↓</button>
          <button type="button" data-action="delete-step">Löschen</button>
        </div>
      `;

      const [textInput, noteInput] = stepElement.querySelectorAll('input[type="text"]');
      textInput.addEventListener("input", (event) => {
        step.text = event.target.value;
        saveState();
        renderRoutine();
      });

      noteInput.addEventListener("input", (event) => {
        step.note = event.target.value;
        saveState();
        renderRoutine();
      });

      stepElement.querySelectorAll('input[data-mode]').forEach((checkbox) => {
        checkbox.addEventListener("change", (event) => {
          updateStepModes(sectionIndex, stepIndex, event.target.dataset.mode, event.target.checked);
        });
      });

      bindStepAction(stepElement, sectionIndex, stepIndex);
      stepContainer.appendChild(stepElement);
    });

    sectionElement.appendChild(stepContainer);
    elements.editorSections.appendChild(sectionElement);
  });
}

function bindSectionAction(container, sectionIndex) {
  container.querySelector('[data-action="move-section-up"]').addEventListener("click", () => {
    moveItem(state.routineSections, sectionIndex, sectionIndex - 1);
    saveState();
    renderRoutine();
  });

  container.querySelector('[data-action="move-section-down"]').addEventListener("click", () => {
    moveItem(state.routineSections, sectionIndex, sectionIndex + 1);
    saveState();
    renderRoutine();
  });

  container.querySelector('[data-action="delete-section"]').addEventListener("click", () => {
    const removedSteps = state.routineSections[sectionIndex].steps.map((step) => step.id);
    state.completedSteps = state.completedSteps.filter((id) => !removedSteps.includes(id));
    state.routineSections.splice(sectionIndex, 1);
    saveState();
    renderRoutine();
  });

  container.querySelector('[data-action="add-step"]').addEventListener("click", () => {
    state.routineSections[sectionIndex].steps.push({
      id: createId("step"),
      text: "Neuer Schritt",
      note: "",
      modes: ["full"],
    });
    saveState();
    renderRoutine();
  });
}

function bindStepAction(container, sectionIndex, stepIndex) {
  container.querySelector('[data-action="move-step-up"]').addEventListener("click", () => {
    moveItem(state.routineSections[sectionIndex].steps, stepIndex, stepIndex - 1);
    saveState();
    renderRoutine();
  });

  container.querySelector('[data-action="move-step-down"]').addEventListener("click", () => {
    moveItem(state.routineSections[sectionIndex].steps, stepIndex, stepIndex + 1);
    saveState();
    renderRoutine();
  });

  container.querySelector('[data-action="delete-step"]').addEventListener("click", () => {
    const [removedStep] = state.routineSections[sectionIndex].steps.splice(stepIndex, 1);
    if (removedStep) {
      state.completedSteps = state.completedSteps.filter((id) => id !== removedStep.id);
    }
    saveState();
    renderRoutine();
  });
}

function updateStepModes(sectionIndex, stepIndex, mode, checked) {
  const step = state.routineSections[sectionIndex].steps[stepIndex];
  if (!step) return;

  if (checked && !step.modes.includes(mode)) {
    step.modes.push(mode);
  }

  if (!checked) {
    step.modes = step.modes.filter((entry) => entry !== mode);
  }

  if (step.modes.length === 0) {
    step.modes = ["full"];
  }

  saveState();
  renderRoutine();
}

function moveItem(list, fromIndex, toIndex) {
  if (toIndex < 0 || toIndex >= list.length) {
    return;
  }

  const [item] = list.splice(fromIndex, 1);
  list.splice(toIndex, 0, item);
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`;
}

function cloneRoutineSections(sections) {
  return JSON.parse(JSON.stringify(sections));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("\n", " ");
}
