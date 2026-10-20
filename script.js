// ============================================================
// BENGALURU ESTATES · MODEL INTELLIGENCE JAVASCRIPT
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Navigation Tab Switching
  initTabs();

  // 2. Fetch Locations and Populate Dropdown
  initLocations();

  // 3. Initialize Interactive Form Inputs (BHK, Slider, Steppers, Toggles)
  initFormControls();

  // 4. Form Submission and Live Calculation
  initPredictionEngine();

  // 5. Initialize Model Performance Analytics (Confusion Matrix & Charts)
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

      // If switching to analytics, trigger chart resize/render
      if (targetId === "analytics-tab") {
        window.dispatchEvent(new Event("resize"));
      }
    });
  });

  // Jump to analytics button
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

  try {
    const res = await fetch("/api/locations");
    const data = await res.json();
    const locations = data.locations || [];

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

    // Run initial prediction once locations are loaded
    calculatePrice();
  } catch (err) {
    console.error("Failed to load locations:", err);
    select.innerHTML = `
      <option value="Whitefield" selected>Whitefield</option>
      <option value="Electronic City">Electronic City</option>
      <option value="JP Nagar">JP Nagar</option>
      <option value="Indira Nagar">Indira Nagar</option>
      <option value="Rajaji Nagar">Rajaji Nagar</option>
    `;
    calculatePrice();
  }
}

// ============================================================
// FORM CONTROLS
// ============================================================
function initFormControls() {
  // BHK Pills
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

  // Sqft Slider and Number Sync
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
// PREDICTION ENGINE & API CALL
// ============================================================
let debounceTimer = null;
function calculatePriceDebounced() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    calculatePrice();
  }, 120);
}

function initPredictionEngine() {
  const form = document.getElementById("prediction-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    calculatePrice();
  });
}

async function calculatePrice() {
  const location = document.getElementById("location-select")?.value || "Whitefield";
  const size = parseFloat(document.getElementById("size-input")?.value || 2);
  const total_sqft = parseFloat(document.getElementById("sqft-number")?.value || 1200);
  const bath = parseFloat(document.getElementById("bath-input")?.value || 2);
  const balcony = parseFloat(document.getElementById("balcony-input")?.value || 1);
  const ready_to_move = parseFloat(document.getElementById("status-input")?.value || 1);

  const payload = {
    location,
    size,
    total_sqft,
    bath,
    balcony,
    ready_to_move
  };

  try {
    const res = await fetch("/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error("Prediction API error");

    const data = await res.json();
    renderPredictionResult(data);
  } catch (err) {
    console.error("Prediction calculation failed:", err);
  }
}

function renderPredictionResult(data) {
  // Primary Valuation Hero
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

  // Valuation Factor Breakdown
  const bd = data.breakdown || {};
  const setBd = (id, val, prefix = "") => {
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
let chartsInitialized = false;

async function initAnalytics() {
  try {
    const res = await fetch("/api/metrics");
    if (!res.ok) throw new Error("Metrics API error");
    const data = await res.json();

    // Render KPI Cards
    if (data.summary) {
      document.getElementById("kpi-accuracy").textContent = `${data.summary.accuracy}%`;
      document.getElementById("kpi-r2").textContent = data.summary.r2_score;
      document.getElementById("kpi-rmse").textContent = `₹ ${data.summary.rmse_lakhs} L`;
      document.getElementById("kpi-weights").textContent = data.summary.num_features;
    }

    // Interactive Confusion Matrix Click Handlers
    initConfusionMatrixInteractions(data.confusion_matrix);

    // Render Charts
    renderCharts(data);
  } catch (err) {
    console.error("Failed to load analytics metrics:", err);
  }
}

function initConfusionMatrixInteractions(matrixData) {
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
    console.warn("Chart.js not found, rendering SVG fallback.");
    renderSvgFallbacks(metrics);
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

  // 2. Locality Coefficients Chart (Top Premiums vs Discounts)
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

// Fallback SVG generator if offline
function renderSvgFallbacks(metrics) {
  const containers = document.querySelectorAll(".chart-container");
  containers.forEach(c => {
    c.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#64748b;font-size:0.85rem;">Graph loaded. (Offline rendering active)</div>`;
  });
}
