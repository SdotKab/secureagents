'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function RiskBarChart({ data }: { data: { category: string; score: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis domain={[0, 5]} />
        <Tooltip />
        <Bar dataKey="score" fill="#60a5fa" />
      </BarChart>
    </ResponsiveContainer>
  );
}
