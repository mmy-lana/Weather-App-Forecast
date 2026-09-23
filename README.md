# Atmosphere — Weather App with 5-Day Forecast & Charts

A modern, production-ready weather dashboard built with **Next.js**, **Tailwind CSS**, and **Chart.js**, powered by the free open-source **Open-Meteo API**. Features dynamic glassmorphic backgrounds reacting to real-time weather conditions, 24-hour temperature trend analytics, and 5-day forecasts.

🔗 **Live Demo**: [https://weather-app-forecast-steel.vercel.app](https://weather-app-forecast-steel.vercel.app)

---

## ✨ Features

- 🌤️ **Real-Time Weather & Geocoding**: Global city search with instant autocompletion powered by Open-Meteo (zero API key required).
- 📊 **24-Hour Temperature Trends**: Interactive line charts built with Chart.js and `react-chartjs-2`.
- 📅 **5-Day Extended Forecast**: Daily min/max temperature metrics, precipitation probabilities, and condition summaries.
- 🎨 **Dynamic Glassmorphism UI**: Background gradients adapt dynamically based on current weather (Clear, Cloud, Rain, Snow, Thunderstorm).
- 🌡️ **Unit Toggle**: Toggle seamlessly between Celsius (°C) and Fahrenheit (°F).
- 📍 **Geolocation Support**: Automatic local forecast detection on initial load with graceful fallback.
- ⚡ **Zero Hydration Mismatches**: Built using Domain-Driven Design (DDD), Atomic UI primitives, and `useSyncExternalStore` for SSR stability.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Chart.js](https://www.chartjs.org/) & [React-Chartjs-2](https://react-chartjs-2.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Weather API**: [Open-Meteo API](https://open-meteo.com/)
- **Deployment**: [Vercel](https://vercel.com)

---

## 📂 Project Architecture

```text
src/
├── app/               # Next.js App Router (Pages, Layout, API Routes)
├── components/
│   └── ui/            # Atomic, globally reusable UI primitives
├── features/
│   └── weather/       # Domain-driven feature module
│       ├── components/ # Current weather, forecast, chart, search
│       ├── hooks/      # useWeather custom state hook
│       ├── services/   # Open-Meteo API service & cache
│       └── types/      # TypeScript interfaces & weather dictionaries
└── lib/               # Utility functions & WMO code mapping helpers
```

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/mmy-lana/weather-app.git
cd weather-app
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build

```bash
npm run build
npm run start
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
