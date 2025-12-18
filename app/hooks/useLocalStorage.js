import { useState, useEffect } from 'react';

/**
 * localStorage 自訂 hook
 * 用於持久化狀態
 */
export function useLocalStorage() {
  const [headIndex, setHeadIndex] = useState(0);
  const [bodyIndex, setBodyIndex] = useState(0);
  const [legsIndex, setLegsIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');

  // 從 localStorage 載入狀態
  useEffect(() => {
    const savedStep = localStorage.getItem('currentStep');
    const savedHeadIndex = localStorage.getItem('headIndex');
    const savedBodyIndex = localStorage.getItem('bodyIndex');
    const savedLegsIndex = localStorage.getItem('legsIndex');
    const savedPhoneNumber = localStorage.getItem('phoneNumber');

    if (savedStep !== null) setCurrentStep(parseInt(savedStep));
    if (savedHeadIndex !== null) setHeadIndex(parseInt(savedHeadIndex));
    if (savedBodyIndex !== null) setBodyIndex(parseInt(savedBodyIndex));
    if (savedLegsIndex !== null) setLegsIndex(parseInt(savedLegsIndex));
    if (savedPhoneNumber !== null) setPhoneNumber(savedPhoneNumber);
  }, []);

  // 儲存狀態到 localStorage
  useEffect(() => {
    localStorage.setItem('currentStep', currentStep.toString());
    localStorage.setItem('headIndex', headIndex.toString());
    localStorage.setItem('bodyIndex', bodyIndex.toString());
    localStorage.setItem('legsIndex', legsIndex.toString());
    localStorage.setItem('phoneNumber', phoneNumber);
  }, [currentStep, headIndex, bodyIndex, legsIndex, phoneNumber]);

  return {
    headIndex,
    setHeadIndex,
    bodyIndex,
    setBodyIndex,
    legsIndex,
    setLegsIndex,
    currentStep,
    setCurrentStep,
    phoneNumber,
    setPhoneNumber,
  };
}
