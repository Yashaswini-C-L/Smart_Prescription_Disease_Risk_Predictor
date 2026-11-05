import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialPrescriptions,
  initialLabReports,
  initialMedicalRecords,
  demonstrationDrugInteractions,
  referenceDrugLibrary,
  initialRiskAssessments,
  initialRoadmap,
  initialSuggestedTests,
  initialReminders,
  historicalVitalsTrends
} from '../data/mockData';
import { useAuth } from './AuthContext';
import { generateHealthReportPdf } from '../utils/pdfGenerator';

const e = React.createElement;
const HealthContext = createContext();

export const HealthProvider = ({ children }) => {
  const { user } = useAuth();

  // Prescriptions state
  const [prescriptions, setPrescriptions] = useState(() => {
    const saved = localStorage.getItem('medaxis_prescriptions');
    return saved ? JSON.parse(saved) : initialPrescriptions;
  });

  // Lab reports state
  const [labReports, setLabReports] = useState(() => {
    const saved = localStorage.getItem('medaxis_lab_reports');
    return saved ? JSON.parse(saved) : initialLabReports;
  });

  // General medical records state
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem('medaxis_records');
    return saved ? JSON.parse(saved) : initialMedicalRecords;
  });

  // Risk assessments state
  const [riskAssessments, setRiskAssessments] = useState(() => {
    const saved = localStorage.getItem('medaxis_risk_assessments');
    return saved ? JSON.parse(saved) : initialRiskAssessments;
  });

  // Health roadmap state
  const [roadmap, setRoadmap] = useState(() => {
    const saved = localStorage.getItem('medaxis_roadmap');
    return saved ? JSON.parse(saved) : initialRoadmap;
  });

  // Suggested tests state
  const [suggestedTests, setSuggestedTests] = useState(() => {
    const saved = localStorage.getItem('medaxis_suggested_tests');
    return saved ? JSON.parse(saved) : initialSuggestedTests;
  });

  // Reminders state
  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem('medaxis_reminders');
    return saved ? JSON.parse(saved) : initialReminders;
  });

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info', duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // LocalStorage synchronizations
  useEffect(() => {
    localStorage.setItem('medaxis_prescriptions', JSON.stringify(prescriptions));
  }, [prescriptions]);

  useEffect(() => {
    localStorage.setItem('medaxis_lab_reports', JSON.stringify(labReports));
  }, [labReports]);

  useEffect(() => {
    localStorage.setItem('medaxis_records', JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    localStorage.setItem('medaxis_risk_assessments', JSON.stringify(riskAssessments));
  }, [riskAssessments]);

  useEffect(() => {
    localStorage.setItem('medaxis_roadmap', JSON.stringify(roadmap));
  }, [roadmap]);

  useEffect(() => {
    localStorage.setItem('medaxis_suggested_tests', JSON.stringify(suggestedTests));
  }, [suggestedTests]);

  useEffect(() => {
    localStorage.setItem('medaxis_reminders', JSON.stringify(reminders));
  }, [reminders]);

  // Actions for Prescriptions
  const addPrescription = (newRx) => {
    const item = {
      id: `RX-${Date.now().toString().slice(-4)}`,
      status: 'Active',
      ...newRx
    };
    setPrescriptions(prev => [item, ...prev]);
    // Also create record entry
    const record = {
      id: `REC-${Date.now().toString().slice(-4)}`,
      type: 'prescription',
      title: item.medicineName ? `${item.medicineName} Prescription` : 'Prescription Order',
      date: item.prescriptionDate || new Date().toISOString().split('T')[0],
      entryMethod: item.source === 'Upload' ? 'document_upload' : 'manual_entry',
      doctor: item.doctor || 'Attending Physician',
      facility: 'Personal Healthcare Record',
      summary: `${item.medicineName} ${item.dosage} - ${item.frequency}`,
      fileName: item.fileName || null,
      tags: ['Prescription']
    };
    setRecords(prev => [record, ...prev]);
    addToast(`Prescription for ${item.medicineName || 'Medicine'} added.`, 'success');
  };

  const deletePrescription = (id) => {
    setPrescriptions(prev => prev.filter(rx => rx.id !== id));
    addToast('Prescription record removed.', 'info');
  };

  // Actions for Lab Reports
  const addLabReport = (newLab) => {
    const item = {
      id: `LAB-${Date.now().toString().slice(-4)}`,
      ...newLab
    };
    setLabReports(prev => [item, ...prev]);
    const record = {
      id: `REC-${Date.now().toString().slice(-4)}`,
      type: 'lab_report',
      title: item.title || item.testName || 'Laboratory Report',
      date: item.date || new Date().toISOString().split('T')[0],
      entryMethod: item.source === 'Upload' ? 'document_upload' : 'manual_entry',
      doctor: 'Diagnostic Laboratory',
      facility: 'Laboratory Diagnostic Service',
      summary: item.description || 'Laboratory test results recorded.',
      fileName: item.fileName || null,
      tags: ['Lab Report']
    };
    setRecords(prev => [record, ...prev]);
    addToast('Laboratory report saved to your records.', 'success');
  };

  const deleteLabReport = (id) => {
    setLabReports(prev => prev.filter(l => l.id !== id));
    addToast('Lab report deleted.', 'info');
  };

  // Actions for General Medical Records
  const addMedicalRecord = (newRec) => {
    const item = {
      id: `REC-${Date.now().toString().slice(-4)}`,
      ...newRec
    };
    setRecords(prev => [item, ...prev]);
    addToast('Medical record archived.', 'success');
  };

  const deleteMedicalRecord = (id) => {
    setRecords(prev => prev.filter(r => r.id !== id));
    addToast('Record deleted from medical history.', 'info');
  };

  // Medicine Safety Checker Logic (FR-07 / Requirement 11)
  const checkDrugInteractions = (selectedDrugNames) => {
    if (!selectedDrugNames || selectedDrugNames.length < 2) return [];

    const foundInteractions = [];
    const normalized = selectedDrugNames.map(d => d.trim().toLowerCase());

    for (let i = 0; i < normalized.length; i++) {
      for (let j = i + 1; j < normalized.length; j++) {
        const drug1 = normalized[i];
        const drug2 = normalized[j];

        const match = demonstrationDrugInteractions.find(rule => {
          const rA = rule.drugA.toLowerCase();
          const rB = rule.drugB.toLowerCase();
          return (
            (drug1.includes(rA) || rA.includes(drug1)) &&
            (drug2.includes(rB) || rB.includes(drug2))
          ) || (
            (drug1.includes(rB) || rB.includes(drug1)) &&
            (drug2.includes(rA) || rA.includes(drug2))
          );
        });

        if (match) {
          foundInteractions.push({
            id: `INT-${i}-${j}`,
            pair: [selectedDrugNames[i], selectedDrugNames[j]],
            ...match
          });
        }
      }
    }
    return foundInteractions;
  };

  // Disease Risk Assessment Logic (Requirement 12)
  const runRiskAssessment = (params) => {
    const {
      diseaseCategory = 'diabetes',
      age = user.age || 46,
      bmi = user.bmi || 26.6,
      systolicBp = 138,
      fastingGlucose = 112,
      hba1c = 6.2,
      totalCholesterol = 218,
      ldl = 138,
      familyHistory = true,
      smoking = false
    } = params;

    let score = 25;
    const drivers = [];
    let progression5Yr = '';
    let recommendations = '';

    if (diseaseCategory === 'diabetes') {
      if (fastingGlucose >= 126 || hba1c >= 6.5) score += 35;
      else if (fastingGlucose >= 100 || hba1c >= 5.7) score += 22;
      if (bmi >= 25) score += 12;
      if (familyHistory) score += 10;
      if (age >= 45) score += 8;

      score = Math.min(Math.round(score), 95);
      if (fastingGlucose >= 100) drivers.push(`Impaired fasting blood glucose (${fastingGlucose} mg/dL)`);
      if (hba1c >= 5.7) drivers.push(`Glycated hemoglobin HbA1c at ${hba1c}%`);
      if (bmi >= 25) drivers.push(`BMI of ${bmi} kg/m² in overweight range`);
      if (familyHistory) drivers.push('Maternal family history of diabetes');

      progression5Yr = `Estimated ${Math.round(score * 0.5)}% probability of progression to Type 2 Diabetes within 3-5 years without dietary and lifestyle management.`;
      recommendations = 'Schedule 90-day HbA1c surveillance, maintain regular moderate exercise, and limit refined sugars.';
    } else if (diseaseCategory === 'cardiovascular') {
      if (systolicBp >= 140) score += 28;
      else if (systolicBp >= 130) score += 18;
      if (ldl >= 130) score += 18;
      if (smoking) score += 18;
      if (age >= 45) score += 10;

      score = Math.min(Math.round(score), 92);
      if (systolicBp >= 130) drivers.push(`Elevated systolic blood pressure (${systolicBp} mmHg)`);
      if (ldl >= 130) drivers.push(`Elevated LDL cholesterol (${ldl} mg/dL)`);
      if (smoking) drivers.push('Tobacco smoking increases cardiovascular risk');

      progression5Yr = `Estimated 10-year major adverse cardiac event probability of ${Math.round(score * 0.4)}%.`;
      recommendations = 'Keep daily dietary sodium below 2,000 mg, monitor blood pressure, and take prescribed medications consistently.';
    } else {
      // General demonstration model
      score = 20;
      drivers.push('Routine baseline parameters within expected range');
      progression5Yr = 'Preserved baseline stability under current health routine.';
      recommendations = 'Continue regular annual checkups.';
    }

    let riskLevel = 'Low';
    if (score >= 65) riskLevel = 'High';
    else if (score >= 40) riskLevel = 'Moderate';

    const newAssessment = {
      id: `RSK-${Date.now().toString().slice(-4)}`,
      assessmentDate: new Date().toISOString().split('T')[0],
      disease: diseaseCategory === 'diabetes'
        ? 'Type 2 Diabetes Progression'
        : diseaseCategory === 'cardiovascular'
          ? '10-Year ASCVD Cardiovascular Risk'
          : 'Renal / Secondary Metabolic Risk',
      isValidatedModel: true,
      riskScore: score,
      riskLevel,
      projectedProgression5Year: progression5Yr,
      keyDrivers: drivers,
      recommendationsSummary: recommendations
    };

    setRiskAssessments(prev => [newAssessment, ...prev]);
    addToast(`Health risk assessment completed: ${newAssessment.disease} scored ${score}% (${riskLevel} Risk).`, 'info');
    return newAssessment;
  };

  // Roadmap Goal Actions
  const toggleRoadmapGoal = (milestoneIndex, goalId) => {
    setRoadmap(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      const g = copy[milestoneIndex]?.goals?.find(item => item.id === goalId);
      if (g) {
        g.done = !g.done;
      }
      return copy;
    });
    addToast('Roadmap task updated.', 'success');
  };

  // Suggested Test Actions
  const addTestToRoadmap = (testId) => {
    setSuggestedTests(prev => prev.map(t => {
      if (t.id === testId) {
        return { ...t, inRoadmap: true };
      }
      return t;
    }));
    addToast('Test added to your 3-Month Roadmap!', 'success');
  };

  const toggleTestCompleted = (testId) => {
    setSuggestedTests(prev => prev.map(t => {
      if (t.id === testId) {
        return { ...t, completed: !t.completed };
      }
      return t;
    }));
    addToast('Test status updated.', 'success');
  };

  // Reminder Actions
  const toggleReminder = (id) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, completed: !r.completed } : r));
  };

  const addReminder = (rem) => {
    const item = {
      id: `REM-${Date.now().toString().slice(-4)}`,
      completed: false,
      ...rem
    };
    setReminders(prev => [item, ...prev]);
    addToast('Reminder created.', 'success');
  };

  const deleteReminder = (id) => {
    setReminders(prev => prev.filter(r => r.id !== id));
    addToast('Reminder removed.', 'info');
  };

  // Consolidated PDF Report Generator Action
  const downloadConsolidatedPdf = () => {
    try {
      const activeInteractions = checkDrugInteractions(prescriptions.map(p => p.medicineName));
      const filename = generateHealthReportPdf({
        user,
        records,
        prescriptions,
        labReports,
        interactions: activeInteractions,
        riskAssessments,
        roadmap,
        reminders
      });
      addToast(`Consolidated Health Report downloaded (${filename}).`, 'success');
    } catch (err) {
      console.error('PDF error:', err);
      addToast('Could not generate PDF report. Please try again.', 'error');
    }
  };

  return e(
    HealthContext.Provider,
    {
      value: {
        prescriptions,
        addPrescription,
        deletePrescription,
        labReports,
        addLabReport,
        deleteLabReport,
        records,
        addMedicalRecord,
        deleteMedicalRecord,
        riskAssessments,
        runRiskAssessment,
        roadmap,
        toggleRoadmapGoal,
        suggestedTests,
        addTestToRoadmap,
        toggleTestCompleted,
        reminders,
        toggleReminder,
        addReminder,
        deleteReminder,
        checkDrugInteractions,
        referenceDrugLibrary,
        demonstrationDrugInteractions,
        historicalVitalsTrends,
        toasts,
        addToast,
        removeToast,
        downloadConsolidatedPdf
      }
    },
    children
  );
};

export const useHealth = () => useContext(HealthContext);
