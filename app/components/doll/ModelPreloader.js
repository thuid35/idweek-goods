"use client";

import { useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { PARTS } from "./constants";

/**
 * 模型預載入元件
 * 在應用程式啟動時預載入所有 STL 模型
 */
export function ModelPreloader({ onComplete }) {
  const [isLoading, setIsLoading] = useState(true);

  // 收集所有模型路徑
  const allPaths = [
    ...PARTS.head.map(p => p.path),
    ...PARTS.body.map(p => p.path),
    ...PARTS.legs.map(p => p.path),
  ];

  // 批次載入所有模型
  const geometries = useLoader(STLLoader, allPaths);

  useEffect(() => {
    if (geometries && geometries.length === allPaths.length) {
      setIsLoading(false);
      if (onComplete) {
        onComplete();
      }
    }
  }, [geometries, allPaths.length, onComplete]);

  // 這個元件不渲染任何視覺內容
  return null;
}

/**
 * 從預載入快取中取得模型
 * 使用 useLoader 的快取機制
 */
export function usePreloadedModel(path) {
  return useLoader(STLLoader, path);
}
