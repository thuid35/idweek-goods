"use client";

import React from 'react';
import { DollCanvas } from '../DollCanvas';
import { QRCodeDisplay } from '../QRCodeDisplay';
import styles from './Step2Complete.module.css';

/**
 * 步驟 2：完成頁面
 * 顯示完成動畫、QR-Code 和重選按鈕
 */
export function Step2Complete({
  headIndex,
  bodyIndex,
  legsIndex,
  phoneNumber,
  onReset,
}) {
  const [showQRCode, setShowQRCode] = React.useState(false);
  const [hideCanvas, setHideCanvas] = React.useState(false);

  // 管理動畫時序
  React.useEffect(() => {
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
  }, []);

  return (
    <>
      {/* 容器包裝器 */}
      <div className={styles.containerWrapper}>
        {/* Canvas 容器 - 完成動畫 */}
        {!hideCanvas && (
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
      </div>

      {/* 完成區段 */}
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
    </>
  );
}
