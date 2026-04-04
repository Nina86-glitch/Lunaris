import { useState, useMemo, useCallback, useEffect } from "react";

// ─── Moon Phase Calculation ───
function getMoonPhase(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  let c = 0, e = 0, jd = 0, b = 0;
  if (month < 3) {
    c = 365.25 * (year - 1);
    e = 30.6001 * (month + 13);
  } else {
    c = 365.25 * year;
    e = 30.6001 * (month + 1);
  }
  jd = c + e + day - 694039.09;
  jd /= 29.5305882;
  b = parseInt(jd);
  jd -= b;
  const age = Math.round(jd * 29.5305882);
  return age % 30;
}

function getMoonPhaseName(age) {
  if (age === 0 || age === 30) return { name: "Новолуние", icon: "🌑", en: "new" };
  if (age < 7) return { name: "Растущий серп", icon: "🌒", en: "waxing_crescent" };
  if (age === 7) return { name: "Первая четверть", icon: "🌓", en: "first_quarter" };
  if (age < 15) return { name: "Растущая луна", icon: "🌔", en: "waxing_gibbous" };
  if (age === 15) return { name: "Полнолуние", icon: "🌕", en: "full" };
  if (age < 22) return { name: "Убывающая луна", icon: "🌖", en: "waning_gibbous" };
  if (age === 22) return { name: "Последняя четверть", icon: "🌗", en: "last_quarter" };
  return { name: "Убывающий серп", icon: "🌘", en: "waning_crescent" };
}

function getMoonIllumination(age) {
  return Math.round((1 - Math.cos((age / 29.5305882) * 2 * Math.PI)) / 2 * 100);
}

// ─── SVG Moon Drawing ───
function MoonSVG({ age, size = 120 }) {
  const r = size / 2 - 4;
  const cx = size / 2;
  const cy = size / 2;
  const phase = (age % 30) / 29.5305882;
  let d;
  const sweep = phase < 0.5 ? 1 : 0;
  const termX = Math.cos(phase * 2 * Math.PI) * r;
  if (phase < 0.25) {
    d = `M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} A ${Math.abs(termX)} ${r} 0 0 1 ${cx} ${cy - r}`;
  } else if (phase < 0.5) {
    d = `M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} A ${Math.abs(termX)} ${r} 0 0 0 ${cx} ${cy - r}`;
  } else if (phase < 0.75) {
    d = `M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} A ${Math.abs(termX)} ${r} 0 0 1 ${cx} ${cy - r}`;
  } else {
    d = `M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} A ${Math.abs(termX)} ${r} 0 0 0 ${cx} ${cy - r}`;
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <radialGradient id="moonGlow" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#fffde7" />
          <stop offset="60%" stopColor="#e8d89a" />
          <stop offset="100%" stopColor="#c9b458" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="glow" />
          <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="crater">
          <feTurbulence baseFrequency="0.4" numOctaves="3" seed="5" />
          <feColorMatrix type="saturate" values="0" />
          <feBlend in="SourceGraphic" mode="multiply" />
        </filter>
      </defs>
      <circle cx={cx} cy={cy} r={r + 8} fill="none" stroke="rgba(255,223,100,0.08)" strokeWidth="6" />
      <circle cx={cx} cy={cy} r={r} fill="#1a1a2e" />
      <path d={d} fill="url(#moonGlow)" filter="url(#glow)" />
      {/* Craters */}
      <circle cx={cx - r * 0.2} cy={cy - r * 0.15} r={r * 0.08} fill="rgba(0,0,0,0.08)" />
      <circle cx={cx + r * 0.25} cy={cy + r * 0.3} r={r * 0.12} fill="rgba(0,0,0,0.06)" />
      <circle cx={cx - r * 0.1} cy={cy + r * 0.45} r={r * 0.06} fill="rgba(0,0,0,0.07)" />
    </svg>
  );
}

// ─── Russian Holidays ───
function getEasterDate(year) {
  // Meeus algorithm for Orthodox Easter (Julian → Gregorian)
  const a = year % 4;
  const b = year % 7;
  const c = year % 19;
  const d = (19 * c + 15) % 30;
  const e = (2 * a + 4 * b - d + 34) % 7;
  const month = Math.floor((d + e + 114) / 31);
  const day = ((d + e + 114) % 31) + 1;
  // Convert Julian to Gregorian (+13 days for 2000-2099)
  const julianDate = new Date(year, month - 1, day);
  julianDate.setDate(julianDate.getDate() + 13);
  return julianDate;
}

function getRussianHolidays(year) {
  const easter = getEasterDate(year);
  const palmSunday = new Date(easter); palmSunday.setDate(easter.getDate() - 7);
  const ascension = new Date(easter); ascension.setDate(easter.getDate() + 39);
  const trinity = new Date(easter); trinity.setDate(easter.getDate() + 49);

  return [
    { date: new Date(year, 0, 1), name: "Новый год", icon: "🎄", type: "state" },
    { date: new Date(year, 0, 7), name: "Рождество Христово", icon: "⭐", type: "orthodox" },
    { date: new Date(year, 0, 19), name: "Крещение Господне", icon: "💧", type: "orthodox" },
    { date: new Date(year, 1, 14), name: "День Святого Валентина", icon: "❤️", type: "other" },
    { date: new Date(year, 1, 23), name: "День защитника Отечества", icon: "🎖️", type: "state" },
    { date: new Date(year, 2, 8), name: "Международный женский день", icon: "💐", type: "state" },
    { date: new Date(year, 2, 7), name: "Масленица (начало)", icon: "🥞", type: "folk" },
    { date: palmSunday, name: "Вербное воскресенье", icon: "🌿", type: "orthodox" },
    { date: easter, name: "Пасха", icon: "🥚", type: "orthodox" },
    { date: new Date(year, 3, 12), name: "День космонавтики", icon: "🚀", type: "state" },
    { date: new Date(year, 4, 1), name: "Праздник Весны и Труда", icon: "🌷", type: "state" },
    { date: new Date(year, 4, 9), name: "День Победы", icon: "🎗️", type: "state" },
    { date: ascension, name: "Вознесение Господне", icon: "✝️", type: "orthodox" },
    { date: trinity, name: "Троица", icon: "🌳", type: "orthodox" },
    { date: new Date(year, 5, 1), name: "День защиты детей", icon: "👶", type: "other" },
    { date: new Date(year, 5, 12), name: "День России", icon: "🇷🇺", type: "state" },
    { date: new Date(year, 6, 8), name: "День семьи, любви и верности", icon: "🌼", type: "other" },
    { date: new Date(year, 7, 19), name: "Преображение Господне", icon: "🍎", type: "orthodox" },
    { date: new Date(year, 7, 28), name: "Успение Пресвятой Богородицы", icon: "🕊️", type: "orthodox" },
    { date: new Date(year, 8, 1), name: "День знаний", icon: "📚", type: "state" },
    { date: new Date(year, 8, 21), name: "Рождество Пресвятой Богородицы", icon: "🌹", type: "orthodox" },
    { date: new Date(year, 9, 14), name: "Покров Пресвятой Богородицы", icon: "🛡️", type: "orthodox" },
    { date: new Date(year, 10, 4), name: "День народного единства", icon: "🤝", type: "state" },
    { date: new Date(year, 11, 31), name: "Новогодняя ночь", icon: "🎆", type: "state" },
  ].sort((a, b) => a.date - b.date);
}

// ─── Natal Chart ───
const ZODIAC_SIGNS = [
  { name: "Овен", symbol: "♈", element: "fire", start: [3, 21], end: [4, 19] },
  { name: "Телец", symbol: "♉", element: "earth", start: [4, 20], end: [5, 20] },
  { name: "Близнецы", symbol: "♊", element: "air", start: [5, 21], end: [6, 20] },
  { name: "Рак", symbol: "♋", element: "water", start: [6, 21], end: [7, 22] },
  { name: "Лев", symbol: "♌", element: "fire", start: [7, 23], end: [8, 22] },
  { name: "Дева", symbol: "♍", element: "earth", start: [8, 23], end: [9, 22] },
  { name: "Весы", symbol: "♎", element: "air", start: [9, 23], end: [10, 22] },
  { name: "Скорпион", symbol: "♏", element: "water", start: [10, 23], end: [11, 21] },
  { name: "Стрелец", symbol: "♐", element: "fire", start: [11, 22], end: [12, 21] },
  { name: "Козерог", symbol: "♑", element: "earth", start: [12, 22], end: [1, 19] },
  { name: "Водолей", symbol: "♒", element: "air", start: [1, 20], end: [2, 18] },
  { name: "Рыбы", symbol: "♓", element: "water", start: [2, 19], end: [3, 20] },
];

const PLANETS = ["☉ Солнце", "☽ Луна", "☿ Меркурий", "♀ Венера", "♂ Марс", "♃ Юпитер", "♄ Сатурн", "⛢ Уран", "♆ Нептун", "♇ Плутон"];

function getZodiacSign(month, day) {
  for (let i = 0; i < ZODIAC_SIGNS.length; i++) {
    const s = ZODIAC_SIGNS[i];
    if (s.start[0] === s.end[0]) {
      if (month === s.start[0] && day >= s.start[1] && day <= s.end[1]) return i;
    } else if (
      (month === s.start[0] && day >= s.start[1]) ||
      (month === s.end[0] && day <= s.end[1])
    ) return i;
  }
  return 9; // Козерог default
}

function pseudoPlanetPositions(birthDate) {
  const seed = birthDate.getTime();
  const rng = (n) => ((seed * (n + 1) * 9301 + 49297) % 233280) / 233280;
  return PLANETS.map((p, i) => {
    const signIdx = Math.floor(rng(i) * 12);
    const degree = Math.floor(rng(i + 100) * 30);
    return { planet: p, sign: ZODIAC_SIGNS[signIdx], degree, signIdx };
  });
}

const ELEMENT_COLORS = { fire: "#e74c3c", earth: "#8B6914", air: "#3498db", water: "#1abc9c" };

// ─── Zodiac Wheel SVG ───
function ZodiacWheel({ positions, sunSign }) {
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = 140;
  const innerR = 100;
  const planetR = 75;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block", margin: "0 auto" }}>
      <defs>
        <radialGradient id="wheelBg">
          <stop offset="0%" stopColor="#1a1a3e" />
          <stop offset="100%" stopColor="#0d0d1a" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={outerR + 8} fill="none" stroke="rgba(200,180,100,0.15)" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={outerR} fill="none" stroke="rgba(200,180,100,0.3)" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={innerR} fill="none" stroke="rgba(200,180,100,0.2)" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={planetR} fill="none" stroke="rgba(200,180,100,0.1)" strokeWidth="0.5" strokeDasharray="3 3" />
      {ZODIAC_SIGNS.map((sign, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const midAngle = ((i * 30 + 15) - 90) * (Math.PI / 180);
        const x1 = cx + Math.cos(angle) * innerR;
        const y1 = cy + Math.sin(angle) * innerR;
        const x2 = cx + Math.cos(angle) * outerR;
        const y2 = cy + Math.sin(angle) * outerR;
        const tx = cx + Math.cos(midAngle) * ((outerR + innerR) / 2);
        const ty = cy + Math.sin(midAngle) * ((outerR + innerR) / 2);
        const isActive = i === sunSign;
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(200,180,100,0.25)" strokeWidth="0.5" />
            {isActive && (
              <path
                d={`M ${cx + Math.cos(angle) * innerR} ${cy + Math.sin(angle) * innerR} A ${innerR} ${innerR} 0 0 1 ${cx + Math.cos(((i + 1) * 30 - 90) * Math.PI / 180) * innerR} ${cy + Math.sin(((i + 1) * 30 - 90) * Math.PI / 180) * innerR} L ${cx + Math.cos(((i + 1) * 30 - 90) * Math.PI / 180) * outerR} ${cy + Math.sin(((i + 1) * 30 - 90) * Math.PI / 180) * outerR} A ${outerR} ${outerR} 0 0 0 ${cx + Math.cos(angle) * outerR} ${cy + Math.sin(angle) * outerR} Z`}
                fill="rgba(200,180,100,0.12)"
              />
            )}
            <text x={tx} y={ty} textAnchor="middle" dominantBaseline="central" fontSize="14"
              fill={isActive ? "#ffd700" : ELEMENT_COLORS[sign.element]} opacity={isActive ? 1 : 0.7}
              style={{ fontFamily: "serif" }}>
              {sign.symbol}
            </text>
          </g>
        );
      })}
      {positions.map((p, i) => {
        const totalDeg = p.signIdx * 30 + p.degree;
        const angle = (totalDeg - 90) * (Math.PI / 180);
        const px = cx + Math.cos(angle) * planetR;
        const py = cy + Math.sin(angle) * planetR;
        return (
          <g key={i}>
            <circle cx={px} cy={py} r={8} fill="rgba(200,180,100,0.15)" />
            <text x={px} y={py} textAnchor="middle" dominantBaseline="central" fontSize="9"
              fill="#e8d89a" style={{ fontFamily: "serif" }}>
              {p.planet.split(" ")[0]}
            </text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={20} fill="rgba(200,180,100,0.05)" stroke="rgba(200,180,100,0.2)" strokeWidth="0.5" />
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fontSize="16" fill="#ffd700"
        style={{ fontFamily: "serif" }}>
        {ZODIAC_SIGNS[sunSign]?.symbol}
      </text>
    </svg>
  );
}

// ─── Styles ───
const styles = {
  app: {
    fontFamily: "'Cormorant Garamond', 'Georgia', serif",
    background: "linear-gradient(170deg, #07060e 0%, #0f0e1a 40%, #141225 100%)",
    color: "#d4c9a8",
    minHeight: "100vh",
    maxWidth: 430,
    margin: "0 auto",
    position: "relative",
    overflow: "hidden",
  },
  stars: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    pointerEvents: "none",
    zIndex: 0,
  },
  content: {
    position: "relative",
    zIndex: 1,
    paddingBottom: 90,
  },
  header: {
    textAlign: "center",
    padding: "40px 20px 10px",
  },
  title: {
    fontSize: 28,
    fontWeight: 300,
    letterSpacing: 4,
    color: "#e8d89a",
    margin: 0,
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 11,
    letterSpacing: 8,
    color: "rgba(200,180,100,0.4)",
    marginTop: 4,
    textTransform: "uppercase",
  },
  tabBar: {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: 430,
    display: "flex",
    justifyContent: "space-around",
    background: "linear-gradient(to top, rgba(7,6,14,0.98), rgba(7,6,14,0.85))",
    backdropFilter: "blur(20px)",
    padding: "10px 0 24px",
    zIndex: 10,
    borderTop: "1px solid rgba(200,180,100,0.1)",
  },
  tab: (active) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    background: "none",
    border: "none",
    color: active ? "#ffd700" : "rgba(200,180,100,0.35)",
    cursor: "pointer",
    fontSize: 10,
    letterSpacing: 2,
    fontFamily: "'Cormorant Garamond', serif",
    textTransform: "uppercase",
    transition: "color 0.3s",
    padding: "4px 12px",
  }),
  tabIcon: { fontSize: 22 },
  card: {
    background: "rgba(200,180,100,0.04)",
    border: "1px solid rgba(200,180,100,0.1)",
    borderRadius: 16,
    margin: "12px 16px",
    padding: 20,
  },
  moonInfo: {
    textAlign: "center",
    padding: "20px 20px 0",
  },
  moonAge: {
    fontSize: 13,
    color: "rgba(200,180,100,0.5)",
    letterSpacing: 2,
    marginTop: 12,
  },
  moonName: {
    fontSize: 22,
    color: "#e8d89a",
    marginTop: 4,
    fontWeight: 400,
  },
  illumination: {
    fontSize: 40,
    color: "#ffd700",
    fontWeight: 300,
    marginTop: 8,
  },
  calRow: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 2,
    padding: "0 16px",
  },
  calDay: (isToday, hasMoon) => ({
    textAlign: "center",
    padding: "8px 0",
    borderRadius: 10,
    background: isToday ? "rgba(255,215,0,0.15)" : "transparent",
    border: isToday ? "1px solid rgba(255,215,0,0.3)" : "1px solid transparent",
    cursor: "pointer",
    transition: "all 0.2s",
  }),
  calDayNum: (isToday) => ({
    fontSize: 13,
    color: isToday ? "#ffd700" : "rgba(200,180,100,0.6)",
    fontFamily: "'Cormorant Garamond', serif",
  }),
  calMoon: { fontSize: 8, marginTop: 1, opacity: 0.7 },
  holidayItem: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "14px 0",
    borderBottom: "1px solid rgba(200,180,100,0.06)",
  },
  holidayIcon: {
    fontSize: 26,
    width: 44,
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    background: "rgba(200,180,100,0.06)",
    flexShrink: 0,
  },
  holidayName: { fontSize: 15, color: "#d4c9a8" },
  holidayDate: { fontSize: 12, color: "rgba(200,180,100,0.4)", marginTop: 2 },
  badge: (type) => {
    const colors = { state: "#e74c3c", orthodox: "#ffd700", folk: "#e67e22", other: "#9b59b6" };
    return {
      fontSize: 9,
      padding: "2px 8px",
      borderRadius: 20,
      background: `${colors[type] || "#666"}22`,
      color: colors[type] || "#666",
      letterSpacing: 1,
      textTransform: "uppercase",
      display: "inline-block",
      marginTop: 3,
    };
  },
  input: {
    background: "rgba(200,180,100,0.06)",
    border: "1px solid rgba(200,180,100,0.15)",
    borderRadius: 12,
    color: "#e8d89a",
    padding: "12px 16px",
    fontSize: 16,
    fontFamily: "'Cormorant Garamond', serif",
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
  },
  button: {
    background: "linear-gradient(135deg, rgba(255,215,0,0.2), rgba(200,180,100,0.1))",
    border: "1px solid rgba(255,215,0,0.3)",
    borderRadius: 12,
    color: "#ffd700",
    padding: "14px 24px",
    fontSize: 14,
    fontFamily: "'Cormorant Garamond', serif",
    letterSpacing: 3,
    textTransform: "uppercase",
    cursor: "pointer",
    width: "100%",
    transition: "all 0.3s",
  },
  planetRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid rgba(200,180,100,0.06)",
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 12,
    letterSpacing: 4,
    textTransform: "uppercase",
    color: "rgba(200,180,100,0.4)",
    marginBottom: 16,
  },
  monthNav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
  },
  monthBtn: {
    background: "none",
    border: "none",
    color: "rgba(200,180,100,0.5)",
    fontSize: 20,
    cursor: "pointer",
    padding: "4px 12px",
  },
  monthLabel: {
    fontSize: 16,
    color: "#e8d89a",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  filterBar: {
    display: "flex",
    gap: 8,
    padding: "0 16px 12px",
    overflowX: "auto",
  },
  filterBtn: (active) => ({
    padding: "6px 14px",
    borderRadius: 20,
    border: `1px solid ${active ? "rgba(255,215,0,0.4)" : "rgba(200,180,100,0.1)"}`,
    background: active ? "rgba(255,215,0,0.1)" : "transparent",
    color: active ? "#ffd700" : "rgba(200,180,100,0.4)",
    fontSize: 11,
    letterSpacing: 1,
    cursor: "pointer",
    whiteSpace: "nowrap",
    fontFamily: "'Cormorant Garamond', serif",
  }),
};

const MONTHS_RU = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const DAYS_RU = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const BADGE_LABELS = { state: "Государственный", orthodox: "Православный", folk: "Народный", other: "Другой" };

// ─── Stars Background ───
function StarsCanvas() {
  const stars = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({
      x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.5 + 0.1,
      delay: Math.random() * 5,
    })), []);

  return (
    <div style={styles.stars}>
      {stars.map((s, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${s.x}%`, top: `${s.y}%`,
          width: s.size, height: s.size,
          borderRadius: "50%",
          background: "#e8d89a",
          opacity: s.opacity,
          animation: `twinkle ${2 + s.delay}s ease-in-out infinite alternate`,
          animationDelay: `${s.delay}s`,
        }} />
      ))}
      <style>{`@keyframes twinkle { 0% { opacity: 0.1; } 100% { opacity: 0.6; } }`}</style>
    </div>
  );
}

// ─── Main App ───
export default function LunarApp() {
  const [tab, setTab] = useState("moon");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMonth, setViewMonth] = useState(new Date());
  const [birthDate, setBirthDate] = useState("");
  const [natalResult, setNatalResult] = useState(null);
  const [holidayFilter, setHolidayFilter] = useState("all");

  const today = new Date();
  const moonAge = getMoonPhase(currentDate);
  const moonPhase = getMoonPhaseName(moonAge);
  const illumination = getMoonIllumination(moonAge);

  const holidays = useMemo(() => getRussianHolidays(viewMonth.getFullYear()), [viewMonth]);
  const filteredHolidays = holidays.filter(h => holidayFilter === "all" || h.type === holidayFilter);

  const calendarDays = useMemo(() => {
    const y = viewMonth.getFullYear();
    const m = viewMonth.getMonth();
    const firstDay = new Date(y, m, 1);
    let startDay = firstDay.getDay() - 1;
    if (startDay < 0) startDay = 6;
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < startDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(y, m, d);
      days.push({ day: d, date, moonAge: getMoonPhase(date), phase: getMoonPhaseName(getMoonPhase(date)) });
    }
    return days;
  }, [viewMonth]);

  const handleNatal = useCallback(() => {
    if (!birthDate) return;
    const bd = new Date(birthDate);
    const signIdx = getZodiacSign(bd.getMonth() + 1, bd.getDate());
    const positions = pseudoPlanetPositions(bd);
    setNatalResult({ sign: ZODIAC_SIGNS[signIdx], signIdx, positions, date: bd });
  }, [birthDate]);

  const prevMonth = () => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1));
  const nextMonth = () => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1));
  const isToday = (d) => d && d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();

  const formatDate = (d) => `${d.getDate()} ${MONTHS_RU[d.getMonth()].toLowerCase()}`;
  const daysUntil = (d) => {
    const diff = Math.ceil((d - today) / (1000 * 60 * 60 * 24));
    if (diff === 0) return "сегодня";
    if (diff === 1) return "завтра";
    if (diff < 0) return "прошёл";
    return `через ${diff} дн.`;
  };

  // Moon advice
  const moonAdvice = useMemo(() => {
    if (moonAge < 3) return "Время новых начинаний и планирования";
    if (moonAge < 7) return "Время для роста и действий";
    if (moonAge < 11) return "Период активных решений";
    if (moonAge < 15) return "Доводите дела до конца";
    if (moonAge < 18) return "Время делиться и благодарить";
    if (moonAge < 22) return "Анализируйте результаты";
    if (moonAge < 26) return "Отпускайте ненужное";
    return "Время для отдыха и медитации";
  }, [moonAge]);

  return (
    <div style={styles.app}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <StarsCanvas />

      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>Lunaris</h1>
          <div style={styles.subtitle}>Лунный путеводитель</div>
        </div>

        {/* ─── Moon Tab ─── */}
        {tab === "moon" && (
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            <div style={styles.moonInfo}>
              <MoonSVG age={moonAge} size={160} />
              <div style={styles.moonAge}>Лунный день: {moonAge}</div>
              <div style={styles.moonName}>{moonPhase.name}</div>
              <div style={styles.illumination}>{illumination}%</div>
              <div style={{ fontSize: 12, color: "rgba(200,180,100,0.4)", marginTop: 2 }}>освещённость</div>
            </div>

            <div style={styles.card}>
              <div style={{ fontSize: 13, color: "rgba(200,180,100,0.6)", textAlign: "center", fontStyle: "italic" }}>
                ✦ {moonAdvice} ✦
              </div>
            </div>

            {/* Mini calendar */}
            <div style={styles.monthNav}>
              <button style={styles.monthBtn} onClick={prevMonth}>‹</button>
              <span style={styles.monthLabel}>{MONTHS_RU[viewMonth.getMonth()]} {viewMonth.getFullYear()}</span>
              <button style={styles.monthBtn} onClick={nextMonth}>›</button>
            </div>
            <div style={styles.calRow}>
              {DAYS_RU.map(d => (
                <div key={d} style={{ textAlign: "center", fontSize: 10, color: "rgba(200,180,100,0.3)", letterSpacing: 1, padding: "4px 0" }}>{d}</div>
              ))}
            </div>
            <div style={styles.calRow}>
              {calendarDays.map((d, i) => (
                <div key={i} style={styles.calDay(d && isToday(d.date))}
                  onClick={() => d && setCurrentDate(d.date)}>
                  {d && (
                    <>
                      <div style={styles.calDayNum(isToday(d.date))}>{d.day}</div>
                      <div style={styles.calMoon}>{d.phase.icon}</div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Phase legend */}
            <div style={{ ...styles.card, marginTop: 16 }}>
              <div style={styles.sectionTitle}>Фазы луны</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { icon: "🌑", name: "Новолуние" }, { icon: "🌒", name: "Растущий серп" },
                  { icon: "🌓", name: "Первая четверть" }, { icon: "🌔", name: "Растущая луна" },
                  { icon: "🌕", name: "Полнолуние" }, { icon: "🌖", name: "Убывающая луна" },
                  { icon: "🌗", name: "Последняя четв." }, { icon: "🌘", name: "Убывающий серп" },
                ].map((p, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "rgba(200,180,100,0.5)" }}>
                    <span style={{ fontSize: 16 }}>{p.icon}</span> {p.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── Holidays Tab ─── */}
        {tab === "holidays" && (
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            <div style={{ ...styles.monthNav, justifyContent: "center", gap: 16 }}>
              <button style={styles.monthBtn} onClick={() => setViewMonth(new Date(viewMonth.getFullYear() - 1, 0, 1))}>‹</button>
              <span style={styles.monthLabel}>{viewMonth.getFullYear()}</span>
              <button style={styles.monthBtn} onClick={() => setViewMonth(new Date(viewMonth.getFullYear() + 1, 0, 1))}>›</button>
            </div>

            <div style={styles.filterBar}>
              {[["all", "Все"], ["state", "Государств."], ["orthodox", "Православные"], ["folk", "Народные"], ["other", "Другие"]].map(([key, label]) => (
                <button key={key} style={styles.filterBtn(holidayFilter === key)} onClick={() => setHolidayFilter(key)}>
                  {label}
                </button>
              ))}
            </div>

            <div style={{ padding: "0 16px" }}>
              {filteredHolidays.map((h, i) => (
                <div key={i} style={styles.holidayItem}>
                  <div style={styles.holidayIcon}>{h.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={styles.holidayName}>{h.name}</div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={styles.holidayDate}>{formatDate(h.date)}</span>
                      <span style={styles.badge(h.type)}>{BADGE_LABELS[h.type]}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(200,180,100,0.3)", whiteSpace: "nowrap" }}>
                    {daysUntil(h.date)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── Natal Chart Tab ─── */}
        {tab === "natal" && (
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            <div style={{ ...styles.card, marginTop: 20 }}>
              <div style={styles.sectionTitle}>Натальная карта</div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, color: "rgba(200,180,100,0.4)", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                  ДАТА РОЖДЕНИЯ
                </label>
                <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)}
                  style={styles.input} />
              </div>
              <button style={styles.button} onClick={handleNatal}>
                Построить карту
              </button>
            </div>

            {natalResult && (
              <>
                <div style={{ ...styles.card, textAlign: "center" }}>
                  <div style={{ fontSize: 48 }}>{natalResult.sign.symbol}</div>
                  <div style={{ fontSize: 22, color: "#e8d89a", marginTop: 4 }}>{natalResult.sign.name}</div>
                  <div style={{
                    display: "inline-block", marginTop: 8,
                    fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
                    padding: "4px 14px", borderRadius: 20,
                    background: `${ELEMENT_COLORS[natalResult.sign.element]}22`,
                    color: ELEMENT_COLORS[natalResult.sign.element],
                  }}>
                    {natalResult.sign.element === "fire" ? "🔥 Огонь" :
                     natalResult.sign.element === "earth" ? "🌍 Земля" :
                     natalResult.sign.element === "air" ? "💨 Воздух" : "💧 Вода"}
                  </div>
                </div>

                <div style={{ padding: "0 16px" }}>
                  <ZodiacWheel positions={natalResult.positions} sunSign={natalResult.signIdx} />
                </div>

                <div style={styles.card}>
                  <div style={styles.sectionTitle}>Позиции планет</div>
                  {natalResult.positions.map((p, i) => (
                    <div key={i} style={styles.planetRow}>
                      <span style={{ color: "#e8d89a" }}>{p.planet}</span>
                      <span style={{ color: ELEMENT_COLORS[p.sign.element] }}>
                        {p.sign.symbol} {p.sign.name} {p.degree}°
                      </span>
                    </div>
                  ))}
                </div>

                <div style={styles.card}>
                  <div style={styles.sectionTitle}>Стихии</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {["fire", "earth", "air", "water"].map(el => {
                      const count = natalResult.positions.filter(p => p.sign.element === el).length;
                      const labels = { fire: "Огонь", earth: "Земля", air: "Воздух", water: "Вода" };
                      return (
                        <div key={el} style={{
                          textAlign: "center", padding: 12, borderRadius: 12,
                          background: `${ELEMENT_COLORS[el]}11`,
                          border: `1px solid ${ELEMENT_COLORS[el]}33`,
                        }}>
                          <div style={{ fontSize: 20, color: ELEMENT_COLORS[el] }}>{count}</div>
                          <div style={{ fontSize: 11, color: "rgba(200,180,100,0.5)", marginTop: 2 }}>{labels[el]}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* ─── Tab Bar ─── */}
      <div style={styles.tabBar}>
        <button style={styles.tab(tab === "moon")} onClick={() => setTab("moon")}>
          <span style={styles.tabIcon}>🌙</span>
          <span>Луна</span>
        </button>
        <button style={styles.tab(tab === "holidays")} onClick={() => setTab("holidays")}>
          <span style={styles.tabIcon}>🎄</span>
          <span>Праздники</span>
        </button>
        <button style={styles.tab(tab === "natal")} onClick={() => setTab("natal")}>
          <span style={styles.tabIcon}>✨</span>
          <span>Натальная</span>
        </button>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        * { -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { display: none; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.7) sepia(1) hue-rotate(10deg); }
      `}</style>
    </div>
  );
}
