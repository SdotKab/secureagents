// src/components/Dashboard/AssessmentDashboard.tsx
'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface RiskCategory {
  category: string;
  score: number;
}

const COLORS = ['#10b981', '#facc15', '#ef4444'];

const getColor = (score: number) => {
  if (score <= 2) return COLORS[0]; // Low - Green
  if (score <= 4) return COLORS[1]; // Medium - Yellow
  return COLORS[2]; // High - Red
};

export default function AssessmentDashboard() {
  const [riskData, setRiskData] = useState<RiskCategory[]>([]);

  useEffect(() => {
    const fetchLatestReport = async () => {
      const { data, error } = await supabase
        .from('reports')
        .select('risk_summary')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (data) setRiskData(data.risk_summary);
      if (error) console.error('Failed to fetch latest report:', error);
    };

    fetchLatestReport();
  }, []);

  const exportChartsAsPDF = async () => {
    const chartSection = document.getElementById('chart-section');
    if (!chartSection) return;

    const canvas = await html2canvas(chartSection);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 10, width, height);
    pdf.save('risk_report.pdf');
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Assessment Charts</h2>
        <button
          onClick={exportChartsAsPDF}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          📄 Export Report as PDF
        </button>
      </div>

      <div id="chart-section" className="space-y-8">
        {/* Bar Chart */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Risk Score by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={riskData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => `Score: ${value}`}
                labelFormatter={(label: string) => `Category: ${label}`}
              />
              <Bar dataKey="score">
                {riskData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={getColor(entry.score)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Risk Radar</h3>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={riskData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis angle={30} domain={[0, 5]} />
              <Tooltip
                formatter={(value: number) => `Score: ${value}`}
                labelFormatter={(label: string) => `Category: ${label}`}
              />
              <Radar name="Risk Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Severity Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Tooltip
                formatter={(value: number, name: string) => [`${value} categories`, name]}
              />
              <Legend />
              <Pie
                data={[
                  {
                    name: 'Low (1–2)',
                    value: riskData.filter(d => d.score <= 2).length,
                  },
                  {
                    name: 'Medium (3–4)',
                    value: riskData.filter(d => d.score > 2 && d.score <= 4).length,
                  },
                  {
                    name: 'High (5)',
                    value: riskData.filter(d => d.score === 5).length,
                  },
                ]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                label
              >
                <Cell fill="#10b981" />
                <Cell fill="#facc15" />
                <Cell fill="#ef4444" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
