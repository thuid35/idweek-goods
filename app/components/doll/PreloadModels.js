"use client";

import { useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { PARTS } from './constants';

/**
 * 預載入所有 STL 模型組件
 * 在背景載入所有模型，避免切換時才載入造成延遲
 */
export function PreloadModels() {
  // 收集所有 STL 檔案路徑
  const allPaths = [
    ...PARTS.head.map(part => part.path),
    ...PARTS.body.map(part => part.path),
    ...PARTS.legs.map(part => part.path),
  ];

  // 使用 useLoader 預載入所有模型
  // 這會在組件掛載時載入所有檔案到快取中
  useLoader(STLLoader, allPaths);

  // 此組件不渲染任何可見內容
  return null;
}
