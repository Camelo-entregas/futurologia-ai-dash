import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface ProbabilityChartProps {
  data: {
    homeTeam: string;
    awayTeam: string;
    homeWinProb: number;
    drawProb: number;
    awayWinProb: number;
    confidence: number;
  };
}

export function ProbabilityChart({ data }: ProbabilityChartProps) {
  const chartData = [
    { name: data.homeTeam, value: data.homeWinProb, color: "hsl(var(--chart-1))" },
    { name: "Empate", value: data.drawProb, color: "hsl(var(--chart-3))" },
    { name: data.awayTeam, value: data.awayWinProb, color: "hsl(var(--chart-2))" },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-foreground font-semibold">{payload[0].name}</p>
          <p className="text-primary">{payload[0].value}% de chance</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-3 rounded-lg bg-secondary/30">
          <p className="text-sm text-muted-foreground">{data.homeTeam}</p>
          <p className="text-xl font-bold text-primary">{data.homeWinProb}%</p>
        </div>
        <div className="p-3 rounded-lg bg-secondary/30">
          <p className="text-sm text-muted-foreground">Empate</p>
          <p className="text-xl font-bold text-warning">{data.drawProb}%</p>
        </div>
        <div className="p-3 rounded-lg bg-secondary/30">
          <p className="text-sm text-muted-foreground">{data.awayTeam}</p>
          <p className="text-xl font-bold text-destructive">{data.awayWinProb}%</p>
        </div>
      </div>
    </div>
  );
}