const STORAGE_KEY = "tagesplanung-session";
const focusOptions = ["Arbeit", "Apostolat", "Lernen", "Programme entwickeln", "Haushalt", "Zimmer", "Orga"];

const defaultPlanning = {
  totalMinutes: 180,
  main: 50,
  side: 20,
  breaks: 10,
  balance: 10,
  buffer: 10,
  mainFocus: "Arbeit",
  sideFocuses: ["Lernen"],
  balanceLabel: "Bewegung oder Abwechslung",
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
  totalMinutesRange: document.getElementById("total-minutes-range"),
  mainFocusOptions: document.getElementById("main-focus-options"),
  sideFocusOptions: document.getElementById("side-focus-options"),
  balanceLabel: document.getElementById("balance-label"),
  mainPercent: document.getElementById("percent-main"),
  sidePercent: document.getElementById("percent-side"),
  breaksPercent: document.getElementById("percent-breaks"),
  balancePercent: document.getElementById("percent-balance"),
  bufferPercent: document.getElementById("percent-buffer"),
  mainPercentLabel: document.getElementById("main-percent-label"),
  sidePercentLabel: document.getElementById("side-percent-label"),
  breaksPercentLabel: document.getElementById("breaks-percent-label"),
  balancePercentLabel: document.getElementById("balance-percent-label"),
  bufferPercentLabel: document.getElementById("buffer-percent-label"),
  percentSummary: document.getElementById("percent-summary"),
  refreshScheduleButton: document.getElementById("refresh-schedule-button"),
  exportIcsButton: document.getElementById("export-ics-button"),
  resetPlanningButton: document.getElementById("reset-planning-button"),
  planningResults: document.getElementById("planning-results"),
  scheduleCaption: document.getElementById("schedule-caption"),
  scheduleResults: document.getElementById("schedule-results"),
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
    const parsedPlanning = parsed.planning || {};

    return {
      ...createDefaultState(),
      ...parsed,
      planning: {
        ...defaultPlanning,
        ...parsedPlanning,
        mainFocus: focusOptions.includes(parsedPlanning.mainFocus) ? parsedPlanning.mainFocus : defaultPlanning.mainFocus,
        sideFocuses: Array.isArray(parsedPlanning.sideFocuses)
          ? parsedPlanning.sideFocuses.filter((item) => focusOptions.includes(item))
          : [...defaultPlanning.sideFocuses],
        balanceLabel: typeof parsedPlanning.balanceLabel === "string"
          ? parsedPlanning.balanceLabel
          : defaultPlanning.balanceLabel,
      },
      routineSections: Array.isArray(parsed.routineSections)
        ? parsed.routineSections
        : cloneRoutineSections(defaultRoutineSections),
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
    scheduleStartTime: new Date().toISOString(),
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

  elements.totalMinutes.addEventListener("input", (event) => {
    state.planning.totalMinutes = sanitizeNumber(event.target.value);
    saveState();
    syncPlanningInputs();
    renderPlanning();
  });

  elements.totalMinutesRange.addEventListener("input", (event) => {
    state.planning.totalMinutes = sanitizeNumber(event.target.value);
    saveState();
    syncPlanningInputs();
    renderPlanning();
  });

  [
    ["mainPercent", "main"],
    ["sidePercent", "side"],
    ["breaksPercent", "breaks"],
    ["balancePercent", "balance"],
    ["bufferPercent", "buffer"],
  ].forEach(([elementKey, stateKey]) => {
    elements[elementKey].addEventListener("input", (event) => {
      state.planning[stateKey] = sanitizeNumber(event.target.value);
      saveState();
      renderPlanning();
    });
  });

  elements.balanceLabel.addEventListener("input", (event) => {
    state.planning.balanceLabel = event.target.value;
    saveState();
    renderPlanning();
  });

  elements.refreshScheduleButton.addEventListener("click", () => {
    state.scheduleStartTime = new Date().toISOString();
    saveState();
    renderSchedule();
  });

  elements.exportIcsButton.addEventListener("click", () => {
    exportScheduleAsICS();
  });

  elements.resetPlanningButton.addEventListener("click", () => {
    state.planning = { ...defaultPlanning };
    state.scheduleStartTime = new Date().toISOString();
    saveState();
    syncPlanningInputs();
    renderPlanningFocusOptions();
    renderPlanning();
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
  renderPlanningFocusOptions();
  renderPlanning();
  renderRoutineFilters();
  renderRoutine();
  renderEditMode();
}

function syncPlanningInputs() {
  elements.totalMinutes.value = state.planning.totalMinutes;
  elements.totalMinutesRange.value = clamp(state.planning.totalMinutes, 30, 360);
  elements.balanceLabel.value = state.planning.balanceLabel;
  elements.mainPercent.value = state.planning.main;
  elements.sidePercent.value = state.planning.side;
  elements.breaksPercent.value = state.planning.breaks;
  elements.balancePercent.value = state.planning.balance;
  elements.bufferPercent.value = state.planning.buffer;
  elements.mainPercentLabel.textContent = state.planning.main;
  elements.sidePercentLabel.textContent = state.planning.side;
  elements.breaksPercentLabel.textContent = state.planning.breaks;
  elements.balancePercentLabel.textContent = state.planning.balance;
  elements.bufferPercentLabel.textContent = state.planning.buffer;
}

function renderTabs() {
  elements.tabButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tabTarget === state.activeTab);
  });

  elements.tabPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.tabPanel === state.activeTab);
  });
}

function renderPlanningFocusOptions() {
  elements.mainFocusOptions.innerHTML = "";
  elements.sideFocusOptions.innerHTML = "";

  focusOptions.forEach((option) => {
    const mainButton = document.createElement("button");
    mainButton.type = "button";
    mainButton.className = `choice-chip${state.planning.mainFocus === option ? " choice-chip-active" : ""}`;
    mainButton.textContent = option;
    mainButton.setAttribute("aria-pressed", String(state.planning.mainFocus === option));
    mainButton.addEventListener("click", () => {
      state.planning.mainFocus = option;
      state.planning.sideFocuses = state.planning.sideFocuses.filter((item) => item !== option);
      saveState();
      renderPlanningFocusOptions();
      renderPlanning();
    });
    elements.mainFocusOptions.appendChild(mainButton);

    const isSelected = state.planning.sideFocuses.includes(option);
    const isDisabled = state.planning.mainFocus === option;
    const sideButton = document.createElement("button");
    sideButton.type = "button";
    sideButton.className = `choice-chip${isSelected ? " choice-chip-active" : ""}${isDisabled ? " choice-chip-disabled" : ""}`;
    sideButton.textContent = option;
    sideButton.disabled = isDisabled;
    sideButton.setAttribute("aria-pressed", String(isSelected));
    sideButton.addEventListener("click", () => {
      if (state.planning.sideFocuses.includes(option)) {
        state.planning.sideFocuses = state.planning.sideFocuses.filter((item) => item !== option);
      } else {
        state.planning.sideFocuses = [...state.planning.sideFocuses, option];
      }
      saveState();
      renderPlanningFocusOptions();
      renderPlanning();
    });
    elements.sideFocusOptions.appendChild(sideButton);
  });
}

function renderPlanning() {
  syncPlanningInputs();
  renderPlanningFocusOptions();
  renderPlanningSummary();
  renderPlanningResults();
  renderSchedule();
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
    elements.percentSummary.textContent = "Summe: 100 %. Die Verteilung ist gültig.";
  } else {
    elements.percentSummary.classList.add("is-invalid");
    elements.percentSummary.textContent = `Summe: ${percentSum} %. Bitte passe die Werte auf genau 100 % an.`;
  }
}

function getPlanItems() {
  return [
    {
      label: `Hauptfokus: ${state.planning.mainFocus}`,
      note: "Wichtigster Block des Tages",
      minutes: getMinutes(state.planning.totalMinutes, state.planning.main),
    },
    {
      label: formatSideFocusLabel(),
      note: "Zweiter klarer Arbeitsblock",
      minutes: getMinutes(state.planning.totalMinutes, state.planning.side),
    },
    {
      label: "Pausen",
      note: "Kurze Unterbrechungen zum Durchatmen",
      minutes: getMinutes(state.planning.totalMinutes, state.planning.breaks),
    },
    {
      label: state.planning.balanceLabel || "Gegengewicht",
      note: "Bewegung, Abwechslung oder ein guter Gegenschwerpunkt",
      minutes: getMinutes(state.planning.totalMinutes, state.planning.balance),
    },
    {
      label: "Puffer",
      note: "Falls etwas länger dauert als gedacht",
      minutes: getMinutes(state.planning.totalMinutes, state.planning.buffer),
    },
  ];
}

function renderPlanningResults() {
  const items = getPlanItems();
  elements.planningResults.innerHTML = "";

  items.forEach((item) => {
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

function getScheduleSegments() {
  if (getPlanningPercentSum() !== 100) {
    return [];
  }

  const breakMinutes = getMinutes(state.planning.totalMinutes, state.planning.breaks);
  const segments = [];
  const addSegment = (id, label, minutes, kind) => {
    if (minutes > 0) {
      segments.push({ id, label, minutes, kind });
    }
  };

  let mainMinutes = getMinutes(state.planning.totalMinutes, state.planning.main);
  const sideMinutes = getMinutes(state.planning.totalMinutes, state.planning.side);
  const balanceMinutes = getMinutes(state.planning.totalMinutes, state.planning.balance);
  const bufferMinutes = getMinutes(state.planning.totalMinutes, state.planning.buffer);
  const mainLabel = `Hauptfokus: ${state.planning.mainFocus}`;

  if (mainMinutes >= 90 && breakMinutes > 0) {
    const firstHalf = Math.round(mainMinutes / 2);
    const secondHalf = Math.max(0, mainMinutes - firstHalf);
    const breakSlot = Math.min(10, breakMinutes);
    addSegment("main-1", mainLabel, firstHalf, "main");
    addSegment("pause-1", "Kurze Pause", breakSlot, "pause");
    addSegment("main-2", mainLabel, secondHalf, "main");
    mainMinutes = 0;
  }

  addSegment("main", mainLabel, mainMinutes, "main");

  const remainingBreaks = Math.max(
    0,
    breakMinutes - segments.filter((segment) => segment.kind === "pause").reduce((sum, segment) => sum + segment.minutes, 0)
  );

  addSegment("side", formatSideFocusLabel(), sideMinutes, "side");
  addSegment("breaks", "Pausen", remainingBreaks, "pause");
  addSegment("balance", state.planning.balanceLabel || "Gegengewicht", balanceMinutes, "balance");
  addSegment("buffer", "Puffer", bufferMinutes, "buffer");

  return segments;
}

function renderSchedule() {
  const segments = getScheduleSegments();
  const start = new Date(state.scheduleStartTime || new Date().toISOString());
  const items = buildScheduleItems(segments, start);

  elements.scheduleResults.innerHTML = "";

  if (items.length === 0) {
    elements.scheduleCaption.textContent = "Der Ablaufplan erscheint, sobald die Summe genau 100 % ergibt.";
    return;
  }

  elements.scheduleCaption.textContent = `Automatische Aufteilung ab ${formatTime(start)} Uhr.`;

  items.forEach((item) => {
    const row = document.createElement("div");
    row.className = `schedule-row schedule-row-${item.kind}`;
    row.innerHTML = `
      <div>
        <strong>${escapeHtml(item.label)}</strong>
        <p>${item.minutes} Min</p>
      </div>
      <div class="schedule-time">${item.startLabel}–${item.endLabel}</div>
    `;
    elements.scheduleResults.appendChild(row);
  });
}

function buildScheduleItems(segments, startTime) {
  let cursor = new Date(startTime);

  return segments.map((segment) => {
    const start = new Date(cursor);
    const end = new Date(cursor.getTime() + segment.minutes * 60000);
    cursor = end;

    return {
      ...segment,
      start,
      end,
      startLabel: formatTime(start),
      endLabel: formatTime(end),
    };
  });
}

function exportScheduleAsICS() {
  const items = buildScheduleItems(getScheduleSegments(), new Date(state.scheduleStartTime || new Date().toISOString()));

  if (items.length === 0) {
    return;
  }

  const nowStamp = formatICSDate(new Date());
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Tagesplanung//DE",
    "CALSCALE:GREGORIAN",
  ];

  items.forEach((item, index) => {
    lines.push("BEGIN:VEVENT");
    lines.push(`UID:tagesplanung-${item.id}-${index}-${nowStamp}`);
    lines.push(`DTSTAMP:${nowStamp}`);
    lines.push(`DTSTART:${formatICSDate(item.start)}`);
    lines.push(`DTEND:${formatICSDate(item.end)}`);
    lines.push(`SUMMARY:${item.label.replace(/,/g, "\\,")}`);
    lines.push(`DESCRIPTION:Dauer ${item.minutes} Minuten`);
    lines.push("END:VEVENT");
  });

  lines.push("END:VCALENDAR");

  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `ablaufplan-${new Date().toISOString().slice(0, 10)}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

function formatSideFocusLabel() {
  if (state.planning.sideFocuses.length === 0) {
    return "Nebenfokus";
  }

  return `Nebenfokus: ${state.planning.sideFocuses.join(", ")}`;
}

function getMinutes(totalMinutes, percent) {
  return Math.round((Math.max(0, totalMinutes) * Math.max(0, percent)) / 100);
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

      stepElement.querySelectorAll("input[data-mode]").forEach((checkbox) => {
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

function sanitizeNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function formatTime(date) {
  return date.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
}

function formatICSDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
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
