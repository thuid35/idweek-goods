"use client";

import React from "react";
import styles from "./ArrowButton.module.css";

/**
 * 箭頭按鈕元件
 * @param {string} direction - 箭頭方向（'left' 或 'right'）
 * @param {function} onClick - 點擊事件處理函數
 */
export function ArrowButton({ direction, onClick }) {
  const isLeft = direction === "left";
  
  return (
    <button onClick={onClick} className={styles.arrowButton}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className={styles.arrowIcon}
      >
        {isLeft ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        )}
      </svg>
    </button>
  );
}
