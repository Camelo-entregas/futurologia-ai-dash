
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { Home, Plane, Trophy } from 'lucide-react';

interface ProbabilityChartProps {
  homeTeam: string;
  awayTeam: string;
  homePosition?: number;
  awayPosition?: number;
  predictions: {
    homeWin: number;
    draw: number;
    awayWin: number;
  };
}

const ProbabilityChart = ({ homeTeam, awayTeam, homePosition, awayPosition, predictions }: ProbabilityChartProps) => {
  const data = [
    { name: `${homeTeam} (Casa)`, value: predictions.homeWin, color: '#00ff41' },
    { name: 'Empate', value: predictions.draw, color: '#ffff00' },
    { name: `${awayTeam} (Fora)`, value: predictions.awayWin, color: '#ff4444' }
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs sm:text-sm font-bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-full space-y-4">
      {/* Team positions header - Mobile optimized */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-primary/5 rounded-lg">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <Home className="h-4 w-4 text-primary" />
          <span className="font-medium text-sm sm:text-base">{homeTeam}</span>
          <Badge variant="secondary" className="text-xs">Casa</Badge>
          {homePosition && (
            <Badge variant="outline" className="text-xs">
              <Trophy className="h-3 w-3 mr-1" />
              {homePosition}º
            </Badge>
          )}
        </div>
        
        <div className="hidden sm:block text-muted-foreground font-bold">VS</div>
        
        <div className="flex items-center gap-2 text-center sm:text-right">
          {awayPosition && (
            <Badge variant="outline" className="text-xs">
              <Trophy className="h-3 w-3 mr-1" />
              {awayPosition}º
            </Badge>
          )}
          <Badge variant="secondary" className="text-xs">Fora</Badge>
          <span className="font-medium text-sm sm:text-base">{awayTeam}</span>
          <Plane className="h-4 w-4 text-primary" />
        </div>
      </div>

      {/* Chart container - Responsive */}
      <div className="w-full">
        <ResponsiveContainer width="100%" height={300} minHeight={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Probabilidade']}
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid #333',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Legend 
              wrapperStyle={{
                paddingTop: '20px',
                fontSize: '12px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Mobile-friendly prediction summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
        <div className="text-center p-3 bg-green-500/10 rounded-lg">
          <div className="text-lg sm:text-xl font-bold text-green-400">{predictions.homeWin}%</div>
          <div className="text-xs sm:text-sm text-muted-foreground">Vitória Casa</div>
        </div>
        <div className="text-center p-3 bg-yellow-500/10 rounded-lg">
          <div className="text-lg sm:text-xl font-bold text-yellow-400">{predictions.draw}%</div>
          <div className="text-xs sm:text-sm text-muted-foreground">Empate</div>
        </div>
        <div className="text-center p-3 bg-red-500/10 rounded-lg">
          <div className="text-lg sm:text-xl font-bold text-red-400">{predictions.awayWin}%</div>
          <div className="text-xs sm:text-sm text-muted-foreground">Vitória Fora</div>
        </div>
      </div>
    </div>
  );
};

export default ProbabilityChart;
