import { jsPDF } from 'jspdf';
import { formatDate } from './helpers';

export const generateHealthReportPdf = (data) => {
  const {
    user,
    records = [],
    prescriptions = [],
    labReports = [],
    interactions = [],
    riskAssessments = [],
    roadmap = [],
    reminders = []
  } = data;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 18;

  const checkPageBreak = (needed = 20) => {
    if (y + needed > 280) {
      doc.addPage();
      y = 18;
    }
  };

  // Header Banner
  doc.setFillColor(30, 96, 242); // Royal Blue #1E60F2
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Smart Prescription & Disease Risk Predictor', 14, 12);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Personal Health Summary & Consolidated Record Portfolio', 14, 18);
  doc.text(`Generated on: ${new Date().toLocaleDateString('en-US', { dateStyle: 'long' })}`, 14, 23);

  y = 36;

  // Medical Disclaimer Banner
  doc.setFillColor(254, 243, 199); // Amber light
  doc.rect(14, y, pageWidth - 28, 12, 'F');
  doc.setDrawColor(245, 158, 11);
  doc.rect(14, y, pageWidth - 28, 12, 'D');

  doc.setTextColor(146, 64, 14);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.text('DEMONSTRATION & INFORMATIONAL NOTICE:', 16, y + 4.5);
  doc.setFont('helvetica', 'normal');
  doc.text('This document is compiled for personal tracking and physician discussion only. It is not an automated medical diagnosis.', 16, y + 8.5);

  y += 18;

  // 1. Patient Profile Summary
  doc.setTextColor(30, 96, 242);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('1. Patient Profile Summary', 14, y);
  y += 6;

  doc.setDrawColor(226, 232, 240);
  doc.line(14, y, pageWidth - 14, y);
  y += 5;

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');

  doc.text(`Name: ${user.name || 'N/A'}`, 14, y);
  doc.text(`Date of Birth: ${formatDate(user.dateOfBirth)}`, 80, y);
  doc.text(`Age: ${user.age || 'N/A'} years`, 140, y);
  y += 5;

  doc.text(`Biological Sex: ${user.gender || 'N/A'}`, 14, y);
  doc.text(`Blood Group: ${user.bloodGroup || 'N/A'}`, 80, y);
  doc.text(`BMI: ${user.bmi ? user.bmi + ' kg/m²' : 'N/A'}`, 140, y);
  y += 5;

  doc.text(`Known Allergies: ${(user.allergies && user.allergies.length > 0) ? user.allergies.join(', ') : 'None documented'}`, 14, y);
  y += 5;

  doc.text(`Chronic Conditions: ${(user.chronicConditions && user.chronicConditions.length > 0) ? user.chronicConditions.join(', ') : 'None documented'}`, 14, y);
  y += 5;

  doc.text(`Emergency Contact: ${user.emergencyContact?.name || 'N/A'} (${user.emergencyContact?.relation || 'Contact'}) - ${user.emergencyContact?.phone || 'N/A'}`, 14, y);
  y += 9;

  // 2. Active Prescriptions & Medications
  checkPageBreak(30);
  doc.setTextColor(30, 96, 242);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('2. Active Prescriptions & Current Medications', 14, y);
  y += 6;

  doc.setDrawColor(226, 232, 240);
  doc.line(14, y, pageWidth - 14, y);
  y += 5;

  if (prescriptions.length === 0) {
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'italic');
    doc.text('No active prescriptions recorded.', 14, y);
    y += 8;
  } else {
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(8);
    prescriptions.forEach((rx, idx) => {
      checkPageBreak(18);
      doc.setFont('helvetica', 'bold');
      doc.text(`${idx + 1}. ${rx.medicineName} (${rx.dosage}) - ${rx.status || 'Active'}`, 14, y);
      y += 4;
      doc.setFont('helvetica', 'normal');
      doc.text(`Frequency: ${rx.frequency} | Duration: ${rx.duration} | Prescribed by: ${rx.doctor || 'Physician'} (${formatDate(rx.prescriptionDate)})`, 18, y);
      y += 4;
      if (rx.notes) {
        doc.text(`Notes: ${rx.notes}`, 18, y);
        y += 4;
      }
      y += 2;
    });
  }
  y += 4;

  // 3. Laboratory Diagnostics Summary
  checkPageBreak(30);
  doc.setTextColor(30, 96, 242);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('3. Laboratory Test Diagnostics Summary', 14, y);
  y += 6;

  doc.setDrawColor(226, 232, 240);
  doc.line(14, y, pageWidth - 14, y);
  y += 5;

  if (labReports.length === 0) {
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'italic');
    doc.text('No laboratory reports recorded.', 14, y);
    y += 8;
  } else {
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(8);
    labReports.forEach((lab, idx) => {
      checkPageBreak(16);
      doc.setFont('helvetica', 'bold');
      doc.text(`${idx + 1}. ${lab.title || lab.testName} (${formatDate(lab.date)})`, 14, y);
      y += 4;
      doc.setFont('helvetica', 'normal');
      if (lab.biomarkers && lab.biomarkers.length > 0) {
        const bioText = lab.biomarkers.map(b => `${b.name}: ${b.value} ${b.unit} (${b.status})`).join(' | ');
        doc.text(`Results: ${bioText}`, 18, y);
        y += 4;
      } else if (lab.description) {
        doc.text(`Description: ${lab.description}`, 18, y);
        y += 4;
      }
      y += 2;
    });
  }
  y += 4;

  // 4. Medicine Interaction History
  checkPageBreak(30);
  doc.setTextColor(30, 96, 242);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('4. Medicine Safety & Interaction Check History', 14, y);
  y += 6;

  doc.setDrawColor(226, 232, 240);
  doc.line(14, y, pageWidth - 14, y);
  y += 5;

  if (interactions.length === 0) {
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'italic');
    doc.text('No adverse drug interactions detected in active medicine checking.', 14, y);
    y += 8;
  } else {
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(8);
    interactions.forEach((int, idx) => {
      checkPageBreak(16);
      doc.setFont('helvetica', 'bold');
      doc.text(`${idx + 1}. ${int.drugA} + ${int.drugB} [Severity: ${int.severity}]`, 14, y);
      y += 4;
      doc.setFont('helvetica', 'normal');
      doc.text(`Effect: ${int.effect}`, 18, y);
      y += 4;
      doc.text(`Precaution: ${int.recommendation}`, 18, y);
      y += 4;
    });
  }
  y += 4;

  // 5. Disease Risk Assessment History
  checkPageBreak(30);
  doc.setTextColor(30, 96, 242);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('5. Disease Risk Assessment & Five-Year Progression History', 14, y);
  y += 6;

  doc.setDrawColor(226, 232, 240);
  doc.line(14, y, pageWidth - 14, y);
  y += 5;

  if (riskAssessments.length === 0) {
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'italic');
    doc.text('No disease risk assessments recorded yet.', 14, y);
    y += 8;
  } else {
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(8);
    riskAssessments.forEach((rsk, idx) => {
      checkPageBreak(20);
      doc.setFont('helvetica', 'bold');
      doc.text(`${idx + 1}. ${rsk.disease} (${formatDate(rsk.assessmentDate)})`, 14, y);
      y += 4;
      doc.setFont('helvetica', 'normal');
      doc.text(`Assessed Category: ${rsk.riskLevel} | Estimated Probability: ${rsk.riskScore}% (Demonstration Model)`, 18, y);
      y += 4;
      if (rsk.projectedProgression5Year) {
        doc.text(`Five-Year Projection: ${rsk.projectedProgression5Year}`, 18, y);
        y += 4;
      }
      if (rsk.recommendationsSummary) {
        doc.text(`Suggested Actions: ${rsk.recommendationsSummary}`, 18, y);
        y += 4;
      }
      y += 2;
    });
  }
  y += 4;

  // 6. Preventive Health Roadmap
  checkPageBreak(30);
  doc.setTextColor(30, 96, 242);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('6. Preventive Healthcare Roadmap (3, 6 & 12 Months)', 14, y);
  y += 6;

  doc.setDrawColor(226, 232, 240);
  doc.line(14, y, pageWidth - 14, y);
  y += 5;

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(8);
  roadmap.forEach((stage) => {
    checkPageBreak(16);
    doc.setFont('helvetica', 'bold');
    doc.text(`${stage.milestone} (${stage.timeframe}):`, 14, y);
    y += 4;
    doc.setFont('helvetica', 'normal');
    stage.goals.forEach(g => {
      checkPageBreak(6);
      doc.text(`• [${g.done ? 'Done' : 'Pending'}] ${g.text}`, 18, y);
      y += 3.5;
    });
    y += 2;
  });

  // Footer Disclaimer on All Pages
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(148, 163, 184);
    doc.text('Smart Prescription & Disease Risk Predictor — Strictly personal health management tool. Not medical advice.', 14, 290);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - 25, 290);
  }

  // Save the PDF
  const filename = `Health_Report_${(user.name || 'Patient').replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
  return filename;
};
