
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Badge } from "@/components/ui/badge";

interface ProbabilityChartProps {
  data: {
    homeTeam: string;
    awayTeam: string;
    homeWinProb: number;
    drawProb: number;
    awayWinProb: number;
    confidence: number;
    homePosition?: number;
    awayPosition?: number;
  };
}

export function ProbabilityChart({ data }: ProbabilityChartProps) {
  const chartData = [
    { name: `${data.homeTeam} (Casa)`, value: data.homeWinProb, color: 'hsl(var(--chart-1))' },
    { name: 'Empate', value: data.drawProb, color: 'hsl(var(--chart-3))' },
    { name: `${data.awayTeam} (Fora)`, value: data.awayWinProb, color: 'hsl(var(--chart-2))' }
  ];

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-3))', 'hsl(var(--chart-2))'];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-2 shadow-lg">
          <p className="text-sm font-medium">{payload[0].name}</p>
          <p className="text-sm text-primary">{`${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Posições dos Times */}
      {(data.homePosition || data.awayPosition) && (
        <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border">
          <div className="text-center flex-1">
            <p className="text-sm text-muted-foreground">{data.homeTeam}</p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <Badge variant="outline" className="text-chart-1 border-chart-1">
                🏠 Casa
              </Badge>
              {data.homePosition && (
                <Badge variant="secondary" className="font-bold">
                  {data.homePosition}º lugar
                </Badge>
              )}
            </div>
          </div>
          
          <div className="px-4">
            <span className="text-2xl">VS</span>
          </div>
          
          <div className="text-center flex-1">
            <p className="text-sm text-muted-foreground">{data.awayTeam}</p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <Badge variant="outline" className="text-chart-2 border-chart-2">
                ✈️ Fora
              </Badge>
              {data.awayPosition && (
                <Badge variant="secondary" className="font-bold">
                  {data.awayPosition}º lugar
                </Badge>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Gráfico de Probabilidades */}
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground">Probabilidades de Resultado</h3>
          <p className="text-sm text-muted-foreground">Confiança: {data.confidence}%</p>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${value}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
