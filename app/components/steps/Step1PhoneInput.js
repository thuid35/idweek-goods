"use client";

import React from 'react';
import { DollCanvas } from '../DollCanvas';
import { LoadingSpinner } from '../LoadingSpinner';
import { PhoneInput } from '../PhoneInput';
import { ParticleBurst } from '../ParticleBurst';
import styles from './Step1PhoneInput.module.css';

/**
 * 步驟 1：電話輸入
 * 顯示預覽模型和電話輸入框
 */
export function Step1PhoneInput({
  headIndex,
  bodyIndex,
  legsIndex,
  phoneNumber,
  setPhoneNumber,
  isLoading,
}) {
  const [triggerParticles, setTriggerParticles] = React.useState(false);

  // 當載入完成後觸發粒子效果
  React.useEffect(() => {
    if (!isLoading) {
      // 延遲一點讓模型先顯示
      const timer = setTimeout(() => {
        setTriggerParticles(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setTriggerParticles(false);
    }
  }, [isLoading]);
  return (
    <>
      {/* 容器包裝器 */}
      <div className={styles.containerWrapper}>
        {/* Canvas 容器 */}
        <div className={styles.canvasContainer}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <DollCanvas
                key="step1-canvas"
                headIndex={headIndex}
                bodyIndex={bodyIndex}
                legsIndex={legsIndex}
                scale={1.2}
              />
              {/* 花朵綻放粒子效果 */}
              <ParticleBurst trigger={triggerParticles} />
            </>
          )}
        </div>
      </div>

      {/* 電話輸入區段 */}
      <div className={styles.phoneInputSection}>
        <div className={styles.previewTitle}>你的模型還剩最後一步！</div>
        <PhoneInput value={phoneNumber} onChange={setPhoneNumber} />
      </div>
    </>
  );
}
