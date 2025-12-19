"use client";

import React from 'react';
import { DollCanvas } from './DollCanvas';
import { LoadingSpinner } from './LoadingSpinner';
import { PhoneInput } from './PhoneInput';
import { ModelSelectionControls } from './ModelSelectionControls';
import { QRCodeDisplay } from './QRCodeDisplay';
import styles from './StepContent.module.css';

/**
 * 各步驟的內容渲染組件
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
  const [showQRCode, setShowQRCode] = React.useState(false);
  const [hideCanvas, setHideCanvas] = React.useState(false);
  const [isLoadingModel, setIsLoadingModel] = React.useState(true);
  const hasLoadedOnce = React.useRef(false); // 標記是否已載入過

  // 當進入步驟2時，延遲顯示QR-Code 並隱藏 Canvas
  React.useEffect(() => {
    if (currentStep === 2) {
      setShowQRCode(false);
      setHideCanvas(false);
      
      // 隱藏 Canvas（1.6秒 = 旋轉0.8s + 縮小0.5s + 消失0.3s）
      const hideTimer = setTimeout(() => {
        setHideCanvas(true);
      }, 1600);
      
      // 顯示 QR-Code（稍微延遲一點讓過渡更順暢）
      const showTimer = setTimeout(() => {
        setShowQRCode(true);
      }, 1800);
      
      return () => {
        clearTimeout(hideTimer);
        clearTimeout(showTimer);
      };
    }
  }, [currentStep]);

  // 當進入步驟0時，管理 loading 狀態
  React.useEffect(() => {
    if (currentStep === 0) {
      // 只在第一次載入時顯示 loading
      if (!hasLoadedOnce.current) {
        setIsLoadingModel(true);
        // 設置超時，避免永久載入
        const timeout = setTimeout(() => {
          setIsLoadingModel(false);
          hasLoadedOnce.current = true;
        }, 3000); // 3秒超時
        return () => clearTimeout(timeout);
      } else {
        // 如果已經載入過，直接不顯示 loading
        setIsLoadingModel(false);
      }
    }
  }, [currentStep]);

  return (
    <>
      {/* 容器包裝器 - 用於定位 Canvas 和按鈕層 */}
      <div className={`${styles.containerWrapper} ${
        currentStep === 1 ? styles.containerSmall : 
        currentStep === 2 ? styles.containerComplete : 
        ''
      }`}>
        
        {/* 步驟 0：選擇模型 Canvas */}
        {currentStep === 0 && (
          <div className={styles.canvasContainer}>
            {isLoadingModel && <LoadingSpinner />}
            <DollCanvas
              key="step0-canvas"
              headIndex={headIndex}
              bodyIndex={bodyIndex}
              legsIndex={legsIndex}
              onModelLoad={() => {
                setIsLoadingModel(false);
                hasLoadedOnce.current = true;
              }}
            />
          </div>
        )}

        {/* 步驟 1：預覽模型 Canvas（獨立實例） */}
        {currentStep === 1 && (
          <div className={styles.canvasContainer}>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <DollCanvas
                key="step1-canvas"
                headIndex={headIndex}
                bodyIndex={bodyIndex}
                legsIndex={legsIndex}
                scale={1.2}
              />
            )}
          </div>
        )}

        {/* 步驟 2：完成 Canvas */}
        {currentStep === 2 && !hideCanvas && (
          <div className={styles.canvasContainer}>
            <DollCanvas
              key="step2-canvas"
              headIndex={headIndex}
              bodyIndex={bodyIndex}
              legsIndex={legsIndex}
              scale={1.8}
              animateOnComplete={true}
            />
          </div>
        )}

        {/* 步驟 0：顯示選擇按鈕 */}
        {currentStep === 0 && (
          <ModelSelectionControls
            headIndex={headIndex}
            setHeadIndex={setHeadIndex}
            bodyIndex={bodyIndex}
            setBodyIndex={setBodyIndex}
            legsIndex={legsIndex}
            setLegsIndex={setLegsIndex}
          />
        )}

      </div>

      {/* 步驟 1：顯示電話輸入（位於模型下方） */}
      {currentStep === 1 && (
        <div className={styles.phoneInputSection}>
          <div className={styles.previewTitle}>你的模型還剩最後一步！</div>
          <PhoneInput value={phoneNumber} onChange={setPhoneNumber} />
        </div>
      )}

      {/* 步驟 2：完成區段（位於模型下方） */}
      {currentStep === 2 && (
        <div className={styles.completeSection}>
          <div className={styles.completeTitle}>完成！</div>
          
          {/* QR-Code 區域 - 始終保留空間 */}
          <div className={styles.qrcodeArea}>
            {showQRCode && (
              <>
                <QRCodeDisplay
                  headIndex={headIndex}
                  bodyIndex={bodyIndex}
                  legsIndex={legsIndex}
                  phoneNumber={phoneNumber}
                />
                <div className={styles.qrcodeHint}>
                  請截圖或攜帶此 QR-Code 至現場交給工作人員！
                </div>
              </>
            )}
          </div>
          
          <button 
            className={styles.resetButton}
            onClick={onReset}
          >
            我要重選
          </button>
        </div>
      )}

      {/* 步驟 0：提示文字（位於進度條上方） */}
      {currentStep === 0 && (
        <div className={styles.hintTextSection}>
          \ 模型可以旋轉查看呦！ /
        </div>
      )}
    </>
  );
}
