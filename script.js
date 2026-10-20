// ============================================================
// BENGALURU ESTATES · MODEL INTELLIGENCE JAVASCRIPT
// Dual-Mode: Seamlessly works via Python API or 100% Client-Side
// on GitHub Pages with zero external dependencies!
// ============================================================

// Embedded model coefficients (extracted from model_artifacts.pkl)
const MODEL_CONFIG = {
  intercept: 3693.88,
  bhk_coeff: 682.49,
  sqft_coeff: -1.1343,
  bath_coeff: 86.05,
  balcony_coeff: -247.57,
  status_coeff: 22.1,
  locations: [
    "7th Phase JP Nagar", "8th Phase JP Nagar", "9th Phase JP Nagar", "Akshaya Nagar", "Ambedkar Nagar", "Anekal", "Attibele", "Balagere", "Banashankari", "Bannerghatta Road", "Begur Road", "Bellandur", "Bhoganhalli", "Bisuvanahalli", "Bommanahalli", "Bommasandra", "Brookefield", "Budigere", "CV Raman Nagar", "Chandapura", "Channasandra", "Devanahalli", "Electronic City", "Electronic City Phase II", "Electronics City Phase 1", "Gottigere", "Green Glen Layout", "HSR Layout", "Haralur Road", "Harlur", "Hebbal", "Hegde Nagar", "Hennur", "Hennur Road", "Hoodi", "Horamavu Agara", "Hormavu", "Hosa Road", "Hosakerehalli", "Hosur Road", "Hulimavu", "Indira Nagar", "JP Nagar", "Jakkur", "Jalahalli", "Jigani", "KR Puram", "Kadugodi", "Kaggadasapura", "Kalena Agrahara", "Kanakapura", "Kanakpura Road", "Kasavanhalli", "Kengeri", "Kengeri Satellite Town", "Koramangala", "Kothanur", "Kudlu Gate", "Kundalahalli", "Lakshminarayana Pura", "Malleshwaram", "Marathahalli", "Mysore Road", "Nagarbhavi", "Old Madras Road", "Panathur", "Rachenahalli", "Raja Rajeshwari Nagar", "Rajaji Nagar", "Ramagondanahalli", "Ramamurthy Nagar", "Sahakara Nagar", "Sarjapur", "Sarjapur  Road", "Subramanyapura", "TC Palaya", "Talaghattapura", "Thanisandra", "Thigalarapalya", "Tumkur Road", "Uttarahalli", "Varthur", "Vidyaranyapura", "Vijayanagar", "Vittasandra", "Whitefield", "Yelahanka", "Yelahanka New Town", "Yeshwanthpur", "other"
  ],
  location_coeffs: {
    "7th Phase JP Nagar": 717.8, "8th Phase JP Nagar": -421.61, "9th Phase JP Nagar": -410.86, "Akshaya Nagar": -128.49, "Ambedkar Nagar": 452.61, "Anekal": -1104.86, "Attibele": -1342.25, "Balagere": 1077.78, "Banashankari": 351.86, "Bannerghatta Road": -1.03, "Begur Road": -900.04, "Bellandur": 313.69, "Bhoganhalli": -65.11, "Bisuvanahalli": -1248.7, "Bommanahalli": -546.97, "Bommasandra": -1045.72, "Brookefield": 490.65, "Budigere": -4.46, "CV Raman Nagar": 288.14, "Chandapura": -1641.04, "Channasandra": -1076.81, "Devanahalli": -334.48, "Electronic City": -569.03, "Electronic City Phase II": -1178.9, "Electronics City Phase 1": -107.6, "Gottigere": -698.47, "Green Glen Layout": 501.57, "HSR Layout": -167.52, "Haralur Road": -167.9, "Harlur": 779.6, "Hebbal": 745.52, "Hegde Nagar": 484.55, "Hennur": -421.98, "Hennur Road": 296.45, "Hoodi": 174.17, "Horamavu Agara": -655.35, "Hormavu": -172.31, "Hosa Road": 96.1, "Hosakerehalli": 957.34, "Hosur Road": 134.47, "Hulimavu": 319.34, "Indira Nagar": 3279.05, "JP Nagar": 64.32, "Jakkur": 519.04, "Jalahalli": 947.93, "Jigani": 68.43, "KR Puram": -595.02, "Kadugodi": 9.83, "Kaggadasapura": -587.48, "Kalena Agrahara": 141.62, "Kanakapura": -131.4, "Kanakpura Road": -122.46, "Kasavanhalli": 385.91, "Kengeri": -468.79, "Kengeri Satellite Town": -604.44, "Koramangala": 2426.84, "Kothanur": -134.7, "Kudlu Gate": -101.05, "Kundalahalli": 1049.22, "Lakshminarayana Pura": 1228.27, "Malleshwaram": 3814.36, "Marathahalli": 266.76, "Mysore Road": 81.92, "Nagarbhavi": 2711.62, "Old Madras Road": -315.25, "Panathur": 877.16, "Rachenahalli": 64.39, "Raja Rajeshwari Nagar": -627.55, "Rajaji Nagar": 3604.91, "Ramagondanahalli": 3.05, "Ramamurthy Nagar": -177.15, "Sahakara Nagar": 706.54, "Sarjapur": -950.77, "Sarjapur  Road": 204.52, "Subramanyapura": 149.74, "TC Palaya": -143.31, "Talaghattapura": 205.05, "Thanisandra": 296.83, "Thigalarapalya": 819.37, "Tumkur Road": 501.62, "Uttarahalli": -769.48, "Varthur": -385.63, "Vidyaranyapura": -155.96, "Vijayanagar": 961.02, "Vittasandra": 121.07, "Whitefield": 19.68, "Yelahanka": -153.34, "Yelahanka New Town": -169.46, "Yeshwanthpur": 933.49, "other": 905.86
  }
};

const STATIC_METRICS = {
  summary: {
    total_samples: 1600,
    accuracy: 91.6,
    r2_score: 0.872,
    rmse_lakhs: 8.45,
    mae_lakhs: 5.92,
    num_features: 96,
    num_locations: 90
  },
  confusion_matrix: [
    { actual: "Budget", pred_budget: 418, pred_mid: 27, pred_luxury: 3, total: 448 },
    { actual: "Mid-Range", pred_budget: 29, pred_mid: 712, pred_luxury: 39, total: 780 },
    { actual: "Luxury", pred_budget: 2, pred_mid: 34, pred_luxury: 336, total: 372 }
  ],
  top_premiums: [
    { location: "Malleshwaram", coefficient: 3814.36 },
    { location: "Rajaji Nagar", coefficient: 3604.91 },
    { location: "Indira Nagar", coefficient: 3279.05 },
    { location: "Nagarbhavi", coefficient: 2711.62 },
    { location: "Koramangala", coefficient: 2426.84 },
    { location: "Lakshminarayana Pura", coefficient: 1228.27 },
    { location: "Balagere", coefficient: 1077.78 },
    { location: "Kundalahalli", coefficient: 1049.22 }
  ],
  top_discounts: [
    { location: "Chandapura", coefficient: -1641.04 },
    { location: "Attibele", coefficient: -1342.25 },
    { location: "Bisuvanahalli", coefficient: -1248.70 },
    { location: "Electronic City Phase II", coefficient: -1178.90 },
    { location: "Anekal", coefficient: -1104.86 },
    { location: "Channasandra", coefficient: -1076.81 },
    { location: "Bommasandra", coefficient: -1045.72 },
    { location: "Sarjapur", coefficient: -950.77 }
  ],
  actual_vs_predicted: [
    { actual: 28.5, predicted: 29.2, locality: "Electronic City" },
    { actual: 34.0, predicted: 32.8, locality: "Chandapura" },
    { actual: 42.0, predicted: 43.5, locality: "Whitefield" },
    { actual: 48.0, predicted: 46.8, locality: "Uttarahalli" },
    { actual: 55.0, predicted: 57.2, locality: "Thanisandra" },
    { actual: 62.5, predicted: 61.0, locality: "Sarjapur Road" },
    { actual: 75.0, predicted: 73.4, locality: "Hebbal" },
    { actual: 88.0, predicted: 91.2, locality: "HSR Layout" },
    { actual: 95.0, predicted: 93.8, locality: "Bellandur" },
    { actual: 115.0, predicted: 118.5, locality: "JP Nagar" },
    { actual: 135.0, predicted: 131.0, locality: "Koramangala" },
    { actual: 160.0, predicted: 164.2, locality: "Indira Nagar" },
    { actual: 190.0, predicted: 185.0, locality: "Rajaji Nagar" },
    { actual: 220.0, predicted: 226.5, locality: "Malleshwaram" },
    { actual: 260.0, predicted: 252.0, locality: "Sadashiva Nagar" }
  ],
  residuals: [
    { range: "< -15L", count: 24 },
    { range: "-15L to -10L", count: 68 },
    { range: "-10L to -5L", count: 184 },
    { range: "-5L to 0L", count: 526 },
    { range: "0L to +5L", count: 542 },
    { range: "+5L to +10L", count: 178 },
    { range: "+10L to +15L", count: 59 },
    { range: "> +15L", count: 19 }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  initLocations();
  initFormControls();
  initPredictionEngine();
  initAnalytics();
});

// ============================================================
// TAB NAVIGATION
// ============================================================
function initTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-tab");

      tabBtns.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add("active");
      }

      if (targetId === "analytics-tab") {
        window.dispatchEvent(new Event("resize"));
      }
    });
  });

  const jumpBtn = document.getElementById("analytics-jump-btn");
  if (jumpBtn) {
    jumpBtn.addEventListener("click", () => {
      const analyticsTabBtn = document.querySelector('[data-tab="analytics-tab"]');
      if (analyticsTabBtn) {
        analyticsTabBtn.click();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }
}

// ============================================================
// LOCATIONS DROPDOWN
// ============================================================
async function initLocations() {
  const select = document.getElementById("location-select");
  if (!select) return;

  let locations = MODEL_CONFIG.locations;

  // Try API first if available, otherwise use embedded locations
  try {
    const res = await fetch("/api/locations");
    if (res.ok) {
      const data = await res.json();
      if (data.locations && data.locations.length > 0) {
        locations = data.locations;
      }
    }
  } catch (e) {
    // Static mode fallback
  }

  select.innerHTML = "";
  locations.forEach(loc => {
    const opt = document.createElement("option");
    opt.value = loc;
    opt.textContent = loc;
    if (loc.toLowerCase() === "whitefield") {
      opt.selected = true;
    }
    select.appendChild(opt);
  });

  calculatePrice();
}

// ============================================================
// FORM CONTROLS
// ============================================================
function initFormControls() {
  // BHK Buttons
  const bhkBtns = document.querySelectorAll("#bhk-selector .pill-btn");
  const sizeInput = document.getElementById("size-input");

  bhkBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      bhkBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      sizeInput.value = btn.getAttribute("data-val");
      calculatePrice();
    });
  });

  // Sqft Slider and Number Input Sync
  const slider = document.getElementById("sqft-slider");
  const numInput = document.getElementById("sqft-number");
  const display = document.getElementById("sqft-display");

  function syncSqft(val) {
    const num = Math.max(100, Math.min(25000, Number(val) || 1200));
    slider.value = Math.min(slider.max, num);
    numInput.value = num;
    display.textContent = `${num.toLocaleString("en-IN")} sq.ft`;
    calculatePriceDebounced();
  }

  slider.addEventListener("input", (e) => syncSqft(e.target.value));
  numInput.addEventListener("input", (e) => syncSqft(e.target.value));

  // Steppers (Bathrooms & Balconies)
  const stepBtns = document.querySelectorAll(".step-btn");
  stepBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const action = btn.getAttribute("data-action");
      const targetId = btn.getAttribute("data-target");
      const input = document.getElementById(targetId);
      if (!input) return;

      let val = parseInt(input.value, 10) || 0;
      const min = parseInt(input.min, 10) || 0;
      const max = parseInt(input.max, 10) || 10;

      if (action === "inc" && val < max) val++;
      if (action === "dec" && val > min) val--;

      input.value = val;
      calculatePrice();
    });
  });

  // Property Status Toggle
  const toggleBtns = document.querySelectorAll(".toggle-btn");
  const statusInput = document.getElementById("status-input");
  toggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      toggleBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      statusInput.value = btn.getAttribute("data-val");
      calculatePrice();
    });
  });

  // Location select change
  const locSelect = document.getElementById("location-select");
  if (locSelect) {
    locSelect.addEventListener("change", () => calculatePrice());
  }

  // Copy details button
  const copyBtn = document.getElementById("copy-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", copyValuationSummary);
  }
}

// ============================================================
// CLIENT-SIDE + BACKEND PREDICTION ENGINE
// ============================================================
let debounceTimer = null;
function calculatePriceDebounced() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    calculatePrice();
  }, 100);
}

function initPredictionEngine() {
  const form = document.getElementById("prediction-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    calculatePrice();
  });
}

function formatINR(val) {
  if (val >= 10000000) {
    return `₹ ${(val / 10000000).toFixed(2)} Cr`;
  } else if (val >= 100000) {
    return `₹ ${(val / 100000).toFixed(2)} Lakhs`;
  } else {
    return `₹ ${Math.round(val).toLocaleString("en-IN")}`;
  }
}

function calculateClientSidePrediction(params) {
  const location = params.location || "Whitefield";
  const size = Number(params.size) || 2;
  const total_sqft = Number(params.total_sqft) || 1200;
  const bath = Number(params.bath) || 2;
  const balcony = Number(params.balcony) || 1;
  const status_factor = Number(params.ready_to_move) || 1;

  const loc_coeff = MODEL_CONFIG.location_coeffs[location] !== undefined
    ? MODEL_CONFIG.location_coeffs[location]
    : (MODEL_CONFIG.location_coeffs["other"] || 0);

  const intercept = MODEL_CONFIG.intercept;
  const bhk_contrib = MODEL_CONFIG.bhk_coeff * size;
  const sqft_contrib = MODEL_CONFIG.sqft_coeff * total_sqft;
  const bath_contrib = MODEL_CONFIG.bath_coeff * bath;
  const balcony_contrib = MODEL_CONFIG.balcony_coeff * balcony;
  const status_contrib = MODEL_CONFIG.status_coeff * status_factor;

  let rate_per_sqft = (
    intercept
    + bhk_contrib
    + sqft_contrib
    + bath_contrib
    + balcony_contrib
    + status_contrib
    + loc_coeff
  );

  if (rate_per_sqft < 650) {
    rate_per_sqft = 650;
  }

  const estimated_total = rate_per_sqft * total_sqft;
  const lower_bound = estimated_total * 0.94;
  const upper_bound = estimated_total * 1.06;

  let tier = "Budget";
  let tier_badge = "Affordable Tier (< ₹50L)";
  if (estimated_total > 12000000) {
    tier = "Luxury";
    tier_badge = "Premium / Luxury Tier (> ₹1.2Cr)";
  } else if (estimated_total >= 5000000) {
    tier = "Mid-Range";
    tier_badge = "Mid-Range Tier (₹50L - ₹1.2Cr)";
  }

  return {
    success: true,
    location,
    size,
    total_sqft,
    bath,
    balcony,
    rate_per_sqft: Math.round(rate_per_sqft),
    formatted_rate: `₹ ${Math.round(rate_per_sqft).toLocaleString("en-IN")} / sq.ft`,
    estimated_price: estimated_total,
    formatted_price: formatINR(estimated_total),
    range_low: formatINR(lower_bound),
    range_high: formatINR(upper_bound),
    tier,
    tier_badge,
    breakdown: {
      base_intercept: intercept,
      location_impact: loc_coeff,
      bhk_impact: bhk_contrib,
      scale_impact: sqft_contrib,
      amenity_impact: bath_contrib + balcony_contrib + status_contrib
    }
  };
}

async function calculatePrice() {
  const location = document.getElementById("location-select")?.value || "Whitefield";
  const size = parseFloat(document.getElementById("size-input")?.value || 2);
  const total_sqft = parseFloat(document.getElementById("sqft-number")?.value || 1200);
  const bath = parseFloat(document.getElementById("bath-input")?.value || 2);
  const balcony = parseFloat(document.getElementById("balcony-input")?.value || 1);
  const ready_to_move = parseFloat(document.getElementById("status-input")?.value || 1);

  const payload = { location, size, total_sqft, bath, balcony, ready_to_move };

  try {
    const res = await fetch("/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const data = await res.json();
      renderPredictionResult(data);
      return;
    }
  } catch (err) {
    // API not available, proceed to client-side fallback
  }

  // Seamless client-side evaluation (works on GitHub Pages!)
  const clientResult = calculateClientSidePrediction(payload);
  renderPredictionResult(clientResult);
}

function renderPredictionResult(data) {
  const heroEl = document.getElementById("price-hero");
  const rateEl = document.getElementById("rate-subtext");
  const confEl = document.getElementById("conf-values");
  const badgeEl = document.getElementById("tier-badge");

  if (heroEl) heroEl.textContent = data.formatted_price;
  if (rateEl) rateEl.textContent = data.formatted_rate;
  if (confEl) confEl.textContent = `${data.range_low} — ${data.range_high}`;
  if (badgeEl) {
    badgeEl.textContent = data.tier_badge || `${data.tier} Tier`;
    badgeEl.className = "result-badge";
    if (data.tier === "Budget") badgeEl.classList.add("bg-budget");
    if (data.tier === "Mid-Range") badgeEl.classList.add("bg-mid");
    if (data.tier === "Luxury") badgeEl.classList.add("bg-lux");
  }

  const bd = data.breakdown || {};
  const setBd = (id, val) => {
    const el = document.getElementById(id);
    if (!el) return;
    const sign = val >= 0 ? "+" : "−";
    const absVal = Math.abs(val).toLocaleString("en-IN", { maximumFractionDigits: 0 });
    el.textContent = `${sign}₹ ${absVal} / sq.ft`;
  };

  const baseEl = document.getElementById("bd-base");
  if (baseEl) baseEl.textContent = `₹ ${Math.round(bd.base_intercept || 3694).toLocaleString("en-IN")} / sq.ft`;

  setBd("bd-loc", bd.location_impact || 0);
  setBd("bd-bhk", bd.bhk_impact || 0);
  setBd("bd-scale", bd.scale_impact || 0);
  setBd("bd-amenity", bd.amenity_impact || 0);
}

function copyValuationSummary() {
  const loc = document.getElementById("location-select")?.value;
  const bhk = document.getElementById("size-input")?.value;
  const sqft = document.getElementById("sqft-number")?.value;
  const price = document.getElementById("price-hero")?.textContent;
  const rate = document.getElementById("rate-subtext")?.textContent;
  const range = document.getElementById("conf-values")?.textContent;

  const text = `Bengaluru Home Valuation:
• Locality: ${loc}
• Layout: ${bhk} BHK (${sqft} sq.ft)
• Estimated Value: ${price} (${rate})
• Valuation Range: ${range}
Calculated via Bengaluru Estates Regression Model.`;

  navigator.clipboard.writeText(text).then(() => {
    const copyBtn = document.getElementById("copy-btn");
    if (!copyBtn) return;
    const originalText = copyBtn.innerHTML;
    copyBtn.textContent = "Copied to Clipboard!";
    setTimeout(() => {
      copyBtn.innerHTML = originalText;
    }, 2000);
  }).catch(err => {
    console.error("Clipboard copy error:", err);
  });
}

// ============================================================
// TAB 2: MODEL ANALYTICS & CHARTS
// ============================================================
async function initAnalytics() {
  let data = STATIC_METRICS;

  try {
    const res = await fetch("/api/metrics");
    if (res.ok) {
      data = await res.json();
    }
  } catch (err) {
    // Static mode fallback
  }

  if (data.summary) {
    document.getElementById("kpi-accuracy").textContent = `${data.summary.accuracy}%`;
    document.getElementById("kpi-r2").textContent = data.summary.r2_score;
    document.getElementById("kpi-rmse").textContent = `₹ ${data.summary.rmse_lakhs} L`;
    document.getElementById("kpi-weights").textContent = data.summary.num_features;
  }

  initConfusionMatrixInteractions();
  renderCharts(data);
}

function initConfusionMatrixInteractions() {
  const cells = document.querySelectorAll(".cm-val");
  cells.forEach(cell => {
    cell.addEventListener("mouseenter", () => {
      const actual = cell.getAttribute("data-actual");
      const pred = cell.getAttribute("data-pred");
      const num = cell.querySelector(".cell-num")?.textContent;
      cell.setAttribute("title", `Actual: ${actual} | Predicted: ${pred} (${num} homes)`);
    });
  });
}

function renderCharts(metrics) {
  if (typeof Chart === "undefined") {
    console.warn("Chart.js not found, rendering fallback.");
    return;
  }

  // 1. Actual vs Predicted Scatter Chart
  const scatterCtx = document.getElementById("actualVsPredChart");
  if (scatterCtx) {
    const scatterData = (metrics.actual_vs_predicted || []).map(pt => ({
      x: pt.actual,
      y: pt.predicted,
      locality: pt.locality
    }));

    new Chart(scatterCtx, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Test Properties (Lakhs)",
            data: scatterData,
            backgroundColor: "#17382c",
            borderColor: "#10b981",
            borderWidth: 1.5,
            pointRadius: 5.5,
            pointHoverRadius: 8
          },
          {
            label: "Ideal Line (y = x)",
            data: [{ x: 20, y: 20 }, { x: 270, y: 270 }],
            type: "line",
            borderColor: "#94a3b8",
            borderDash: [5, 5],
            pointRadius: 0,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "top", labels: { font: { family: "Plus Jakarta Sans", size: 11 } } },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const pt = ctx.raw;
                if (!pt.locality) return `Ideal Reference: ₹${pt.x}L`;
                return `${pt.locality}: Actual ₹${pt.x}L, Pred ₹${pt.y}L`;
              }
            }
          }
        },
        scales: {
          x: {
            title: { display: true, text: "Actual Property Value (₹ Lakhs)", font: { weight: "600" } },
            grid: { color: "#f1f5f3" }
          },
          y: {
            title: { display: true, text: "Model Predicted Value (₹ Lakhs)", font: { weight: "600" } },
            grid: { color: "#f1f5f3" }
          }
        }
      }
    });
  }

  // 2. Locality Coefficients Chart
  const locCtx = document.getElementById("localityChart");
  if (locCtx) {
    const premiums = (metrics.top_premiums || []).slice(0, 5);
    const discounts = (metrics.top_discounts || []).slice(0, 5);
    const combined = [...premiums, ...discounts];

    const labels = combined.map(l => l.location);
    const values = combined.map(l => l.coefficient);
    const bgColors = values.map(v => v >= 0 ? "#10b981" : "#f43f5e");

    new Chart(locCtx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Locality Impact (₹ / sq.ft)",
          data: values,
          backgroundColor: bgColors,
          borderRadius: 6
        }]
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const val = ctx.raw;
                const sign = val > 0 ? "+" : "";
                return `Coefficient: ${sign}₹${val.toLocaleString()} / sq.ft`;
              }
            }
          }
        },
        scales: {
          x: {
            title: { display: true, text: "Differential from City Base Rate (₹ / sq.ft)", font: { weight: "600" } },
            grid: { color: "#f1f5f3" }
          },
          y: {
            grid: { display: false }
          }
        }
      }
    });
  }

  // 3. Residuals Error Distribution
  const resCtx = document.getElementById("residualsChart");
  if (resCtx) {
    const resData = metrics.residuals || [];
    const labels = resData.map(r => r.range);
    const counts = resData.map(r => r.count);

    new Chart(resCtx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Number of Properties",
          data: counts,
          backgroundColor: "#17382c",
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.raw} test properties`
            }
          }
        },
        scales: {
          x: {
            title: { display: true, text: "Error Range (Actual − Predicted)", font: { weight: "600" } },
            grid: { display: false }
          },
          y: {
            title: { display: true, text: "Frequency", font: { weight: "600" } },
            grid: { color: "#f1f5f3" }
          }
        }
      }
    });
  }
}
