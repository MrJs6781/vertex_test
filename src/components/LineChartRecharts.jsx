import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";

// Chart data types
const CHART_TYPES = {
  VISITORS: "Visitors",
  CONNECTIONS: "Connections",
  INTERACTIONS: "Interactions",
  IMPRESSIONS: "Impressions",
};

// Time periods
const TIME_PERIODS = {
  TODAY: "Today",
  YESTERDAY: "Yesterday",
  THIS_WEEK: "This week",
  LAST_WEEK: "Last week",
  LAST_7_DAYS: "Last 7 days",
  LAST_30_DAYS: "Last 30 days",
};

// Format large numbers to K/M format
const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
};

// Generate some random data for demonstration
const generateData = (count = 30, min = 10, max = 100) => {
  return Array.from(
    { length: count },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );
};

// Generate larger test data for K/M formatting
const generateLargeData = (count = 30, min = 800, max = 2500) => {
  return Array.from(
    { length: count },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );
};

// Generate dates for x-axis based on time period
const generateDates = (timePeriod) => {
  const now = new Date();
  const dates = [];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  switch (timePeriod) {
    case TIME_PERIODS.TODAY:
      // Generate hours for today
      for (let i = 0; i < 24; i++) {
        dates.push(`${i}:00`);
      }
      break;
    case TIME_PERIODS.YESTERDAY:
      // Generate hours for yesterday
      for (let i = 0; i < 24; i++) {
        dates.push(`${i}:00`);
      }
      break;
    case TIME_PERIODS.THIS_WEEK:
    case TIME_PERIODS.LAST_WEEK:
      // Generate days of the week with dates
      const startDate = new Date(now);
      const dayOffset = timePeriod === TIME_PERIODS.THIS_WEEK ? 0 : -7;
      const currentDay = now.getDay();

      // Move to the beginning of the week (Sunday)
      startDate.setDate(now.getDate() - currentDay + dayOffset);

      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        dates.push(`${months[date.getMonth()]} ${date.getDate()}`);
      }
      break;
    case TIME_PERIODS.LAST_7_DAYS:
      // Generate last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        dates.push(`${months[date.getMonth()]} ${date.getDate()}`);
      }
      break;
    case TIME_PERIODS.LAST_30_DAYS:
      // Generate last 30 days
      for (let i = 29; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        dates.push(`${months[date.getMonth()]} ${date.getDate()}`);
      }
      break;
    default:
      break;
  }

  return dates;
};

// Default example datasets
const exampleDatasets = {
  [CHART_TYPES.VISITORS]: {
    [TIME_PERIODS.TODAY]: generateLargeData(24, 800, 2500),
    [TIME_PERIODS.YESTERDAY]: generateLargeData(24, 900, 2200),
    [TIME_PERIODS.THIS_WEEK]: generateLargeData(7, 1000, 3500),
    [TIME_PERIODS.LAST_WEEK]: generateLargeData(7, 1200, 3000),
    [TIME_PERIODS.LAST_7_DAYS]: generateLargeData(7, 1500, 4000),
    [TIME_PERIODS.LAST_30_DAYS]: generateLargeData(30, 1800, 5000),
  },
  [CHART_TYPES.CONNECTIONS]: {
    [TIME_PERIODS.TODAY]: generateData(24, 500, 1500),
    [TIME_PERIODS.YESTERDAY]: generateData(24, 600, 1400),
    [TIME_PERIODS.THIS_WEEK]: generateData(7, 700, 2000),
    [TIME_PERIODS.LAST_WEEK]: generateData(7, 650, 1800),
    [TIME_PERIODS.LAST_7_DAYS]: generateData(7, 800, 2200),
    [TIME_PERIODS.LAST_30_DAYS]: generateData(30, 1000, 2800),
  },
  [CHART_TYPES.INTERACTIONS]: {
    [TIME_PERIODS.TODAY]: generateData(24, 100, 800),
    [TIME_PERIODS.YESTERDAY]: generateData(24, 150, 750),
    [TIME_PERIODS.THIS_WEEK]: generateData(7, 200, 1000),
    [TIME_PERIODS.LAST_WEEK]: generateData(7, 180, 950),
    [TIME_PERIODS.LAST_7_DAYS]: generateData(7, 250, 1200),
    [TIME_PERIODS.LAST_30_DAYS]: generateData(30, 300, 1500),
  },
  [CHART_TYPES.IMPRESSIONS]: {
    [TIME_PERIODS.TODAY]: generateLargeData(24, 3000, 8000),
    [TIME_PERIODS.YESTERDAY]: generateLargeData(24, 3500, 7500),
    [TIME_PERIODS.THIS_WEEK]: generateLargeData(7, 4000, 12000),
    [TIME_PERIODS.LAST_WEEK]: generateLargeData(7, 4500, 10000),
    [TIME_PERIODS.LAST_7_DAYS]: generateLargeData(7, 5000, 15000),
    [TIME_PERIODS.LAST_30_DAYS]: generateLargeData(30, 6000, 20000),
  },
};

// Chart line colors
const CHART_COLORS = [
  "#3B82F6", // Blue
  "#EF4444", // Red
  "#10B981", // Green
  "#F59E0B", // Amber
  "#8B5CF6", // Purple
  "#EC4899", // Pink
];

// Custom dropdown arrow icon as SVG component
const DropdownIcon = () => (
  <svg
    width="10"
    height="6"
    viewBox="0 0 10 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1L5 5L9 1"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Custom tooltip component for Recharts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <div className="font-medium text-gray-700 border-b border-gray-200 pb-1 mb-1">
          {label}
        </div>
        {payload.map((entry, index) => (
          <div
            key={`item-${index}`}
            className="flex items-center justify-between gap-2 py-0.5"
          >
            <div className="flex items-center">
              <div
                className="w-3 h-3 mr-1 rounded-sm"
                style={{ backgroundColor: entry.color }}
              ></div>
              <span>{entry.dataKey}:</span>
            </div>
            <span className="font-medium">{formatNumber(entry.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function RechartsLineChart() {
  const [activeCharts, setActiveCharts] = useState([
    { id: "chart-1", type: CHART_TYPES.VISITORS },
  ]);
  const [timePeriod, setTimePeriod] = useState(TIME_PERIODS.THIS_WEEK);
  const [addableCharts, setAddableCharts] = useState([]);
  const [selectOpen, setSelectOpen] = useState(null);
  const [chartData, setChartData] = useState([]);

  const chartContainerRef = useRef(null);

  // Calculate available chart types
  useEffect(() => {
    const activeTypes = activeCharts.map((chart) => chart.type);
    const availableTypes = Object.values(CHART_TYPES).filter(
      (type) => !activeTypes.includes(type)
    );
    setAddableCharts(availableTypes);
  }, [activeCharts]);

  // Prepare chart data in format needed by Recharts
  useEffect(() => {
    if (activeCharts.length > 0 && timePeriod) {
      const dates = generateDates(timePeriod);
      const formattedData = dates.map((date, index) => {
        const dataPoint = { name: date };

        activeCharts.forEach((chart) => {
          const chartData = exampleDatasets[chart.type][timePeriod];
          dataPoint[chart.type] = chartData[index] || 0;
        });

        return dataPoint;
      });

      setChartData(formattedData);
    }
  }, [activeCharts, timePeriod]);

  // Calculate totals for each chart type
  const calculateTotals = () => {
    const totals = {};

    activeCharts.forEach((chart) => {
      const data = exampleDatasets[chart.type][timePeriod];
      if (data && data.length) {
        // Calculate total sum of all values
        const total = data.reduce((sum, val) => sum + val, 0);
        totals[chart.type] = total;
      }
    });

    return totals;
  };

  const chartTotals = calculateTotals();

  // Handle adding a new chart type
  const handleAddChart = (chartTypeToAdd) => {
    if (activeCharts.length < CHART_COLORS.length) {
      setActiveCharts((prev) => [
        ...prev,
        { id: `chart-${Date.now()}`, type: chartTypeToAdd },
      ]);
    }
  };

  // Handle removing a chart
  const handleRemoveChart = (chartId) => {
    setActiveCharts((prev) => {
      // Don't allow removing the last chart
      if (prev.length <= 1) return prev;
      return prev.filter((chart) => chart.id !== chartId);
    });
  };

  // Time Period selector with custom styling
  const renderTimePeriodSelector = () => {
    return (
      <div className="relative">
        <div
          className={`relative custom-select ${
            selectOpen === "time" ? "open" : ""
          }`}
          onClick={() => setSelectOpen(selectOpen === "time" ? null : "time")}
        >
          <div className="select-selected">
            {timePeriod}
            <span className="select-arrow">
              <DropdownIcon />
            </span>
          </div>
          {selectOpen === "time" && (
            <div className="select-items">
              {Object.values(TIME_PERIODS).map((period) => (
                <div
                  key={period}
                  className={`select-item ${
                    period === timePeriod ? "selected" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setTimePeriod(period);
                    setSelectOpen(null);
                  }}
                >
                  {period}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        chartContainerRef.current &&
        !chartContainerRef.current.contains(event.target)
      ) {
        setSelectOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Custom YAxis tick formatter
  const formatYAxisTick = (value) => {
    return formatNumber(value);
  };

  // Custom XAxis tick formatter to prevent overcrowding
  const formatXAxisTick = (value, index, ticks) => {
    if (!ticks || ticks.length <= 7) return value;
    if (index === 0 || index === ticks.length - 1) return value;
    if (ticks.length > 20) {
      return index % 5 === 0 ? value : "";
    }
    return index % 2 === 0 ? value : "";
  };

  // Determine if we need to show fewer ticks on mobile
  const getXAxisTickCount = () => {
    if (window.innerWidth < 768) {
      if (chartData.length > 10) return 5;
      return undefined; // Let Recharts decide
    }
    return undefined; // Let Recharts decide for desktop
  };

  return (
    <div
      className="w-full p-4 bg-transparent rounded-lg shadow-md chart-component"
      ref={chartContainerRef}
    >
      <div className="chart-controls relative h-16">
        {/* Active Chart Selectors - Positioned Absolutely */}
        <div className="absolute top-0 left-4 z-10 flex gap-2">
          {activeCharts.map((chart, index) => (
            <motion.div
              key={chart.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <div
                className={`relative custom-select ${
                  selectOpen === chart.id ? "open" : ""
                }`}
                onClick={() =>
                  setSelectOpen(selectOpen === chart.id ? null : chart.id)
                }
              >
                <div className="select-selected">
                  {chart.type}
                  <span className="select-arrow">
                    <DropdownIcon />
                  </span>
                </div>
                {selectOpen === chart.id && (
                  <div className="select-items">
                    {Object.values(CHART_TYPES).map((type) => (
                      <div
                        key={type}
                        className={`select-item ${
                          type === chart.type ? "selected" : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCharts((prev) =>
                            prev.map((c) =>
                              c.id === chart.id ? { ...c, type: type } : c
                            )
                          );
                          setSelectOpen(null);
                        }}
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="absolute top-7 flex items-center gap-3">
                <h3 className="font-manrope-bold text-primary-extra-large text-white">
                  {formatNumber(chartTotals[chart.type] || 0)}
                </h3>
                <span className="w-fit flex flex-col items-start">
                  <p className="text-primary-green text-xs font-manrope-medium tracking-title">
                    +469%
                  </p>
                  <p className="text-secondary-gray text-xs font-manrope-medium tracking-title">
                    (897)
                  </p>
                </span>
              </div>
              {/* {activeCharts.length > 1 && (
                <button
                  className="absolute -top-2 -right-2 w-4 h-4 bg-gray-800 rounded-full text-white flex items-center justify-center text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveChart(chart.id);
                  }}
                >
                  ×
                </button>
              )} */}
            </motion.div>
          ))}

          {/* Time Period Selector */}
          {renderTimePeriodSelector()}

          {/* Add Chart Dropdown */}
          {activeCharts.length < 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative"
            >
              <div
                className={`relative custom-select add-select ${
                  selectOpen === "add" ? "open" : ""
                }`}
                onClick={() =>
                  setSelectOpen(selectOpen === "add" ? null : "add")
                }
              >
                <div className="select-selected">
                  + Add
                  <span className="select-arrow">
                    <DropdownIcon />
                  </span>
                </div>
                {selectOpen === "add" && addableCharts.length > 0 && (
                  <div className="select-items">
                    {addableCharts.map((type) => (
                      <div
                        key={type}
                        className="select-item"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddChart(type);
                          setSelectOpen(null);
                        }}
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Chart Container */}
      <div
        className="relative w-full bg-transparent rounded-lg overflow-hidden shadow-inner chart-container"
        style={{
          height: "calc(100% - 40px)",
          minHeight: "180px",
          maxHeight: "240px",
        }}
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
          minWidth={300}
          minHeight={210}
        >
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              left: 20,
              bottom: 30,
            }}
          >
            {/* <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              horizontal={true}
              stroke="#E5E7EB"
            /> */}
            <XAxis
              dataKey="name"
              tick={{ fill: "#6B7280", fontSize: 11 }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickLine={{ stroke: "#E5E7EB" }}
              tickFormatter={formatXAxisTick}
              tickCount={getXAxisTickCount()}
            />
            <YAxis
              tickFormatter={formatYAxisTick}
              tick={{ fill: "#6B7280", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "rgba(107, 114, 128, 0.4)", strokeWidth: 1 }}
              wrapperStyle={{
                backgroundColor: "white",
                border: "1px solid #E5E7EB",
                borderRadius: "6px",
                padding: "8px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                zIndex: 1000,
              }}
            />

            {activeCharts.map((chart, index) => (
              <Line
                key={chart.id}
                type="monotone"
                dataKey={chart.type}
                stroke={CHART_COLORS[index % CHART_COLORS.length]}
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  stroke: CHART_COLORS[index % CHART_COLORS.length],
                  strokeWidth: 1,
                  fill: "white",
                }}
                isAnimationActive={true}
                animationDuration={800}
                animationEasing="ease-in-out"
              />
            ))}

            {/* Add gradient areas under lines for better visibility */}
            {activeCharts.map((chart, index) => (
              <defs key={`gradient-${chart.id}`}>
                <linearGradient
                  id={`colorGradient${index}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={CHART_COLORS[index % CHART_COLORS.length]}
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor={CHART_COLORS[index % CHART_COLORS.length]}
                    stopOpacity={0.05}
                  />
                </linearGradient>
              </defs>
            ))}

            {activeCharts.map((chart, index) => (
              <Area
                key={`area-${chart.id}`}
                type="monotone"
                dataKey={chart.type}
                fill={`url(#colorGradient${index})`}
                fillOpacity={1}
                stroke="none"
                isAnimationActive={true}
                animationDuration={800}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
