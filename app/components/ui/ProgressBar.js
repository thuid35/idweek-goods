import React from 'react';
import styles from './ProgressBar.module.css';

export function ProgressBar({ currentStep = 0, onNext, disabled = false }) {
  const steps = ['選擇模型', '取名時間', '完成'];
  
  return (
    <div className={styles.progressContainer}>
      {/* 進度條區域 */}
      <div className={styles.progressWrapper}>
        {/* 進度線 */}
        <div className={styles.progressLine}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${(currentStep / (steps.length - 1)) * 105}%` }}
          />
        </div>
        
        {/* 進度點和標籤 */}
        <div className={styles.stepsContainer}>
          {steps.map((label, index) => (
            <div key={index} className={styles.stepItem}>
              <div className={`${styles.stepDot} ${index <= currentStep ? styles.stepActive : ''}`}>
                {index < currentStep && (
                  <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="20 6 9 17 4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <div className={styles.stepLabel}>{label}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 下一步按鈕 */}
      <button 
        className={styles.nextButton}
        onClick={onNext}
        disabled={disabled || currentStep >= steps.length - 1}
      >
        <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" strokeLinecap="round"/>
          <polyline points="12 5 19 12 12 19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
