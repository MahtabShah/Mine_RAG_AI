import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
} from "recharts";
import {
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Droplets,
  MapPin,
  Users,
  Calendar,
  Activity,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// ============================================================
// DATA - Extracted from SANKET Non-Coal Mine Accidents 2016-2022
// ============================================================

// Fatal accidents & fatalities in Non-Coal Mines (2013-2022)
const fatalAccidentData = [
  { year: "2013", fatalAccidents: 58, fatalities: 74, severity: 1.28 },
  { year: "2014", fatalAccidents: 39, fatalities: 45, severity: 1.15 },
  { year: "2015", fatalAccidents: 45, fatalities: 48, severity: 1.07 },
  { year: "2016", fatalAccidents: 39, fatalities: 50, severity: 1.28 },
  { year: "2017", fatalAccidents: 42, fatalities: 63, severity: 1.5 },
  { year: "2018", fatalAccidents: 45, fatalities: 51, severity: 1.13 },
  { year: "2019", fatalAccidents: 45, fatalities: 54, severity: 1.2 },
  { year: "2020", fatalAccidents: 40, fatalities: 50, severity: 1.25 },
  { year: "2021", fatalAccidents: 33, fatalities: 50, severity: 1.52 },
  { year: "2022", fatalAccidents: 40, fatalities: 54, severity: 1.35 },
];

// Serious accidents (2013-2022)
const seriousAccidentData = [
  { year: "2013", seriousAccidents: 52, seriouslyInjured: 68 },
  { year: "2014", seriousAccidents: 44, seriouslyInjured: 60 },
  { year: "2015", seriousAccidents: 35, seriouslyInjured: 51 },
  { year: "2016", seriousAccidents: 37, seriouslyInjured: 48 },
  { year: "2017", seriousAccidents: 22, seriouslyInjured: 39 },
  { year: "2018", seriousAccidents: 26, seriouslyInjured: 38 },
  { year: "2019", seriousAccidents: 58, seriouslyInjured: 70 },
  { year: "2020", seriousAccidents: 24, seriouslyInjured: 33 },
  { year: "2021", seriousAccidents: 45, seriouslyInjured: 52 },
  { year: "2022", seriousAccidents: 48, seriouslyInjured: 65 },
];

// Cause-wise fatal accidents (2013-2022 aggregated)
const causeWiseFatalData = [
  {
    cause: "Fall (Other than Fall of Ground)",
    count: 120,
    percentage: 28.2,
    color: "#ef4444",
  },
  { cause: "Ground Movement", count: 102, percentage: 23.9, color: "#f97316" },
  {
    cause: "Transportation Machinery (Non-Winding)",
    count: 82,
    percentage: 19.2,
    color: "#eab308",
  },
  {
    cause: "Machinery Other than Transportation",
    count: 39,
    percentage: 9.2,
    color: "#84cc16",
  },
  { cause: "Other Causes", count: 24, percentage: 5.6, color: "#22c55e" },
  { cause: "Explosives", count: 23, percentage: 5.4, color: "#14b8a6" },
  { cause: "Electricity", count: 16, percentage: 3.8, color: "#06b6d4" },
  {
    cause: "Transportation Machinery (Winding)",
    count: 11,
    percentage: 2.6,
    color: "#0ea5e9",
  },
  {
    cause: "Gas, Dust & Other Combustible",
    count: 9,
    percentage: 2.1,
    color: "#8b5cf6",
  },
];

// Place-wise fatal accidents
const placeWiseFatalData = [
  { place: "Opencast", count: 297, percentage: 70, color: "#ef4444" },
  { place: "Above Ground", count: 86, percentage: 20, color: "#f97316" },
  { place: "Below Ground", count: 43, percentage: 10, color: "#0ea5e9" },
];

// Serious accidents by location
const placeWiseSeriousData = [
  { place: "Above Ground", count: 215, percentage: 55, color: "#ef4444" },
  { place: "Below Ground", count: 100, percentage: 26, color: "#0ea5e9" },
  { place: "Opencast", count: 76, percentage: 19, color: "#f97316" },
];

// Year-wise place distribution of fatal accidents
const placeYearlyData = [
  { year: "2013", "Below Ground": 4, Opencast: 45, "Above Ground": 9 },
  { year: "2014", "Below Ground": 4, Opencast: 25, "Above Ground": 10 },
  { year: "2015", "Below Ground": 4, Opencast: 32, "Above Ground": 9 },
  { year: "2016", "Below Ground": 1, Opencast: 26, "Above Ground": 12 },
  { year: "2017", "Below Ground": 3, Opencast: 34, "Above Ground": 5 },
  { year: "2018", "Below Ground": 5, Opencast: 35, "Above Ground": 5 },
  { year: "2019", "Below Ground": 8, Opencast: 29, "Above Ground": 8 },
  { year: "2020", "Below Ground": 2, Opencast: 26, "Above Ground": 12 },
  { year: "2021", "Below Ground": 4, Opencast: 17, "Above Ground": 12 },
  { year: "2022", "Below Ground": 8, Opencast: 28, "Above Ground": 4 },
];

// Mineral-wise fatal accidents
const mineralWiseData = [
  { mineral: "Stone", count: 99, percentage: 23, color: "#78716c" },
  { mineral: "Others", count: 118, percentage: 28, color: "#a3a3a3" },
  { mineral: "Granite", count: 54, percentage: 13, color: "#fb923c" },
  { mineral: "Oil", count: 43, percentage: 10, color: "#0f172a" },
  { mineral: "Iron", count: 40, percentage: 9, color: "#dc2626" },
  { mineral: "Limestone", count: 34, percentage: 8, color: "#fbbf24" },
  {
    mineral: "Galena & Sphalerite",
    count: 20,
    percentage: 5,
    color: "#8b5cf6",
  },
  { mineral: "Manganese", count: 18, percentage: 4, color: "#14b8a6" },
];

// Zone-wise fatal accidents
const zoneWiseData = [
  { zone: "WZ (Western)", count: 150, color: "#7c3aed" },
  { zone: "CZ (Central)", count: 85, color: "#2563eb" },
  { zone: "SCZ (South Central)", count: 84, color: "#0d9488" },
  { zone: "SEZ (South Eastern)", count: 78, color: "#ea580c" },
  { zone: "EZ (Eastern)", count: 71, color: "#dc2626" },
  { zone: "NZ (Northern)", count: 45, color: "#ca8a04" },
];

// ============================================================
// REUSABLE COMPONENTS
// ============================================================

const Card = ({ children, className = "" }) => (
  <div className={`my-4 sm:p-6 ${className}`}>{children}</div>
);
const SectionTitle = ({ icon: Icon, title, subtitle }) => (
  <div className="flex items-start gap-3 mb-5">
    <Icon className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
    <div className="min-w-0">
      <h2 className="text-base sm:text-lg font-semibold text-gray-900">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{subtitle}</p>
      )}
    </div>
  </div>
);
const StatCard = ({ value, label, sublabel, icon: Icon }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5">
    <div className="flex items-start justify-between gap-2">
      <div className="min-w-0">
        <p className="text-[11px] sm:text-xs font-medium text-gray-500 uppercase tracking-wide">
          {label}
        </p>
        <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1.5 tabular-nums">
          {value}
        </p>
        {sublabel && (
          <p className="text-[11px] sm:text-xs text-gray-500 mt-1 truncate">
            {sublabel}
          </p>
        )}
      </div>
      {Icon && <Icon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />}
    </div>
  </div>
);
const Highlight = ({ title, children }) => (
  <div className="border-l-2 border-gray-300 pl-4 py-1">
    {title && (
      <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
        {title}
      </p>
    )}
    <p className="text-sm text-gray-600 leading-relaxed">{children}</p>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 text-white rounded-md px-3 py-2 shadow-lg">
      <p className="font-medium text-xs mb-1.5">{label}</p>
      {payload.map((entry, idx) => (
        <p key={idx} className="text-xs flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-gray-300">{entry.name}</span>
          <span className="font-semibold ml-auto tabular-nums">
            {entry.value}
          </span>
        </p>
      ))}
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function InundationDashboard() {
  const [expandedSection, setExpandedSection] = useState("overview");

  const toggleSection = (id) =>
    setExpandedSection(expandedSection === id ? null : id);

  // Aggregate stats
  const totalFatalAccidents = fatalAccidentData.reduce(
    (s, d) => s + d.fatalAccidents,
    0,
  );
  const totalFatalities = fatalAccidentData.reduce(
    (s, d) => s + d.fatalities,
    0,
  );
  const totalSeriousAccidents = seriousAccidentData.reduce(
    (s, d) => s + d.seriousAccidents,
    0,
  );
  const totalSeriouslyInjured = seriousAccidentData.reduce(
    (s, d) => s + d.seriouslyInjured,
    0,
  );
  const avgSeverity = (totalFatalities / totalFatalAccidents).toFixed(2);
  const declinePercentage = (
    ((fatalAccidentData[0].fatalAccidents -
      fatalAccidentData[9].fatalAccidents) /
      fatalAccidentData[0].fatalAccidents) *
    100
  ).toFixed(1);

  const sections = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "trends", label: "Trends", icon: TrendingDown },
    { id: "causes", label: "Causes", icon: AlertTriangle },
    { id: "places", label: "Locations", icon: MapPin },
    { id: "zones", label: "Zones & Minerals", icon: Droplets },
    { id: "insights", label: "Key Insights", icon: Info },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ===== HEADER ===== */}
        <header className="mb-10 pb-8 border-b border-gray-200">
          <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-2">
            DGMS SANKET · 2016–2022
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">
            Inundation &amp; Mine Safety Analytics
          </h1>
          <p className="text-gray-600 max-w-3xl text-sm leading-relaxed">
            A comprehensive visualization of fatal accidents, serious injuries,
            causes and patterns across Indian non-coal mines from the
            Directorate General of Mines Safety (DGMS) statistical report.
          </p>
        </header>

        {/* ===== TOP STATS ===== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard
            value={totalFatalAccidents}
            label="Total Fatal Accidents"
            sublabel="2013–2022"
            icon={AlertTriangle}
          />
          <StatCard
            value={totalFatalities}
            label="Total Fatalities"
            sublabel="Lives lost"
            icon={Users}
          />
          <StatCard
            value={totalSeriousAccidents}
            label="Serious Accidents"
            sublabel={`${totalSeriouslyInjured} injured`}
            icon={Activity}
          />
          <StatCard
            value={avgSeverity}
            label="Avg Severity"
            sublabel="Deaths per accident"
            icon={TrendingUp}
          />
        </div>

        {/* ===== SECTION NAVIGATOR ===== */}
        <div className="mb-10 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto">
          <div className="flex gap-2 sm:flex-wrap min-w-max sm:min-w-0">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setExpandedSection(id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  expandedSection === id
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}>
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ===== OVERVIEW ===== */}
        {expandedSection === "overview" && (
          <div className="space-y-8">
            <Card>
              <SectionTitle
                icon={Activity}
                title="Fatal Accidents & Fatalities Trend"
                subtitle="Non-Coal Mines (2013–2022)"
              />
              <div className="w-full h-74 sm:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={fatalAccidentData}>
                    <defs>
                      <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="0">
                        <stop
                          offset="5%"
                          stopColor="#bd8f69"
                          stopOpacity={0.15}
                        />
                        <stop
                          offset="95%"
                          stopColor="#a88a72"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient id="colorFat" x1="0" y1="0" x2="0" y2="0">
                        <stop
                          offset="5%"
                          stopColor="#bd8f69"
                          stopOpacity={0.15}
                        />
                        <stop
                          offset="95%"
                          stopColor="#a88a72"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="year" stroke="#9ca3af" fontSize={12} />
                    <YAxis width={20} stroke="#9ca3af" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      wrapperStyle={{ fontSize: 10, paddingTop: 8 }}
                      iconType="circle"
                      iconSize={8}
                    />
                    <Area
                      type="monotone"
                      dataKey="fatalAccidents"
                      name="Fatal Accidents"
                      stroke="#b7977d"
                      strokeWidth={2}
                      fill="url(#colorAcc)"
                    />
                    <Area
                      type="monotone"
                      dataKey="fatalities"
                      name="Fatalities"
                      stroke="rgb(223, 104, 44)"
                      strokeWidth={2}
                      fill="url(#colorFat)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <Highlight title="Positive Trend">
                  Fatal accidents declined by{" "}
                  <strong>{declinePercentage}%</strong> from 2013 (58) to 2022
                  (40). The lowest was in 2021 with 33 accidents.
                </Highlight>
                <Highlight title="Severity Concern">
                  Fatalities per accident peaked at <strong>1.52</strong> in
                  2021 and 1.50 in 2017 — while accidents are fewer, they tend
                  to be more severe.
                </Highlight>
              </div>
            </Card>

            <Card>
              <SectionTitle
                icon={Users}
                title="Serious Accidents & Injuries"
                subtitle="Non-Coal Mines (2013–2022)"
              />
              <div className="w-full h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={seriousAccidentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="year" stroke="#9ca3af" fontSize={12} />
                    <YAxis width={20} stroke="#9ca3af" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                      iconType="circle"
                      iconSize={8}
                    />
                    <Bar
                      dataKey="seriousAccidents"
                      name="Serious Accidents"
                      fill="#635952"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="seriouslyInjured"
                      name="Seriously Injured"
                      fill="#df8338"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6">
                <Highlight>
                  A total of <strong>{totalSeriousAccidents}</strong> serious
                  accidents and <strong>{totalSeriouslyInjured}</strong>{" "}
                  seriously injured persons were reported. Peak year: 2019 (58
                  accidents, 70 injuries).
                </Highlight>
              </div>
            </Card>
          </div>
        )}

        {/* ===== TRENDS ===== */}
        {expandedSection === "trends" && (
          <div className="space-y-8">
            <Card>
              <SectionTitle
                icon={TrendingDown}
                title="Accident Severity Over Time"
                subtitle="Fatalities per fatal accident (2013–2022)"
              />
              <div className="w-full h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={fatalAccidentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="year" stroke="#9ca3af" fontSize={12} />
                    <YAxis
                      width={20}
                      domain={[1, 1.6]}
                      stroke="#9ca3af"
                      fontSize={12}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="severity"
                      name="Severity Index"
                      stroke="#e67f3b"
                      strokeWidth={2}
                      dot={{ r: 4, fill: "#f08914e1" }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 grid sm:grid-cols-3 gap-4">
                <Highlight title="2015 — Safest Year">
                  Severity index of <strong>1.07</strong> — the lowest in the
                  decade.
                </Highlight>
                <Highlight title="2021 — Highest Severity">
                  <strong>1.52</strong> fatalities per accident — a red flag for
                  safety protocols.
                </Highlight>
                <Highlight title="Average Severity">
                  Roughly <strong>1.25</strong> deaths per fatal accident across
                  the decade.
                </Highlight>
              </div>
            </Card>

            <Card>
              <SectionTitle
                icon={Calendar}
                title="Year-on-Year Change"
                subtitle="Fatal vs serious accidents"
              />
              <div className="w-full h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={fatalAccidentData.map((f, i) => ({
                      year: f.year,
                      Fatal: f.fatalAccidents,
                      Serious: seriousAccidentData[i].seriousAccidents,
                    }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="year" stroke="#9ca3af" fontSize={12} />
                    <YAxis width={20} stroke="#9ca3af" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                      iconType="circle"
                      iconSize={8}
                    />
                    <Bar dataKey="Fatal" fill="#574437" radius={[4, 4, 0, 0]} />
                    <Bar
                      dataKey="Serious"
                      fill="#da8728"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        )}

        {/* ===== CAUSES ===== */}
        {expandedSection === "causes" && (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <SectionTitle
                  icon={AlertTriangle}
                  title="Cause-wise Fatal Accidents"
                  subtitle="Percentage distribution (2013–2022)"
                />
                <div className="w-full h-72 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={causeWiseFatalData}
                        dataKey="count"
                        nameKey="cause"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        innerRadius={55}
                        paddingAngle={2}
                        label={({ percentage }) => `${percentage}%`}
                        labelLine={false}>
                        {causeWiseFatalData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 divide-y divide-gray-100">
                  {causeWiseFatalData.map((c, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-xs py-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                          style={{ backgroundColor: c.color }}
                        />
                        <span className="text-gray-700 truncate">
                          {c.cause}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                        <span className="font-semibold text-gray-900 tabular-nums">
                          {c.count}
                        </span>
                        <span className="text-gray-400 w-10 text-right tabular-nums">
                          {c.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <SectionTitle
                  icon={Activity}
                  title="Top Causes"
                  subtitle="Fatal accident count by cause"
                />
                <div className="w-full h-80 sm:h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={causeWiseFatalData.slice(0, 6)}
                      layout="vertical"
                      margin={{ left: 8, right: 16 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis type="number" stroke="#9ca3af" fontSize={11} />
                      <YAxis
                        type="category"
                        dataKey="cause"
                        stroke="#9ca3af"
                        fontSize={10}
                        width={120}
                        tick={{ fontSize: 10 }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                        {causeWiseFatalData.slice(0, 6).map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <Highlight title="Fall-Related — 28.2%">
                <strong>120 accidents</strong> — the leading cause. Falls from
                height, into depth, and rolling objects dominate.
              </Highlight>
              <Highlight title="Ground Movement — 23.9%">
                <strong>102 accidents</strong> — includes fall of roof, sides,
                overhangs, and rock bursts.
              </Highlight>
              <Highlight title="Transportation — 21.8%">
                <strong>93 accidents</strong> — wheeled trackless, dumpers, rope
                haulage, and winding machinery.
              </Highlight>
            </div>
          </div>
        )}

        {/* ===== PLACES ===== */}
        {expandedSection === "places" && (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <SectionTitle
                  icon={MapPin}
                  title="Fatal Accidents by Location"
                  subtitle="Below Ground · Opencast · Above Ground"
                />
                <div className="w-full h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={placeWiseFatalData}
                        dataKey="count"
                        nameKey="place"
                        cx="50%"
                        cy="50%"
                        outerRadius={95}
                        innerRadius={50}
                        paddingAngle={3}
                        label={({ percentage }) => `${percentage}%`}>
                        {placeWiseFatalData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {placeWiseFatalData.map((p, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-xs py-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-sm"
                          style={{ backgroundColor: p.color }}
                        />
                        <span className="text-gray-700">{p.place}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-900 tabular-nums">
                          {p.count}
                        </span>
                        <span className="text-gray-400 w-10 text-right tabular-nums">
                          {p.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Highlight>
                    <strong>Opencast mining</strong> accounts for{" "}
                    <strong>70% of all fatal accidents</strong> — a critical
                    safety concern.
                  </Highlight>
                </div>
              </Card>

              <Card>
                <SectionTitle
                  icon={MapPin}
                  title="Serious Accidents by Location"
                  subtitle="Where injuries are concentrated"
                />
                <div className="w-full h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={placeWiseSeriousData}
                        dataKey="count"
                        nameKey="place"
                        cx="50%"
                        cy="50%"
                        outerRadius={95}
                        innerRadius={50}
                        paddingAngle={3}
                        label={({ percentage }) => `${percentage}%`}>
                        {placeWiseSeriousData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {placeWiseSeriousData.map((p, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-xs py-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-sm"
                          style={{ backgroundColor: p.color }}
                        />
                        <span className="text-gray-700">{p.place}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-900 tabular-nums">
                          {p.count}
                        </span>
                        <span className="text-gray-400 w-10 text-right tabular-nums">
                          {p.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Highlight>
                    <strong>Above Ground</strong> has the highest serious
                    accidents at <strong>55%</strong> — likely due to material
                    handling and processing.
                  </Highlight>
                </div>
              </Card>
            </div>

            <Card>
              <SectionTitle
                icon={Activity}
                title="Year-wise Location Distribution"
                subtitle="How accident locations shifted over a decade"
              />
              <div className="w-full h-72 sm:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={placeYearlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="year" stroke="#9ca3af" fontSize={12} />
                    <YAxis width={20} stroke="#9ca3af" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                      iconType="circle"
                      iconSize={8}
                    />
                    <Bar dataKey="Opencast" stackId="a" fill="#1f2937" />
                    <Bar dataKey="Above Ground" stackId="a" fill="#6b7280" />
                    <Bar
                      dataKey="Below Ground"
                      stackId="a"
                      fill="#d1d5db"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        )}

        {/* ===== ZONES & MINERALS ===== */}
        {expandedSection === "zones" && (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <SectionTitle
                  icon={MapPin}
                  title="Zone-wise Fatal Accidents"
                  subtitle="DGMS zonal distribution (2013–2022)"
                />
                <div className="w-full h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      cx="50%"
                      cy="50%"
                      innerRadius="20%"
                      outerRadius="90%"
                      data={zoneWiseData}
                      startAngle={90}
                      endAngle={-270}>
                      <RadialBar background dataKey="count" cornerRadius={4}>
                        {zoneWiseData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </RadialBar>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        iconSize={8}
                        wrapperStyle={{ fontSize: 11 }}
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                      />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card>
                <SectionTitle
                  icon={Droplets}
                  title="Mineral-wise Fatal Accidents"
                  subtitle="Distribution by mined mineral"
                />
                <div className="w-full h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mineralWiseData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="mineral"
                        stroke="#9ca3af"
                        fontSize={10}
                        angle={-35}
                        textAnchor="end"
                        height={80}
                        interval={0}
                      />
                      <YAxis width={20} stroke="#9ca3af" fontSize={12} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        {mineralWiseData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <Highlight title="Stone Mines — Highest Risk">
                <strong>99 fatal accidents</strong> (23%) — largely due to fall
                of sides and opencast working conditions.
              </Highlight>
              <Highlight title="Oil Mines Concern">
                <strong>43 fatal accidents</strong> (10%) — with a serious
                accident share of 26%, the highest among all minerals.
              </Highlight>
              <Highlight title="Granite & Iron">
                Granite (54) and Iron (40) round out the top 5, reflecting
                opencast mining dominance.
              </Highlight>
            </div>
          </div>
        )}

        {/* ===== INSIGHTS ===== */}
        {expandedSection === "insights" && (
          <div className="space-y-8">
            <Card>
              <SectionTitle
                icon={Info}
                title="Executive Summary"
                subtitle="Key takeaways from the DGMS SANKET report"
              />
              <div className="grid sm:grid-cols-2 gap-4">
                <Highlight title="✓ Overall Downward Trend">
                  Fatal accidents in non-coal mines reduced by{" "}
                  <strong>{declinePercentage}%</strong> between 2013 (58) and
                  2022 (40). Serious accidents also declined steadily after
                  peaking in 2019.
                </Highlight>
                <Highlight title="⚠ Opencast Mining Dominance">
                  Opencast mines account for{" "}
                  <strong>70% of fatal accidents</strong> — 297 out of 426
                  total. Focused safety interventions are needed here.
                </Highlight>
                <Highlight title="⚠ Fall-Related Causes">
                  "Fall (Other than Fall of Ground)" is the{" "}
                  <strong>leading cause</strong> at 28.2% — 120 accidents.
                  Ground movement follows at 23.9%.
                </Highlight>
                <Highlight title="ℹ Above Ground Injuries">
                  Above Ground locations have{" "}
                  <strong>55% of serious accidents</strong>, despite lower
                  fatality share — suggesting non-fatal but severe injuries
                  dominate.
                </Highlight>
                <Highlight title="⚠ Mineral Concentration">
                  Stone (23%), Granite (13%), Oil (10%), and Iron (9%) together
                  account for <strong>55% of fatal accidents</strong>.
                </Highlight>
                <Highlight title="✓ 2021 & 2022 Progress">
                  Fatal accidents dropped to <strong>33 (2021)</strong> and 40
                  (2022) — the lowest levels in the decade.
                </Highlight>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-gray-500" />
                  Recommendations
                </h3>
                <ol className="space-y-3 text-sm text-gray-700">
                  {[
                    "Strengthen bench, slope and side stability protocols in opencast mines.",
                    "Enforce fall protection (safety belts, lifelines, guard rails) for all height-related work.",
                    "Improve training for HEMM operators and statutory supervisors.",
                    "Deploy real-time slope monitoring in fire-affected and geologically disturbed areas.",
                    "Institutionalize Safety Management Plans (SMP) and SOPs, with regular audits.",
                    'Target the "Vision Zero" goal through data-driven, zone-specific interventions.',
                  ].map((rec, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-gray-400 font-mono text-xs pt-0.5 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Card>

            <Card>
              <SectionTitle
                icon={Activity}
                title="Data Snapshot"
                subtitle="At-a-glance statistical summary"
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                {[
                  { label: "Fatal Accidents", value: totalFatalAccidents },
                  { label: "Fatalities", value: totalFatalities },
                  { label: "Serious Accidents", value: totalSeriousAccidents },
                  { label: "Seriously Injured", value: totalSeriouslyInjured },
                  { label: "Severity Index", value: avgSeverity },
                  { label: "Opencast Share", value: "70%" },
                  { label: "Top Cause Share", value: "28.2%" },
                  {
                    label: "Decline 2013→2022",
                    value: `${declinePercentage}%`,
                  },
                ].map((s, i) => (
                  <div key={i} className="bg-white p-4 sm:p-5 text-center">
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 tabular-nums">
                      {s.value}
                    </p>
                    <p className="text-xs text-gray-500 mt-1.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* ===== FOOTER ===== */}
        <footer className="mt-12 pt-6 border-t border-gray-200 text-xs text-gray-500">
          Data source: DGMS SANKET — Statistical Analysis &amp; Numbers: Key
          Evaluation of Trends in Non-Coal Mine Accidents (2016–2022) · Ministry
          of Labour &amp; Employment, Government of India
        </footer>
      </div>
    </div>
  );
}
