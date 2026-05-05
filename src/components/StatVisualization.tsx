import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip,
} from "recharts";

export type VizStyle =
  | "line_smooth" | "line_sharp"
  | "bar_vertical" | "bar_horizontal" | "bar_stacked"
  | "pie" | "donut"
  | "area" | "gradient_area"
  | "kpi";

export const VIZ_STYLES: { id: VizStyle; label: string }[] = [
  { id: "line_smooth", label: "Line Graph (Smooth)" },
  { id: "line_sharp", label: "Line Graph (Sharp)" },
  { id: "bar_vertical", label: "Bar Chart (Vertical)" },
  { id: "bar_horizontal", label: "Bar Chart (Horizontal)" },
  { id: "bar_stacked", label: "Stacked Bar" },
  { id: "pie", label: "Pie Chart" },
  { id: "donut", label: "Donut Chart" },
  { id: "area", label: "Area Chart" },
  { id: "gradient_area", label: "Gradient Graph" },
  { id: "kpi", label: "Minimal KPI Chart" },
];

const PRIMARY = "hsl(var(--primary))";
const MUTED = "hsl(var(--muted-foreground))";
const PIE_COLORS = ["hsl(var(--primary))", "hsl(var(--primary) / 0.7)", "hsl(var(--primary) / 0.45)", "hsl(var(--primary) / 0.25)"];

interface Props {
  style: VizStyle;
  data?: number[];
  labels?: string[];
  height?: number;
}

export default function StatVisualization({ style, data, labels, height = 80 }: Props) {
  const values = data && data.length ? data : [12, 18, 15, 22, 28, 26, 34];
  const lbls = labels && labels.length === values.length ? labels : values.map((_, i) => `${i + 1}`);
  const chartData = values.map((v, i) => ({ name: lbls[i], value: v, value2: Math.round(v * 0.65) }));

  if (style === "kpi") {
    const max = Math.max(...values);
    return (
      <div className="flex items-end gap-1 h-full" style={{ height }}>
        {values.map((v, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-primary/80 transition-all"
            style={{ height: `${(v / max) * 100}%`, minHeight: 4 }}
          />
        ))}
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      {(() => {
        switch (style) {
          case "line_smooth":
            return (
              <LineChart data={chartData} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
                <Line type="monotone" dataKey="value" stroke={PRIMARY} strokeWidth={2.5} dot={false} isAnimationActive />
              </LineChart>
            );
          case "line_sharp":
            return (
              <LineChart data={chartData} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
                <Line type="linear" dataKey="value" stroke={PRIMARY} strokeWidth={2.5} dot={{ r: 2 }} isAnimationActive />
              </LineChart>
            );
          case "bar_vertical":
            return (
              <BarChart data={chartData} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
                <Bar dataKey="value" fill={PRIMARY} radius={[4, 4, 0, 0]} />
              </BarChart>
            );
          case "bar_horizontal":
            return (
              <BarChart data={chartData} layout="vertical" margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" hide />
                <Bar dataKey="value" fill={PRIMARY} radius={[0, 4, 4, 0]} />
              </BarChart>
            );
          case "bar_stacked":
            return (
              <BarChart data={chartData} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
                <Bar dataKey="value" stackId="a" fill={PRIMARY} radius={[0, 0, 0, 0]} />
                <Bar dataKey="value2" stackId="a" fill="hsl(var(--primary) / 0.4)" radius={[4, 4, 0, 0]} />
              </BarChart>
            );
          case "pie":
            return (
              <PieChart>
                <Pie data={chartData} dataKey="value" nameKey="name" outerRadius="90%">
                  {chartData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
              </PieChart>
            );
          case "donut":
            return (
              <PieChart>
                <Pie data={chartData} dataKey="value" nameKey="name" innerRadius="55%" outerRadius="90%" paddingAngle={2}>
                  {chartData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
              </PieChart>
            );
          case "area":
            return (
              <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
                <Area type="monotone" dataKey="value" stroke={PRIMARY} fill={PRIMARY} fillOpacity={0.25} />
              </AreaChart>
            );
          case "gradient_area":
            return (
              <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
                <defs>
                  <linearGradient id="vizGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={PRIMARY} stopOpacity={0.7} />
                    <stop offset="100%" stopColor={PRIMARY} stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke={PRIMARY} strokeWidth={2} fill="url(#vizGrad)" />
              </AreaChart>
            );
          default:
            return <div />;
        }
      })()}
    </ResponsiveContainer>
  );
}
