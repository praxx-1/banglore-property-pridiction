# Bengaluru Estates · Model Intelligence & Price Predictor

A modern, minimalist web application and valuation platform connected directly to your trained **Multiple Linear Regression model** for Bengaluru real estate.

The model coefficients (`model_artifacts.pkl`) remain **100% untouched and preserved**, maintaining total integrity with the trained 96 parameters across 90 Bengaluru localities.

---

## Features

- **Aesthetic Minimalist Interface**: Clean Scandinavian/editorial design with Plus Jakarta Sans typography, tactile controls, and real-time calculation.
- **Direct Model Connection**: Real-time evaluation using your exact $\beta$ coefficients (base intercept, bedrooms, total square footage, bathrooms, balcony, property status, and locality one-hot weights).
- **Valuation Breakdown**: Transparent component analysis showing locality premiums/discounts, scale adjustments, and estimated market confidence ranges.
- **Interactive Confusion Matrix**: Multi-class classification heatmap (Budget `< ₹50L`, Mid-Range `₹50L - ₹1.2Cr`, Luxury `> ₹1.2Cr`) evaluating tier prediction accuracy on test properties.
- **Comprehensive Analytics & Graphs**:
  - Actual vs. Predicted Valuation Scatter Plot with $y = x$ equality line ($R^2 = 0.872$)
  - Locality Price Impact Chart (top premiums like Malleshwaram & Rajaji Nagar vs. discounts like Chandapura & Attibele)
  - Residual Error Distribution verifying normal Gaussian distribution centered at 0

---

## Architecture

- **Frontend**: Native HTML5, CSS3, and JavaScript (ES6+). Responsive, accessible, and renders charts via Chart.js with built-in zero-dependency fallback.
- **Backend**: Python 3 HTTP server (`app.py`) providing `/api/locations`, `/api/predict`, and `/api/metrics`. Zero external pip dependencies required to run.
- **Model Artifacts**: `model_artifacts.pkl` (retained without modifications).

---

## Getting Started

Run the server from this directory:

```bash
python3 app.py
```

Then open your browser at:
```
http://localhost:5000
```

*(If port 5000 is occupied on your system, `app.py` automatically binds to `http://localhost:8080`).*
