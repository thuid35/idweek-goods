"use client";

import React, { useState } from 'react';
import styles from './PhoneInput.module.css';

/**
 * 電話號碼輸入組件
 * @param {string} value - 電話號碼值
 * @param {function} onChange - 值變更處理函數
 */
export function PhoneInput({ value, onChange }) {
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const input = e.target.value.replace(/\D/g, ''); // 只保留數字
    
    if (input.length <= 10) {
      onChange(input);
      
      // 驗證格式
      if (input.length > 0 && input.length < 10) {
        setError('請輸入完整的 10 位數手機號碼');
      } else if (input.length === 10 && !input.startsWith('09')) {
        setError('手機號碼必須以 09 開頭');
      } else {
        setError('');
      }
    }
  };

  const isValid = value.length === 10 && value.startsWith('09');

  return (
    <div className={styles.phoneInputContainer}>
      <label className={styles.label}>
        請留下你的手機號碼
      </label>
      <div className={styles.inputWrapper}>
        <input
          type="tel"
          value={value}
          onChange={handleChange}
          placeholder="0912345678"
          className={`${styles.input} ${error ? styles.inputError : ''} ${isValid ? styles.inputValid : ''}`}
          maxLength={10}
        />
        {isValid && (
          <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="20 6 9 17 4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <div className={styles.hint}>您的手機號碼僅供後續聯絡使用</div>
    </div>
  );
}
