"use client";

import React from 'react';
import { DollCanvas } from '../doll/DollCanvas';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ModelSelectionControls } from '../doll/ModelSelectionControls';
import styles from './Step0ModelSelection.module.css';

/**
 * 步驟 0：模型選擇
 * 顯示 3D 模型和選擇控制按鈕
 */
export function Step0ModelSelection({
  headIndex,
  setHeadIndex,
  bodyIndex,
  setBodyIndex,
  legsIndex,
  setLegsIndex,
}) {
  const [isLoadingModel, setIsLoadingModel] = React.useState(true);
  const hasLoadedOnce = React.useRef(false);

  // 管理 loading 狀態
  React.useEffect(() => {
    // 只在第一次載入時顯示 loading
    if (!hasLoadedOnce.current) {
      setIsLoadingModel(true);
      // 設置超時，避免永久載入
      const timeout = setTimeout(() => {
        setIsLoadingModel(false);
        hasLoadedOnce.current = true;
      }, 3000); // 3秒超時
      return () => clearTimeout(timeout);
    } else {
      // 如果已經載入過，直接不顯示 loading
      setIsLoadingModel(false);
    }
  }, []);

  return (
    <>
      {/* 容器包裝器 */}
      <div className={styles.containerWrapper}>
        {/* Canvas 容器 */}
        <div className={styles.canvasContainer}>
          {isLoadingModel && <LoadingSpinner />}
          <DollCanvas
            key="step0-canvas"
            headIndex={headIndex}
            bodyIndex={bodyIndex}
            legsIndex={legsIndex}
            onModelLoad={() => {
              setIsLoadingModel(false);
              hasLoadedOnce.current = true;
            }}
            cameraPosition={[0, 0, 15]}
            cameraFov={50}
          />
        </div>

        {/* 選擇按鈕 */}
        <ModelSelectionControls
          headIndex={headIndex}
          setHeadIndex={setHeadIndex}
          bodyIndex={bodyIndex}
          setBodyIndex={setBodyIndex}
          legsIndex={legsIndex}
          setLegsIndex={setLegsIndex}
        />
      </div>

      {/* 提示文字 */}
      <div className={styles.hintTextSection}>
        \ 模型可以旋轉查看呦！ /
      </div>
    </>
  );
}
