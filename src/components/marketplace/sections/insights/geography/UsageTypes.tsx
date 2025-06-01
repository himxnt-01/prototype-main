import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface UsageTypesProps {
  data: Array<{
    type: string;
    count: number;
    avgValue: number;
    growth: number;
  }>;
}

const COLORS = [
  'hsl(var(--primary))',
  'hsl(217, 91%, 60%)', // blue-500
  'hsl(292, 84%, 61%)', // purple-500
  'hsl(334, 85%, 51%)', // pink-500
];

export function UsageTypes({ data }: UsageTypesProps) {
  return (
    <div className="space-y-6">
      <h4 className="text-sm font-medium text-muted-foreground">Usage Types</h4>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="type"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
            >
              {data.map((entry, index) => (
                <Cell key={entry.type} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        {data.map((usage, index) => (
          <div key={usage.type} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm">{usage.type}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              ${usage.avgValue.toLocaleString()} avg.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
