import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useTranslation } from "react-i18next";
import "../styles/chart.scss";

const Chart = () => {
  const { t } = useTranslation();

  const data = [
    { name: t("months.january"), accuracy: 30, activity: 50, performance: 20 },
    { name: t("months.february"), accuracy: 40, activity: 55, performance: 35 },
    { name: t("months.march"), accuracy: 45, activity: 60, performance: 40 },
    { name: t("months.april"), accuracy: 50, activity: 70, performance: 45 },
    { name: t("months.may"), accuracy: 55, activity: 80, performance: 50 },
    { name: t("months.june"), accuracy: 48, activity: 85, performance: 56 },
    { name: t("months.july"), accuracy: 46, activity: 78, performance: 54 },
    { name: t("months.august"), accuracy: 52, activity: 82, performance: 58 },
    { name: t("months.september"), accuracy: 58, activity: 75, performance: 60 },
    { name: t("months.october"), accuracy: 60, activity: 85, performance: 65 },
    { name: t("months.november"), accuracy: 62, activity: 90, performance: 70 },
    { name: t("months.december"), accuracy: 65, activity: 95, performance: 75 },
  ];

  const renderLegend = () => {
    const legendItems = [
      { color: "green", label: t("accuracy") },
      { color: "blue", label: t("activity") },
      { color: "red", label: t("performance") },
    ];

    return (
      <div className="chart__legend">
        {legendItems.map((item, index) => (
          <div key={index} className="chart__legend-item">
            <span className="chart__legend-dot" style={{ backgroundColor: item.color }}></span>
            {item.label}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="chart">
      <div className="chart__header">
        <h2 className="chart__title">{t("statistics")}</h2>
        {renderLegend()}
      </div>
      <div className="diaramma">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#B0B0B0" fontSize={14} />
          <YAxis stroke="#B0B0B0" />
          <Tooltip />
          <Line type="monotone" dataKey="accuracy" stroke="green" strokeWidth={2} dot={false} name={t("accuracy")} />
          <Line type="monotone" dataKey="activity" stroke="blue" strokeWidth={2} dot={false} name={t("activity")} />
          <Line type="monotone" dataKey="performance" stroke="red" strokeWidth={2} dot={false} name={t("performance")} />
        </LineChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;