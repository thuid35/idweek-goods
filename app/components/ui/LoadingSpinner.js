"use client";

import React from 'react';
import styles from './LoadingSpinner.module.css';

/**
 * 載入中動畫組件
 */
export function LoadingSpinner() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <div className={styles.loadingText}>載入中...</div>
    </div>
  );
}
