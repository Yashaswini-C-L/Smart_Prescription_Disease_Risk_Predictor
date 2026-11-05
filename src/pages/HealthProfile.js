import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useHealth } from '../context/HealthContext';
import {
  User,
  Heart,
  Save,
  Phone,
  MapPin,
  AlertTriangle,
  Plus,
  Trash2,
  FileDown
} from 'lucide-react';
import { calculateBmi, getBmiCategory } from '../utils/helpers';

const e = React.createElement;

export const HealthProfile = () => {
  const { user, updateProfile } = useAuth();
  const { downloadConsolidatedPdf, addToast } = useHealth();

  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth || '1980-04-12');
  const [age, setAge] = useState(user.age || 46);
  const [gender, setGender] = useState(user.gender || 'Male');
  const [bloodGroup, setBloodGroup] = useState(user.bloodGroup || 'O+');
  const [phone, setPhone] = useState(user.phone || '');
  const [address, setAddress] = useState(user.address || '');
  const [heightCm, setHeightCm] = useState(user.heightCm || 176);
  const [weightKg, setWeightKg] = useState(user.weightKg || 82.5);

  const [allergies, setAllergies] = useState(user.allergies || []);
  const [newAllergy, setNewAllergy] = useState('');

  const [chronicConditions, setChronicConditions] = useState(user.chronicConditions || []);
  const [newCondition, setNewCondition] = useState('');

  const [familyHistory, setFamilyHistory] = useState(user.familyHistory || []);
  const [newFamilyItem, setNewFamilyItem] = useState('');

  const [emergencyName, setEmergencyName] = useState(user.emergencyContact?.name || '');
  const [emergencyRelation, setEmergencyRelation] = useState(user.emergencyContact?.relation || '');
  const [emergencyPhone, setEmergencyPhone] = useState(user.emergencyContact?.phone || '');

  const computedBmi = calculateBmi(Number(weightKg), Number(heightCm));
  const bmiCat = getBmiCategory(computedBmi);

  const handleAddAllergy = () => {
    if (!newAllergy.trim()) return;
    setAllergies(prev => [...prev, newAllergy.trim()]);
    setNewAllergy('');
  };

  const handleAddCondition = () => {
    if (!newCondition.trim()) return;
    setChronicConditions(prev => [...prev, newCondition.trim()]);
    setNewCondition('');
  };

  const handleAddFamily = () => {
    if (!newFamilyItem.trim()) return;
    setFamilyHistory(prev => [...prev, newFamilyItem.trim()]);
    setNewFamilyItem('');
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    updateProfile({
      name,
      email,
      dateOfBirth,
      age: Number(age),
      gender,
      bloodGroup,
      phone,
      address,
      heightCm: Number(heightCm),
      weightKg: Number(weightKg),
      bmi: computedBmi,
      allergies,
      chronicConditions,
      familyHistory,
      emergencyContact: {
        name: emergencyName,
        relation: emergencyRelation,
        phone: emergencyPhone
      }
    });
    addToast('Health Profile updated successfully.', 'success');
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
          e(User, { className: 'w-6 h-6 text-[#1E60F2]' }),
          e('h1', { className: 'text-2xl font-bold text-[#1A2338]' }, 'My Health Profile')
        ),
        e(
          'p',
          { className: 'text-xs text-[#6B7A99] mt-1' },
          'Maintain your personal biometric data, allergies, chronic conditions, and emergency contacts.'
        )
      ),

      e(
        'button',
        {
          onClick: downloadConsolidatedPdf,
          className: 'flex items-center gap-1.5 px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-[#1E60F2] font-bold text-xs rounded-xl border border-blue-200 transition-colors'
        },
        e(FileDown, { className: 'w-3.5 h-3.5' }),
        e('span', null, 'Download Consolidated PDF')
      )
    ),

    // Profile Form
    e(
      'form',
      { onSubmit: handleSubmit, className: 'space-y-6' },

      // Basic Personal Details Card
      e(
        'div',
        { className: 'bg-white p-6 rounded-2xl border border-[#EDF1F7] shadow-card space-y-4' },
        e('h3', { className: 'text-sm font-bold text-[#1A2338] border-b border-[#EDF1F7] pb-3' },
          'Personal Information'
        ),
        e('div', { className: 'grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs' },
          e('div', null,
            e('label', { className: 'font-bold text-[#334155] block mb-1' }, 'Full Name'),
            e('input', {
              type: 'text',
              value: name,
              onChange: (ev) => setName(ev.target.value),
              className: 'w-full px-3 py-1.5 bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
            })
          ),
          e('div', null,
            e('label', { className: 'font-bold text-[#334155] block mb-1' }, 'Email Address'),
            e('input', {
              type: 'email',
              value: email,
              onChange: (ev) => setEmail(ev.target.value),
              className: 'w-full px-3 py-1.5 bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
            })
          ),
          e('div', null,
            e('label', { className: 'font-bold text-[#334155] block mb-1' }, 'Contact Phone'),
            e('input', {
              type: 'text',
              value: phone,
              onChange: (ev) => setPhone(ev.target.value),
              className: 'w-full px-3 py-1.5 bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
            })
          ),
          e('div', null,
            e('label', { className: 'font-bold text-[#334155] block mb-1' }, 'Date of Birth'),
            e('input', {
              type: 'date',
              value: dateOfBirth,
              onChange: (ev) => setDateOfBirth(ev.target.value),
              className: 'w-full px-3 py-1.5 bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
            })
          ),
          e('div', null,
            e('label', { className: 'font-bold text-[#334155] block mb-1' }, 'Biological Sex'),
            e('select', {
              value: gender,
              onChange: (ev) => setGender(ev.target.value),
              className: 'w-full px-3 py-1.5 bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
            },
              e('option', { value: 'Male' }, 'Male'),
              e('option', { value: 'Female' }, 'Female'),
              e('option', { value: 'Other' }, 'Other')
            )
          ),
          e('div', null,
            e('label', { className: 'font-bold text-[#334155] block mb-1' }, 'Blood Group'),
            e('select', {
              value: bloodGroup,
              onChange: (ev) => setBloodGroup(ev.target.value),
              className: 'w-full px-3 py-1.5 bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
            },
              e('option', { value: 'O+' }, 'O+'),
              e('option', { value: 'O-' }, 'O-'),
              e('option', { value: 'A+' }, 'A+'),
              e('option', { value: 'A-' }, 'A-'),
              e('option', { value: 'B+' }, 'B+'),
              e('option', { value: 'B-' }, 'B-'),
              e('option', { value: 'AB+' }, 'AB+'),
              e('option', { value: 'AB-' }, 'AB-')
            )
          )
        )
      ),

      // Anthropometric & BMI
      e(
        'div',
        { className: 'bg-white p-6 rounded-2xl border border-[#EDF1F7] shadow-card space-y-4' },
        e('h3', { className: 'text-sm font-bold text-[#1A2338] border-b border-[#EDF1F7] pb-3' },
          'Anthropometric Vitals & Computed BMI'
        ),
        e('div', { className: 'grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs' },
          e('div', null,
            e('label', { className: 'font-bold text-[#334155] block mb-1' }, 'Height (cm)'),
            e('input', {
              type: 'number',
              value: heightCm,
              onChange: (ev) => setHeightCm(ev.target.value),
              className: 'w-full px-3 py-1.5 bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
            })
          ),
          e('div', null,
            e('label', { className: 'font-bold text-[#334155] block mb-1' }, 'Weight (kg)'),
            e('input', {
              type: 'number',
              step: '0.5',
              value: weightKg,
              onChange: (ev) => setWeightKg(ev.target.value),
              className: 'w-full px-3 py-1.5 bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
            })
          ),
          e('div', null,
            e('label', { className: 'font-bold text-[#334155] block mb-1' }, 'Computed Body Mass Index'),
            e('div', { className: 'px-3 py-2 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between' },
              e('span', { className: 'text-sm font-extrabold text-[#1E60F2]' }, `${computedBmi} kg/m²`),
              e('span', { className: `text-[10px] font-bold px-2 py-0.5 rounded ${bmiCat.color}` }, bmiCat.label)
            )
          )
        )
      ),

      // Allergies & Chronic Conditions
      e(
        'div',
        { className: 'grid grid-cols-1 md:grid-cols-2 gap-5' },

        // Allergies
        e(
          'div',
          { className: 'bg-white p-6 rounded-2xl border border-[#EDF1F7] shadow-card space-y-3' },
          e('h3', { className: 'text-sm font-bold text-[#1A2338]' }, 'Documented Allergies'),
          e('div', { className: 'flex gap-2 text-xs' },
            e('input', {
              type: 'text',
              value: newAllergy,
              onChange: (ev) => setNewAllergy(ev.target.value),
              placeholder: 'Add allergy...',
              className: 'flex-1 px-3 py-1.5 bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
            }),
            e('button', {
              type: 'button',
              onClick: handleAddAllergy,
              className: 'px-3 py-1.5 bg-[#1E60F2] text-white font-bold rounded-xl'
            }, 'Add')
          ),
          e('div', { className: 'flex flex-wrap gap-1.5' },
            allergies.map((allg, idx) =>
              e('span', {
                key: idx,
                className: 'px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200 flex items-center gap-1.5'
              },
                e('span', null, allg),
                e('button', {
                  type: 'button',
                  onClick: () => setAllergies(allergies.filter((_, i) => i !== idx)),
                  className: 'text-rose-400 hover:text-rose-700'
                }, '×')
              )
            )
          )
        ),

        // Chronic Conditions
        e(
          'div',
          { className: 'bg-white p-6 rounded-2xl border border-[#EDF1F7] shadow-card space-y-3' },
          e('h3', { className: 'text-sm font-bold text-[#1A2338]' }, 'Existing Chronic Conditions'),
          e('div', { className: 'flex gap-2 text-xs' },
            e('input', {
              type: 'text',
              value: newCondition,
              onChange: (ev) => setNewCondition(ev.target.value),
              placeholder: 'Add condition...',
              className: 'flex-1 px-3 py-1.5 bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
            }),
            e('button', {
              type: 'button',
              onClick: handleAddCondition,
              className: 'px-3 py-1.5 bg-[#1E60F2] text-white font-bold rounded-xl'
            }, 'Add')
          ),
          e('div', { className: 'flex flex-wrap gap-1.5' },
            chronicConditions.map((cond, idx) =>
              e('span', {
                key: idx,
                className: 'px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 flex items-center gap-1.5'
              },
                e('span', null, cond),
                e('button', {
                  type: 'button',
                  onClick: () => setChronicConditions(chronicConditions.filter((_, i) => i !== idx)),
                  className: 'text-blue-400 hover:text-blue-700'
                }, '×')
              )
            )
          )
        )
      ),

      // Family History & Emergency Contact
      e(
        'div',
        { className: 'bg-white p-6 rounded-2xl border border-[#EDF1F7] shadow-card space-y-4' },
        e('h3', { className: 'text-sm font-bold text-[#1A2338] border-b border-[#EDF1F7] pb-3' },
          'Emergency Contact'
        ),
        e('div', { className: 'grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs' },
          e('div', null,
            e('label', { className: 'font-bold text-[#334155] block mb-1' }, 'Contact Name'),
            e('input', {
              type: 'text',
              value: emergencyName,
              onChange: (ev) => setEmergencyName(ev.target.value),
              className: 'w-full px-3 py-1.5 bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
            })
          ),
          e('div', null,
            e('label', { className: 'font-bold text-[#334155] block mb-1' }, 'Relationship'),
            e('input', {
              type: 'text',
              value: emergencyRelation,
              onChange: (ev) => setEmergencyRelation(ev.target.value),
              className: 'w-full px-3 py-1.5 bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
            })
          ),
          e('div', null,
            e('label', { className: 'font-bold text-[#334155] block mb-1' }, 'Emergency Phone'),
            e('input', {
              type: 'text',
              value: emergencyPhone,
              onChange: (ev) => setEmergencyPhone(ev.target.value),
              className: 'w-full px-3 py-1.5 bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
            })
          )
        )
      ),

      // Save Button
      e(
        'div',
        { className: 'flex justify-end' },
        e(
          'button',
          {
            type: 'submit',
            className: 'flex items-center gap-2 px-6 py-2.5 bg-[#1E60F2] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors'
          },
          e(Save, { className: 'w-4 h-4' }),
          e('span', null, 'Save Health Profile')
        )
      )
    )
  );
};
