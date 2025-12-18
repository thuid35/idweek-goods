"use client";

import React from "react";
import styles from "./Navbar.module.css";

/**
 * 頂部導航欄元件
 */
export function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            工設週 2025 · 模型選擇器
          </h1>
          <div className={styles.info}>
            <span className={styles.subtitle}>
              選擇你的專屬組合
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
