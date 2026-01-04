"use client";

import React, { useState } from 'react';
import styles from './NameInput.module.css';

/**
 * 姓名輸入組件
 * @param {string} value - 姓名值
 * @param {function} onChange - 值變更處理函數
 */
export function NameInput({ value, onChange }) {
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const input = e.target.value;
    onChange(input);
    
    // 驗證格式 - 簡單驗證非空
    if (input.trim().length === 0 && input.length > 0) {
      setError('請輸入有效姓名');
    } else {
      setError('');
    }
  };

  const isValid = value && value.trim().length > 0;

  return (
    <div className={styles.phoneInputContainer}>
      <label className={styles.label}>
        幫你的模型取一個名字吧！
      </label>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="ex. Suima"
          className={`${styles.input} ${error ? styles.inputError : ''} ${isValid ? styles.inputValid : ''}`}
          maxLength={20}
        />
        {isValid && (
          <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="20 6 9 17 4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <div className={styles.hint}>這個名字其實不會用在任何地方</div>
    </div>
  );
}
