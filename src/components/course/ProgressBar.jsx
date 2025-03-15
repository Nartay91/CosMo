import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { useProgressStore } from "/cosmo/my-app/src/store/useProgressStore";

export default function ProgressBar() {
  const { progress } = useProgressStore();
  const data = [{ name: "Прогресс", value: progress }];

  return (
    <div style={{ width: "100%", height: 40 }}>
      <h3 style={{ marginBottom: "0", marginTop: "0", display: "flex", justifyContent: "flex-end" }}>
        {progress}%
      </h3>
      <ResponsiveContainer width="100%" height={30}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis type="category" dataKey="name" hide />
          <Tooltip />
          <Bar 
            dataKey="value" 
            fill="#2196F3" 
            background={{ fill: "#e0e0e0" }} 
            barSize={20}
          >
            <LabelList dataKey="value" position="insideRight" fill="white" fontSize={14} formatter={(value) => `${value}%`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}