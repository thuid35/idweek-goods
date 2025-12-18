"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { BackButton } from "./components/BackButton";
import { StepContent } from "./components/StepContent";
import { ProgressBar } from "./components/ProgressBar";
import { useLocalStorage } from "./hooks/useLocalStorage";
import styles from "./page.module.css";

export default function Home() {
  // 使用自訂 hook 管理 localStorage 狀態
  const {
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
  } = useLocalStorage();

  // Loading 狀態
  const [isLoading, setIsLoading] = useState(false);

  // 監控步驟變化，進入步驟1時顯示 loading
  useEffect(() => {
    if (currentStep === 1) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // 步驟控制函數
  const handleNextStep = () => {
    // 如果在步驟1，檢查手機號碼是否有效
    if (currentStep === 1) {
      const isValidPhone = phoneNumber.length === 10 && phoneNumber.startsWith('09');
      if (!isValidPhone) {
        alert('請輸入正確的手機號碼（10位數字，以09開頭）');
        return;
      }
    }
    
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // 重置所有狀態，回到步驟0
  const handleReset = () => {
    setCurrentStep(0);
    setHeadIndex(0);
    setBodyIndex(0);
    setLegsIndex(0);
    setPhoneNumber('');
  };

  // 檢查手機號碼是否有效（10位數字，以09開頭）
  const isPhoneValid = phoneNumber.length === 10 && phoneNumber.startsWith('09');
  // 在步驟1時，如果手機號碼無效則禁用下一步按鈕
  const isNextDisabled = currentStep === 1 && !isPhoneValid;

  return (
    <>
      {/* 導航欄 */}
      <Navbar />
      
      {/* 主要內容 */}
      <main className={styles.main}>
        
        {/* 返回按鈕（左上角） - 只在步驟1顯示 */}
        {currentStep === 1 && <BackButton onClick={handlePrevStep} />}
        
        {/* 步驟內容 */}
        <StepContent
          currentStep={currentStep}
          headIndex={headIndex}
          setHeadIndex={setHeadIndex}
          bodyIndex={bodyIndex}
          setBodyIndex={setBodyIndex}
          legsIndex={legsIndex}
          setLegsIndex={setLegsIndex}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          isLoading={isLoading}
          onReset={handleReset}
        />

        {/* 進度條 */}
        <ProgressBar 
          currentStep={currentStep} 
          onNext={handleNextStep}
          disabled={isNextDisabled}
        />

      </main>
    </>
  );
}
