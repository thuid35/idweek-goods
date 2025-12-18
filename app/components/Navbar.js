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
            IDWEEK2025 · GOODS
          </h1>
          <div className={styles.info}>
            <span className={styles.subtitle}>
              
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
