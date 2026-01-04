"use client";

import React from "react";
import Svg from "next/image";
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
      <Svg
        src={isLeft ? "/icons/arrow_left.svg" : "/icons/arrow_right.svg"}
        alt={isLeft ? "左箭頭" : "右箭頭"}
        width={40}
        height={40}
        className={styles.arrowIcon}
      />
    </button>
  );
};