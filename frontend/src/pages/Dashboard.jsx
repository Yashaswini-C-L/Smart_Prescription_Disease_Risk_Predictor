import React, { useState, useEffect } from 'react';
import { useAuth } from '../services/AuthContext';
import { dashboardService } from '../services/authService';
import {
  FileText,
  AlertTriangle,
  Activity,
  CalendarCheck,
  Clock,
  HeartPulse
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

const sampleTrendData = [
  { month: 'Jun', riskScore: 35 },
  { month: 'Jul', riskScore: 32 },
  { month: 'Aug', riskScore: 30 },
  { month: 'Sep', riskScore: 34 },
  { month: 'Oct', riskScore: 29 },
  { month: 'Nov', riskScore: 28 },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await dashboardService.getSummary();
        if (data.success) {
          setSummary(data.data);
        }
      } catch (err) {
        console.error('Failed to load dashboard summary:', err);
      }
    };

    fetchSummary();
  }, []);

  const statCards = [
    {
      title: 'Prescriptions Stored',
      value: summary?.stats?.totalPrescriptions || '0',
      label: 'Digital medical records',
      icon: FileText,
      color: 'forest'
    },
    {
      title: 'Lab Reports',
      value: summary?.stats?.totalLabReports || '0',
      label: 'Diagnostic results logged',
      icon: Activity,
      color: 'forest'
    },
    {
      title: 'Active Interactions',
      value: summary?.stats?.drugInteractionsDetected || '0',
      label: 'Medication alerts checked',
      icon: AlertTriangle,
      color: 'amber'
    },
    {
      title: 'Disease Risk Index',
      value: `${summary?.latestAssessment?.riskScore || 28}%`,
      label: `${summary?.latestAssessment?.riskCategory || 'Low'} progression risk`,
      icon: HeartPulse,
      color: 'emerald'
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white rounded-xl shadow-card border border-ivory-dark p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold text-sage uppercase tracking-wider">Patient Overview</span>
          <h1 className="text-lg sm:text-xl font-bold text-forest-dark mt-0.5">
            Welcome back, {user?.name || 'Patient'}
          </h1>
          <p className="text-xs text-gray-500 mt-1 max-w-2xl leading-relaxed">
            Track your medical history, cross-reference drug combinations, and monitor preventative health metrics.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 w-full sm:w-auto">
          <div className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-ivory text-xs font-medium text-forest-dark border border-ivory-dark flex items-center justify-center sm:justify-start gap-1.5">
            <Clock className="w-3.5 h-3.5 text-sage-dark shrink-0" />
            <span>Last visit recorded: None</span>
          </div>
        </div>
      </div>

      {/* KPI Cards: 1 col on mobile, 2 col on tablet, 4 col on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-xl shadow-card border border-ivory-dark p-4 sm:p-5 flex flex-col justify-between min-h-[110px]"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-600 truncate mr-2">{card.title}</span>
                <div className="w-8 h-8 rounded-lg bg-ivory flex items-center justify-center text-forest shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-forest-dark tracking-tight">{card.value}</p>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{card.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Section: Health Risk Chart & Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Risk Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-card border border-ivory-dark p-4 sm:p-6 min-w-0 overflow-hidden flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4 pb-3 border-b border-gray-100">
            <div>
              <h2 className="text-sm font-semibold text-forest-dark">Health Risk Trend Indicator</h2>
              <p className="text-[11px] sm:text-xs text-gray-400">Assessed longitudinal disease risk (6-month retrospective)</p>
            </div>
            <span className="self-start sm:self-auto text-xs font-medium px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-md border border-emerald-200 shrink-0">
              Optimal / Low Risk
            </span>
          </div>

          <div className="h-60 sm:h-64 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sampleTrendData} margin={{ top: 10, right: 10, left: -22, bottom: 0 }}>
                <defs>
                  <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#263B36" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#263B36" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E7E2D5" vertical={false} />
                <XAxis dataKey="month" stroke="#8E9F86" fontSize={11} tickLine={false} />
                <YAxis domain={[0, 100]} stroke="#8E9F86" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    border: '1px solid #E7E2D5',
                    fontSize: '12px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="riskScore"
                  stroke="#263B36"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#riskGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Health Monitoring Roadmap Preview */}
        <div className="bg-white rounded-xl shadow-card border border-ivory-dark p-4 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-forest-dark">Monitoring Roadmap</h2>
              <CalendarCheck className="w-4 h-4 text-forest shrink-0" />
            </div>

            <div className="space-y-3.5 sm:space-y-4">
              <div className="flex items-start gap-3">
                <span className="w-16 shrink-0 text-[10px] sm:text-[11px] font-semibold text-forest bg-sage-light/30 px-2 py-1 rounded text-center">
                  3 Months
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-forest-dark">Fasting Blood Sugar (FBS)</p>
                  <p className="text-[11px] text-gray-500">Monitor glycemic stability</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-16 shrink-0 text-[10px] sm:text-[11px] font-semibold text-forest bg-sage-light/30 px-2 py-1 rounded text-center">
                  6 Months
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-forest-dark">Lipid Profile & BP</p>
                  <p className="text-[11px] text-gray-500">Cardiovascular panel evaluation</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-16 shrink-0 text-[10px] sm:text-[11px] font-semibold text-forest bg-sage-light/30 px-2 py-1 rounded text-center">
                  1 Year
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-forest-dark">Annual Health Review</p>
                  <p className="text-[11px] text-gray-500">Comprehensive diagnostic checkup</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 mt-4">
            <p className="text-[11px] text-gray-400">
              Follow-up recommendations are generated in collaboration with Module 5 & 6.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
