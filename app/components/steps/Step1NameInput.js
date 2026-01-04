"use client";

import React from 'react';
import { DollCanvas } from '../doll/DollCanvas';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { NameInput } from '../ui/NameInput';

import styles from './Step1NameInput.module.css';

/**
 * 步驟 1：姓名輸入
 * 顯示預覽模型和姓名輸入框
 */
export function Step1NameInput({
  headIndex,
  bodyIndex,
  legsIndex,
  userName,
  setUserName,
  isLoading,
}) {

  return (
    <>
      {/* 容器包裝器 */}
      <div className={styles.containerWrapper}>
        {/* Canvas 容器 */}
        <div className={styles.canvasContainer}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <DollCanvas
              key="step1-canvas"
              headIndex={headIndex}
              bodyIndex={bodyIndex}
              legsIndex={legsIndex}
              scale={2}
              cameraPosition={[0, 0, 20]}
              cameraFov={60}
            />
          )}
        </div>
      </div>

      {/* 姓名輸入區段 */}
      <div className={styles.phoneInputSection}>
        <div className={styles.previewTitle}>！取名時間！</div>
        <NameInput value={userName} onChange={setUserName} />
      </div>
    </>
  );
}
