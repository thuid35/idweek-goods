"use client";

import React, { useState } from "react";
import { PARTS } from "./components/constants";
import { DollCanvas } from "./components/DollCanvas";
import { Navbar } from "./components/Navbar";
import { ArrowButton } from "./components/ArrowButton";
import styles from "./page.module.css";

export default function Home() {
  const [headIndex, setHeadIndex] = useState(0);
  const [bodyIndex, setBodyIndex] = useState(0);
  const [legsIndex, setLegsIndex] = useState(0);

  const cycle = (setter, current, max, dir) => {
    setter((current + dir + max) % max);
  };

  return (
    <>
      {/* 導航欄 */}
      <Navbar />
      
      {/* 主要內容 */}
      <main className={styles.main}>
        
        {/* 容器包裝器 - 用於定位 Canvas 和按鈕層 */}
        <div className={styles.containerWrapper}>
          
          {/* Canvas 容器 */}
          <div className={styles.canvasContainer}>
            <DollCanvas
              headIndex={headIndex}
              bodyIndex={bodyIndex}
              legsIndex={legsIndex}
            />
          </div>

          {/* 按鈕覆層 - 完全獨立於 Canvas */}
          <div className={styles.buttonOverlay}>
            
            {/* 頭部控制按鈕 - 頂部區域 */}
            <div className={`${styles.buttonWrapper} ${styles.buttonTop} ${styles.buttonLeft}`}>
              <ArrowButton 
                direction="left" 
                onClick={() => cycle(setHeadIndex, headIndex, PARTS.head.length, -1)} 
              />
            </div>
            <div className={`${styles.buttonWrapper} ${styles.buttonTop} ${styles.buttonRight}`}>
              <ArrowButton 
                direction="right" 
                onClick={() => cycle(setHeadIndex, headIndex, PARTS.head.length, 1)} 
              />
            </div>

            {/* 身體控制按鈕 - 中間區域 */}
            <div className={`${styles.buttonWrapper} ${styles.buttonMiddle} ${styles.buttonLeftMiddle}`}>
              <ArrowButton 
                direction="left" 
                onClick={() => cycle(setBodyIndex, bodyIndex, PARTS.body.length, -1)} 
              />
            </div>
            <div className={`${styles.buttonWrapper} ${styles.buttonMiddle} ${styles.buttonRightMiddle}`}>
              <ArrowButton 
                direction="right" 
                onClick={() => cycle(setBodyIndex, bodyIndex, PARTS.body.length, 1)} 
              />
            </div>

            {/* 腿部控制按鈕 - 底部區域 */}
            <div className={`${styles.buttonWrapper} ${styles.buttonBottom} ${styles.buttonLeft}`}>
              <ArrowButton 
                direction="left" 
                onClick={() => cycle(setLegsIndex, legsIndex, PARTS.legs.length, -1)} 
              />
            </div>
            <div className={`${styles.buttonWrapper} ${styles.buttonBottom} ${styles.buttonRight}`}>
              <ArrowButton 
                direction="right" 
                onClick={() => cycle(setLegsIndex, legsIndex, PARTS.legs.length, 1)} 
              />
            </div>

          </div>

        </div>

      </main>
    </>
  );
};
