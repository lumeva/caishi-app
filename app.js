const STORAGE_KEY = "caishi-web-state-v3";
const LEGACY_KEYS = ["caishi-web-state-v2", "caishi-web-state-v1"];

const THEMES = [
  {
    id: "powder-blue",
    name: "Powder Blue",
    mood: "Soft blue and cream for a calm home screen.",
    background: ["#f6f1eb", "#efe8df"],
    surface: "rgba(255, 251, 246, 0.92)",
    surfaceStrong: "rgba(255, 253, 250, 0.98)",
    ink: "#263c79",
    inkSoft: "#6e7996",
    accent: "#3b82ff",
    accentStrong: "#2d64d9",
    warning: "#ffd766",
    warningStrong: "#ffbb38",
    orange: "#ff9642",
    orangeStrong: "#ff7a2b",
    danger: "#f4795b",
    success: "#65c28e",
    palette: ["#AFC7FF", "#FFD978", "#F6B9A9", "#8BC2A2", "#7FA3FF"]
  },
  {
    id: "morandi-paper",
    name: "Morandi Paper",
    mood: "Muted paper tones for a softer palette.",
    background: ["#f2ebe4", "#e7ddd2"],
    surface: "rgba(255, 250, 245, 0.92)",
    surfaceStrong: "rgba(255, 252, 248, 0.98)",
    ink: "#384565",
    inkSoft: "#7d7d90",
    accent: "#6f96c6",
    accentStrong: "#547aa9",
    warning: "#e8c97d",
    warningStrong: "#cda64d",
    orange: "#d88f6a",
    orangeStrong: "#bf7450",
    danger: "#c7726c",
    success: "#7da489",
    palette: ["#B7C9D9", "#E2B7A0", "#A4A37A", "#D8CFC4", "#8E9CAF"]
  },
  {
    id: "adventure-candy",
    name: "Adventure Candy",
    mood: "Playful colors with softened saturation.",
    background: ["#f4efe7", "#e4ecf4"],
    surface: "rgba(255, 252, 247, 0.92)",
    surfaceStrong: "rgba(255, 255, 252, 0.98)",
    ink: "#29416b",
    inkSoft: "#6f7b93",
    accent: "#4f8de6",
    accentStrong: "#356dbf",
    warning: "#ffd56c",
    warningStrong: "#f5b233",
    orange: "#ff9b57",
    orangeStrong: "#f17d36",
    danger: "#e67782",
    success: "#70bf9d",
    palette: ["#7FB4FF", "#FFD36E", "#8CC5B0", "#F1A8C3", "#AFA0F5"]
  },
  {
    id: "sunset-room",
    name: "Sunset Room",
    mood: "Warm sunset tones for a cozy look.",
    background: ["#f5eee6", "#ecdacb"],
    surface: "rgba(255, 250, 244, 0.92)",
    surfaceStrong: "rgba(255, 252, 248, 0.98)",
    ink: "#433c61",
    inkSoft: "#7d7283",
    accent: "#7a8fd9",
    accentStrong: "#5b70b8",
    warning: "#f4ce75",
    warningStrong: "#dcad43",
    orange: "#ec9864",
    orangeStrong: "#d8733d",
    danger: "#d77e73",
    success: "#8fb48a",
    palette: ["#B8C5FF", "#F4CF7E", "#E7A287", "#99B594", "#B6A3D8"]
  }
];

const TEXT_REPAIRS = new Map();

const DEFAULT_TEMPLATES = [
  {
    id: "task_math_practice",
    folder: "学习",
    category: "数学",
    action: "做题",
    color: "#7FA3FF",
    defaultDurationMinutes: 60,
    createdAt: "2026-04-02T09:00:00"
  },
  {
    id: "task_math_review",
    folder: "学习",
    category: "数学",
    action: "复习",
    color: "#AFC7FF",
    defaultDurationMinutes: 45,
    createdAt: "2026-04-02T09:05:00"
  },
  {
    id: "task_chinese_read",
    folder: "学习",
    category: "语文",
    action: "阅读",
    color: "#FFD978",
    defaultDurationMinutes: 30,
    createdAt: "2026-04-02T09:10:00"
  },
  {
    id: "task_life_bath",
    folder: "生活",
    category: "起居",
    action: "洗澡",
    color: "#F6B9A9",
    defaultDurationMinutes: 20,
    createdAt: "2026-04-02T09:15:00"
  }
];

const LOCALE_MAP = {
  en: "en-US",
  "zh-Hans": "zh-CN",
  "zh-Hant": "zh-TW"
};

const I18N = {
  en: {
    nav: { home: "Home", stats: "Stats", tasks: "Tasks", settings: "Settings" },
    home: {
      title: "Today",
      next: "Next",
      todo: "To-Do List",
      overdue: "Overdue",
      todayGroup: "Today",
      flexible: "Flexible",
      completed: "Completed",
      emptyNext: "Add a task to decide the next color of today.",
      emptyToday: "No timed tasks for today.",
      emptyFlexible: "No flexible tasks",
      emptyCompleted: "Completed tasks will rest here.",
      idleTitle: "No task in progress",
      running: "Now",
      paused: "Paused",
      goal: "Goal {duration}",
      noDuration: "No preset duration",
      start: "Start",
      pause: "Pause",
      resume: "Resume",
      stop: "Stop",
      done: "Done",
      important: "Important",
      completedMeta: "Completed"
    },
    stats: {
      title: "Today's Color",
      today: "Today",
      week: "Week",
      month: "Month",
      custom: "Custom",
      trackedToday: "Tracked today",
      trackedWeek: "Tracked this week",
      trackedMonth: "Tracked this month",
      trackedRange: "Tracked in range",
      byCategory: "By Category",
      byTask: "By Task",
      allCategories: "All Categories",
      allTasks: "All Tasks",
      start: "Start",
      end: "End",
      trend: "Show weekly trend >",
      empty: "No tracked time in this range yet.",
      noFolder: "No Folder",
      noCategory: "No Category",
      untitled: "Untitled",
      selectedDay: "Color clock for {date}"
    },
    action: {
      create: "Create Task",
      createCopy: "Plan it for today",
      quick: "Quick Start",
      quickCopy: "Search or type and start",
      log: "Log Time",
      logCopy: "Save time that already happened"
    },
    sheet: {
      create: "Create Task",
      quick: "Quick Start",
      log: "Log Time",
      categories: "Categories"
    },
    field: {
      taskName: "Task Name",
      task: "Task",
      category: "Category",
      date: "Date",
      start: "Start",
      end: "End",
      timeOptional: "Time (optional)",
      durationOptional: "Duration (optional)",
      color: "Color",
      important: "Mark as important",
      optional: "Optional"
    },
    quick: { startNow: "Start Now" },
    common: { save: "Save", back: "Back", clear: "Clear", rename: "Rename", delete: "Delete", edit: "Edit", done: "Done", add: "+" },
    placeholder: {
      taskName: "Study Math",
      quickStart: "Search or type a task",
      logTask: "Choose or type a task",
      folder: "Study",
      category: "Math",
      action: "Do Exercises"
    },
    tasks: {
      title: "Tasks",
      edit: "Edit",
      done: "Done",
      changeCategory: "Change Category",
      folder: "Top Level",
      category: "Category",
      taskName: "Task",
      defaultDuration: "Default Duration (optional)",
      empty: "No tasks yet. Add your first structure item.",
      newItem: "New Item",
      editItem: "Edit Item",
      taskOptions: "Task Options",
      time: "Time",
      addCategory: "Add Category",
      addTask: "Add Task",
      addItem: "Add",
      noPath: "No category selected"
    },
    settings: {
      title: "Settings",
      language: "Language",
      about: "About",
      aboutCopy: "Caishi keeps your day readable through color and time."
    }
  },
  "zh-Hans": {
    nav: { home: "首页", stats: "统计", tasks: "任务", settings: "设置" },
    home: {
      title: "今天",
      next: "接下来",
      todo: "时间线待办",
      overdue: "已过期",
      todayGroup: "今天",
      flexible: "灵活任务",
      completed: "已完成",
      emptyNext: "先添加任务，决定今天会变成什么颜色。",
      emptyToday: "今天还没有安排具体时间的任务。",
      emptyFlexible: "没有无时间任务",
      emptyCompleted: "已完成的任务会收在这里。",
      idleTitle: "还没有正在进行的任务",
      running: "正在进行",
      paused: "已暂停",
      goal: "目标 {duration}",
      noDuration: "没有预设时长",
      start: "开始",
      pause: "暂停",
      resume: "继续",
      stop: "结束",
      done: "完成",
      important: "重要",
      completedMeta: "已完成"
    },
    stats: {
      title: "今日颜色",
      today: "今日",
      week: "本周",
      month: "本月",
      custom: "自选",
      trackedToday: "今日已记录",
      trackedWeek: "本周已记录",
      trackedMonth: "本月已记录",
      trackedRange: "该范围已记录",
      byCategory: "按分类",
      byTask: "按任务",
      allCategories: "所有分类",
      allTasks: "所有任务",
      start: "开始",
      end: "结束",
      trend: "查看每周趋势 >",
      empty: "这个时间范围还没有记录。",
      noFolder: "未分组",
      noCategory: "未分类",
      untitled: "未命名",
      selectedDay: "{date} 的颜色时钟"
    },
    action: {
      create: "创建任务",
      createCopy: "轻量排进今天",
      quick: "快速开始",
      quickCopy: "搜索或输入后立刻开始",
      log: "补录时间",
      logCopy: "补录已经发生的时间"
    },
    sheet: {
      create: "创建任务",
      quick: "快速开始",
      log: "补录时间",
      categories: "分类"
    },
    field: {
      taskName: "任务名",
      task: "任务",
      category: "分类",
      date: "日期",
      start: "开始",
      end: "结束",
      timeOptional: "时间（可选）",
      durationOptional: "时长（可选）",
      color: "颜色",
      important: "标记为重要",
      optional: "可选"
    },
    quick: { startNow: "立即开始" },
    common: { save: "保存", back: "返回", clear: "清除", rename: "重命名", delete: "删除", edit: "编辑", done: "完成", add: "+" },
    placeholder: {
      taskName: "例如：数学做题",
      quickStart: "搜索或输入一个任务",
      logTask: "选择已有任务或输入新任务",
      folder: "学习",
      category: "数学",
      action: "做题"
    },
    tasks: {
      title: "任务",
      edit: "编辑",
      done: "完成",
      changeCategory: "调整分类",
      folder: "一级分类",
      category: "二级分类",
      taskName: "任务",
      defaultDuration: "默认时长（可选）",
      empty: "还没有任务结构，先加一个。",
      newItem: "新建项目",
      editItem: "编辑项目",
      taskOptions: "任务选项",
      time: "时长",
      addCategory: "添加分类",
      addTask: "添加任务",
      addItem: "添加",
      noPath: "还没有选择分类"
    },
    settings: {
      title: "设置",
      language: "语言",
      about: "关于",
      aboutCopy: "彩时让你用颜色和时间看清每天。"
    }
  },
  "zh-Hant": {
    nav: { home: "首頁", stats: "統計", tasks: "任務", settings: "設定" },
    home: {
      title: "今天",
      next: "接下來",
      todo: "時間線待辦",
      overdue: "已過期",
      todayGroup: "今天",
      flexible: "彈性任務",
      completed: "已完成",
      emptyNext: "先新增任務，決定今天會變成什麼顏色。",
      emptyToday: "今天還沒有安排具體時間的任務。",
      emptyFlexible: "沒有無時間任務",
      emptyCompleted: "已完成的任務會收在這裡。",
      idleTitle: "還沒有正在進行的任務",
      running: "進行中",
      paused: "已暫停",
      goal: "目標 {duration}",
      noDuration: "沒有預設時長",
      start: "開始",
      pause: "暫停",
      resume: "繼續",
      stop: "結束",
      done: "完成",
      important: "重要",
      completedMeta: "已完成"
    },
    stats: {
      title: "今日顏色",
      today: "今日",
      week: "本週",
      month: "本月",
      custom: "自選",
      trackedToday: "今日已記錄",
      trackedWeek: "本週已記錄",
      trackedMonth: "本月已記錄",
      trackedRange: "此範圍已記錄",
      byCategory: "按分類",
      byTask: "按任務",
      allCategories: "所有分類",
      allTasks: "所有任務",
      start: "開始",
      end: "結束",
      trend: "查看每週趨勢 >",
      empty: "這個時間範圍還沒有記錄。",
      noFolder: "未分組",
      noCategory: "未分類",
      untitled: "未命名",
      selectedDay: "{date} 的顏色時鐘"
    },
    action: {
      create: "建立任務",
      createCopy: "輕量排進今天",
      quick: "快速開始",
      quickCopy: "搜尋或輸入後立刻開始",
      log: "補錄時間",
      logCopy: "補錄已經發生的時間"
    },
    sheet: {
      create: "建立任務",
      quick: "快速開始",
      log: "補錄時間",
      categories: "分類"
    },
    field: {
      taskName: "任務名",
      task: "任務",
      category: "分類",
      date: "日期",
      start: "開始",
      end: "結束",
      timeOptional: "時間（可選）",
      durationOptional: "時長（可選）",
      color: "顏色",
      important: "標記為重要",
      optional: "可選"
    },
    quick: { startNow: "立即開始" },
    common: { save: "儲存", back: "返回", clear: "清除", rename: "重新命名", delete: "刪除", edit: "編輯", done: "完成", add: "+" },
    placeholder: {
      taskName: "例如：數學做題",
      quickStart: "搜尋或輸入一個任務",
      logTask: "選擇既有任務或輸入新任務",
      folder: "學習",
      category: "數學",
      action: "做題"
    },
    tasks: {
      title: "任務",
      edit: "編輯",
      done: "完成",
      changeCategory: "調整分類",
      folder: "一級分類",
      category: "二級分類",
      taskName: "任務",
      defaultDuration: "預設時長（可選）",
      empty: "還沒有任務結構，先新增一個。",
      newItem: "新增項目",
      editItem: "編輯項目",
      taskOptions: "任務選項",
      time: "時長",
      addCategory: "新增分類",
      addTask: "新增任務",
      addItem: "新增",
      noPath: "還沒有選擇分類"
    },
    settings: {
      title: "設定",
      language: "語言",
      about: "關於",
      aboutCopy: "彩時讓你用顏色和時間看清每天。"
    }
  }
};

const state = loadState();
const ui = {
  activeView: "home",
  statsPreset: "day",
  statsStart: "",
  statsEnd: "",
  statsFocusDate: "",
  statsMode: "category",
  statsSelectedKey: "",
  statsClockEntryId: "",
  categoryTarget: "create",
  categoryStep: "folder",
  categoryFolder: "",
  categoryCategory: "",
  returnSheetId: "create-sheet",
  createSheetExpanded: false,
  taskEditMode: false,
  focusTaskId: "",
  focusCategoryKey: "",
  focusFolderName: "",
  homeMenuPlanId: ""
};

const refs = {
  appShell: document.querySelector("#app-shell"),
  todayLabel: document.querySelector("#today-label"),
  focusTimer: document.querySelector("#focus-timer"),
  nextTrack: document.querySelector("#next-track"),
  nextDots: document.querySelector("#next-dots"),
  overdueGroup: document.querySelector("#overdue-group"),
  overdueList: document.querySelector("#overdue-list"),
  todayList: document.querySelector("#today-list"),
  flexibleList: document.querySelector("#flexible-list"),
  completedCount: document.querySelector("#completed-count"),
  completedList: document.querySelector("#completed-list"),
  taskTree: document.querySelector("#task-tree"),
  statsDonutWrap: document.querySelector("#stats-donut-wrap"),
  statsDonut: document.querySelector("#stats-donut"),
  statsDayStrip: document.querySelector("#stats-day-strip"),
  statsTotalDuration: document.querySelector("#stats-total-duration"),
  statsTotalLabel: document.querySelector("#stats-total-label"),
  statsCallout: document.querySelector("#stats-callout"),
  rangeButtons: document.querySelectorAll("[data-range]"),
  statsModeButtons: document.querySelectorAll("[data-stats-mode]"),
  statsStartDate: document.querySelector("#stats-start-date"),
  statsEndDate: document.querySelector("#stats-end-date"),
  statsCustomRange: document.querySelector("#stats-custom-range"),
  statsCategoryFilter: document.querySelector("#stats-category-filter"),
  statsTaskFilter: document.querySelector("#stats-task-filter"),
  statsDetailList: document.querySelector("#stats-detail-list"),
  statsTrendChart: document.querySelector("#stats-trend-chart"),
  navItems: document.querySelectorAll(".nav-item"),
  views: document.querySelectorAll(".view"),
  taskNameSuggestions: document.querySelector("#task-name-suggestions"),
  openActionSheet: document.querySelector("#open-action-sheet"),
  openTemplateSheet: document.querySelector("#open-template-sheet"),
  createSheetPanel: document.querySelector("#create-sheet-panel"),
  createSheetHandle: document.querySelector("#create-sheet-handle"),
  createForm: document.querySelector("#create-form"),
  quickForm: document.querySelector("#quick-form"),
  logForm: document.querySelector("#log-form"),
  startForm: document.querySelector("#start-form"),
  templateForm: document.querySelector("#template-form"),
  createColorPicker: document.querySelector("#create-color-picker"),
  createCategoryValue: document.querySelector("#create-category-value"),
  logCategoryValue: document.querySelector("#log-category-value"),
  startCategoryValue: document.querySelector("#start-category-value"),
  createCategoryButton: document.querySelector("#create-category-button"),
  logCategoryButton: document.querySelector("#log-category-button"),
  startCategoryButton: document.querySelector("#start-category-button"),
  categoryPath: document.querySelector("#category-path"),
  categoryList: document.querySelector("#category-list"),
  categoryBackButton: document.querySelector("#category-back-button"),
  categoryClearButton: document.querySelector("#category-clear-button"),
  toggleTaskEdit: document.querySelector("#toggle-task-edit"),
  templateColorPicker: document.querySelector("#template-color-picker"),
  templateSheetKicker: document.querySelector("#template-sheet-kicker"),
  templateSheetTitle: document.querySelector("#template-sheet-title"),
  homeTaskSheetTitle: document.querySelector("#home-task-sheet-title"),
  homeTaskEditButton: document.querySelector("#home-task-edit-button"),
  homeTaskCategoryButton: document.querySelector("#home-task-category-button"),
  languageButtons: document.querySelectorAll("[data-language]")
};

const on = (element, eventName, handler) => {
  if (element) {
    element.addEventListener(eventName, handler);
  }
};

let nowTick = Date.now();

hydrateState();
ensureStarterData();
syncCategoryColors();
syncStatsDatesFromPreset(ui.statsPreset);
bindEvents();
renderAll();

window.setInterval(() => {
  nowTick = Date.now();
  renderFocusTimer();
  if (ui.activeView === "home") {
    renderHome();
  }
}, 1000);

function bindEvents() {
  refs.navItems.forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.viewTarget));
  });

  on(refs.openActionSheet, "click", () => openSheet("action-sheet"));
  on(refs.openTemplateSheet, "click", () => openTemplateForm());

  document.querySelectorAll("[data-close-sheet]").forEach((button) => {
    button.addEventListener("click", () => closeSheet(button.dataset.closeSheet));
  });

  document.querySelectorAll("[data-open-sheet]").forEach((button) => {
    button.addEventListener("click", () => handleOpenSheet(button.dataset.openSheet));
  });

  on(refs.createCategoryButton, "click", () => openCategorySheet("create", "create-sheet"));
  on(refs.logCategoryButton, "click", () => openCategorySheet("log", "log-sheet"));
  on(refs.startCategoryButton, "click", () => openCategorySheet("start", "start-sheet"));

  on(refs.categoryBackButton, "click", handleCategoryBack);
  on(refs.categoryClearButton, "click", clearCategorySelection);
  on(refs.categoryList, "click", handleCategoryListClick);

  on(refs.createForm, "submit", handleCreateSubmit);
  on(refs.createColorPicker, "click", handleCreateColorClick);
  on(refs.quickForm, "submit", handleQuickSubmit);
  on(refs.logForm, "submit", handleLogSubmit);
  on(refs.startForm, "submit", handleStartSubmit);
  on(refs.templateForm, "submit", handleTemplateSubmit);
  on(refs.templateColorPicker, "click", handleTemplateColorClick);
  on(refs.createSheetHandle, "click", () => setCreateSheetExpanded(!ui.createSheetExpanded));
  on(refs.createSheetHandle, "pointerdown", handleCreateSheetDragStart);
  on(refs.createForm, "focusin", () => setCreateSheetExpanded(true));

  on(refs.nextTrack, "click", handleTodoAction);
  on(refs.nextTrack, "scroll", syncNextDots);
  on(refs.overdueList, "click", handleTodoAction);
  on(refs.todayList, "click", handleTodoAction);
  on(refs.flexibleList, "click", handleTodoAction);
  bindHomeLongPress(refs.nextTrack);
  bindHomeLongPress(refs.overdueList);
  bindHomeLongPress(refs.todayList);
  bindHomeLongPress(refs.flexibleList);
  on(refs.focusTimer, "click", handleFocusTimerActions);
  on(refs.taskTree, "click", handleTaskTreeActions);
  on(refs.toggleTaskEdit, "click", toggleTaskEditMode);
  on(refs.homeTaskEditButton, "click", jumpFromHomeTaskMenuToEdit);
  on(refs.homeTaskCategoryButton, "click", jumpFromHomeTaskMenuToCategory);

  refs.rangeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      ui.statsPreset = button.dataset.range;
      syncStatsDatesFromPreset(ui.statsPreset);
      renderStats();
    });
  });

  refs.statsModeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      ui.statsMode = button.dataset.statsMode;
      ui.statsSelectedKey = "";
      renderStats();
    });
  });

  refs.statsCategoryFilter.addEventListener("change", () => {
    populateStatsTaskFilter();
    ui.statsSelectedKey = "";
    renderStats();
  });

  refs.statsTaskFilter.addEventListener("change", () => {
    ui.statsSelectedKey = "";
    renderStats();
  });

  on(refs.statsDetailList, "click", handleStatsDetailClick);
  on(refs.statsDonut, "click", handleStatsDonutClick);
  on(refs.statsDayStrip, "click", handleStatsDayPick);

  refs.statsStartDate.addEventListener("change", () => {
    ui.statsPreset = "custom";
    ui.statsStart = refs.statsStartDate.value;
    syncStatsFocusDate();
    renderStats();
  });

  refs.statsEndDate.addEventListener("change", () => {
    ui.statsPreset = "custom";
    ui.statsEnd = refs.statsEndDate.value;
    syncStatsFocusDate();
    renderStats();
  });

  refs.languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.preferences.language = button.dataset.language;
      saveState();
      renderAll();
    });
  });

}

function loadState() {
  const raw = readStoredState();
  const theme = THEMES[0];
  const tasks = normalizeTasks(raw?.tasks);
  return {
    tasks: tasks.length ? tasks : structuredClone(DEFAULT_TEMPLATES),
    plans: normalizePlans(raw?.plans),
    entries: normalizeEntries(raw?.entries),
    activeSession: normalizeActiveSession(raw?.activeSession),
    preferences: {
      themeId: raw?.preferences?.themeId || theme.id,
      paletteId: raw?.preferences?.paletteId || theme.id,
      customPalette: parseHexPalette((raw?.preferences?.customPalette || []).join(",")),
      customPaletteName: raw?.preferences?.customPaletteName || "My Palette",
      language: raw?.preferences?.language || "en"
    }
  };
}

function readStoredState() {
  const keys = [STORAGE_KEY, ...LEGACY_KEYS];
  for (const key of keys) {
    const stored = window.localStorage.getItem(key);
    if (!stored) {
      continue;
    }
    try {
      return JSON.parse(stored);
    } catch (error) {
      continue;
    }
  }
  return null;
}

function normalizeTasks(tasks) {
  if (!Array.isArray(tasks)) {
    return [];
  }
  return tasks.map((task, index) => ({
    id: String(task.id || `task_${index}`),
    folder: repairKnownText(String(task.folder || task.project || "未分类")),
    category: repairKnownText(String(task.category || task.group || "未分类")),
    action: repairKnownText(String(task.action || task.title || "未命名")),
    color: String(task.color || "#AFC7FF"),
    defaultDurationMinutes: parseMinutes(task.defaultDurationMinutes),
    createdAt: task.createdAt || new Date().toISOString()
  }));
}

function normalizePlans(plans) {
  if (!Array.isArray(plans)) {
    return [];
  }
  return plans.map((plan, index) => {
    const startTime = typeof plan.startTime === "string" ? plan.startTime : "";
    const durationMinutes = parseMinutes(plan.durationMinutes);
    const endTime = typeof plan.endTime === "string" ? plan.endTime : "";
    const derivedDuration = durationMinutes || deriveDurationMinutes(startTime, endTime);
    return {
      id: String(plan.id || `plan_${index}`),
      title: repairKnownText(String(plan.title || plan.name || "")),
      taskId: plan.taskId ? String(plan.taskId) : "",
      date: String(plan.date || dateKey(new Date())),
      startTime,
      durationMinutes: derivedDuration,
      color: String(plan.color || ""),
      important: Boolean(plan.important),
      completed: Boolean(plan.completed),
      createdAt: String(plan.createdAt || new Date().toISOString())
    };
  });
}

function normalizeEntries(entries) {
  if (!Array.isArray(entries)) {
    return [];
  }
  return entries.map((entry, index) => ({
    id: String(entry.id || `entry_${index}`),
    title: repairKnownText(String(entry.title || "")),
    taskId: entry.taskId ? String(entry.taskId) : "",
    planId: entry.planId ? String(entry.planId) : "",
    color: String(entry.color || ""),
    start: entry.start || new Date().toISOString(),
    end: entry.end || new Date().toISOString(),
    source: String(entry.source || "manual")
  }));
}

function normalizeActiveSession(session) {
  if (!session) {
    return null;
  }
  if (Array.isArray(session.segments) && session.segments.length) {
    return {
      title: repairKnownText(String(session.title || "")),
      taskId: session.taskId ? String(session.taskId) : "",
      planId: session.planId ? String(session.planId) : "",
      color: String(session.color || ""),
      pausedAt: session.pausedAt || null,
      segments: session.segments.map((segment) => ({
        start: segment.start,
        end: segment.end || null
      }))
    };
  }
  if (session.start) {
    return {
      title: repairKnownText(String(session.title || "")),
      taskId: session.taskId ? String(session.taskId) : "",
      planId: session.planId ? String(session.planId) : "",
      color: String(session.color || ""),
      pausedAt: null,
      segments: [{ start: session.start, end: null }]
    };
  }
  return null;
}

function hydrateState() {
  state.plans.forEach((plan) => {
    if (!plan.title) {
      plan.title = taskDisplayName(plan.taskId) || "未命名任务";
    }
  });

  state.entries.forEach((entry) => {
    if (!entry.title) {
      entry.title = taskDisplayName(entry.taskId) || "未命名任务";
    }
  });

  if (state.activeSession && !state.activeSession.title) {
    state.activeSession.title = taskDisplayName(state.activeSession.taskId) || "进行中";
  }
}

function ensureStarterData() {
  if (state.plans.length || state.entries.length) {
    return;
  }

  const today = dateKey(new Date());
  const nowMinutes = currentMinutes();
  const overdueTime = minutesToTime(clamp(roundToFive(nowMinutes - 90), 360, 1320));
  const soonTime = minutesToTime(clamp(roundToFive(nowMinutes + 30), 360, 1320));
  const laterTime = minutesToTime(clamp(roundToFive(nowMinutes + 120), 360, 1320));

  state.plans.push(
    createPlan({
      title: "璇枃闃呰",
      taskId: state.tasks.find((task) => task.id === "task_chinese_read")?.id || "",
      date: today,
      startTime: overdueTime,
      durationMinutes: 30,
      important: false
    }),
    createPlan({
      title: "鏁板鍋氶",
      taskId: state.tasks.find((task) => task.id === "task_math_practice")?.id || "",
      date: today,
      startTime: soonTime,
      durationMinutes: 60,
      important: false
    }),
    createPlan({
      title: "鏁板澶嶄範",
      taskId: state.tasks.find((task) => task.id === "task_math_review")?.id || "",
      date: today,
      startTime: laterTime,
      durationMinutes: 45,
      important: true
    }),
    createPlan({
      title: "濉啓闂嵎",
      taskId: "",
      date: today,
      startTime: "",
      durationMinutes: 5,
      important: true
    })
  );

  saveState();
}

function saveState() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function renderAll() {
  applyTheme(getTheme());
  applyTranslations();
  syncStatsFocusDate();
  renderTodayLabel();
  renderSuggestionList();
  renderFocusTimer();
  renderHome();
  renderTaskLibrary();
  renderStats();
  switchView(ui.activeView, true);
}

function applyTheme(theme) {
  document.documentElement.style.setProperty("--bg", theme.background[0]);
  document.documentElement.style.setProperty("--bg-soft", theme.background[1]);
  document.documentElement.style.setProperty("--surface", theme.surface);
  document.documentElement.style.setProperty("--surface-strong", theme.surfaceStrong);
  document.documentElement.style.setProperty("--ink", theme.ink);
  document.documentElement.style.setProperty("--ink-soft", theme.inkSoft);
  document.documentElement.style.setProperty("--accent", theme.accent);
  document.documentElement.style.setProperty("--accent-strong", theme.accentStrong);
  document.documentElement.style.setProperty("--warning", theme.warning);
  document.documentElement.style.setProperty("--warning-strong", theme.warningStrong);
  document.documentElement.style.setProperty("--orange", theme.orange);
  document.documentElement.style.setProperty("--orange-strong", theme.orangeStrong);
  document.documentElement.style.setProperty("--danger", theme.danger);
  document.documentElement.style.setProperty("--success", theme.success);
}

function currentLanguage() {
  return I18N[state.preferences.language] ? state.preferences.language : "en";
}

function localeTag(language = currentLanguage()) {
  return LOCALE_MAP[language] || LOCALE_MAP.en;
}

function t(key, params = {}) {
  const resolve = (language) => key.split(".").reduce((value, segment) => value?.[segment], I18N[language]);
  let value = resolve(currentLanguage()) ?? resolve("en") ?? key;
  return Object.entries(params).reduce((text, [name, replacement]) => (
    String(text).replaceAll(`{${name}}`, replacement)
  ), String(value));
}

function applyTranslations() {
  document.documentElement.lang = currentLanguage();
  document.title = currentLanguage() === "en" ? "Caishi" : "彩时";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });
  refs.languageButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.language === currentLanguage());
  });
}

function renderTodayLabel() {
  const now = new Date();
  const language = currentLanguage();
  if (language === "en") {
    const monthDay = new Intl.DateTimeFormat(localeTag(language), { month: "short", day: "numeric" }).format(now);
    const weekday = new Intl.DateTimeFormat(localeTag(language), { weekday: "long" }).format(now);
    refs.todayLabel.textContent = `${monthDay} · ${weekday}`;
    return;
  }

  const monthDay = `${now.getMonth() + 1}月${now.getDate()}日`;
  const weekday = new Intl.DateTimeFormat(localeTag(language), { weekday: "long" }).format(now);
  refs.todayLabel.textContent = `${monthDay} · ${weekday}`;
}

function renderSuggestionList() {
  const suggestions = uniqueValues([
    ...state.plans.map((plan) => plan.title),
    ...state.entries.map((entry) => entry.title),
    ...state.tasks.map((task) => task.action)
  ].filter(Boolean));

  refs.taskNameSuggestions.innerHTML = suggestions.map((value) => (
    `<option value="${escapeAttr(value)}"></option>`
  )).join("");
}

function renderFocusTimer() {
  const session = state.activeSession;
  if (!session) {
    refs.focusTimer.classList.add("idle");
    refs.focusTimer.style.removeProperty("--task-color");
    refs.focusTimer.innerHTML = `
      <div class="timer-row primary">
        <div class="timer-inline-copy">
          <span class="timer-kicker">${t("home.running")}</span>
          <span class="timer-title">${t("home.idleTitle")}</span>
        </div>
        <div class="timer-clock">00:00:00</div>
        <div class="timer-actions">
          <button class="timer-button" type="button" data-open-sheet="quick-sheet">${t("home.start")}</button>
        </div>
      </div>
      <div class="timer-progress" style="--progress:0.24"></div>
    `;
    return;
  }

  refs.focusTimer.classList.remove("idle");
  const elapsedMs = sessionElapsedMs(session);
  const plan = session.planId ? findPlan(session.planId) : null;
  const linkedTask = session.taskId ? findTask(session.taskId) : null;
  const plannedMinutes = planDurationMinutes(plan);
  const progress = plannedMinutes ? clamp(elapsedMs / (plannedMinutes * 60 * 1000), 0, 1) : 0.38;
  const status = isSessionPaused(session) ? t("home.paused") : t("home.running");
  const secondary = linkedTask ? linkedTask.category : "";
  const title = linkedTask ? linkedTask.action : session.title;
  refs.focusTimer.style.setProperty("--task-color", getItemColor(session));

  refs.focusTimer.innerHTML = `
    <div class="timer-row primary">
      <div class="timer-inline-copy">
        <span class="timer-kicker">${status}</span>
        <span class="timer-title">${escapeHtml(title)}</span>
      </div>
      <div class="timer-clock">${formatDurationClock(elapsedMs)}</div>
      <div class="timer-actions">
        <button class="timer-button" type="button" data-pause-session="${isSessionPaused(session) ? "resume" : "pause"}">
          ${isSessionPaused(session) ? t("home.resume") : t("home.pause")}
        </button>
        <button class="stop-button" type="button" data-stop-session="true">${t("home.stop")}</button>
      </div>
    </div>
    <div class="timer-row">
      <div class="timer-copy">
          <span>${escapeHtml([secondary, plannedMinutes ? t("home.goal", { duration: humanizeMinutes(plannedMinutes) }) : t("home.noDuration")].filter(Boolean).join(" · "))}</span>
      </div>
    </div>
    <div class="timer-progress" style="--progress:${progress.toFixed(3)}"></div>
  `;
}

function renderHome() {
  const buckets = getTodayBuckets();
  const nextItems = getNextItems();

  refs.nextTrack.innerHTML = nextItems.length
    ? nextItems.map(renderNextCard).join("")
    : renderEmptyState(t("home.emptyNext"));

  refs.nextDots.innerHTML = nextItems.length
    ? nextItems.map((_, index) => `<span class="${index === 0 ? "active" : ""}"></span>`).join("")
    : "";
  syncNextDots();

  refs.overdueGroup.classList.toggle("hidden", !buckets.overdue.length);
  refs.overdueList.innerHTML = renderTodoList(buckets.overdue, "overdue");
  refs.todayList.innerHTML = renderTodoList(buckets.today, "today");
  refs.flexibleList.innerHTML = renderTodoList(buckets.flexible, "flexible");

  const completedItems = getCompletedItems();
  refs.completedCount.textContent = String(completedItems.length);
  refs.completedList.innerHTML = completedItems.length
    ? completedItems.map(renderCompletedCard).join("")
    : renderEmptyState(t("home.emptyCompleted"));
}

function renderTodoList(items, group) {
  if (!items.length) {
    if (group === "today") {
      return renderEmptyState(t("home.emptyToday"));
    }
    if (group === "flexible") {
      return renderEmptyState(t("home.emptyFlexible"));
    }
    return "";
  }
  return items.map((plan) => renderTodoRow(plan, group)).join("");
}

function renderNextCard(plan) {
  const status = getPlanStatus(plan);
  const task = plan.taskId ? findTask(plan.taskId) : null;
  const timeLabel = plan.startTime || "";
  const tag = shortTag(plan);
  const extra = plan.important ? `<span class="status-chip">${t("home.important")}</span>` : "";
  const actionLabel = isPlanRunning(plan) ? t("home.resume") : t("home.start");
  const color = getItemColor(plan);
  const title = task ? task.action : plan.title;

  return `
    <article class="next-card status-${status}" data-home-plan="${plan.id}" style="${buildNextCardStyle(color)}">
      <div class="next-topline">
        <span class="next-time ${timeLabel ? "" : "is-empty"}">${escapeHtml(timeLabel || " ")}</span>
        ${extra}
      </div>
      <div>
        <p class="next-title">${escapeHtml(title)}</p>
        <div class="todo-meta">
          ${tag ? `<span class="tag">${escapeHtml(tag)}</span>` : ""}
        </div>
      </div>
      <div class="next-actions">
        <button class="inline-button primary" type="button" data-start-plan="${plan.id}">${actionLabel}</button>
        <button class="inline-button soft" type="button" data-complete-plan="${plan.id}">${t("home.done")}</button>
      </div>
    </article>
  `;
}

function renderTodoRow(plan, group) {
  const running = isPlanRunning(plan);
  const timeLabel = group === "flexible" ? "" : (plan.startTime || "");
  const tag = shortTag(plan);
  const duration = planDurationMinutes(plan);
  const task = plan.taskId ? findTask(plan.taskId) : null;
  const title = task ? task.action : plan.title;
  const statusLabel = duration ? `${duration} min` : "";

  return `
    <article class="todo-row ${group === "overdue" ? "is-overdue" : ""} ${running ? "is-running" : ""}" data-home-plan="${plan.id}">
      <div class="todo-main">
        <span class="todo-time ${timeLabel ? "" : "is-empty"}">${escapeHtml(timeLabel || " ")}</span>
        <div>
          <p class="todo-title">${escapeHtml(title)}</p>
          <div class="todo-meta">
            ${tag ? `<span class="tag">${escapeHtml(tag)}</span>` : ""}
            ${plan.important ? `<span class="status-chip">${t("home.important")}</span>` : ""}
          </div>
        </div>
      </div>
      <div class="todo-trailing">
        ${statusLabel ? `<span class="task-meta">${escapeHtml(statusLabel)}</span>` : ""}
        <div class="todo-actions">
          <button class="inline-button ${group === "overdue" ? "warning" : "primary"}" type="button" data-start-plan="${plan.id}">
            ${running ? t("home.running") : t("home.start")}
          </button>
          <button class="inline-button soft" type="button" data-complete-plan="${plan.id}">${t("home.done")}</button>
        </div>
      </div>
    </article>
  `;
}

function renderCompletedCard(item) {
  const title = item.taskId ? (findTask(item.taskId)?.action || item.title) : item.title;
  const tag = item.tag ? `<span class="tag">${escapeHtml(item.tag)}</span>` : "";
  return `
    <article class="completed-card">
      <div class="todo-main">
        <div>
          <p class="todo-title">${escapeHtml(title)}</p>
          <div class="todo-meta">
            ${tag}
          </div>
        </div>
        <span class="task-meta">${escapeHtml(item.meta)}</span>
      </div>
    </article>
  `;
}

function renderTaskLibrary() {
  const groups = groupTemplates();
  refs.toggleTaskEdit.textContent = ui.taskEditMode ? t("tasks.done") : t("tasks.edit");
  refs.homeTaskSheetTitle.textContent = t("tasks.taskOptions");
  refs.taskTree.innerHTML = groups.length
    ? groups.map((group, index) => renderFolderBlock(group, index)).join("")
    : renderEmptyState(t("tasks.empty"));
  focusTasksLocationIfNeeded();
}

function renderFolderBlock(group, groupIndex) {
  const folderFocused = ui.focusFolderName && ui.focusFolderName === group.folder;
  return `
    <details class="folder-block ${folderFocused ? "is-focused" : ""}" ${groupIndex === 0 || folderFocused ? "open" : ""} data-folder-row="${escapeAttr(group.folder)}">
      <summary class="folder-row">
        <div class="folder-name">
          <span class="folder-icon">${escapeHtml(folderIcon(group.folder))}</span>
          <span>${escapeHtml(group.folder)}</span>
        </div>
        <div class="folder-actions">
          <button class="row-add" type="button" data-folder-add-category="${escapeAttr(group.folder)}">${t("common.add")}</button>
          ${ui.taskEditMode ? `
            <button class="row-action" type="button" data-folder-rename="${escapeAttr(group.folder)}">${t("common.rename")}</button>
            <button class="row-action danger" type="button" data-folder-delete="${escapeAttr(group.folder)}">${t("common.delete")}</button>
          ` : ""}
        </div>
      </summary>
      <div class="category-stack">
        ${group.categories.map((category, categoryIndex) => renderCategoryBlock(group.folder, category, categoryIndex)).join("")}
      </div>
    </details>
  `;
}

function renderCategoryBlock(folder, category, categoryIndex) {
  const categoryKey = buildCategoryKey(folder, category.name);
  const focused = ui.focusCategoryKey === categoryKey;
  const color = getCategoryColor(folder, category.name);
  return `
    <details class="category-block ${focused ? "is-focused" : ""}" ${categoryIndex === 0 || focused ? "open" : ""} data-category-row="${escapeAttr(categoryKey)}">
      <summary class="category-row">
        <div class="category-main with-bar" style="--swatch-color:${color}">
          <span class="chevron">▸</span>
          <span>${escapeHtml(category.name)}</span>
        </div>
        <div class="category-actions">
          <button class="row-add" type="button" data-category-add-task="${escapeAttr(folder)}" data-category-name="${escapeAttr(category.name)}">${t("common.add")}</button>
          ${ui.taskEditMode ? `
            <button class="row-action" type="button" data-category-rename="${escapeAttr(folder)}" data-category-name="${escapeAttr(category.name)}">${t("common.rename")}</button>
            <button class="row-action danger" type="button" data-category-delete="${escapeAttr(folder)}" data-category-name="${escapeAttr(category.name)}">${t("common.delete")}</button>
          ` : ""}
        </div>
      </summary>
      <div class="category-tools">
        ${ui.taskEditMode ? `
          <div class="category-palette">
            ${getTaskPaletteColors().map((swatch) => `
              <button class="color-mini ${swatch === color ? "active" : ""}" type="button" style="--swatch-color:${swatch}" data-category-color="${swatch}" data-category-folder="${escapeAttr(folder)}" data-category-name="${escapeAttr(category.name)}"></button>
            `).join("")}
          </div>
        ` : ""}
        <div class="template-list">
          ${category.tasks.map((task) => renderTaskTemplateRow(task)).join("")}
        </div>
      </div>
    </details>
  `;
}

function renderTaskTemplateRow(task) {
  const focused = ui.focusTaskId === task.id;
  const color = getCategoryColor(task.folder, task.category);
  return `
    <div class="template-pill-row ${focused ? "is-focused" : ""}" data-task-row="${task.id}">
      <div class="template-pill inherited-tone" style="${buildTaskRowStyle(color)}">
        <span>${escapeHtml(task.action)}</span>
      </div>
      <div class="template-actions">
        ${ui.taskEditMode ? `
          <button class="row-action" type="button" data-task-edit="${task.id}">${t("common.edit")}</button>
          <button class="row-action" type="button" data-task-duration="${task.id}">${t("tasks.time")}</button>
          <button class="row-action danger" type="button" data-task-delete="${task.id}">${t("common.delete")}</button>
        ` : `${task.defaultDurationMinutes ? `<span class="template-duration">${task.defaultDurationMinutes} min</span>` : ""}`}
      </div>
    </div>
  `;
}

function buildStatsRows(entries) {
  const filteredEntries = filterEntriesForStats(entries);
  const groups = new Map();

  filteredEntries.forEach((entry) => {
    const minutes = entryDurationMinutes(entry);
    if (minutes <= 0) {
      return;
    }
    const meta = getEntryStatsMeta(entry);
    const key = ui.statsMode === "task" ? meta.taskKey : meta.categoryKey;
    const label = ui.statsMode === "task" ? meta.taskLabel : meta.categoryLabel;
    const note = ui.statsMode === "task" ? meta.categoryLabel : meta.folderLabel;
    const current = groups.get(key) || {
      key,
      label,
      note,
      color: meta.color,
      minutes: 0,
      count: 0
    };
    current.minutes += minutes;
    current.count += 1;
    groups.set(key, current);
  });

  const rows = [...groups.values()].sort((a, b) => b.minutes - a.minutes || a.label.localeCompare(b.label, localeTag()));
  if (ui.statsSelectedKey && !rows.some((row) => row.key === ui.statsSelectedKey)) {
    ui.statsSelectedKey = "";
  }
  return rows;
}

function getStatsDays() {
  if (!ui.statsStart || !ui.statsEnd) {
    return [];
  }
  const days = [];
  const cursor = new Date(`${ui.statsStart}T12:00:00`);
  const end = new Date(`${ui.statsEnd}T12:00:00`);
  while (cursor <= end) {
    days.push(dateKey(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

function syncStatsFocusDate() {
  const days = getStatsDays();
  if (!days.length) {
    ui.statsFocusDate = dateKey(new Date());
    return;
  }
  if (!ui.statsFocusDate || !days.includes(ui.statsFocusDate)) {
    ui.statsFocusDate = days[days.length - 1];
  }
}

function formatStatsFocusDate(dayKey) {
  if (!dayKey) {
    return "";
  }
  const date = new Date(`${dayKey}T12:00:00`);
  if (currentLanguage() === "en") {
    return new Intl.DateTimeFormat(localeTag(), { month: "short", day: "numeric" }).format(date);
  }
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

function renderStats() {
  refs.rangeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.range === ui.statsPreset);
  });
  refs.statsModeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.statsMode === ui.statsMode);
  });
  refs.statsCustomRange.classList.toggle("hidden", ui.statsPreset !== "custom");
  refs.statsStartDate.value = ui.statsStart;
  refs.statsEndDate.value = ui.statsEnd;

  syncStatsFocusDate();
  renderStatsDayStrip();

  const entries = getEntriesWithinRange(ui.statsStart, ui.statsEnd);
  populateStatsFilters(entries);
  const rows = buildStatsRows(entries);
  const totalMinutes = rows.reduce((sum, row) => sum + row.minutes, 0);
  const focusEntries = entries.filter((entry) => dateKey(entry.start) === ui.statsFocusDate);
  const focusMinutes = focusEntries.reduce((sum, entry) => sum + entryDurationMinutes(entry), 0);

  refs.statsTotalDuration.textContent = formatStatsDuration(focusMinutes);
  refs.statsTotalLabel.textContent = ui.statsPreset === "day"
    ? t("stats.trackedToday")
    : t("stats.selectedDay", { date: formatStatsFocusDate(ui.statsFocusDate) });

  renderStatsDonut(focusEntries);
  renderStatsDetails(rows, totalMinutes);
  renderStatsTrend(entries);
}

function renderStatsDayStrip() {
  const days = getStatsDays();
  const hidden = ui.statsPreset === "day" || days.length <= 1;
  refs.statsDayStrip.classList.toggle("hidden", hidden);
  if (hidden) {
    refs.statsDayStrip.innerHTML = "";
    return;
  }

  refs.statsDayStrip.innerHTML = days.map((day) => {
    const date = new Date(`${day}T12:00:00`);
    const dayLabel = currentLanguage() === "en"
      ? new Intl.DateTimeFormat(localeTag(), { month: "short", day: "numeric" }).format(date)
      : new Intl.DateTimeFormat(localeTag(), { month: "numeric", day: "numeric" }).format(date);
    return `
      <button class="stats-day-button ${day === ui.statsFocusDate ? "active" : ""}" type="button" data-stats-day="${day}">
        <strong>${escapeHtml(dayLabel)}</strong>
        <span>${escapeHtml(shortWeekday(date))}</span>
      </button>
    `;
  }).join("");
}

function handleStatsDayPick(event) {
  const button = event.target.closest("[data-stats-day]");
  if (!button) {
    return;
  }
  ui.statsFocusDate = button.dataset.statsDay;
  ui.statsClockEntryId = "";
  renderStats();
}

function renderStatsDonut(entries) {
  const circumference = 2 * Math.PI * 90;
  const center = 130;
  const markers = [0, 6, 12, 18].map((hour) => {
    const angle = ((hour / 24) * 360) - 90;
    const radians = (angle * Math.PI) / 180;
    const x = center + Math.cos(radians) * 110;
    const y = center + Math.sin(radians) * 110 + 6;
    return `<text class="stats-clock-marker" x="${x.toFixed(1)}" y="${y.toFixed(1)}">${String(hour).padStart(2, "0")}</text>`;
  }).join("");

  const segments = entries.map((entry) => {
    const start = timeToMinutes(formatTime(entry.start));
    const end = timeToMinutes(formatTime(entry.end));
    const minutes = Math.max(end - start, 1);
    const offset = circumference * (start / 1440);
    const length = circumference * (minutes / 1440);
    const isActive = ui.statsClockEntryId === entry.id;
    const muted = ui.statsClockEntryId && !isActive;
    const midAngle = -90 + ((start + minutes / 2) / 1440) * 360;
    return `
      <circle
        class="stats-segment ${isActive ? "is-active" : ""} ${muted ? "is-muted" : ""}"
        cx="${center}"
        cy="${center}"
        r="90"
        stroke="${getItemColor(entry)}"
        data-entry-id="${escapeAttr(entry.id)}"
        data-mid-angle="${midAngle.toFixed(2)}"
        stroke-dasharray="${length} ${circumference}"
        stroke-dashoffset="${-offset}"
      ></circle>
    `;
  }).join("");

  refs.statsDonut.innerHTML = `
    <g transform="rotate(-90 130 130)">
      <circle class="stats-track clock-track" cx="130" cy="130" r="90"></circle>
      ${segments}
    </g>
    ${markers}
  `;

  const activeEntry = entries.find((entry) => entry.id === ui.statsClockEntryId);
  const activeSegment = activeEntry ? refs.statsDonut.querySelector(`[data-entry-id="${escapeSelector(ui.statsClockEntryId)}"]`) : null;
  if (!activeEntry || !activeSegment) {
    refs.statsCallout.classList.add("hidden");
    refs.statsCallout.innerHTML = "";
    refs.statsCallout.style.left = "";
    refs.statsCallout.style.top = "";
    return;
  }

  const angle = Number(activeSegment.dataset.midAngle || 0);
  const radians = (angle * Math.PI) / 180;
  const radius = 118;
  const left = clamp(((center + Math.cos(radians) * radius) / 260) * 100, 14, 86);
  const top = clamp(((center + Math.sin(radians) * radius) / 260) * 100, 14, 86);
  const title = activeEntry.taskId ? (findTask(activeEntry.taskId)?.action || activeEntry.title) : activeEntry.title;

  refs.statsCallout.classList.remove("hidden");
  refs.statsCallout.style.left = `${left}%`;
  refs.statsCallout.style.top = `${top}%`;
  refs.statsCallout.innerHTML = `
    <strong>${escapeHtml(title)}</strong>
    <span>${escapeHtml(`${formatTime(activeEntry.start)} - ${formatTime(activeEntry.end)}`)}</span>
  `;
}

function renderStatsDetails(rows, totalMinutes) {
  refs.statsDetailList.innerHTML = rows.length
    ? rows.map((row) => {
      const percent = totalMinutes ? Math.round((row.minutes / totalMinutes) * 100) : 0;
      return `
        <button class="stats-detail-row ${ui.statsSelectedKey === row.key ? "is-active" : ""}" type="button" data-stats-row="${escapeAttr(row.key)}">
          <span class="stats-detail-left">
            <span class="breakdown-dot" style="--swatch-color:${row.color}"></span>
            <span>
              <strong>${escapeHtml(row.label)}</strong>
              ${row.note ? `<span class="stats-detail-note">${escapeHtml(row.note)}</span>` : ""}
            </span>
          </span>
          <span class="stats-detail-right">
            <strong>${formatStatsDuration(row.minutes)}</strong>
            <span>${percent}%</span>
          </span>
        </button>
      `;
    }).join("")
    : renderEmptyState(t("stats.empty"));
}

function renderStatsTrend(entries) {
  const filteredEntries = filterEntriesForStats(entries);
  const endDate = new Date(`${ui.statsEnd}T12:00:00`);
  const days = [];

  for (let index = 6; index >= 0; index -= 1) {
    const day = new Date(endDate);
    day.setDate(endDate.getDate() - index);
    const key = dateKey(day);
    const minutes = filteredEntries
      .filter((entry) => dateKey(entry.start) === key)
      .reduce((sum, entry) => sum + entryDurationMinutes(entry), 0);
    days.push({ key, label: shortWeekday(day), minutes });
  }

  const maxMinutes = Math.max(...days.map((day) => day.minutes), 1);
  refs.statsTrendChart.innerHTML = days.map((day) => `
    <div class="trend-bar">
      <strong>${day.minutes ? formatStatsDuration(day.minutes) : "0m"}</strong>
      <div class="trend-bar-fill" style="height:${Math.max(12, Math.round((day.minutes / maxMinutes) * 100))}%"></div>
      <span>${escapeHtml(day.label)}</span>
    </div>
  `).join("");
}

function populateStatsFilters(entries) {
  const categoryOptions = getStatsCategoryOptions(entries);
  const currentCategory = refs.statsCategoryFilter.value || "all";
  refs.statsCategoryFilter.innerHTML = [
    `<option value="all">${t("stats.allCategories")}</option>`,
    ...categoryOptions.map((item) => `<option value="${escapeAttr(item.value)}">${escapeHtml(item.label)}</option>`)
  ].join("");
  refs.statsCategoryFilter.value = categoryOptions.some((item) => item.value === currentCategory) ? currentCategory : "all";
  populateStatsTaskFilter(entries);
}

function populateStatsTaskFilter(entries = getEntriesWithinRange(ui.statsStart, ui.statsEnd)) {
  const taskOptions = getStatsTaskOptions(entries, refs.statsCategoryFilter.value || "all");
  const currentTask = refs.statsTaskFilter.value || "all";
  refs.statsTaskFilter.innerHTML = [
    `<option value="all">${t("stats.allTasks")}</option>`,
    ...taskOptions.map((item) => `<option value="${escapeAttr(item.value)}">${escapeHtml(item.label)}</option>`)
  ].join("");
  refs.statsTaskFilter.value = taskOptions.some((item) => item.value === currentTask) ? currentTask : "all";
}

function getStatsCategoryOptions(entries) {
  const map = new Map();
  state.tasks.forEach((task) => {
    const key = buildCategoryKey(task.folder, task.category);
    if (!map.has(key)) {
      map.set(key, { value: key, label: task.category });
    }
  });

  entries.forEach((entry) => {
    const meta = getEntryStatsMeta(entry);
    if (!map.has(meta.categoryKey)) {
      map.set(meta.categoryKey, { value: meta.categoryKey, label: meta.categoryLabel });
    }
  });

  return [...map.values()].sort((a, b) => a.label.localeCompare(b.label, localeTag()));
}

function getStatsTaskOptions(entries, categoryFilter) {
  const map = new Map();

  state.tasks.forEach((task) => {
    const key = `task:${task.id}`;
    const categoryKey = buildCategoryKey(task.folder, task.category);
    if (categoryFilter !== "all" && categoryFilter !== categoryKey) {
      return;
    }
    map.set(key, { value: key, label: task.action });
  });

  entries.forEach((entry) => {
    const meta = getEntryStatsMeta(entry);
    if (categoryFilter !== "all" && categoryFilter !== meta.categoryKey) {
      return;
    }
    if (!map.has(meta.taskKey)) {
      map.set(meta.taskKey, { value: meta.taskKey, label: meta.taskLabel });
    }
  });

  return [...map.values()].sort((a, b) => a.label.localeCompare(b.label, localeTag()));
}

function filterEntriesForStats(entries) {
  const categoryFilter = refs.statsCategoryFilter.value || "all";
  const taskFilter = refs.statsTaskFilter.value || "all";
  return entries.filter((entry) => {
    const meta = getEntryStatsMeta(entry);
    const categoryMatch = categoryFilter === "all" || meta.categoryKey === categoryFilter;
    const taskMatch = taskFilter === "all" || meta.taskKey === taskFilter;
    return categoryMatch && taskMatch;
  });
}

function getEntryStatsMeta(entry) {
  const task = entry.taskId ? findTask(entry.taskId) : null;
  if (task) {
    return {
      folderLabel: task.folder,
      categoryLabel: task.category,
      taskLabel: task.action,
      categoryKey: buildCategoryKey(task.folder, task.category),
      taskKey: `task:${task.id}`,
      color: getCategoryColor(task.folder, task.category)
    };
  }

  return {
    folderLabel: t("stats.noFolder"),
    categoryLabel: t("stats.noCategory"),
    taskLabel: entry.title || t("stats.untitled"),
    categoryKey: "category:none",
    taskKey: `temp:${entry.title || entry.id}`,
    color: entry.color || getTaskPaletteColors()[0] || "#AFC7FF"
  };
}
function switchView(view, quiet = false) {
  ui.activeView = view;
  refs.views.forEach((section) => {
    section.classList.toggle("active", section.dataset.view === view);
  });
  refs.navItems.forEach((button) => {
    button.classList.toggle("active", button.dataset.viewTarget === view);
  });
  refs.appShell.classList.toggle("home-mode", view === "home");
  refs.focusTimer.classList.toggle("view-hidden", view !== "home");
  refs.openActionSheet.classList.toggle("view-hidden", view !== "home");
  if (view !== "home") {
    closeSheet("action-sheet");
  }
  if (!quiet) {
    if (view === "home") {
      renderHome();
    }
    if (view === "tasks") {
      renderTaskLibrary();
    }
    if (view === "stats") {
      renderStats();
    }
  }
}

function handleOpenSheet(sheetId) {
  if (sheetId === "create-sheet") {
    resetCreateForm();
  }
  if (sheetId === "quick-sheet") {
    refs.quickForm.reset();
  }
  if (sheetId === "log-sheet") {
    resetLogForm();
  }
  if (sheetId === "start-sheet") {
    resetStartForm();
  }
  closeSheet("action-sheet");
  openSheet(sheetId);
}

function openSheet(id) {
  const layer = document.querySelector(`#${id}`);
  if (layer) {
    layer.classList.remove("hidden");
  }
  if (id === "create-sheet") {
    window.setTimeout(() => setCreateSheetExpanded(false), 0);
  }
}

function closeSheet(id) {
  const layer = document.querySelector(`#${id}`);
  if (layer) {
    layer.classList.add("hidden");
  }
  if (id === "create-sheet") {
    setCreateSheetExpanded(false);
  }
}

function resetCreateForm() {
  refs.createForm.reset();
  refs.createForm.elements.taskId.value = "";
  refs.createCategoryValue.textContent = t("field.optional");
  const defaultColor = getTaskPaletteColors()[0] || "#AFC7FF";
  refs.createForm.dataset.selectedColor = defaultColor;
  renderCreateColorPicker(defaultColor);
}

function resetLogForm() {
  refs.logForm.reset();
  refs.logForm.elements.taskId.value = "";
  refs.logForm.elements.date.value = dateKey(new Date());
  refs.logForm.elements.startTime.value = defaultStartTime();
  refs.logForm.elements.endTime.value = defaultEndTime();
  refs.logCategoryValue.textContent = t("field.optional");
}

function resetStartForm() {
  refs.startForm.reset();
  refs.startForm.elements.taskId.value = "";
  refs.startCategoryValue.textContent = t("field.optional");
}

function openCategorySheet(target, returnSheetId) {
  ui.categoryTarget = target;
  ui.returnSheetId = returnSheetId;
  ui.categoryStep = "folder";
  ui.categoryFolder = "";
  ui.categoryCategory = "";
  renderCategorySheet();
  closeSheet(returnSheetId);
  openSheet("category-sheet");
}

function renderCategorySheet() {
  const tasks = [...state.tasks].sort((a, b) => (
    `${a.folder}${a.category}${a.action}`.localeCompare(`${b.folder}${b.category}${b.action}`, localeTag())
  ));

  if (ui.categoryStep === "folder") {
    const folders = uniqueValues(tasks.map((task) => task.folder));
    refs.categoryPath.textContent = t("tasks.noPath");
    refs.categoryList.innerHTML = folders.map((folder) => (
      `<button class="category-item" type="button" data-category-folder="${escapeAttr(folder)}">
        <strong>${escapeHtml(folder)}</strong><span>›</span>
      </button>`
    )).join("");
    return;
  }

  if (ui.categoryStep === "category") {
    const categories = uniqueValues(tasks
      .filter((task) => task.folder === ui.categoryFolder)
      .map((task) => task.category));
    refs.categoryPath.textContent = `${ui.categoryFolder}`;
    refs.categoryList.innerHTML = categories.map((category) => (
      `<button class="category-item" type="button" data-category-name="${escapeAttr(category)}">
        <strong>${escapeHtml(category)}</strong><span>›</span>
      </button>`
    )).join("");
    return;
  }

  refs.categoryPath.textContent = `${ui.categoryFolder} / ${ui.categoryCategory}`;
  refs.categoryList.innerHTML = tasks
    .filter((task) => task.folder === ui.categoryFolder && task.category === ui.categoryCategory)
    .map((task) => `
      <button class="category-item" type="button" data-category-task="${task.id}">
        <strong>${escapeHtml(task.action)}</strong>
        <span class="tag">${escapeHtml(task.category)}</span>
      </button>
    `).join("");
}

function handleCategoryBack() {
  if (ui.categoryStep === "action") {
    ui.categoryStep = "category";
    renderCategorySheet();
    return;
  }
  if (ui.categoryStep === "category") {
    ui.categoryStep = "folder";
    ui.categoryFolder = "";
    renderCategorySheet();
  }
}

function clearCategorySelection() {
  applyCategorySelection("");
}

function handleCategoryListClick(event) {
  const folderButton = event.target.closest("[data-category-folder]");
  if (folderButton) {
    ui.categoryFolder = folderButton.dataset.categoryFolder;
    ui.categoryStep = "category";
    renderCategorySheet();
    return;
  }

  const categoryButton = event.target.closest("[data-category-name]");
  if (categoryButton) {
    ui.categoryCategory = categoryButton.dataset.categoryName;
    ui.categoryStep = "action";
    renderCategorySheet();
    return;
  }

  const taskButton = event.target.closest("[data-category-task]");
  if (taskButton) {
    applyCategorySelection(taskButton.dataset.categoryTask);
  }
}

function applyCategorySelection(taskId) {
  const targetForm = refs[`${ui.categoryTarget}Form`];
  const targetValue = refs[`${ui.categoryTarget}CategoryValue`];
  if (!targetForm || !targetValue) {
    return;
  }

  targetForm.elements.taskId.value = taskId || "";
  if (!taskId) {
    targetValue.textContent = t("field.optional");
  } else {
    const task = findTask(taskId);
    targetValue.textContent = task ? `${task.folder} / ${task.category} / ${task.action}` : t("field.optional");
    if (task && !targetForm.elements.title.value.trim()) {
      targetForm.elements.title.value = task.action;
    }
    if (task && ui.categoryTarget === "create") {
      refs.createForm.dataset.selectedColor = task.color;
      renderCreateColorPicker(task.color);
    }
  }

  closeSheet("category-sheet");
  openSheet(ui.returnSheetId);
}

function renderCreateColorPicker(selectedColor) {
  refs.createColorPicker.innerHTML = getTaskPaletteColors().map((color) => `
    <button class="palette-button ${selectedColor === color ? "active" : ""}" type="button" style="--swatch-color:${color}" data-create-color="${color}"></button>
  `).join("");
}

function handleCreateColorClick(event) {
  const button = event.target.closest("[data-create-color]");
  if (!button) {
    return;
  }
  refs.createForm.dataset.selectedColor = button.dataset.createColor;
  renderCreateColorPicker(button.dataset.createColor);
}

function setCreateSheetExpanded(expanded) {
  ui.createSheetExpanded = expanded;
  refs.createSheetPanel.classList.toggle("expanded", expanded);
}

function handleCreateSheetDragStart(event) {
  const startY = event.clientY;
  const startExpanded = ui.createSheetExpanded;

  const handleMove = (moveEvent) => {
    const deltaY = moveEvent.clientY - startY;
    if (deltaY < -40 && !startExpanded) {
      setCreateSheetExpanded(true);
    }
    if (deltaY > 40 && startExpanded) {
      setCreateSheetExpanded(false);
    }
  };

  const handleUp = () => {
    window.removeEventListener("pointermove", handleMove);
    window.removeEventListener("pointerup", handleUp);
  };

  window.addEventListener("pointermove", handleMove);
  window.addEventListener("pointerup", handleUp);
}

function handleCreateSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const title = String(formData.get("title") || "").trim();
  const taskId = String(formData.get("taskId") || "");
  const task = taskId ? findTask(taskId) : null;
  if (!title) {
    return;
  }

  state.plans.unshift(createPlan({
    title,
    taskId,
    date: dateKey(new Date()),
    startTime: String(formData.get("startTime") || ""),
    durationMinutes: parseMinutes(formData.get("durationMinutes")) || task?.defaultDurationMinutes || null,
    color: task ? getCategoryColor(task.folder, task.category) : (refs.createForm.dataset.selectedColor || getTaskPaletteColors()[0] || "#AFC7FF"),
    important: Boolean(formData.get("important"))
  }));

  saveState();
  closeSheet("create-sheet");
  renderAll();
}

function findQuickTaskCandidate(title) {
  const normalized = String(title || "").trim().toLowerCase();
  if (!normalized) {
    return null;
  }
  const exactTask = state.tasks.find((task) => task.action.toLowerCase() === normalized);
  if (exactTask) {
    return exactTask;
  }

  const matchedPlan = state.plans.find((plan) => plan.title.toLowerCase() === normalized && plan.taskId);
  if (matchedPlan?.taskId) {
    return findTask(matchedPlan.taskId);
  }

  const matchedEntry = state.entries.find((entry) => entry.title.toLowerCase() === normalized && entry.taskId);
  if (matchedEntry?.taskId) {
    return findTask(matchedEntry.taskId);
  }
  return null;
}

function handleQuickSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const title = String(formData.get("title") || "").trim();
  if (!title) {
    return;
  }

  const task = findQuickTaskCandidate(title);
  const plan = createPlan({
    title: task ? task.action : title,
    taskId: task?.id || "",
    date: dateKey(new Date()),
    startTime: "",
    durationMinutes: task?.defaultDurationMinutes || null,
    color: task ? getCategoryColor(task.folder, task.category) : (getTaskPaletteColors()[0] || "#AFC7FF"),
    important: false
  });

  state.plans.unshift(plan);
  startSession({
    title: plan.title,
    taskId: plan.taskId,
    planId: plan.id,
    color: plan.color
  });

  closeSheet("quick-sheet");
  renderAll();
}

function handleLogSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const title = String(formData.get("title") || "").trim();
  const date = String(formData.get("date") || dateKey(new Date()));
  const startTime = String(formData.get("startTime") || "");
  const endTime = String(formData.get("endTime") || "");
  if (!title || !startTime || !endTime || timeToMinutes(endTime) <= timeToMinutes(startTime)) {
    return;
  }

  state.entries.unshift({
    id: uid("entry"),
    title,
    taskId: String(formData.get("taskId") || ""),
    planId: "",
    color: getTaskColorByTaskId(String(formData.get("taskId") || "")),
    start: `${date}T${startTime}:00`,
    end: `${date}T${endTime}:00`,
    source: "manual"
  });

  saveState();
  closeSheet("log-sheet");
  renderAll();
}

function handleStartSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const title = String(formData.get("title") || "").trim();
  const taskId = String(formData.get("taskId") || "");
  const task = taskId ? findTask(taskId) : null;
  if (!title) {
    return;
  }

  const plan = createPlan({
    title,
    taskId,
    date: dateKey(new Date()),
    startTime: "",
    durationMinutes: task?.defaultDurationMinutes || null,
    color: task ? getCategoryColor(task.folder, task.category) : "",
    important: false
  });

  state.plans.unshift(plan);
  startSession({
    title: plan.title,
    taskId: plan.taskId,
    planId: plan.id,
    color: plan.color
  });

  closeSheet("start-sheet");
  renderAll();
}

function openTemplateForm(taskId = "", preset = {}) {
  if (typeof taskId === "object" && taskId !== null) {
    preset = taskId;
    taskId = "";
  }
  refs.templateForm.reset();
  refs.templateForm.elements.templateId.value = "";
  refs.templateSheetKicker.textContent = t("tasks.newItem");
  refs.templateSheetTitle.textContent = t("tasks.editItem");
  const defaultColor = getTaskPaletteColors()[0] || "#AFC7FF";
  refs.templateForm.dataset.selectedColor = defaultColor;
  renderTemplateColorPicker(defaultColor);
  refs.templateForm.elements.folder.value = preset.folder || "";
  refs.templateForm.elements.category.value = preset.category || "";
  refs.templateForm.elements.action.value = preset.action || "";

  if (taskId) {
    const task = findTask(taskId);
    if (!task) {
      return;
    }
    refs.templateSheetKicker.textContent = t("common.edit");
    refs.templateSheetTitle.textContent = t("tasks.editItem");
    refs.templateForm.elements.templateId.value = task.id;
    refs.templateForm.elements.folder.value = task.folder;
    refs.templateForm.elements.category.value = task.category;
    refs.templateForm.elements.action.value = task.action;
    refs.templateForm.elements.defaultDurationMinutes.value = task.defaultDurationMinutes || "";
    const categoryColor = getCategoryColor(task.folder, task.category);
    refs.templateForm.dataset.selectedColor = categoryColor;
    renderTemplateColorPicker(categoryColor);
  }

  openSheet("template-sheet");
}

function renderTemplateColorPicker(selectedColor) {
  refs.templateColorPicker.innerHTML = getTaskPaletteColors().map((color) => `
    <button class="palette-button ${selectedColor === color ? "active" : ""}" type="button" style="--swatch-color:${color}" data-template-color="${color}"></button>
  `).join("");
}

function handleTemplateColorClick(event) {
  const button = event.target.closest("[data-template-color]");
  if (!button) {
    return;
  }
  refs.templateForm.dataset.selectedColor = button.dataset.templateColor;
  renderTemplateColorPicker(button.dataset.templateColor);
}

function handleTemplateSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const templateId = String(formData.get("templateId") || "");
  const folder = String(formData.get("folder") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const action = String(formData.get("action") || "").trim();
  const defaultDurationMinutes = parseMinutes(formData.get("defaultDurationMinutes"));
  const color = refs.templateForm.dataset.selectedColor || getTaskPaletteColors()[0] || "#AFC7FF";
  const payload = {
    folder,
    category,
    action,
    color,
    defaultDurationMinutes
  };

  if (!payload.folder || !payload.category || !payload.action) {
    return;
  }

  if (templateId) {
    const task = findTask(templateId);
    if (task) {
      Object.assign(task, payload);
      setCategoryColor(payload.folder, payload.category, color);
    }
  } else {
    const inheritedColor = hasCategory(payload.folder, payload.category)
      ? getCategoryColor(payload.folder, payload.category)
      : color;
    state.tasks.unshift({
      id: uid("task"),
      ...payload,
      color: inheritedColor,
      createdAt: new Date().toISOString()
    });
    setCategoryColor(payload.folder, payload.category, inheritedColor);
  }

  saveState();
  closeSheet("template-sheet");
  renderAll();
}

function handleTodoAction(event) {
  const startButton = event.target.closest("[data-start-plan]");
  if (startButton) {
    startPlan(startButton.dataset.startPlan);
    return;
  }

  const completeButton = event.target.closest("[data-complete-plan]");
  if (completeButton) {
    togglePlanCompleted(completeButton.dataset.completePlan);
  }
}

function syncNextDots() {
  const dots = refs.nextDots.querySelectorAll("span");
  if (!dots.length) {
    return;
  }
  const card = refs.nextTrack.querySelector(".next-card");
  const width = card?.offsetWidth || refs.nextTrack.clientWidth || 1;
  const gap = 12;
  const index = Math.min(
    dots.length - 1,
    Math.max(0, Math.round(refs.nextTrack.scrollLeft / (width + gap)))
  );
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === index);
  });
}

function handleFocusTimerActions(event) {
  const openSheetButton = event.target.closest("[data-open-sheet]");
  if (openSheetButton) {
    handleOpenSheet(openSheetButton.dataset.openSheet);
    return;
  }

  const pauseButton = event.target.closest("[data-pause-session]");
  if (pauseButton) {
    toggleSessionPause();
    return;
  }

  const stopButton = event.target.closest("[data-stop-session]");
  if (stopButton) {
    stopSession();
  }
}

function bindHomeLongPress(container) {
  let pressTimer = 0;
  let startX = 0;
  let startY = 0;

  const clearPress = () => {
    if (pressTimer) {
      window.clearTimeout(pressTimer);
      pressTimer = 0;
    }
  };

  container.addEventListener("pointerdown", (event) => {
    if (event.button && event.button !== 0) {
      return;
    }
    if (event.target.closest("button")) {
      return;
    }
    const item = event.target.closest("[data-home-plan]");
    if (!item) {
      return;
    }
    const plan = findPlan(item.dataset.homePlan);
    if (!plan || !plan.taskId) {
      return;
    }

    startX = event.clientX;
    startY = event.clientY;
    clearPress();
    pressTimer = window.setTimeout(() => {
      openHomeTaskMenu(plan.id);
      pressTimer = 0;
    }, 420);
  });

  container.addEventListener("pointermove", (event) => {
    if (!pressTimer) {
      return;
    }
    if (Math.abs(event.clientX - startX) > 12 || Math.abs(event.clientY - startY) > 12) {
      clearPress();
    }
  });

  ["pointerup", "pointercancel", "pointerleave", "scroll"].forEach((eventName) => {
    container.addEventListener(eventName, clearPress, { passive: true });
  });
}

function openHomeTaskMenu(planId) {
  const plan = findPlan(planId);
  if (!plan || !plan.taskId) {
    return;
  }
  const task = findTask(plan.taskId);
  ui.homeMenuPlanId = plan.id;
  refs.homeTaskSheetTitle.textContent = task ? `${task.category} / ${task.action}` : plan.title;
  openSheet("home-task-sheet");
}

function toggleTaskEditMode() {
  ui.taskEditMode = !ui.taskEditMode;
  renderTaskLibrary();
}

function jumpFromHomeTaskMenuToEdit() {
  const plan = findPlan(ui.homeMenuPlanId);
  const task = plan?.taskId ? findTask(plan.taskId) : null;
  if (!task) {
    return;
  }
  ui.taskEditMode = true;
  ui.focusFolderName = task.folder;
  ui.focusCategoryKey = buildCategoryKey(task.folder, task.category);
  ui.focusTaskId = task.id;
  closeSheet("home-task-sheet");
  switchView("tasks");
  openTemplateForm(task.id);
}

function jumpFromHomeTaskMenuToCategory() {
  const plan = findPlan(ui.homeMenuPlanId);
  const task = plan?.taskId ? findTask(plan.taskId) : null;
  if (!task) {
    return;
  }
  ui.taskEditMode = true;
  ui.focusFolderName = task.folder;
  ui.focusCategoryKey = buildCategoryKey(task.folder, task.category);
  ui.focusTaskId = task.id;
  closeSheet("home-task-sheet");
  switchView("tasks");
}

function handleStatsDetailClick(event) {
  const row = event.target.closest("[data-stats-row]");
  if (!row) {
    return;
  }
  const key = row.dataset.statsRow;
  ui.statsSelectedKey = ui.statsSelectedKey === key ? "" : key;
  renderStats();
}

function handleStatsDonutClick(event) {
  const segment = event.target.closest("[data-entry-id]");
  if (!segment) {
    ui.statsClockEntryId = "";
    renderStats();
    return;
  }
  const key = segment.dataset.entryId;
  ui.statsClockEntryId = ui.statsClockEntryId === key ? "" : key;
  renderStats();
}

function handleTaskTreeActions(event) {
  const pressedButton = event.target.closest("button");
  if (pressedButton) {
    event.preventDefault();
    event.stopPropagation();
  }

  const folderAdd = event.target.closest("[data-folder-add-category]");
  if (folderAdd) {
    openTemplateForm({ folder: folderAdd.dataset.folderAddCategory });
    return;
  }

  const categoryAdd = event.target.closest("[data-category-add-task]");
  if (categoryAdd) {
    openTemplateForm({
      folder: categoryAdd.dataset.categoryAddTask,
      category: categoryAdd.dataset.categoryName
    });
    return;
  }

  const folderRename = event.target.closest("[data-folder-rename]");
  if (folderRename) {
    renameFolder(folderRename.dataset.folderRename);
    return;
  }

  const folderDelete = event.target.closest("[data-folder-delete]");
  if (folderDelete) {
    deleteFolder(folderDelete.dataset.folderDelete);
    return;
  }

  const categoryRename = event.target.closest("[data-category-rename]");
  if (categoryRename) {
    renameCategory(categoryRename.dataset.categoryRename, categoryRename.dataset.categoryName);
    return;
  }

  const categoryDelete = event.target.closest("[data-category-delete]");
  if (categoryDelete) {
    deleteCategory(categoryDelete.dataset.categoryDelete, categoryDelete.dataset.categoryName);
    return;
  }

  const categoryColor = event.target.closest("[data-category-color]");
  if (categoryColor) {
    setCategoryColor(categoryColor.dataset.categoryFolder, categoryColor.dataset.categoryName, categoryColor.dataset.categoryColor);
    saveState();
    renderAll();
    return;
  }

  const taskEdit = event.target.closest("[data-task-edit]");
  if (taskEdit) {
    ui.focusTaskId = taskEdit.dataset.taskEdit;
    openTemplateForm(taskEdit.dataset.taskEdit);
    return;
  }

  const taskDuration = event.target.closest("[data-task-duration]");
  if (taskDuration) {
    updateTaskDuration(taskDuration.dataset.taskDuration);
    return;
  }

  const taskDelete = event.target.closest("[data-task-delete]");
  if (taskDelete) {
    deleteTemplate(taskDelete.dataset.taskDelete);
  }
}

function renameFolder(folder) {
  const nextName = window.prompt("Rename top level", folder)?.trim();
  if (!nextName || nextName === folder) {
    return;
  }
  state.tasks.forEach((task) => {
    if (task.folder === folder) {
      task.folder = nextName;
    }
  });
  if (ui.focusFolderName === folder) {
    ui.focusFolderName = nextName;
  }
  if (ui.focusCategoryKey.startsWith(`${folder}::`)) {
    ui.focusCategoryKey = ui.focusCategoryKey.replace(`${folder}::`, `${nextName}::`);
  }
  saveState();
  renderAll();
}

function deleteFolder(folder) {
  const ids = state.tasks.filter((task) => task.folder === folder).map((task) => task.id);
  if (!ids.length) {
    return;
  }
  if (!window.confirm(`Delete "${folder}" and everything inside it?`)) {
    return;
  }
  state.tasks = state.tasks.filter((task) => task.folder !== folder);
  clearTaskReferences(ids);
  saveState();
  renderAll();
}

function renameCategory(folder, category) {
  const nextName = window.prompt("Rename category", category)?.trim();
  if (!nextName || nextName === category) {
    return;
  }
  const color = getCategoryColor(folder, category);
  state.tasks.forEach((task) => {
    if (task.folder === folder && task.category === category) {
      task.category = nextName;
      task.color = color;
    }
  });
  if (ui.focusCategoryKey === buildCategoryKey(folder, category)) {
    ui.focusCategoryKey = buildCategoryKey(folder, nextName);
  }
  saveState();
  renderAll();
}

function deleteCategory(folder, category) {
  const ids = state.tasks
    .filter((task) => task.folder === folder && task.category === category)
    .map((task) => task.id);
  if (!ids.length) {
    return;
  }
  if (!window.confirm(`Delete category "${category}" and its tasks?`)) {
    return;
  }
  state.tasks = state.tasks.filter((task) => !(task.folder === folder && task.category === category));
  clearTaskReferences(ids);
  saveState();
  renderAll();
}

function updateTaskDuration(taskId) {
  const task = findTask(taskId);
  if (!task) {
    return;
  }
  const nextValue = window.prompt("Default duration (minutes)", task.defaultDurationMinutes || "");
  if (nextValue === null) {
    return;
  }
  task.defaultDurationMinutes = parseMinutes(nextValue);
  saveState();
  renderTaskLibrary();
}

function clearTaskReferences(taskIds) {
  const taskSet = new Set(taskIds);
  state.plans.forEach((plan) => {
    if (taskSet.has(plan.taskId)) {
      plan.taskId = "";
    }
  });
  state.entries.forEach((entry) => {
    if (taskSet.has(entry.taskId)) {
      entry.taskId = "";
    }
  });
  if (state.activeSession && taskSet.has(state.activeSession.taskId)) {
    state.activeSession.taskId = "";
  }
}

function handleThemeClick(event) {
  const button = event.target.closest("[data-theme-id]");
  if (!button) {
    return;
  }
  state.preferences.themeId = button.dataset.themeId;
  if (!state.preferences.paletteId || state.preferences.paletteId === "custom") {
    state.preferences.paletteId = button.dataset.themeId;
  }
  saveState();
  renderAll();
}

function handlePaletteClick(event) {
  const button = event.target.closest("[data-palette-id]");
  if (!button) {
    return;
  }
  state.preferences.paletteId = button.dataset.paletteId;
  saveState();
  renderAll();
}

function saveCustomPalette() {
  const colors = parseHexPalette(refs.customPaletteInput.value);
  if (colors.length < 4) {
    return;
  }
  state.preferences.customPalette = colors;
  state.preferences.paletteId = "custom";
  saveState();
  renderAll();
}

function startPlan(planId) {
  const plan = findPlan(planId);
  if (!plan) {
    return;
  }

  if (state.activeSession?.planId === plan.id) {
    if (isSessionPaused(state.activeSession)) {
      toggleSessionPause();
    }
    return;
  }

  startSession({
    title: plan.title,
    taskId: plan.taskId,
    planId: plan.id,
    color: getItemColor(plan)
  });
  renderAll();
}

function startSession({ title, taskId = "", planId = "", color = "" }) {
  if (state.activeSession) {
    stopSession(false);
  }

  state.activeSession = {
    title,
    taskId,
    planId,
    color,
    pausedAt: null,
    segments: [{ start: new Date().toISOString(), end: null }]
  };

  saveState();
}

function toggleSessionPause() {
  const session = state.activeSession;
  if (!session) {
    return;
  }

  if (isSessionPaused(session)) {
    session.pausedAt = null;
    session.segments.push({ start: new Date().toISOString(), end: null });
  } else {
    closeOpenSegment(session);
    session.pausedAt = new Date().toISOString();
  }

  saveState();
  renderFocusTimer();
}

function stopSession(shouldRender = true) {
  const session = state.activeSession;
  if (!session) {
    return;
  }

  closeOpenSegment(session);

  session.segments.forEach((segment) => {
    if (!segment.end || new Date(segment.end).getTime() <= new Date(segment.start).getTime()) {
      return;
    }
    state.entries.unshift({
      id: uid("entry"),
      title: session.title,
      taskId: session.taskId,
      planId: session.planId,
      color: getItemColor(session),
      start: segment.start,
      end: segment.end,
      source: "timer"
    });
  });

  if (session.planId) {
    const plan = findPlan(session.planId);
    if (plan) {
      plan.completed = true;
    }
  }

  state.activeSession = null;
  saveState();
  if (shouldRender) {
    renderAll();
  }
}

function closeOpenSegment(session) {
  const last = session.segments[session.segments.length - 1];
  if (last && !last.end) {
    last.end = new Date().toISOString();
  }
}

function togglePlanCompleted(planId) {
  const plan = findPlan(planId);
  if (!plan) {
    return;
  }
  plan.completed = !plan.completed;
  saveState();
  renderHome();
}

function deleteTemplate(taskId) {
  const task = findTask(taskId);
  if (!task) {
    return;
  }

  const confirmed = window.confirm(`Delete task "${task.action}"? Existing logs will keep their titles.`);
  if (!confirmed) {
    return;
  }

  state.tasks = state.tasks.filter((item) => item.id !== taskId);
  clearTaskReferences([taskId]);
  saveState();
  renderAll();
}

function getTodayBuckets() {
  const plans = getTodayPlans();
  const nowMinutes = currentMinutes();

  const overdue = [];
  const today = [];
  const flexible = [];

  plans.filter((plan) => !plan.completed).forEach((plan) => {
    if (!plan.startTime) {
      flexible.push(plan);
      return;
    }
    if (!isPlanRunning(plan) && timeToMinutes(plan.startTime) < nowMinutes) {
      overdue.push(plan);
      return;
    }
    today.push(plan);
  });

  return {
    overdue,
    today,
    flexible: flexible.sort((a, b) => Number(b.important) - Number(a.important) || createdTime(a) - createdTime(b))
  };
}

function getCompletedItems() {
  const today = dateKey(new Date());
  const planned = getTodayPlans()
    .filter((plan) => plan.completed)
    .map((plan) => ({
      id: `plan-${plan.id}`,
      title: plan.title,
      taskId: plan.taskId,
      tag: shortTag(plan),
      meta: plan.startTime ? `${plan.startTime}${planDurationMinutes(plan) ? ` · ${planDurationMinutes(plan)} min` : ""}` : t("home.completedMeta")
    }));

  const standaloneEntries = state.entries
    .filter((entry) => dateKey(entry.start) === today && !entry.planId)
    .map((entry) => ({
      id: `entry-${entry.id}`,
      title: entry.title,
      taskId: entry.taskId,
      tag: shortTag(entry),
      meta: `${formatTime(entry.start)} - ${formatTime(entry.end)}`
    }));

  return [...planned, ...standaloneEntries];
}

function getNextItems(limit = 5) {
  const todayPlans = getTodayPlans().filter((plan) => !plan.completed);
  if (!todayPlans.length) {
    return [];
  }

  const running = todayPlans.find((plan) => isPlanRunning(plan));
  const timed = todayPlans
    .filter((plan) => plan.startTime && !isPlanRunning(plan))
    .sort((a, b) => {
      const aDistance = Math.abs(timeToMinutes(a.startTime) - currentMinutes());
      const bDistance = Math.abs(timeToMinutes(b.startTime) - currentMinutes());
      if (aDistance !== bDistance) {
        return aDistance - bDistance;
      }
      return comparePlans(a, b);
    });

  const important = todayPlans
    .filter((plan) => plan.important && !isPlanRunning(plan))
    .sort(comparePlans);

  const flexible = todayPlans
    .filter((plan) => !plan.startTime && !isPlanRunning(plan))
    .sort((a, b) => Number(b.important) - Number(a.important) || createdTime(a) - createdTime(b));

  const ordered = dedupeById([
    ...(running ? [running] : []),
    ...timed,
    ...important,
    ...flexible
  ]);

  return ordered.slice(0, limit);
}

function getTodayPlans() {
  const today = dateKey(new Date());
  return state.plans
    .filter((plan) => plan.date === today)
    .sort(comparePlans);
}

function comparePlans(a, b) {
  const aHasTime = Boolean(a.startTime);
  const bHasTime = Boolean(b.startTime);
  if (aHasTime !== bHasTime) {
    return aHasTime ? -1 : 1;
  }
  if (aHasTime && bHasTime) {
    const startDiff = timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
    if (startDiff !== 0) {
      return startDiff;
    }
  }
  return createdTime(a) - createdTime(b);
}

function getEntriesWithinRange(startDate, endDate) {
  const persistedEntries = state.entries.filter((entry) => {
    const day = dateKey(entry.start);
    return day >= startDate && day <= endDate;
  });

  if (!state.activeSession) {
    return persistedEntries;
  }

  const liveEntries = state.activeSession.segments
    .map((segment, index) => {
      const end = segment.end || new Date(nowTick).toISOString();
      if (new Date(end).getTime() <= new Date(segment.start).getTime()) {
        return null;
      }
      const day = dateKey(segment.start);
      if (day < startDate || day > endDate) {
        return null;
      }
      return {
        id: `live_${index}`,
        title: state.activeSession.title,
        taskId: state.activeSession.taskId,
        planId: state.activeSession.planId,
        color: state.activeSession.color,
        start: segment.start,
        end,
        source: "live"
      };
    })
    .filter(Boolean);

  return [...persistedEntries, ...liveEntries];
}

function syncStatsDatesFromPreset(preset) {
  const today = new Date();
  if (preset === "day") {
    ui.statsStart = dateKey(today);
    ui.statsEnd = dateKey(today);
    ui.statsFocusDate = dateKey(today);
    ui.statsClockEntryId = "";
    return;
  }

  if (preset === "week") {
    const weekday = today.getDay() || 7;
    const monday = new Date(today);
    monday.setDate(today.getDate() - weekday + 1);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    ui.statsStart = dateKey(monday);
    ui.statsEnd = dateKey(sunday);
    ui.statsFocusDate = dateKey(today);
    ui.statsClockEntryId = "";
    return;
  }

  if (preset === "month") {
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    ui.statsStart = dateKey(start);
    ui.statsEnd = dateKey(end);
    ui.statsFocusDate = dateKey(today);
    ui.statsClockEntryId = "";
    return;
  }

  if (!ui.statsStart || !ui.statsEnd) {
    ui.statsStart = dateKey(today);
    ui.statsEnd = dateKey(today);
  }
  syncStatsFocusDate();
}

function formatStatsDuration(minutes) {
  const rounded = Math.max(Math.round(minutes || 0), 0);
  const hours = Math.floor(rounded / 60);
  const rest = rounded % 60;
  if (!hours) {
    return `${rounded}m`;
  }
  return rest ? `${hours}h ${rest}m` : `${hours}h`;
}

function statsRangeLabel(preset) {
  if (preset === "day") {
    return t("stats.trackedToday");
  }
  if (preset === "week") {
    return t("stats.trackedWeek");
  }
  if (preset === "month") {
    return t("stats.trackedMonth");
  }
  return t("stats.trackedRange");
}

function shortWeekday(date) {
  return new Intl.DateTimeFormat(localeTag(), { weekday: currentLanguage() === "en" ? "short" : "narrow" }).format(date);
}

function escapeSelector(value) {
  if (window.CSS && typeof window.CSS.escape === "function") {
    return window.CSS.escape(String(value));
  }
  return String(value).replaceAll("\"", "\\\"");
}

function getPaletteCards() {
  const cards = THEMES.map((theme) => ({
    id: theme.id,
    name: theme.name,
    note: theme.mood,
    colors: theme.palette
  }));
  if (state.preferences.customPalette.length) {
    cards.push({
      id: "custom",
      name: state.preferences.customPaletteName,
      note: "Custom palette",
      colors: state.preferences.customPalette
    });
  }
  return cards;
}

function getTheme(id = state.preferences.themeId) {
  return THEMES.find((theme) => theme.id === id) || THEMES[0];
}

function getTaskPaletteColors() {
  if (state.preferences.paletteId === "custom" && state.preferences.customPalette.length) {
    return state.preferences.customPalette;
  }
  const theme = THEMES.find((item) => item.id === state.preferences.paletteId);
  return (theme || getTheme()).palette;
}

function groupTemplates() {
  const folders = new Map();
  [...state.tasks]
    .sort((a, b) => `${a.folder}${a.category}${a.action}`.localeCompare(`${b.folder}${b.category}${b.action}`, localeTag()))
    .forEach((task) => {
      const folder = folders.get(task.folder) || { folder: task.folder, categories: new Map() };
      const category = folder.categories.get(task.category) || { name: task.category, tasks: [] };
      category.tasks.push(task);
      folder.categories.set(task.category, category);
      folders.set(task.folder, folder);
    });

  return [...folders.values()].map((folder) => ({
    folder: folder.folder,
    categories: [...folder.categories.values()]
  }));
}

function buildCategoryKey(folder, category) {
  return `${folder}::${category}`;
}

function hasCategory(folder, category) {
  return state.tasks.some((task) => task.folder === folder && task.category === category);
}

function getCategoryColor(folder, category) {
  const task = state.tasks.find((item) => item.folder === folder && item.category === category);
  return task?.color || getTaskPaletteColors()[0] || "#AFC7FF";
}

function setCategoryColor(folder, category, color) {
  state.tasks.forEach((task) => {
    if (task.folder === folder && task.category === category) {
      task.color = color;
    }
  });
}

function syncCategoryColors() {
  const palette = getTaskPaletteColors();
  const categories = new Map();
  let changed = false;

  state.tasks.forEach((task, index) => {
    const key = buildCategoryKey(task.folder, task.category);
    if (!categories.has(key)) {
      categories.set(key, task.color || palette[index % palette.length] || "#AFC7FF");
    }
  });

  state.tasks.forEach((task) => {
    const key = buildCategoryKey(task.folder, task.category);
    const color = categories.get(key) || palette[0] || "#AFC7FF";
    if (task.color !== color) {
      task.color = color;
      changed = true;
    }
  });

  if (changed) {
    saveState();
  }
}

function folderIcon(folder) {
  const lower = String(folder || "").toLowerCase();
  if (lower.includes("学") || lower.includes("study")) {
    return "📘";
  }
  if (lower.includes("生") || lower.includes("life")) {
    return "🏠";
  }
  if (lower.includes("工") || lower.includes("work")) {
    return "💼";
  }
  return "🗂";
}

function focusTasksLocationIfNeeded() {
  if (ui.activeView !== "tasks") {
    return;
  }

  const selectors = [
    ui.focusTaskId ? `[data-task-row="${escapeSelector(ui.focusTaskId)}"]` : "",
    ui.focusCategoryKey ? `[data-category-row="${escapeSelector(ui.focusCategoryKey)}"]` : "",
    ui.focusFolderName ? `[data-folder-row="${escapeSelector(ui.focusFolderName)}"]` : ""
  ].filter(Boolean);

  const target = selectors
    .map((selector) => refs.taskTree.querySelector(selector))
    .find(Boolean);

  if (target) {
    window.requestAnimationFrame(() => {
      target.scrollIntoView({ block: "center", behavior: "smooth" });
    });
  }
}

function createPlan({ title, taskId, date, startTime, durationMinutes, important, color = "" }) {
  return {
    id: uid("plan"),
    title,
    taskId,
    date,
    startTime,
    durationMinutes: durationMinutes || null,
    color,
    important: Boolean(important),
    completed: false,
    createdAt: new Date().toISOString()
  };
}

function findTask(taskId) {
  return state.tasks.find((task) => task.id === taskId) || null;
}

function findPlan(planId) {
  return state.plans.find((plan) => plan.id === planId) || null;
}

function isPlanRunning(plan) {
  return Boolean(state.activeSession && state.activeSession.planId === plan.id);
}

function getPlanStatus(plan) {
  if (isPlanRunning(plan)) {
    return "running";
  }
  if (!plan.startTime) {
    return "flexible";
  }
  if (!plan.completed && timeToMinutes(plan.startTime) < currentMinutes()) {
    return "overdue";
  }
  return "today";
}

function taskDisplayName(taskId) {
  const task = findTask(taskId);
  return task ? task.action : "";
}

function shortTag(item) {
  if (!item) {
    return "";
  }
  const task = item.taskId ? findTask(item.taskId) : null;
  if (task) {
    return task.category || task.action;
  }
  return "";
}

function getTaskColorByTaskId(taskId) {
  const task = findTask(taskId);
  return task ? getCategoryColor(task.folder, task.category) : "";
}

function getItemColor(item) {
  if (!item) {
    return getTaskPaletteColors()[0] || "#AFC7FF";
  }
  if (item.taskId) {
    return getTaskColorByTaskId(item.taskId) || getTaskPaletteColors()[0] || "#AFC7FF";
  }
  if (item.color) {
    return item.color;
  }
  return getTaskPaletteColors()[0] || "#AFC7FF";
}

function buildNextCardStyle(color) {
  const strong = hexToRgba(color, 0.24);
  const soft = hexToRgba(color, 0.12);
  return `background:linear-gradient(135deg, ${strong}, ${soft});border-color:${hexToRgba(color, 0.22)};`;
}

function buildTaskRowStyle(color) {
  return `background:${hexToRgba(color, 0.14)};border-color:${hexToRgba(color, 0.22)};color:${hexToRgba(getTheme().ink, 1)};`;
}

function sessionElapsedMs(session) {
  return session.segments.reduce((sum, segment) => {
    const start = new Date(segment.start).getTime();
    const end = segment.end ? new Date(segment.end).getTime() : nowTick;
    return sum + Math.max(end - start, 0);
  }, 0);
}

function isSessionPaused(session) {
  const last = session.segments[session.segments.length - 1];
  return Boolean(session.pausedAt || (last && last.end));
}

function entryDurationMinutes(entry) {
  return Math.max(Math.round((new Date(entry.end).getTime() - new Date(entry.start).getTime()) / 60000), 0);
}

function planDurationMinutes(plan) {
  if (!plan) {
    return null;
  }
  return parseMinutes(plan.durationMinutes);
}

function createdTime(item) {
  return new Date(item.createdAt || item.start || 0).getTime();
}

function deriveDurationMinutes(startTime, endTime) {
  if (!startTime || !endTime) {
    return null;
  }
  const diff = timeToMinutes(endTime) - timeToMinutes(startTime);
  return diff > 0 ? diff : null;
}

function parseMinutes(value) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) {
    return null;
  }
  return Math.round(number);
}

function timeToMinutes(value) {
  if (!value || !/^\d{2}:\d{2}$/.test(value)) {
    return 0;
  }
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function currentMinutes() {
  const now = new Date(nowTick);
  return now.getHours() * 60 + now.getMinutes();
}

function roundToFive(minutes) {
  return Math.round(minutes / 5) * 5;
}

function defaultStartTime() {
  return minutesToTime(roundToFive(currentMinutes()));
}

function defaultEndTime() {
  return minutesToTime(roundToFive(currentMinutes() + 30));
}

function dateKey(value) {
  const date = value instanceof Date ? value : new Date(value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatTime(value) {
  const date = new Date(value);
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function formatDurationClock(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((unit) => String(unit).padStart(2, "0")).join(":");
}

function humanizeMinutes(minutes) {
  const value = Math.max(Math.round(minutes || 0), 0);
  if (value < 60) {
    return `${value}鍒嗛挓`;
  }
  const hours = Math.floor(value / 60);
  const rest = value % 60;
  return rest ? `${hours}灏忔椂 ${rest}鍒嗛挓` : `${hours}灏忔椂`;
}

function weekdayLabel(date) {
  return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()];
}

function uniqueValues(values) {
  return [...new Set(values)];
}

function repairKnownText(value) {
  let text = String(value || "");
  TEXT_REPAIRS.forEach((replacement, source) => {
    text = text.replaceAll(source, replacement);
  });
  return text;
}

function dedupeById(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (!item || seen.has(item.id)) {
      return false;
    }
    seen.add(item.id);
    return true;
  });
}

function parseHexPalette(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter((item) => /^#?[0-9a-fA-F]{6}$/.test(item))
    .map((item) => item.startsWith("#") ? item.toUpperCase() : `#${item.toUpperCase()}`);
}

function hexToRgba(hex, alpha) {
  const normalized = String(hex || "").replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return `rgba(175, 199, 255, ${alpha})`;
  }
  const red = Number.parseInt(normalized.slice(0, 2), 16);
  const green = Number.parseInt(normalized.slice(2, 4), 16);
  const blue = Number.parseInt(normalized.slice(4, 6), 16);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function renderEmptyState(copy) {
  return `<div class="empty-state">${escapeHtml(copy)}</div>`;
}

function uid(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}











