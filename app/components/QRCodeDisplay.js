"use client";

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import styles from './QRCodeDisplay.module.css';

/**
 * QR-Code 顯示組件
 * @param {number} headIndex - 頭部索引
 * @param {number} bodyIndex - 身體索引
 * @param {number} legsIndex - 腿部索引
 * @param {string} phoneNumber - 電話號碼
 */
export function QRCodeDisplay({ headIndex, bodyIndex, legsIndex, phoneNumber }) {
  // 建立資料物件
  const data = {
    head: headIndex,
    body: bodyIndex,
    legs: legsIndex,
    phone: phoneNumber,
  };

  // 將資料轉換為 JSON 字串
  const jsonString = JSON.stringify(data);

  // Base64 編碼
  const base64Encoded = typeof window !== 'undefined' 
    ? btoa(unescape(encodeURIComponent(jsonString)))
    : '';

  return (
    <div className={styles.qrcodeContainer}>
      <div className={styles.qrcodeWrapper}>
        <QRCodeSVG
          value={base64Encoded}
          size={200}
          level="H"
          includeMargin={true}
          bgColor="#ffffff"
          fgColor="#000000"
        />
      </div>
      <div className={styles.qrcodeHint}>
        請截圖或攜帶此 QR-Code 至現場交給工作人員！
      </div>
    </div>
  );
}
