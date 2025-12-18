"use client";

import React from 'react';
import { ArrowButton } from './ArrowButton';
import { PARTS } from './constants';
import styles from './ModelSelectionControls.module.css';

/**
 * 模型選擇控制按鈕（步驟 0）
 * @param {number} headIndex - 頭部索引
 * @param {function} setHeadIndex - 設置頭部索引
 * @param {number} bodyIndex - 身體索引
 * @param {function} setBodyIndex - 設置身體索引
 * @param {number} legsIndex - 腿部索引
 * @param {function} setLegsIndex - 設置腿部索引
 */
export function ModelSelectionControls({
  headIndex,
  setHeadIndex,
  bodyIndex,
  setBodyIndex,
  legsIndex,
  setLegsIndex,
}) {
  // 循環切換函數
  const cycle = (setter, current, max, dir) => {
    setter((current + dir + max) % max);
  };

  return (
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
  );
}
