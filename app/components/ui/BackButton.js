"use client";

import React from 'react';
import styles from './BackButton.module.css';

/**
 * 返回按鈕組件（左上角）
 * @param {function} onClick - 點擊處理函數
 */
export function BackButton({ onClick }) {
  return (
    <button className={styles.backButton} onClick={onClick}>
      <svg className={styles.backIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <polyline points="15 18 9 12 15 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span>返回</span>
    </button>
  );
}
