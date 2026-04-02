const STORAGE_KEY = "caishi-web-state-v1";
const DAY_MINUTES = 24 * 60;
const DEFAULT_TASKS = [
  {
    id: "task_math_practice",
    folder: "学习",
    category: "数学",
    action: "做题",
    tags: ["真题", "函数"],
    color: "#4e7bff",
    repeat: "weekdays",
    createdAt: "2026-04-02T09:00:00"
  },
  {
    id: "task_math_review",
    folder: "学习",
    category: "数学",
    action: "复习",
    tags: ["错题", "笔记"],
    color: "#69b1ff",
    repeat: "weekly",
    createdAt: "2026-04-02T09:01:00"
  },
  {
    id: "task_chinese_reading",
    folder: "学习",
    category: "语文",
    action: "阅读",
    tags: ["积累"],
    color: "#f2b94b",
    repeat: "daily",
    createdAt: "2026-04-02T09:02:00"
  },
  {
    id: "task_life_bath",
    folder: "生活",
    category: "起居",
    action: "洗澡",
    tags: ["放松"],
    color: "#ff7da8",
    repeat: "daily",
    createdAt: "2026-04-02T09:03:00"
  }
];

const state = loadState();
const ui = {
  activeView: "today",
  statsPreset: "week",
  statsStart: "",
  statsEnd: ""
};

const refs = {
  taskSearch: document.querySelector("#task-search"),
  searchSuggestions: document.querySelector("#search-suggestions"),
  taskList: document.querySelector("#task-list"),
  taskBlockHint: document.querySelector("#task-block-hint"),
  activeCard: document.querySelector("#active-card"),
  activeTaskTitle: document.querySelector("#active-task-title"),
  activeStartTime: document.querySelector("#active-start-time"),
  activeDuration: document.querySelector("#active-duration"),
  activeTargetBlock: document.querySelector("#active-target-block"),
  activeTargetLabel: document.querySelector("#active-target-label"),
  activeTargetTime: document.querySelector("#active-target-time"),
  actualPie: document.querySelector("#actual-pie"),
  actualPieCenter: document.querySelector("#actual-pie-center"),
  actualLegend: document.querySelector("#actual-legend"),
  todayTotal: document.querySelector("#today-total"),
  todayTimeline: document.querySelector("#today-timeline"),
  planPie: document.querySelector("#plan-pie"),
  planPieCenter: document.querySelector("#plan-pie-center"),
  planTotal: document.querySelector("#plan-total"),
  planList: document.querySelector("#plan-list"),
  views: document.querySelectorAll(".view"),
  navItems: document.querySelectorAll(".nav-item"),
  taskModal: document.querySelector("#task-modal"),
  taskForm: document.querySelector("#task-form"),
  entryModal: document.querySelector("#entry-modal"),
  entryForm: document.querySelector("#entry-form"),
  entryModalEyebrow: document.querySelector("#entry-modal-eyebrow"),
  entryModalTitle: document.querySelector("#entry-modal-title"),
  entryTaskBanner: document.querySelector("#entry-task-banner"),
  entryCompleteRow: document.querySelector("#entry-complete-row"),
  rangePresets: document.querySelectorAll("[data-range]"),
  statsStartDate: document.querySelector("#stats-start-date"),
  statsEndDate: document.querySelector("#stats-end-date"),
  statsFolderFilter: document.querySelector("#stats-folder-filter"),
  statsCategoryFilter: document.querySelector("#stats-category-filter"),
  statsTaskFilter: document.querySelector("#stats-task-filter"),
  statsTotalDuration: document.querySelector("#stats-total-duration"),
  statsPlanDuration: document.querySelector("#stats-plan-duration"),
  statsCompletionRate: document.querySelector("#stats-completion-rate"),
  statsActiveDays: document.querySelector("#stats-active-days"),
  statsBreakdown: document.querySelector("#stats-breakdown"),
  statsBarChart: document.querySelector("#stats-bar-chart"),
  settingsTaskCount: document.querySelector("#settings-task-count"),
  settingsEntryCount: document.querySelector("#settings-entry-count"),
  settingsPlanCount: document.querySelector("#settings-plan-count"),
  settingsTaskDirectory: document.querySelector("#settings-task-directory")
};

let nowTick = Date.now();

bindEvents();
syncStatsDatesFromPreset(ui.statsPreset);
renderAll();
window.setInterval(() => {
  nowTick = Date.now();
  if (state.activeSession) {
    renderActiveSession();
    renderTodayActual();
  }
}, 1000);

function bindEvents() {
  document.querySelector("#new-task-top-button").addEventListener("click", () => openTaskModal());
  document.querySelector("#settings-new-task-button").addEventListener("click", () => openTaskModal());
  document.querySelector("#quick-manual-button").addEventListener("click", () => openQuickEntryModal());
  document.querySelector("#add-plan-button").addEventListener("click", () => openQuickPlanModal());
  document.querySelector("#end-session-button").addEventListener("click", () => endActiveSession());
  document.querySelector("#set-target-button").addEventListener("click", () => setActiveTargetTime());
  document.querySelector("#seed-demo-button").addEventListener("click", () => seedTodayPlans());
  document.querySelector("#export-data-button").addEventListener("click", () => exportData());
  document.querySelector("#clear-today-button").addEventListener("click", () => clearTodayEntries());

  refs.taskSearch.addEventListener("input", renderTaskArea);
  refs.taskForm.addEventListener("submit", handleTaskSubmit);
  refs.entryForm.addEventListener("submit", handleEntrySubmit);

  document.querySelectorAll("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", () => closeModal(button.dataset.closeModal));
  });

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal(modal.id);
      }
    });
  });

  refs.navItems.forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.viewTarget));
  });

  refs.rangePresets.forEach((button) => {
    button.addEventListener("click", () => {
      ui.statsPreset = button.dataset.range;
      syncStatsDatesFromPreset(ui.statsPreset);
      renderStats();
    });
  });

  refs.statsStartDate.addEventListener("change", () => {
    ui.statsPreset = "custom";
    ui.statsStart = refs.statsStartDate.value;
    renderStats();
  });

  refs.statsEndDate.addEventListener("change", () => {
    ui.statsPreset = "custom";
    ui.statsEnd = refs.statsEndDate.value;
    renderStats();
  });

  refs.statsFolderFilter.addEventListener("change", () => {
    populateStatsFilters();
    renderStats();
  });

  refs.statsCategoryFilter.addEventListener("change", () => {
    populateStatsTaskFilter();
    renderStats();
  });

  refs.statsTaskFilter.addEventListener("change", renderStats);
  refs.taskList.addEventListener("click", handleTaskListActions);
  refs.searchSuggestions.addEventListener("click", handleTaskListActions);
  refs.planList.addEventListener("click", handlePlanActions);
  refs.settingsTaskDirectory.addEventListener("click", handleSettingsActions);
}

function loadState() {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return {
      tasks: structuredClone(DEFAULT_TASKS),
      entries: [],
      plans: [],
      activeSession: null
    };
  }

  try {
    const parsed = JSON.parse(stored);
    parsed.tasks = Array.isArray(parsed.tasks) && parsed.tasks.length ? parsed.tasks : structuredClone(DEFAULT_TASKS);
    parsed.entries = Array.isArray(parsed.entries) ? parsed.entries : [];
    parsed.plans = Array.isArray(parsed.plans) ? parsed.plans : [];
    parsed.activeSession = parsed.activeSession || null;
    return parsed;
  } catch (error) {
    return {
      tasks: structuredClone(DEFAULT_TASKS),
      entries: [],
      plans: [],
      activeSession: null
    };
  }
}

function saveState() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function renderAll() {
  switchView(ui.activeView, true);
  populateStatsFilters();
  renderTaskArea();
  renderActiveSession();
  renderTodayActual();
  renderTodayPlans();
  renderStats();
  renderSettings();
}

function switchView(view, quiet = false) {
  ui.activeView = view;
  refs.views.forEach((section) => {
    section.classList.toggle("active", section.dataset.view === view);
  });
  refs.navItems.forEach((button) => {
    button.classList.toggle("active", button.dataset.viewTarget === view);
  });
  if (!quiet && view === "stats") {
    renderStats();
  }
}

function renderTaskArea() {
  const query = refs.taskSearch.value.trim().toLowerCase();
  const tasks = getSortedTasks(query);
  const recentTasks = tasks.slice(0, 8);
  refs.taskBlockHint.textContent = query
    ? `已根据“${refs.taskSearch.value.trim()}”筛选任务。`
    : "点击开始直接计时，也可以补录或加入计划。";

  refs.taskList.innerHTML = recentTasks.length
    ? recentTasks.map((task) => renderTaskCard(task)).join("")
    : renderEmptyState("还没有匹配到任务，可以直接新建一个。");

  if (!query) {
    refs.searchSuggestions.classList.add("hidden");
    refs.searchSuggestions.innerHTML = "";
    return;
  }

  const suggestions = tasks.slice(0, 4);
  const createButton = `
    <button class="suggestion-item" type="button" data-open-task-modal="true" data-prefill="${escapeAttr(refs.taskSearch.value.trim())}">
      <span class="task-swatch" style="--task-color: #4e7bff"></span>
      <div>
        <strong>新建“${escapeHtml(refs.taskSearch.value.trim())}”</strong>
        <div class="task-meta">如果历史里没有，就直接补进模板库。</div>
      </div>
    </button>
  `;
  refs.searchSuggestions.classList.remove("hidden");
  refs.searchSuggestions.innerHTML = suggestions.map((task) => renderSuggestion(task)).join("") + createButton;
}

function renderTaskCard(task) {
  return `
    <article class="task-card">
      <span class="task-swatch" style="--task-color: ${task.color}"></span>
      <div>
        <div class="task-title-row">
          <strong>[${escapeHtml(task.category)}] ${escapeHtml(task.action)}</strong>
          ${task.repeat !== "none" ? `<span class="tag">${escapeHtml(formatRepeat(task.repeat))}</span>` : ""}
        </div>
        <div class="task-meta">${escapeHtml(formatPath(task))}</div>
        ${task.tags?.length ? `<div class="task-tags">${task.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
      </div>
      <div class="task-actions">
        <button class="task-action primary" type="button" data-start-task="${task.id}">开始</button>
        <button class="task-action" type="button" data-manual-task="${task.id}">补录</button>
        <button class="task-action" type="button" data-plan-task="${task.id}">计划</button>
      </div>
    </article>
  `;
}

function renderSuggestion(task) {
  return `
    <button class="suggestion-item" type="button" data-start-task="${task.id}">
      <span class="task-swatch" style="--task-color: ${task.color}"></span>
      <div>
        <strong>[${escapeHtml(task.category)}] ${escapeHtml(task.action)}</strong>
        <div class="task-meta">${escapeHtml(formatPath(task))}</div>
      </div>
      <span class="task-meta">开始</span>
    </button>
  `;
}

function renderActiveSession() {
  if (!state.activeSession) {
    refs.activeCard.classList.add("hidden");
    return;
  }

  const task = findTask(state.activeSession.taskId);
  if (!task) {
    refs.activeCard.classList.add("hidden");
    return;
  }

  refs.activeCard.classList.remove("hidden");
  refs.activeTaskTitle.textContent = `${task.category} · ${task.action}`;
  refs.activeStartTime.textContent = formatTimeLabel(state.activeSession.start);
  refs.activeDuration.textContent = formatDurationClock(nowTick - new Date(state.activeSession.start).getTime());

  if (state.activeSession.targetEnd) {
    refs.activeTargetBlock.classList.remove("hidden");
    const remaining = new Date(state.activeSession.targetEnd).getTime() - nowTick;
    refs.activeTargetLabel.textContent = remaining >= 0 ? "剩余时间" : "已超出";
    refs.activeTargetTime.textContent = formatDurationClock(Math.abs(remaining));
  } else {
    refs.activeTargetBlock.classList.add("hidden");
  }
}

function renderTodayActual() {
  const todayKey = dateKey(new Date());
  const segments = getEntryClockSegments(todayKey);
  const totalMinutes = segments.reduce((sum, segment) => sum + (segment.endMinutes - segment.startMinutes), 0);

  refs.actualPie.style.setProperty("--pie-gradient", buildClockGradient(segments));
  refs.actualPieCenter.textContent = humanizeMinutes(totalMinutes);
  refs.todayTotal.textContent = `已记录 ${humanizeMinutes(totalMinutes)}`;
  refs.actualLegend.innerHTML = buildLegend(getTaskDurationGroups(segments));

  const todayEntries = getEntriesForDate(todayKey).sort((a, b) => new Date(b.start) - new Date(a.start));
  refs.todayTimeline.innerHTML = todayEntries.length
    ? todayEntries.map((entry) => renderTimelineItem(entry)).join("")
    : renderEmptyState("今天还没有记录。先从上面的任务开始，饼图就会动起来。");
}

function renderTodayPlans() {
  const todayKey = dateKey(new Date());
  const plans = state.plans
    .filter((plan) => plan.date === todayKey)
    .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
  const segments = plans.map((plan) => {
    const task = findTask(plan.taskId);
    return {
      startMinutes: timeToMinutes(plan.startTime),
      endMinutes: timeToMinutes(plan.endTime),
      color: task?.color || "#d8d3cb",
      label: task ? `${task.category} · ${task.action}` : "未命名任务"
    };
  });
  const totalMinutes = plans.reduce((sum, plan) => sum + Math.max(timeToMinutes(plan.endTime) - timeToMinutes(plan.startTime), 0), 0);

  refs.planPie.style.setProperty("--pie-gradient", buildClockGradient(segments, "rgba(216, 211, 203, 0.44)"));
  refs.planPieCenter.textContent = humanizeMinutes(totalMinutes);
  refs.planTotal.textContent = `今天计划 ${humanizeMinutes(totalMinutes)}`;
  refs.planList.innerHTML = plans.length
    ? plans.map((plan) => renderPlanItem(plan)).join("")
    : renderEmptyState("还没有安排今日计划。如果你想让实际和计划对照，可以先加几块时间。");
}

function renderStats() {
  setActiveRangePill();
  const range = getStatsRange();
  refs.statsStartDate.value = range.startDate;
  refs.statsEndDate.value = range.endDate;

  const entries = getEntriesWithinRange(range.startDate, range.endDate).filter(matchesStatsFilter);
  const plans = getPlansWithinRange(range.startDate, range.endDate).filter(matchesStatsFilter);
  const totalMinutes = entries.reduce((sum, entry) => sum + entryDurationMinutes(entry), 0);
  const planMinutes = plans.reduce((sum, plan) => sum + Math.max(timeToMinutes(plan.endTime) - timeToMinutes(plan.startTime), 0), 0);
  const completion = planMinutes ? Math.min(Math.round((totalMinutes / planMinutes) * 100), 999) : 0;
  const activeDays = new Set(entries.map((entry) => dateKey(entry.start))).size;

  refs.statsTotalDuration.textContent = humanizeMinutes(totalMinutes);
  refs.statsPlanDuration.textContent = humanizeMinutes(planMinutes);
  refs.statsCompletionRate.textContent = `${completion}%`;
  refs.statsActiveDays.textContent = `${activeDays}天`;

  renderStatsBreakdown(entries);
  renderStatsBars(entries, range.startDate, range.endDate);
}

function renderStatsBreakdown(entries) {
  const groups = new Map();

  entries.forEach((entry) => {
    const task = findTask(entry.taskId);
    if (!task) {
      return;
    }
    const key = task.id;
    const current = groups.get(key) || {
      label: `[${task.category}] ${task.action}`,
      color: task.color,
      minutes: 0
    };
    current.minutes += entryDurationMinutes(entry);
    groups.set(key, current);
  });

  const sorted = [...groups.values()].sort((a, b) => b.minutes - a.minutes);
  const total = sorted.reduce((sum, item) => sum + item.minutes, 0);
  refs.statsBreakdown.innerHTML = sorted.length
    ? sorted.map((item) => {
      const percent = total ? Math.round((item.minutes / total) * 100) : 0;
      return `
        <div class="breakdown-row">
          <div>
            <strong>${escapeHtml(item.label)}</strong>
            <div class="breakdown-bar">
              <div class="breakdown-fill" style="width: ${percent}%; --task-color: ${item.color}"></div>
            </div>
          </div>
          <div>${humanizeMinutes(item.minutes)}</div>
        </div>
      `;
    }).join("")
    : renderEmptyState("这个范围里暂时还没有符合筛选条件的记录。");
}

function renderStatsBars(entries, startDate, endDate) {
  const days = enumerateDateKeys(startDate, endDate);
  const totals = days.map((day) => {
    const dayTotal = entries
      .filter((entry) => dateKey(entry.start) === day)
      .reduce((sum, entry) => sum + entryDurationMinutes(entry), 0);
    return { day, minutes: dayTotal };
  });

  const maxMinutes = Math.max(...totals.map((item) => item.minutes), 1);
  refs.statsBarChart.innerHTML = totals.map((item) => {
    const height = item.minutes ? `${Math.max((item.minutes / maxMinutes) * 180, 16)}px` : "10px";
    return `
      <div class="bar-item">
        <div class="bar-column" style="height: ${height}"></div>
        <div class="bar-meta">
          <span>${formatShortDate(item.day)}</span>
          <strong>${item.minutes ? humanizeMinutes(item.minutes) : "0分"}</strong>
        </div>
      </div>
    `;
  }).join("");
}

function renderSettings() {
  refs.settingsTaskCount.textContent = String(state.tasks.length);
  refs.settingsEntryCount.textContent = String(state.entries.length);
  refs.settingsPlanCount.textContent = String(state.plans.filter((plan) => plan.date === dateKey(new Date())).length);

  const sortedTasks = [...state.tasks].sort((a, b) => `${a.folder}${a.category}${a.action}`.localeCompare(`${b.folder}${b.category}${b.action}`, "zh-CN"));
  refs.settingsTaskDirectory.innerHTML = sortedTasks.map((task) => `
    <article class="directory-item">
      <span class="directory-swatch" style="--task-color: ${task.color}; background: ${task.color}"></span>
      <div class="directory-copy">
        <strong>${escapeHtml(formatPath(task))} / ${escapeHtml(task.action)}</strong>
        <span>${escapeHtml(task.tags?.join(" · ") || "无标签")} · ${escapeHtml(formatRepeat(task.repeat))}</span>
      </div>
      <button class="task-action" type="button" data-delete-task="${task.id}">删除</button>
    </article>
  `).join("");
}

function populateStatsFilters() {
  const folderValue = refs.statsFolderFilter.value || "all";
  const categoryValue = refs.statsCategoryFilter.value || "all";
  const folders = uniqueValues(state.tasks.map((task) => task.folder || "未分类"));
  refs.statsFolderFilter.innerHTML = buildOptions(["all", ...folders], folderValue, "全部");

  const visibleCategories = state.tasks
    .filter((task) => folderValue === "all" || (task.folder || "未分类") === folderValue)
    .map((task) => task.category);
  refs.statsCategoryFilter.innerHTML = buildOptions(["all", ...uniqueValues(visibleCategories)], categoryValue, "全部");
  populateStatsTaskFilter();
}

function populateStatsTaskFilter() {
  const folderValue = refs.statsFolderFilter.value || "all";
  const categoryValue = refs.statsCategoryFilter.value || "all";
  const currentValue = refs.statsTaskFilter.value || "all";
  const filteredTasks = state.tasks.filter((task) => {
    const folderMatches = folderValue === "all" || (task.folder || "未分类") === folderValue;
    const categoryMatches = categoryValue === "all" || task.category === categoryValue;
    return folderMatches && categoryMatches;
  });

  refs.statsTaskFilter.innerHTML = `
    <option value="all"${currentValue === "all" ? " selected" : ""}>全部</option>
    ${filteredTasks.map((task) => `<option value="${task.id}"${currentValue === task.id ? " selected" : ""}>[${escapeHtml(task.category)}] ${escapeHtml(task.action)}</option>`).join("")}
  `;
}

function buildOptions(values, currentValue, allLabel) {
  return values.map((value) => {
    const label = value === "all" ? allLabel : value;
    return `<option value="${escapeAttr(value)}"${currentValue === value ? " selected" : ""}>${escapeHtml(label)}</option>`;
  }).join("");
}

function setActiveRangePill() {
  refs.rangePresets.forEach((button) => {
    button.classList.toggle("active", button.dataset.range === ui.statsPreset);
  });
}

function syncStatsDatesFromPreset(preset) {
  const today = new Date();
  if (preset === "day") {
    ui.statsStart = dateKey(today);
    ui.statsEnd = dateKey(today);
    return;
  }

  if (preset === "week") {
    const day = today.getDay() || 7;
    const monday = new Date(today);
    monday.setDate(today.getDate() - day + 1);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    ui.statsStart = dateKey(monday);
    ui.statsEnd = dateKey(sunday);
    return;
  }

  if (preset === "month") {
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    ui.statsStart = dateKey(start);
    ui.statsEnd = dateKey(end);
    return;
  }

  if (!ui.statsStart || !ui.statsEnd) {
    ui.statsStart = dateKey(today);
    ui.statsEnd = dateKey(today);
  }
}

function getStatsRange() {
  return {
    startDate: ui.statsStart || dateKey(new Date()),
    endDate: ui.statsEnd || dateKey(new Date())
  };
}

function matchesStatsFilter(item) {
  const task = findTask(item.taskId);
  if (!task) {
    return false;
  }

  const folderValue = refs.statsFolderFilter.value || "all";
  const categoryValue = refs.statsCategoryFilter.value || "all";
  const taskValue = refs.statsTaskFilter.value || "all";
  const folderMatches = folderValue === "all" || (task.folder || "未分类") === folderValue;
  const categoryMatches = categoryValue === "all" || task.category === categoryValue;
  const taskMatches = taskValue === "all" || task.id === taskValue;
  return folderMatches && categoryMatches && taskMatches;
}

function handleTaskSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const folder = (formData.get("folder") || "").toString().trim() || "未分类";
  const category = (formData.get("category") || "").toString().trim();
  const action = (formData.get("action") || "").toString().trim();
  const color = (formData.get("color") || "#4e7bff").toString();
  const tags = (formData.get("tags") || "").toString().split(",").map((tag) => tag.trim()).filter(Boolean);
  const repeat = (formData.get("repeat") || "none").toString();

  if (!category || !action) {
    return;
  }

  state.tasks.unshift({
    id: uid("task"),
    folder,
    category,
    action,
    tags,
    color,
    repeat,
    createdAt: new Date().toISOString()
  });

  saveState();
  closeModal("task-modal");
  event.currentTarget.reset();
  event.currentTarget.elements.color.value = "#4e7bff";
  renderAll();
}

function handleEntrySubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const taskId = formData.get("taskId").toString();
  const mode = formData.get("mode").toString();
  const date = formData.get("date").toString();
  const startTime = formData.get("startTime").toString();
  const endTime = formData.get("endTime").toString();

  if (!taskId || !date || !startTime || !endTime || timeToMinutes(endTime) <= timeToMinutes(startTime)) {
    return;
  }

  if (mode === "manual") {
    state.entries.push({
      id: uid("entry"),
      taskId,
      start: `${date}T${startTime}:00`,
      end: `${date}T${endTime}:00`,
      source: "manual"
    });
  }

  if (mode === "plan") {
    state.plans.push({
      id: uid("plan"),
      taskId,
      date,
      startTime,
      endTime,
      completed: Boolean(formData.get("completed"))
    });
  }

  saveState();
  closeModal("entry-modal");
  renderAll();
}

function handleTaskListActions(event) {
  const startButton = event.target.closest("[data-start-task]");
  if (startButton) {
    startTask(startButton.dataset.startTask);
    return;
  }

  const manualButton = event.target.closest("[data-manual-task]");
  if (manualButton) {
    openEntryModal(manualButton.dataset.manualTask, "manual");
    return;
  }

  const planButton = event.target.closest("[data-plan-task]");
  if (planButton) {
    openEntryModal(planButton.dataset.planTask, "plan");
    return;
  }

  const createButton = event.target.closest("[data-open-task-modal]");
  if (createButton) {
    openTaskModal(createButton.dataset.prefill || "");
  }
}

function handlePlanActions(event) {
  const toggle = event.target.closest("[data-toggle-plan]");
  if (toggle) {
    togglePlan(toggle.dataset.togglePlan);
    return;
  }

  const startButton = event.target.closest("[data-start-from-plan]");
  if (startButton) {
    startTask(startButton.dataset.startFromPlan);
  }
}

function handleSettingsActions(event) {
  const deleteButton = event.target.closest("[data-delete-task]");
  if (!deleteButton) {
    return;
  }

  const taskId = deleteButton.dataset.deleteTask;
  state.tasks = state.tasks.filter((task) => task.id !== taskId);
  state.entries = state.entries.filter((entry) => entry.taskId !== taskId);
  state.plans = state.plans.filter((plan) => plan.taskId !== taskId);
  if (state.activeSession?.taskId === taskId) {
    state.activeSession = null;
  }
  saveState();
  renderAll();
}

function startTask(taskId) {
  const task = findTask(taskId);
  if (!task) {
    return;
  }

  if (state.activeSession && state.activeSession.taskId !== taskId) {
    state.entries.push({
      id: uid("entry"),
      taskId: state.activeSession.taskId,
      start: state.activeSession.start,
      end: new Date().toISOString(),
      source: "timer"
    });
  }

  state.activeSession = {
    taskId,
    start: new Date().toISOString(),
    targetEnd: null
  };

  refs.taskSearch.value = "";
  saveState();
  renderAll();
}

function endActiveSession() {
  if (!state.activeSession) {
    return;
  }

  state.entries.push({
    id: uid("entry"),
    taskId: state.activeSession.taskId,
    start: state.activeSession.start,
    end: new Date().toISOString(),
    source: "timer"
  });

  state.activeSession = null;
  saveState();
  renderAll();
}

function setActiveTargetTime() {
  if (!state.activeSession) {
    return;
  }
  const current = state.activeSession.targetEnd ? formatTimeLabel(state.activeSession.targetEnd) : "";
  const value = window.prompt("输入目标结束时间，例如 12:00；留空则清除目标。", current);
  if (value === null) {
    return;
  }
  const trimmed = value.trim();
  if (!trimmed) {
    state.activeSession.targetEnd = null;
    saveState();
    renderAll();
    return;
  }
  if (!/^\d{2}:\d{2}$/.test(trimmed)) {
    return;
  }
  const [hours, minutes] = trimmed.split(":").map(Number);
  if (hours > 23 || minutes > 59) {
    return;
  }
  state.activeSession.targetEnd = `${dateKey(new Date(state.activeSession.start))}T${trimmed}:00`;
  saveState();
  renderAll();
}

function openTaskModal(prefill = "") {
  refs.taskModal.classList.remove("hidden");
  refs.taskForm.reset();
  refs.taskForm.elements.color.value = "#4e7bff";
  if (prefill) {
    refs.taskForm.elements.action.value = prefill;
  }
}

function openQuickEntryModal() {
  const firstTask = state.tasks[0];
  if (!firstTask) {
    openTaskModal();
    return;
  }
  openEntryModal(firstTask.id, "manual");
}

function openQuickPlanModal() {
  const firstTask = state.tasks[0];
  if (!firstTask) {
    openTaskModal();
    return;
  }
  openEntryModal(firstTask.id, "plan");
}

function openEntryModal(taskId, mode) {
  const task = findTask(taskId);
  if (!task) {
    return;
  }

  refs.entryModal.classList.remove("hidden");
  refs.entryForm.reset();
  refs.entryForm.elements.taskId.value = taskId;
  refs.entryForm.elements.mode.value = mode;
  refs.entryForm.elements.date.value = dateKey(new Date());
  refs.entryForm.elements.startTime.value = defaultStartTime();
  refs.entryForm.elements.endTime.value = defaultEndTime();
  refs.entryTaskBanner.innerHTML = `<strong>[${escapeHtml(task.category)}] ${escapeHtml(task.action)}</strong><div class="task-meta">${escapeHtml(formatPath(task))}</div>`;

  if (mode === "manual") {
    refs.entryModalEyebrow.textContent = "补录";
    refs.entryModalTitle.textContent = "补录一段实际时间";
    refs.entryCompleteRow.classList.add("hidden");
  } else {
    refs.entryModalEyebrow.textContent = "计划";
    refs.entryModalTitle.textContent = "添加一块计划时间";
    refs.entryCompleteRow.classList.remove("hidden");
  }
}

function closeModal(id) {
  const modal = document.querySelector(`#${id}`);
  if (modal) {
    modal.classList.add("hidden");
  }
}

function togglePlan(planId) {
  const plan = state.plans.find((item) => item.id === planId);
  if (!plan) {
    return;
  }
  plan.completed = !plan.completed;
  saveState();
  renderAll();
}

function seedTodayPlans() {
  const today = dateKey(new Date());
  const alreadySeeded = state.plans.some((plan) => plan.date === today);
  if (alreadySeeded || state.tasks.length < 3) {
    return;
  }

  const sample = [
    { taskId: state.tasks[0].id, startTime: "10:00", endTime: "12:00" },
    { taskId: state.tasks[1].id, startTime: "14:00", endTime: "15:00" },
    { taskId: state.tasks[2].id, startTime: "20:00", endTime: "20:40" }
  ];

  sample.forEach((item) => {
    state.plans.push({
      id: uid("plan"),
      taskId: item.taskId,
      date: today,
      startTime: item.startTime,
      endTime: item.endTime,
      completed: false
    });
  });

  saveState();
  renderAll();
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `caishi-data-${dateKey(new Date())}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function clearTodayEntries() {
  const today = dateKey(new Date());
  state.entries = state.entries.filter((entry) => dateKey(entry.start) !== today);
  state.plans = state.plans.filter((plan) => plan.date !== today);
  if (state.activeSession && dateKey(state.activeSession.start) === today) {
    state.activeSession = null;
  }
  saveState();
  renderAll();
}

function getSortedTasks(query) {
  const normalizedQuery = query.trim().toLowerCase();
  const lastUsed = buildLastUsedMap();

  return [...state.tasks]
    .filter((task) => {
      if (!normalizedQuery) {
        return true;
      }
      const haystack = `${task.folder} ${task.category} ${task.action} ${(task.tags || []).join(" ")}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    })
    .sort((a, b) => {
      const queryScore = taskScore(b, normalizedQuery) - taskScore(a, normalizedQuery);
      if (queryScore !== 0) {
        return queryScore;
      }
      const recentScore = (lastUsed.get(b.id) || 0) - (lastUsed.get(a.id) || 0);
      if (recentScore !== 0) {
        return recentScore;
      }
      return `${a.category}${a.action}`.localeCompare(`${b.category}${b.action}`, "zh-CN");
    });
}

function taskScore(task, query) {
  if (!query) {
    return 0;
  }
  const exactAction = task.action.toLowerCase() === query;
  const categoryMatch = task.category.toLowerCase().includes(query);
  const actionMatch = task.action.toLowerCase().includes(query);
  const folderMatch = task.folder.toLowerCase().includes(query);
  return exactAction ? 4 : actionMatch ? 3 : categoryMatch ? 2 : folderMatch ? 1 : 0;
}

function buildLastUsedMap() {
  const map = new Map();
  state.entries.forEach((entry) => {
    map.set(entry.taskId, new Date(entry.end || entry.start).getTime());
  });
  state.plans.forEach((plan) => {
    const timestamp = new Date(`${plan.date}T${plan.endTime}:00`).getTime();
    map.set(plan.taskId, Math.max(timestamp, map.get(plan.taskId) || 0));
  });
  if (state.activeSession) {
    map.set(state.activeSession.taskId, new Date(state.activeSession.start).getTime());
  }
  return map;
}

function getEntryClockSegments(day) {
  const dayStart = new Date(`${day}T00:00:00`);
  const dayEnd = new Date(`${day}T23:59:59`);

  const entries = state.entries.map((entry) => {
    const entryStart = new Date(entry.start);
    const entryEnd = new Date(entry.end);
    if (entryEnd <= dayStart || entryStart >= dayEnd) {
      return null;
    }
    const clampedStart = new Date(Math.max(entryStart.getTime(), dayStart.getTime()));
    const clampedEnd = new Date(Math.min(entryEnd.getTime(), dayEnd.getTime()));
    const task = findTask(entry.taskId);
    return {
      startMinutes: clampedStart.getHours() * 60 + clampedStart.getMinutes(),
      endMinutes: clampedEnd.getHours() * 60 + clampedEnd.getMinutes(),
      color: task?.color || "#d8d3cb",
      label: task ? `${task.category} · ${task.action}` : "未命名任务"
    };
  }).filter(Boolean);

  if (state.activeSession && dateKey(state.activeSession.start) === day) {
    const task = findTask(state.activeSession.taskId);
    entries.push({
      startMinutes: new Date(state.activeSession.start).getHours() * 60 + new Date(state.activeSession.start).getMinutes(),
      endMinutes: new Date(nowTick).getHours() * 60 + new Date(nowTick).getMinutes(),
      color: task?.color || "#d8d3cb",
      label: task ? `${task.category} · ${task.action}` : "正在进行"
    });
  }

  return entries
    .filter((segment) => segment.endMinutes > segment.startMinutes)
    .sort((a, b) => a.startMinutes - b.startMinutes);
}

function buildClockGradient(segments, neutral = "#d8d3cb") {
  if (!segments.length) {
    return `conic-gradient(from -90deg, ${neutral} 0% 100%)`;
  }

  let cursor = 0;
  const stops = [];
  segments.forEach((segment) => {
    const start = clamp(segment.startMinutes, 0, DAY_MINUTES);
    const end = clamp(segment.endMinutes, 0, DAY_MINUTES);
    if (start > cursor) {
      stops.push(`${neutral} ${(cursor / DAY_MINUTES) * 100}% ${(start / DAY_MINUTES) * 100}%`);
    }
    stops.push(`${segment.color} ${(start / DAY_MINUTES) * 100}% ${(end / DAY_MINUTES) * 100}%`);
    cursor = Math.max(cursor, end);
  });
  if (cursor < DAY_MINUTES) {
    stops.push(`${neutral} ${(cursor / DAY_MINUTES) * 100}% 100%`);
  }
  return `conic-gradient(from -90deg, ${stops.join(", ")})`;
}

function buildLegend(groups) {
  if (!groups.length) {
    return renderEmptyState("记录开始后，这里会出现颜色和任务占比。");
  }
  return groups.map((group) => `
    <div class="legend-item">
      <div class="legend-main">
        <span class="legend-swatch" style="background: ${group.color}"></span>
        <strong>${escapeHtml(group.label)}</strong>
      </div>
      <span>${humanizeMinutes(group.minutes)}</span>
    </div>
  `).join("");
}

function getTaskDurationGroups(segments) {
  const groups = new Map();
  segments.forEach((segment) => {
    const current = groups.get(segment.label) || {
      label: segment.label,
      color: segment.color,
      minutes: 0
    };
    current.minutes += Math.max(segment.endMinutes - segment.startMinutes, 0);
    groups.set(segment.label, current);
  });
  return [...groups.values()].sort((a, b) => b.minutes - a.minutes);
}

function renderTimelineItem(entry) {
  const task = findTask(entry.taskId);
  if (!task) {
    return "";
  }
  return `
    <article class="timeline-item">
      <div class="timeline-copy">
        <strong>[${escapeHtml(task.category)}] ${escapeHtml(task.action)}</strong>
        <span>${formatTimeLabel(entry.start)} - ${formatTimeLabel(entry.end)} · ${humanizeMinutes(entryDurationMinutes(entry))}</span>
      </div>
      <span class="tag">${entry.source === "manual" ? "补录" : "计时"}</span>
    </article>
  `;
}

function renderPlanItem(plan) {
  const task = findTask(plan.taskId);
  if (!task) {
    return "";
  }
  return `
    <article class="plan-item ${plan.completed ? "completed" : ""}">
      <button class="plan-check" type="button" style="--task-color: ${task.color}" data-toggle-plan="${plan.id}"></button>
      <div class="plan-copy">
        <strong>[${escapeHtml(task.category)}] ${escapeHtml(task.action)}</strong>
        <span>${escapeHtml(plan.startTime)} - ${escapeHtml(plan.endTime)} · ${humanizeMinutes(timeToMinutes(plan.endTime) - timeToMinutes(plan.startTime))}</span>
      </div>
      <div class="plan-actions">
        <button class="task-action primary" type="button" data-start-from-plan="${task.id}">开始</button>
      </div>
    </article>
  `;
}

function renderEmptyState(copy) {
  return `<div class="empty-state">${escapeHtml(copy)}</div>`;
}

function getEntriesForDate(day) {
  return state.entries.filter((entry) => dateKey(entry.start) === day);
}

function getEntriesWithinRange(startDate, endDate) {
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T23:59:59`);
  return state.entries.filter((entry) => {
    const entryStart = new Date(entry.start);
    return entryStart >= start && entryStart <= end;
  });
}

function getPlansWithinRange(startDate, endDate) {
  return state.plans.filter((plan) => plan.date >= startDate && plan.date <= endDate);
}

function findTask(taskId) {
  return state.tasks.find((task) => task.id === taskId);
}

function entryDurationMinutes(entry) {
  return Math.round((new Date(entry.end).getTime() - new Date(entry.start).getTime()) / 60000);
}

function formatPath(task) {
  return `${task.folder || "未分类"} / ${task.category}`;
}

function formatRepeat(repeat) {
  const labels = {
    none: "不循环",
    daily: "每天",
    weekdays: "工作日",
    weekly: "每周固定"
  };
  return labels[repeat] || "不循环";
}

function defaultStartTime() {
  const now = new Date();
  const rounded = new Date(now);
  rounded.setMinutes(Math.floor(now.getMinutes() / 10) * 10, 0, 0);
  return `${pad(rounded.getHours())}:${pad(rounded.getMinutes())}`;
}

function defaultEndTime() {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 30);
  return `${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

function formatTimeLabel(value) {
  const date = new Date(value);
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function formatDurationClock(milliseconds) {
  const totalSeconds = Math.max(Math.floor(milliseconds / 1000), 0);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function humanizeMinutes(minutes) {
  if (minutes <= 0) {
    return "0分";
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (!hours) {
    return `${mins}分`;
  }
  if (!mins) {
    return `${hours}小时`;
  }
  return `${hours}小时${mins}分`;
}

function enumerateDateKeys(startDate, endDate) {
  const dates = [];
  const cursor = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  while (cursor <= end) {
    dates.push(dateKey(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return dates;
}

function formatShortDate(day) {
  const [, month, date] = day.split("-");
  return `${Number(month)}/${Number(date)}`;
}

function uniqueValues(values) {
  return [...new Set(values.filter(Boolean))];
}

function timeToMinutes(value) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function dateKey(value) {
  const date = new Date(value);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function uid(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}
