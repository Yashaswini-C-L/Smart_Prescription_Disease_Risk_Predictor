import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useHealth } from '../context/HealthContext';
import {
  BrainCircuit,
  Droplet,
  Heart,
  Activity,
  Sliders,
  TrendingUp,
  History,
  RotateCcw,
  AlertTriangle,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import { formatDate } from '../utils/helpers';

const e = React.createElement;

export const DiseaseRisk = () => {
  const { user } = useAuth();
  const { riskAssessments, runRiskAssessment, addToast } = useHealth();

  const [diseaseCategory, setDiseaseCategory] = useState('diabetes'); // 'diabetes' | 'cardiovascular' | 'ckd'
  const [age, setAge] = useState(user.age || 46);
  const [gender, setGender] = useState(user.gender || 'Male');
  const [bmi, setBmi] = useState(user.bmi || 26.6);
  const [systolicBp, setSystolicBp] = useState(138);
  const [fastingGlucose, setFastingGlucose] = useState(112);
  const [hba1c, setHba1c] = useState(6.2);
  const [ldl, setLdl] = useState(138);
  const [smoking, setSmoking] = useState(false);
  const [familyHistory, setFamilyHistory] = useState(true);

  // Active or latest assessment
  const [activeResult, setActiveResult] = useState(riskAssessments[0] || null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCalculate = (ev) => {
    ev.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      const res = runRiskAssessment({
        diseaseCategory,
        age: Number(age),
        bmi: Number(bmi),
        systolicBp: Number(systolicBp),
        fastingGlucose: Number(fastingGlucose),
        hba1c: Number(hba1c),
        ldl: Number(ldl),
        familyHistory,
        smoking
      });
      setActiveResult(res);
      setIsProcessing(false);
    }, 500);
  };

  const handleReset = () => {
    setAge(user.age || 46);
    setGender(user.gender || 'Male');
    setBmi(user.bmi || 26.6);
    setSystolicBp(138);
    setFastingGlucose(112);
    setHba1c(6.2);
    setLdl(138);
    setSmoking(false);
    setFamilyHistory(true);
    addToast('Reset to patient baseline.', 'info');
  };

  return e(
    'div',
    { className: 'space-y-6 animate-in fade-in duration-150' },

    // Header
    e(
      'div',
      { className: 'flex flex-col sm:flex-row sm:items-center justify-between gap-4' },
      e(
        'div',
        null,
        e('div', { className: 'flex items-center gap-2' },
          e(BrainCircuit, { className: 'w-6 h-6 text-indigo-600' }),
          e('h1', { className: 'text-2xl font-bold text-[#1A2338]' }, 'Disease Risk Assessment')
        ),
        e(
          'p',
          { className: 'text-xs text-[#6B7A99] mt-1' },
          'Understand potential secondary disease progression risks through biometric machine learning simulation.'
        )
      ),

      e(
        'button',
        {
          onClick: handleReset,
          className: 'flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 border border-[#EDF1F7] text-xs font-bold text-[#1A2338] rounded-xl shadow-xs transition-colors'
        },
        e(RotateCcw, { className: 'w-3.5 h-3.5 text-slate-500' }),
        e('span', null, 'Reset to Baseline')
      )
    ),

    // Mandatory Disclaimer (Requirement 12)
    e(
      'div',
      { className: 'p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs text-indigo-900 flex items-start gap-3' },
      e(AlertTriangle, { className: 'w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5' }),
      e('div', null,
        e('span', { className: 'font-bold block' }, 'Assessment & Clinical Disclaimer:'),
        e('span', { className: 'text-[11px] text-indigo-800 leading-relaxed' },
          'This assessment uses a demonstration statistical prediction model to illustrate multi-factorial disease risk calculation. Numerical risk scores are for educational simulation only and do NOT constitute a medical diagnosis. Consult qualified physicians for personalized clinical advice.'
        )
      )
    ),

    // Disease Model Selector Buttons
    e(
      'div',
      { className: 'grid grid-cols-1 sm:grid-cols-3 gap-3' },
      [
        { id: 'diabetes', label: 'Type 2 Diabetes Progression', icon: Droplet, desc: 'Impaired fasting glucose transition model' },
        { id: 'cardiovascular', label: '10-Year ASCVD Heart Risk', icon: Heart, desc: 'Atherosclerotic cardiovascular event estimation' },
        { id: 'ckd', label: 'Renal / CKD Secondary Risk', icon: Activity, desc: 'Secondary hypertensive nephropathy screening' }
      ].map(tab =>
        e(
          'button',
          {
            key: tab.id,
            onClick: () => setDiseaseCategory(tab.id),
            className: `p-4 rounded-2xl border text-left transition-all ${
              diseaseCategory === tab.id
                ? 'bg-blue-50/90 border-[#1E60F2] ring-2 ring-blue-500/20 shadow-xs'
                : 'bg-white border-[#EDF1F7] hover:border-slate-300'
            }`
          },
          e('div', { className: 'flex justify-between items-center mb-1' },
            e('span', { className: 'font-bold text-xs text-[#1A2338]' }, tab.label),
            e(tab.icon, { className: `w-4 h-4 ${diseaseCategory === tab.id ? 'text-[#1E60F2]' : 'text-slate-400'}` })
          ),
          e('p', { className: 'text-[11px] text-[#6B7A99]' }, tab.desc)
        )
      )
    ),

    // Assessment Grid
    e(
      'div',
      { className: 'grid grid-cols-1 lg:grid-cols-12 gap-6' },

      // Left Column: Biometric Inputs (7 Cols)
      e(
        'form',
        {
          onSubmit: handleCalculate,
          className: 'lg:col-span-7 bg-white p-6 rounded-2xl border border-[#EDF1F7] shadow-card space-y-5'
        },
        e('div', { className: 'flex justify-between items-center border-b border-[#EDF1F7] pb-3' },
          e('div', { className: 'flex items-center gap-2' },
            e(Sliders, { className: 'w-4 h-4 text-indigo-600' }),
            e('h3', { className: 'text-sm font-bold text-[#1A2338]' }, 'Patient Clinical Factors')
          ),
          e('span', { className: 'text-[11px] text-[#8B98B2]' }, 'Adjust values to estimate risk')
        ),

        e('div', { className: 'grid grid-cols-1 sm:grid-cols-2 gap-4' },
          // Age
          e('div', { className: 'space-y-1 text-xs' },
            e('div', { className: 'flex justify-between' },
              e('span', { className: 'font-bold text-[#334155]' }, 'Age'),
              e('span', { className: 'font-bold text-indigo-600' }, `${age} yrs`)
            ),
            e('input', {
              type: 'range',
              min: 20,
              max: 85,
              value: age,
              onChange: (ev) => setAge(ev.target.value),
              className: 'w-full accent-indigo-600'
            })
          ),

          // BMI
          e('div', { className: 'space-y-1 text-xs' },
            e('div', { className: 'flex justify-between' },
              e('span', { className: 'font-bold text-[#334155]' }, 'Body Mass Index (BMI)'),
              e('span', { className: 'font-bold text-indigo-600' }, `${bmi} kg/m²`)
            ),
            e('input', {
              type: 'range',
              min: 18,
              max: 42,
              step: 0.1,
              value: bmi,
              onChange: (ev) => setBmi(ev.target.value),
              className: 'w-full accent-indigo-600'
            })
          ),

          // Systolic BP
          e('div', { className: 'space-y-1 text-xs' },
            e('div', { className: 'flex justify-between' },
              e('span', { className: 'font-bold text-[#334155]' }, 'Systolic BP'),
              e('span', { className: `font-bold ${systolicBp >= 130 ? 'text-amber-600' : 'text-emerald-600'}` }, `${systolicBp} mmHg`)
            ),
            e('input', {
              type: 'range',
              min: 90,
              max: 190,
              value: systolicBp,
              onChange: (ev) => setSystolicBp(ev.target.value),
              className: 'w-full accent-indigo-600'
            })
          ),

          // Fasting Glucose
          e('div', { className: 'space-y-1 text-xs' },
            e('div', { className: 'flex justify-between' },
              e('span', { className: 'font-bold text-[#334155]' }, 'Fasting Blood Glucose'),
              e('span', { className: `font-bold ${fastingGlucose >= 100 ? 'text-amber-600' : 'text-emerald-600'}` }, `${fastingGlucose} mg/dL`)
            ),
            e('input', {
              type: 'range',
              min: 70,
              max: 220,
              value: fastingGlucose,
              onChange: (ev) => setFastingGlucose(ev.target.value),
              className: 'w-full accent-indigo-600'
            })
          ),

          // HbA1c
          e('div', { className: 'space-y-1 text-xs' },
            e('div', { className: 'flex justify-between' },
              e('span', { className: 'font-bold text-[#334155]' }, 'HbA1c (%)'),
              e('span', { className: `font-bold ${hba1c >= 5.7 ? 'text-amber-600' : 'text-emerald-600'}` }, `${hba1c}%`)
            ),
            e('input', {
              type: 'range',
              min: 4.5,
              max: 11.5,
              step: 0.1,
              value: hba1c,
              onChange: (ev) => setHba1c(ev.target.value),
              className: 'w-full accent-indigo-600'
            })
          ),

          // LDL Cholesterol
          e('div', { className: 'space-y-1 text-xs' },
            e('div', { className: 'flex justify-between' },
              e('span', { className: 'font-bold text-[#334155]' }, 'LDL Cholesterol'),
              e('span', { className: `font-bold ${ldl >= 130 ? 'text-amber-600' : 'text-emerald-600'}` }, `${ldl} mg/dL`)
            ),
            e('input', {
              type: 'range',
              min: 60,
              max: 220,
              value: ldl,
              onChange: (ev) => setLdl(ev.target.value),
              className: 'w-full accent-indigo-600'
            })
          )
        ),

        // Toggles
        e('div', { className: 'grid grid-cols-2 gap-3 pt-2 text-xs' },
          e('label', { className: 'flex items-center justify-between p-3 bg-[#F8FAFD] rounded-xl border border-[#EDF1F7] cursor-pointer' },
            e('span', { className: 'font-bold text-[#1A2338]' }, 'Smoker Status'),
            e('input', {
              type: 'checkbox',
              checked: smoking,
              onChange: (ev) => setSmoking(ev.target.checked),
              className: 'accent-indigo-600'
            })
          ),
          e('label', { className: 'flex items-center justify-between p-3 bg-[#F8FAFD] rounded-xl border border-[#EDF1F7] cursor-pointer' },
            e('span', { className: 'font-bold text-[#1A2338]' }, 'Family History'),
            e('input', {
              type: 'checkbox',
              checked: familyHistory,
              onChange: (ev) => setFamilyHistory(ev.target.checked),
              className: 'accent-indigo-600'
            })
          )
        ),

        e(
          'button',
          {
            type: 'submit',
            disabled: isProcessing,
            className: 'w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2'
          },
          e(BrainCircuit, { className: 'w-4 h-4' }),
          e('span', null, isProcessing ? 'Processing Model Simulation...' : 'Calculate Health Risk Assessment')
        )
      ),

      // Right Column: Assessment Result Display (5 Cols)
      e(
        'div',
        { className: 'lg:col-span-5 bg-white p-6 rounded-2xl border border-[#EDF1F7] shadow-card flex flex-col justify-between space-y-6' },
        e('div', null,
          e('div', { className: 'flex justify-between items-center border-b border-[#EDF1F7] pb-3 mb-4' },
            e('div', null,
              e('span', { className: 'text-[10px] font-bold uppercase tracking-wider text-[#8B98B2]' }, 'Assessment Output'),
              e('h3', { className: 'text-sm font-bold text-[#1A2338]' }, activeResult?.disease || 'Disease Risk')
            ),
            activeResult ? e(StatusBadge, { status: `${activeResult.riskLevel} Risk` }) : null
          ),

          // Visual Score Percentage Gauge
          e('div', { className: 'flex flex-col items-center justify-center my-4' },
            e('div', { className: 'relative w-40 h-40 flex items-center justify-center' },
              // SVG Circle
              e('svg', { className: 'w-full h-full -rotate-90', viewBox: '0 0 100 100' },
                e('circle', { cx: '50', cy: '50', r: '40', fill: 'none', stroke: '#F1F5F9', strokeWidth: '10' }),
                e('circle', {
                  cx: '50',
                  cy: '50',
                  r: '40',
                  fill: 'none',
                  stroke: activeResult?.riskScore >= 65 ? '#EF4444' : activeResult?.riskScore >= 40 ? '#F59E0B' : '#10B981',
                  strokeWidth: '10',
                  strokeDasharray: 2 * Math.PI * 40,
                  strokeDashoffset: 2 * Math.PI * 40 * (1 - (activeResult?.riskScore || 0) / 100),
                  strokeLinecap: 'round',
                  className: 'transition-all duration-700 ease-out'
                })
              ),
              e('div', { className: 'absolute inset-0 flex flex-col items-center justify-center text-center' },
                e('span', { className: 'text-3xl font-extrabold text-[#1A2338]' }, `${activeResult?.riskScore || 0}%`),
                e('span', { className: 'text-[9px] uppercase font-bold text-[#8B98B2]' }, 'Model Score')
              )
            ),
            e('div', { className: 'flex gap-3 text-[10px] text-slate-400 mt-2 font-medium' },
              e('span', { className: 'flex items-center gap-1' }, e('span', { className: 'w-2 h-2 rounded-full bg-emerald-500' }), 'Low (<40%)'),
              e('span', { className: 'flex items-center gap-1' }, e('span', { className: 'w-2 h-2 rounded-full bg-amber-500' }), 'Moderate (40-64%)'),
              e('span', { className: 'flex items-center gap-1' }, e('span', { className: 'w-2 h-2 rounded-full bg-rose-500' }), 'High (≥65%)')
            )
          ),

          // Five-year progression note (Requirement 12)
          e('div', { className: 'p-3 bg-[#F8FAFD] rounded-xl border border-[#EDF1F7] text-xs space-y-1 mb-3' },
            e('div', { className: 'font-bold text-[#1A2338] flex items-center gap-1.5' },
              e(TrendingUp, { className: 'w-3.5 h-3.5 text-indigo-600' }),
              e('span', null, 'Five-Year Health Trajectory Projection:')
            ),
            e('p', { className: 'text-[#334155] leading-relaxed text-[11px]' },
              activeResult?.projectedProgression5Year || 'Baseline parameters stable.'
            )
          ),

          // Contributing Risk Factors (Requirement 12)
          e('div', { className: 'space-y-1.5 text-xs' },
            e('span', { className: 'font-bold text-[#1A2338] block' }, 'Contributing Risk Factors:'),
            (activeResult?.keyDrivers || []).map((driver, dIdx) =>
              e('div', { key: dIdx, className: 'flex items-start gap-1.5 text-[#475569]' },
                e('span', { className: 'w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0' }),
                e('span', null, driver)
              )
            )
          )
        ),

        // Suggested Actions / Follow-up
        e('div', { className: 'p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900' },
          e('span', { className: 'font-bold block mb-0.5' }, 'Suggested Preventive Action:'),
          e('p', { className: 'text-[11px] text-blue-800 leading-relaxed' },
            activeResult?.recommendationsSummary || 'Maintain regular checkups and monitor vitals.'
          )
        )
      )
    ),

    // Assessment History Table (Requirement 12)
    e(
      'div',
      { className: 'bg-white p-6 rounded-2xl border border-[#EDF1F7] shadow-card' },
      e('div', { className: 'flex justify-between items-center mb-4 pb-3 border-b border-[#EDF1F7]' },
        e('div', { className: 'flex items-center gap-2' },
          e(History, { className: 'w-4 h-4 text-indigo-600' }),
          e('h3', { className: 'text-sm font-bold text-[#1A2338]' }, 'Assessment History')
        ),
        e('span', { className: 'text-xs text-[#8B98B2]' }, `${riskAssessments.length} archived assessments`)
      ),

      e(
        'div',
        { className: 'overflow-x-auto text-xs' },
        e('table', { className: 'w-full text-left' },
          e('thead', null,
            e('tr', { className: 'text-[#8B98B2] font-bold uppercase text-[10px] border-b border-[#EDF1F7]' },
              e('th', { className: 'pb-3' }, 'Date'),
              e('th', { className: 'pb-3' }, 'Disease Target'),
              e('th', { className: 'pb-3' }, 'Model Score'),
              e('th', { className: 'pb-3' }, 'Risk Category'),
              e('th', { className: 'pb-3 text-right' }, 'Action')
            )
          ),
          e('tbody', { className: 'divide-y divide-[#F8FAFD]' },
            riskAssessments.map(item =>
              e('tr', { key: item.id, className: 'hover:bg-slate-50/70' },
                e('td', { className: 'py-3 font-medium text-[#1A2338]' }, formatDate(item.assessmentDate)),
                e('td', { className: 'py-3 font-bold text-[#334155]' }, item.disease),
                e('td', { className: 'py-3 font-extrabold text-[#1A2338]' }, `${item.riskScore}%`),
                e('td', { className: 'py-3' }, e(StatusBadge, { status: `${item.riskLevel} Risk`, size: 'xs' })),
                e('td', { className: 'py-3 text-right' },
                  e('button', {
                    onClick: () => setActiveResult(item),
                    className: 'text-xs font-bold text-indigo-600 hover:underline'
                  }, 'Inspect')
                )
              )
            )
          )
        )
      )
    )
  );
};
