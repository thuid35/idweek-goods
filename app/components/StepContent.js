"use client";

import React from 'react';
import { Step0ModelSelection } from './steps/Step0ModelSelection';
import { Step1PhoneInput } from './steps/Step1PhoneInput';
import { Step2Complete } from './steps/Step2Complete';

/**
 * 步驟內容主控制器
 * 根據當前步驟渲染對應的步驟元件
 */
export function StepContent({
  currentStep,
  headIndex,
  setHeadIndex,
  bodyIndex,
  setBodyIndex,
  legsIndex,
  setLegsIndex,
  phoneNumber,
  setPhoneNumber,
  isLoading,
  onReset,
}) {
  // 根據當前步驟渲染對應元件
  if (currentStep === 0) {
    return (
      <Step0ModelSelection
        headIndex={headIndex}
        setHeadIndex={setHeadIndex}
        bodyIndex={bodyIndex}
        setBodyIndex={setBodyIndex}
        legsIndex={legsIndex}
        setLegsIndex={setLegsIndex}
      />
    );
  }

  if (currentStep === 1) {
    return (
      <Step1PhoneInput
        headIndex={headIndex}
        bodyIndex={bodyIndex}
        legsIndex={legsIndex}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        isLoading={isLoading}
      />
    );
  }

  if (currentStep === 2) {
    return (
      <Step2Complete
        headIndex={headIndex}
        bodyIndex={bodyIndex}
        legsIndex={legsIndex}
        phoneNumber={phoneNumber}
        onReset={onReset}
      />
    );
  }

  return null;
}
