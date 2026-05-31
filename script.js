(() => {
  "use strict";

  const STORAGE_KEY = "travelChecklistMvp.v1";

  const CATEGORY_ORDER = [
    { id: "essential", label: "忘れたくないもの" },
    { id: "today", label: "当日確認" },
    { id: "prepare", label: "前日までに準備" },
    { id: "tripType", label: "旅行タイプ別" },
    { id: "seasonWeather", label: "季節・天候別" },
    { id: "transport", label: "移動手段別" },
    { id: "convenient", label: "あると便利" },
    { id: "personal", label: "人によって必要" },
  ];

  const LABELS = {
    duration: {
      daytrip: "日帰り",
      oneNight: "1泊2日",
      twoNights: "2泊3日",
      longStay: "3泊以上",
    },
    types: {
      hotSpring: "温泉",
      tourism: "観光",
      themePark: "テーマパーク",
      concert: "ライブ遠征",
      homecoming: "帰省",
      business: "出張",
      overseas: "海外旅行",
    },
    seasons: {
      spring: "春",
      summer: "夏",
      autumn: "秋",
      winter: "冬",
    },
    transports: {
      train: "電車",
      car: "車",
      plane: "飛行機",
      bus: "高速バス",
    },
    companions: {
      solo: "一人",
      friends: "友人",
      couple: "カップル",
      family: "家族",
    },
    volume: {
      minimal: "最小限",
      standard: "標準",
      careful: "しっかり",
    },
  };

  const LEVELS_BY_VOLUME = {
    minimal: ["must"],
    standard: ["must", "standard"],
    careful: ["must", "standard", "careful"],
  };

  const createItem = (id, label, category, level) => ({
    id,
    label,
    category,
    level,
  });

  const ITEM_SETS = {
    base: [
      createItem("base-smartphone", "スマートフォン", "today", "must"),
      createItem("base-wallet", "財布・現金", "today", "must"),
      createItem("base-payment-card", "クレジットカード・交通系ICカード", "today", "standard"),
      createItem("base-home-key", "自宅の鍵", "today", "must"),
      createItem("base-reservation", "予約内容・チケットの確認", "today", "must"),
      createItem("base-weather", "天気予報と交通情報の確認", "today", "standard"),
      createItem("base-charge", "スマートフォンの充電", "prepare", "must"),
      createItem("base-clothes", "着替え", "prepare", "must"),
      createItem("base-underwear", "下着・靴下", "prepare", "must"),
      createItem("base-hygiene", "歯ブラシ・洗面用品", "prepare", "standard"),
      createItem("base-charger", "充電器・ケーブル", "prepare", "must"),
      createItem("base-route", "移動経路・集合時間の確認", "prepare", "standard"),
      createItem("base-handkerchief", "ハンカチ・ティッシュ", "convenient", "standard"),
      createItem("base-mobile-battery", "モバイルバッテリー", "convenient", "standard"),
      createItem("base-eco-bag", "エコバッグ", "convenient", "careful"),
      createItem("base-snack", "飲み物・軽食", "convenient", "careful"),
      createItem("base-mask", "マスク", "convenient", "careful"),
      createItem("base-medicine", "常備薬", "personal", "standard"),
      createItem("base-contact", "コンタクト・眼鏡", "personal", "standard"),
      createItem("base-cosmetics", "化粧品・スキンケア用品", "personal", "careful"),
    ],
    durations: {
      daytrip: [
        createItem("duration-daytrip-small-bag", "身軽に動ける小さめバッグ", "convenient", "careful"),
      ],
      oneNight: [
        createItem("duration-pajamas", "寝巻き", "prepare", "standard"),
        createItem("duration-laundry-bag", "使用済み衣類用の袋", "convenient", "careful"),
      ],
      twoNights: [
        createItem("duration-pajamas", "寝巻き", "prepare", "standard"),
        createItem("duration-laundry-bag", "使用済み衣類用の袋", "convenient", "standard"),
        createItem("duration-extra-clothes", "予備の着替え", "prepare", "careful"),
      ],
      longStay: [
        createItem("duration-pajamas", "寝巻き", "prepare", "standard"),
        createItem("duration-laundry-bag", "使用済み衣類用の袋", "convenient", "standard"),
        createItem("duration-extra-clothes", "予備の着替え", "prepare", "standard"),
        createItem("duration-laundry-kit", "洗濯用品", "convenient", "careful"),
        createItem("duration-baggage-space", "帰りのお土産スペース", "convenient", "careful"),
      ],
    },
    types: {
      hotSpring: [
        createItem("type-hot-spring-towel", "温泉用タオル", "tripType", "standard"),
        createItem("type-hot-spring-hair-tie", "ヘアゴム", "tripType", "standard"),
        createItem("type-hot-spring-skin-care", "入浴後のスキンケア用品", "tripType", "careful"),
      ],
      tourism: [
        createItem("type-tourism-walking-shoes", "歩きやすい靴", "tripType", "must"),
        createItem("type-tourism-map", "観光ルート・地図", "tripType", "standard"),
        createItem("type-tourism-camera", "カメラ", "tripType", "careful"),
      ],
      themePark: [
        createItem("type-theme-ticket", "入園チケット・アプリの確認", "tripType", "must"),
        createItem("type-theme-mobile-battery", "大容量モバイルバッテリー", "tripType", "standard"),
        createItem("type-theme-rain-gear", "折りたたみ傘・レインコート", "tripType", "careful"),
        createItem("type-theme-seat", "折りたたみクッション", "tripType", "careful"),
      ],
      concert: [
        createItem("type-concert-ticket", "ライブチケット・入場用アプリ", "tripType", "must"),
        createItem("type-concert-id", "本人確認書類", "tripType", "must"),
        createItem("type-concert-goods", "ペンライト・応援グッズ", "tripType", "standard"),
        createItem("type-concert-battery", "ペンライト用の予備電池", "tripType", "careful"),
      ],
      homecoming: [
        createItem("type-homecoming-gift", "手土産", "tripType", "standard"),
        createItem("type-homecoming-key", "実家の鍵・連絡先", "tripType", "careful"),
      ],
      business: [
        createItem("type-business-pc", "仕事用PC・タブレット", "tripType", "must"),
        createItem("type-business-pc-charger", "PC用充電器", "tripType", "must"),
        createItem("type-business-material", "名刺・必要資料", "tripType", "standard"),
        createItem("type-business-wear", "仕事用の服・靴", "tripType", "standard"),
      ],
      overseas: [
        createItem("type-overseas-passport", "パスポート", "tripType", "must"),
        createItem("type-overseas-ticket", "航空券・eチケット", "tripType", "must"),
        createItem("type-overseas-insurance", "海外旅行保険の控え", "tripType", "standard"),
        createItem("type-overseas-adapter", "変換プラグ・変圧器", "tripType", "standard"),
        createItem("type-overseas-currency", "現地通貨・海外対応カード", "tripType", "standard"),
        createItem("type-overseas-sim", "通信手段の確認", "tripType", "careful"),
      ],
    },
    seasons: {
      spring: [
        createItem("season-spring-layer", "羽織れる上着", "seasonWeather", "standard"),
        createItem("season-spring-pollen", "花粉対策用品", "seasonWeather", "careful"),
      ],
      summer: [
        createItem("season-summer-sun", "日焼け止め", "seasonWeather", "must"),
        createItem("season-summer-heat", "帽子・暑さ対策用品", "seasonWeather", "standard"),
        createItem("season-summer-towel", "汗拭きタオル", "seasonWeather", "careful"),
      ],
      autumn: [
        createItem("season-autumn-layer", "気温差に備える上着", "seasonWeather", "standard"),
      ],
      winter: [
        createItem("season-winter-warm", "防寒着・手袋", "seasonWeather", "must"),
        createItem("season-winter-warmer", "カイロ", "seasonWeather", "careful"),
      ],
    },
    rain: [
      createItem("weather-rain-umbrella", "折りたたみ傘", "seasonWeather", "must"),
      createItem("weather-rain-bag", "濡れた物を入れる袋", "seasonWeather", "standard"),
      createItem("weather-rain-shoes", "雨に強い靴・替えの靴下", "seasonWeather", "careful"),
    ],
    transports: {
      train: [
        createItem("transport-train-ic", "交通系ICカードの残高確認", "transport", "must"),
        createItem("transport-train-route", "乗換案内の確認", "transport", "standard"),
      ],
      car: [
        createItem("transport-car-license", "運転免許証", "transport", "must"),
        createItem("transport-car-fuel", "ガソリン・充電残量の確認", "transport", "standard"),
        createItem("transport-car-etc", "ETCカード", "transport", "standard"),
      ],
      plane: [
        createItem("transport-plane-ticket", "搭乗券・予約番号", "transport", "must"),
        createItem("transport-plane-id", "本人確認書類", "transport", "must"),
        createItem("transport-plane-baggage", "手荷物サイズ・重量の確認", "transport", "standard"),
      ],
      bus: [
        createItem("transport-bus-ticket", "乗車券・予約画面", "transport", "must"),
        createItem("transport-bus-neck-pillow", "ネックピロー", "transport", "careful"),
      ],
    },
    companions: {
      solo: [
        createItem("companion-solo-emergency", "緊急連絡先の共有", "personal", "careful"),
      ],
      friends: [
        createItem("companion-friends-schedule", "集合場所・時間の共有", "personal", "standard"),
      ],
      couple: [
        createItem("companion-couple-reservation", "予約内容の共有", "personal", "standard"),
      ],
      family: [
        createItem("companion-family-kids", "子どもの着替え・おやつ", "personal", "standard"),
        createItem("companion-family-medicine", "家族分の薬・保険証", "personal", "standard"),
      ],
    },
  };

  const initialConditions = () => ({
    duration: "",
    types: [],
    seasons: [],
    rain: false,
    transports: [],
    companions: [],
    volume: "standard",
  });

  const createInitialState = () => ({
    version: 1,
    conditions: initialConditions(),
    generatedItems: [],
    customItems: [],
  });

  const state = createInitialState();
  let pendingSavedState = null;

  const elements = {
    resumePanel: document.querySelector("#resumePanel"),
    resumeButton: document.querySelector("#resumeButton"),
    newButton: document.querySelector("#newButton"),
    conditionForm: document.querySelector("#conditionForm"),
    advancedConditions: document.querySelector("#advancedConditions"),
    formError: document.querySelector("#formError"),
    checklistSection: document.querySelector("#checklistSection"),
    conditionSummary: document.querySelector("#conditionSummary"),
    conditionDetails: document.querySelector("#conditionDetails"),
    progressText: document.querySelector("#progressText"),
    progressBar: document.querySelector("#progressBar"),
    progressTrack: document.querySelector(".progress-track"),
    remainingText: document.querySelector("#remainingText"),
    categoryProgress: document.querySelector("#categoryProgress"),
    categoryList: document.querySelector("#categoryList"),
    customItemForm: document.querySelector("#customItemForm"),
    customItemInput: document.querySelector("#customItemInput"),
    customError: document.querySelector("#customError"),
    copyButton: document.querySelector("#copyButton"),
    lineShareButton: document.querySelector("#lineShareButton"),
    clearButton: document.querySelector("#clearButton"),
    actionMessage: document.querySelector("#actionMessage"),
  };

  const selectedValues = (name) =>
    Array.from(elements.conditionForm.querySelectorAll(`[name="${name}"]:checked`)).map(
      (input) => input.value,
    );

  const selectedValue = (name) => {
    const input = elements.conditionForm.querySelector(`[name="${name}"]:checked`);
    return input ? input.value : "";
  };

  const readConditionsFromForm = () => ({
    duration: selectedValue("duration"),
    types: selectedValues("types"),
    seasons: selectedValues("seasons"),
    rain: selectedValues("rain").includes("rain"),
    transports: selectedValues("transports"),
    companions: selectedValues("companions"),
    volume: selectedValue("volume") || "standard",
  });

  const replaceState = (nextState) => {
    state.version = 1;
    state.conditions = nextState.conditions;
    state.generatedItems = nextState.generatedItems;
    state.customItems = nextState.customItems;
  };

  const setCheckedValues = (name, values) => {
    const selected = new Set(values);
    elements.conditionForm.querySelectorAll(`[name="${name}"]`).forEach((input) => {
      input.checked = selected.has(input.value);
    });
  };

  const applyConditionsToForm = (conditions) => {
    setCheckedValues("duration", conditions.duration ? [conditions.duration] : []);
    setCheckedValues("types", conditions.types);
    setCheckedValues("seasons", conditions.seasons);
    setCheckedValues("rain", conditions.rain ? ["rain"] : []);
    setCheckedValues("transports", conditions.transports);
    setCheckedValues("companions", conditions.companions);
    setCheckedValues("volume", [conditions.volume || "standard"]);

    const hasAdvancedSelection =
      conditions.seasons.length > 0 ||
      conditions.rain ||
      conditions.transports.length > 0 ||
      conditions.companions.length > 0 ||
      conditions.volume !== "standard";
    elements.advancedConditions.open = hasAdvancedSelection;
  };

  const addSetItems = (list, source) => {
    if (Array.isArray(source)) {
      list.push(...source);
    }
  };

  const buildGeneratedItems = (conditions) => {
    const candidates = [];
    addSetItems(candidates, ITEM_SETS.base);
    addSetItems(candidates, ITEM_SETS.durations[conditions.duration]);
    conditions.types.forEach((type) => addSetItems(candidates, ITEM_SETS.types[type]));
    conditions.seasons.forEach((season) => addSetItems(candidates, ITEM_SETS.seasons[season]));
    if (conditions.rain) {
      addSetItems(candidates, ITEM_SETS.rain);
    }
    conditions.transports.forEach((transport) =>
      addSetItems(candidates, ITEM_SETS.transports[transport]),
    );
    conditions.companions.forEach((companion) =>
      addSetItems(candidates, ITEM_SETS.companions[companion]),
    );

    return Array.from(new Map(candidates.map((item) => [item.id, item])).values());
  };

  const getVisibleItems = () => {
    const allowedLevels = new Set(LEVELS_BY_VOLUME[state.conditions.volume] || LEVELS_BY_VOLUME.standard);
    const generatedItems = state.generatedItems.filter((item) => allowedLevels.has(item.level));
    return [...state.customItems, ...generatedItems];
  };

  const getItemsByCategory = () => {
    const itemMap = new Map(CATEGORY_ORDER.map((category) => [category.id, []]));
    getVisibleItems().forEach((item) => {
      if (itemMap.has(item.category)) {
        itemMap.get(item.category).push(item);
      }
    });
    return itemMap;
  };

  const formatSummary = () => {
    const duration = LABELS.duration[state.conditions.duration] || "";
    const types = state.conditions.types.map((type) => LABELS.types[type]).filter(Boolean);
    return `${duration} / ${types.join("・")}`;
  };

  const formatDetails = () => {
    const details = [
      ...state.conditions.seasons.map((season) => LABELS.seasons[season]),
      ...(state.conditions.rain ? ["雨の日"] : []),
      ...state.conditions.transports.map((transport) => LABELS.transports[transport]),
      ...state.conditions.companions.map((companion) => LABELS.companions[companion]),
      `表示量: ${LABELS.volume[state.conditions.volume] || LABELS.volume.standard}`,
    ].filter(Boolean);
    return `詳細: ${details.join("・")}`;
  };

  const saveState = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Keep the checklist usable when storage is restricted by the browser.
    }
  };

  const isValidItem = (item) =>
    item &&
    typeof item.id === "string" &&
    typeof item.label === "string" &&
    typeof item.category === "string" &&
    typeof item.level === "string";

  const normalizeItem = (item) => ({
    id: item.id,
    label: item.label,
    category: item.category,
    level: item.level,
    checked: Boolean(item.checked),
  });

  const normalizeConditions = (conditions) => {
    const defaults = initialConditions();
    const source = conditions && typeof conditions === "object" ? conditions : {};
    return {
      duration: typeof source.duration === "string" ? source.duration : defaults.duration,
      types: Array.isArray(source.types) ? source.types.filter((value) => typeof value === "string") : [],
      seasons: Array.isArray(source.seasons)
        ? source.seasons.filter((value) => typeof value === "string")
        : [],
      rain: Boolean(source.rain),
      transports: Array.isArray(source.transports)
        ? source.transports.filter((value) => typeof value === "string")
        : [],
      companions: Array.isArray(source.companions)
        ? source.companions.filter((value) => typeof value === "string")
        : [],
      volume: Object.prototype.hasOwnProperty.call(LEVELS_BY_VOLUME, source.volume)
        ? source.volume
        : defaults.volume,
    };
  };

  const loadSavedState = () => {
    try {
      const rawState = localStorage.getItem(STORAGE_KEY);
      if (!rawState) {
        return null;
      }
      const savedState = JSON.parse(rawState);
      if (
        savedState.version !== 1 ||
        !Array.isArray(savedState.generatedItems) ||
        savedState.generatedItems.length === 0 ||
        !Array.isArray(savedState.customItems)
      ) {
        return null;
      }
      return {
        version: 1,
        conditions: normalizeConditions(savedState.conditions),
        generatedItems: savedState.generatedItems.filter(isValidItem).map(normalizeItem),
        customItems: savedState.customItems.filter(isValidItem).map(normalizeItem),
      };
    } catch {
      return null;
    }
  };

  const findItem = (itemId) =>
    [...state.customItems, ...state.generatedItems].find((item) => item.id === itemId);

  const renderProgress = () => {
    const visibleItems = getVisibleItems();
    const completedCount = visibleItems.filter((item) => item.checked).length;
    const totalCount = visibleItems.length;
    const remainingCount = totalCount - completedCount;
    const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

    elements.progressText.textContent = `${completedCount} / ${totalCount}`;
    elements.remainingText.textContent =
      remainingCount === 0 ? "準備完了です。" : `残り ${remainingCount} 件です。`;
    elements.progressBar.style.width = `${progress}%`;
    elements.progressTrack.setAttribute("aria-valuenow", String(progress));

    elements.categoryProgress.replaceChildren();
    const itemsByCategory = getItemsByCategory();
    CATEGORY_ORDER.forEach((category) => {
      const items = itemsByCategory.get(category.id);
      if (items.length === 0) {
        return;
      }
      const remaining = items.filter((item) => !item.checked).length;
      const chip = document.createElement("span");
      chip.className = "progress-chip";
      chip.textContent = `${category.label}: 残り${remaining}`;
      elements.categoryProgress.append(chip);
    });
  };

  const renderCategoryList = () => {
    const itemsByCategory = getItemsByCategory();
    elements.categoryList.replaceChildren();

    CATEGORY_ORDER.forEach((category) => {
      const items = itemsByCategory.get(category.id);
      if (items.length === 0 && category.id !== "essential") {
        return;
      }

      const card = document.createElement("section");
      card.className = "category-card";

      const header = document.createElement("header");
      header.className = "category-header";
      const title = document.createElement("h3");
      title.className = "category-title";
      title.textContent = category.label;
      const remaining = document.createElement("span");
      remaining.className = "category-remaining";
      const remainingCount = items.filter((item) => !item.checked).length;
      remaining.textContent = `残り ${remainingCount} 件`;
      header.append(title, remaining);
      card.append(header);

      if (items.length === 0) {
        const emptyNote = document.createElement("p");
        emptyNote.className = "empty-note";
        emptyNote.textContent = "追加した項目がここに表示されます。";
        card.append(emptyNote);
      }

      items.forEach((item) => {
        const row = document.createElement("div");
        row.className = `checklist-row${item.checked ? " is-checked" : ""}`;

        const label = document.createElement("label");
        label.className = "checklist-label";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = Boolean(item.checked);
        checkbox.dataset.itemId = item.id;
        checkbox.addEventListener("change", handleToggleItem);
        const text = document.createElement("span");
        text.className = "item-text";
        text.textContent = item.label;
        label.append(checkbox, text);
        row.append(label);

        if (item.id.startsWith("custom-")) {
          const deleteButton = document.createElement("button");
          deleteButton.className = "delete-button";
          deleteButton.type = "button";
          deleteButton.dataset.itemId = item.id;
          deleteButton.textContent = "削除";
          deleteButton.setAttribute("aria-label", `${item.label}を削除`);
          deleteButton.addEventListener("click", handleDeleteCustomItem);
          row.append(deleteButton);
        }

        card.append(row);
      });

      elements.categoryList.append(card);
    });
  };

  const getShareItems = () => {
    const allowedLevels = new Set(LEVELS_BY_VOLUME[state.conditions.volume] || LEVELS_BY_VOLUME.standard);
    const visibleGeneratedItems = state.generatedItems.filter((item) => allowedLevels.has(item.level));
    const focusCategories = ["today", "prepare", "tripType"];
    const sharedItems = [];
    const usedIds = new Set();

    focusCategories.forEach((category) => {
      visibleGeneratedItems
        .filter((item) => item.category === category)
        .slice(0, 4)
        .forEach((item) => {
          sharedItems.push(item);
          usedIds.add(item.id);
        });
    });

    visibleGeneratedItems.forEach((item) => {
      if (
        sharedItems.length < 12 &&
        focusCategories.includes(item.category) &&
        !usedIds.has(item.id)
      ) {
        sharedItems.push(item);
        usedIds.add(item.id);
      }
    });

    return sharedItems.slice(0, 12);
  };

  const buildLineShareText = () => {
    const lines = [
      "旅行持ち物チェックリスト",
      formatSummary(),
      "",
      "確認したい持ち物",
      ...getShareItems().map((item) => `・${item.label}`),
      "",
      "忘れ物がないか確認しよう。",
    ];
    return lines.join("\n");
  };

  const updateLineShareUrl = () => {
    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(buildLineShareText())}`;
    elements.lineShareButton.href = lineUrl;
  };

  const renderChecklist = () => {
    elements.conditionSummary.textContent = formatSummary();
    elements.conditionDetails.textContent = formatDetails();
    renderProgress();
    renderCategoryList();
    updateLineShareUrl();
    elements.checklistSection.hidden = false;
  };

  const handleGenerateChecklist = (event) => {
    event.preventDefault();
    const conditions = readConditionsFromForm();
    if (!conditions.duration || conditions.types.length === 0) {
      elements.formError.textContent = "旅行日数と旅行タイプを選択してください。";
      elements.formError.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const checkedStates = new Map(
      [...state.generatedItems, ...state.customItems].map((item) => [item.id, Boolean(item.checked)]),
    );
    const generatedItems = buildGeneratedItems(conditions).map((item) => ({
      ...item,
      checked: checkedStates.get(item.id) || false,
    }));

    state.conditions = conditions;
    state.generatedItems = generatedItems;
    state.customItems.forEach((item) => {
      item.checked = checkedStates.get(item.id) || false;
    });

    elements.formError.textContent = "";
    elements.actionMessage.textContent = "";
    saveState();
    renderChecklist();
    elements.checklistSection.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  function handleToggleItem(event) {
    const item = findItem(event.currentTarget.dataset.itemId);
    if (!item) {
      return;
    }
    item.checked = event.currentTarget.checked;
    saveState();
    renderChecklist();
  }

  const handleAddCustomItem = (event) => {
    event.preventDefault();
    const label = elements.customItemInput.value.trim();
    if (!label) {
      elements.customError.textContent = "追加する持ち物を入力してください。";
      elements.customItemInput.focus();
      return;
    }

    const uniqueId =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    state.customItems.push({
      id: `custom-${uniqueId}`,
      label,
      category: "essential",
      level: "must",
      checked: false,
    });
    elements.customItemInput.value = "";
    elements.customError.textContent = "";
    saveState();
    renderChecklist();
  };

  function handleDeleteCustomItem(event) {
    const itemId = event.currentTarget.dataset.itemId;
    state.customItems = state.customItems.filter((item) => item.id !== itemId);
    saveState();
    renderChecklist();
  }

  const handleClearChecks = () => {
    [...state.customItems, ...state.generatedItems].forEach((item) => {
      item.checked = false;
    });
    saveState();
    renderChecklist();
    elements.actionMessage.textContent = "すべてのチェックを解除しました。";
  };

  const buildCopyText = () => {
    const lines = ["旅行持ち物チェックリスト", formatSummary(), formatDetails(), ""];
    const itemsByCategory = getItemsByCategory();
    CATEGORY_ORDER.forEach((category) => {
      const items = itemsByCategory.get(category.id);
      if (items.length === 0) {
        return;
      }
      lines.push(`【${category.label}】`);
      items.forEach((item) => {
        lines.push(`- [${item.checked ? "x" : " "}] ${item.label}`);
      });
      lines.push("");
    });
    return lines.join("\n").trim();
  };

  const fallbackCopy = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.append(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    if (!copied) {
      throw new Error("copy failed");
    }
  };

  const handleCopy = async () => {
    const text = buildCopyText();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        fallbackCopy(text);
      }
      elements.actionMessage.textContent = "コピーしました。";
    } catch {
      elements.actionMessage.textContent =
        "コピーできませんでした。ブラウザの設定をご確認ください。";
    }
  };

  const resetApp = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // The visible reset should still work when storage is restricted.
    }
    replaceState(createInitialState());
    pendingSavedState = null;
    elements.conditionForm.reset();
    elements.advancedConditions.open = false;
    elements.resumePanel.hidden = true;
    elements.checklistSection.hidden = true;
    elements.formError.textContent = "";
    elements.customError.textContent = "";
    elements.actionMessage.textContent = "";
  };

  const handleResume = () => {
    if (!pendingSavedState) {
      return;
    }
    replaceState(pendingSavedState);
    applyConditionsToForm(state.conditions);
    elements.resumePanel.hidden = true;
    renderChecklist();
    elements.checklistSection.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const initialize = () => {
    elements.conditionForm.addEventListener("submit", handleGenerateChecklist);
    elements.customItemForm.addEventListener("submit", handleAddCustomItem);
    elements.copyButton.addEventListener("click", handleCopy);
    elements.clearButton.addEventListener("click", handleClearChecks);
    elements.resumeButton.addEventListener("click", handleResume);
    elements.newButton.addEventListener("click", resetApp);

    pendingSavedState = loadSavedState();
    if (pendingSavedState) {
      elements.resumePanel.hidden = false;
    }
  };

  initialize();
})();
