'use client';

import { useEffect, useState } from 'react';
import styles from './admin.module.css';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 使用 XMLHttpRequest 來觸發 HTTP Basic Auth
    // 這是最可靠的方式來觸發瀏覽器原生認證對話框
    const xhr = new XMLHttpRequest();
    
    xhr.open('GET', '/api/admin-auth', true);
    
    xhr.onload = function() {
      if (xhr.status === 200) {
        // 認證成功
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        // 認證失敗
        setError('認證失敗');
        setIsLoading(false);
      }
    };
    
    xhr.onerror = function() {
      setError('連線錯誤');
      setIsLoading(false);
    };
    
    xhr.onabort = function() {
      setError('認證已取消');
      setIsLoading(false);
    };
    
    // 發送請求，這會觸發瀏覽器的 HTTP Basic Auth 對話框
    xhr.send();
    
    // 清理函數
    return () => {
      if (xhr.readyState !== 4) {
        xhr.abort();
      }
    };
  }, []);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <h2>管理員登入</h2>
          <p>請在彈出的對話框中輸入帳號密碼</p>
          <p className={styles.hint}>預設帳號: admin / 密碼: admin123</p>
        </div>
      </div>
    );
  }

  if (error || !isAuthenticated) {
    return (
      <div className={styles.container}>
        <div className={styles.authFailed}>
          <h2>{error || '認證失敗'}</h2>
          <p>請重新整理頁面並輸入正確的帳號密碼</p>
          <p className={styles.hint}>預設帳號: admin / 密碼: admin123</p>
          <button onClick={() => window.location.reload()} className={styles.retryButton}>
            重新嘗試
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>管理員後台</h1>
      </div>
      
      <div className={styles.content}>
        <div className={styles.card}>
          <h2>歡迎來到管理員頁面</h2>
          <p>您已成功登入管理員後台。</p>
          
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <h3>統計資訊</h3>
              <p>這裡可以顯示各種統計數據</p>
            </div>
            
            <div className={styles.statItem}>
              <h3>系統狀態</h3>
              <p>系統運行正常</p>
            </div>
            
            <div className={styles.statItem}>
              <h3>最近活動</h3>
              <p>暫無活動記錄</p>
            </div>
          </div>
          
          <div className={styles.actions}>
            <button onClick={() => window.location.href = '/'} className={styles.homeButton}>
              返回首頁
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

