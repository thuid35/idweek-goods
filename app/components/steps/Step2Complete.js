"use client";

import React, { useState } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter';
import { DollCanvas } from '../doll/DollCanvas';
import { PARTS } from '../doll/constants';
import styles from './Step2Complete.module.css';

/**
 * 步驟 2：完成頁面
 * 顯示完成動畫、下載 STL 按鈕和重選按鈕
 */
export function Step2Complete({
  headIndex,
  bodyIndex,
  legsIndex,
  userName,
  onReset,
}) {
  const [showContent, setShowContent] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // 管理動畫時序
  React.useEffect(() => {
    setShowContent(false);
    
    // 顯示內容（稍微延遲一點讓過渡更順暢）
    const showTimer = setTimeout(() => {
      setShowContent(true);
    }, 1500);
    
    return () => {
      clearTimeout(showTimer);
    };
  }, []);

  // 處理 STL 下載
  // 處理 STL 下載
  const handleDownloadSTL = async () => {
    setIsExporting(true);
    try {
      const loader = new STLLoader();
      const exporter = new STLExporter();
      
      // 取得選中的模型路徑
      const headPath = PARTS.head[headIndex].path;
      const bodyPath = PARTS.body[bodyIndex].path;
      const legsPath = PARTS.legs[legsIndex].path;

      // 載入所有部件
      const [headGeo, bodyGeo, legsGeo] = await Promise.all([
        loader.loadAsync(headPath),
        loader.loadAsync(bodyPath),
        loader.loadAsync(legsPath)
      ]);

      // 建立合併用的場景或群組
      const exportGroup = new THREE.Group();

      // 設定標準材質
      const material = new THREE.MeshStandardMaterial();

      // 輔助函數：建立部件結構 (符合 DollParts.js 的結構)
      const createPart = (geometry) => {
        // 內層 Mesh: 負責位移和縮放
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 0, -4.5); // STLModel default position
        mesh.scale.set(0.1, 0.1, 0.1); // STLModel default scale
        
        // 外層 Group: 負責旋轉
        const group = new THREE.Group();
        group.rotation.set(-Math.PI / 2, 0, 0); // Head/Body/Legs rotation
        group.add(mesh);
        
        return group;
      };

      // 加入各部位
      exportGroup.add(createPart(headGeo));
      exportGroup.add(createPart(bodyGeo));
      exportGroup.add(createPart(legsGeo));
      
      // 確保矩陣更新
      exportGroup.updateMatrixWorld(true);

      // 匯出為 STL
      // STLExporter 會遍歷 exportGroup，並將所有 geometry 根據 world matrix 轉換後合併
      const result = exporter.parse(exportGroup, { binary: true });
      
      // 建立下載連結
      const blob = new Blob([result], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      // 使用者名稱作為檔名
      link.download = `${userName || 'MyDoll'}.stl`;
      
      // 兼容性修復：必須將元素加入 DOM 才能在此類行動裝置(如 iOS Safari)上正常運作
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
      alert('下載失敗，請稍後再試');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      {/* 容器包裝器 - 改為全螢幕 Flex 佈局 */}
      <div className={styles.mainContainer}>
        
        {/* 1. 標題 */}
        <h1 className={styles.pageTitle}>你的模型好囉！</h1>
        
        {/* 2. 預覽窗口 (Card) */}
        <div className={styles.previewCard}>
           <div className={styles.canvasWrapper}>
              <DollCanvas
                key="step2-canvas"
                headIndex={headIndex}
                bodyIndex={bodyIndex}
                legsIndex={legsIndex}
                scale={1.4}
                animateOnComplete={true}
                cameraPosition={[0, 0, 16]}
                cameraFov={55}
              />
           </div>
        </div>

        {/* 3. 下載與操作區域 */}
        <div className={styles.actionSection}>
            <div className={styles.hintText}>
              這是 {userName}！<br/>
              你的模型已製作完成
            </div>

            <div className={styles.buttonGroup}>
              <button 
                className={styles.downloadButton}
                onClick={handleDownloadSTL}
                disabled={isExporting}
              >
                {isExporting ? '準備中...' : '下載模型 STL'}
              </button>
              
              <button 
                className={styles.resetButton}
                onClick={onReset}
              >
                我要重選
              </button>
            </div>
            
            <div className={styles.subHint}>
              此檔案可直接用於 3D 列印
            </div>
        </div>

      </div>
    </>
  );
}
