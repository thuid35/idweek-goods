"use client";

import React from "react";
import styles from "./Navbar.module.css";

/**
 * 頂部導航欄元件
 */
export function Navbar() {
  const [showInfo, setShowInfo] = React.useState(false);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h1 className={styles.title}>
              / ANN /
            </h1>
            <div className={styles.info}>
              <button 
                className={styles.infoButton}
                onClick={() => setShowInfo(true)}
                aria-label="Information"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Info Modal */}
      {showInfo && (
        <div className={styles.modalOverlay} onClick={() => setShowInfo(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setShowInfo(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <h2 className={styles.modalTitle}>✷ 關於本網站 ✷</h2>
            <div className={styles.modalBody}>
              <p>歡迎來到 / ANN / 。</p>
              <p>這是一個2025東海工設週遺留的產物，我在此時此刻才把網站建好，真的是下跪磕頭#@!*&...?'\|</p>
              <p>😇 模型設計：
                <a href="https://www.instagram.com/annnnnn__nnn/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#007aff', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  吳廷恩
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </p>
              <p>🥢 網站：
                <a href="https://www.instagram.com/eric.wang.16/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#007aff', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Eric
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </p>
              <p><strong>操作說明：</strong></p>
              <ul>
                <li>點擊左右箭頭切換不同部位樣式</li>
                <li>完成搭配後點擊「下一步」填寫資料</li>
                <li>預覽或下載你的公仔！（好像可以列印呦）</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
