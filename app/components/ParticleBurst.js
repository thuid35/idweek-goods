"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './ParticleBurst.module.css';

/**
 * 花朵綻放粒子效果元件
 * 在模型出現時產生向外綻放的花瓣粒子
 */
export function ParticleBurst({ trigger = false }) {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    if (!trigger || !containerRef.current) return;

    // 清空之前的粒子
    containerRef.current.innerHTML = '';
    particlesRef.current = [];

    // 花瓣顏色配置（粉色系）
    const colors = [
      '#FFB6C1', // 淺粉紅
      '#FF69B4', // 熱粉紅
      '#FFE4E1', // 薄霧玫瑰
      '#FFC0CB', // 粉紅
      '#FF1493', // 深粉紅
      '#FFD700', // 金色
    ];

    // 建立多層花瓣
    const layers = 3; // 3 層花瓣
    const petalsPerLayer = 8; // 每層 8 片花瓣
    const totalParticles = layers * petalsPerLayer;

    for (let layer = 0; layer < layers; layer++) {
      for (let i = 0; i < petalsPerLayer; i++) {
        const particle = document.createElement('div');
        particle.className = styles.particle;
        
        // 隨機顏色
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        
        // 花瓣形狀（使用 border-radius 創造花瓣效果）
        const size = 20 - layer * 5; // 外層較大
        particle.style.width = `${size}px`;
        particle.style.height = `${size * 1.5}px`;
        particle.style.borderRadius = '50% 50% 50% 50% / 60% 60% 40% 40%';
        
        containerRef.current.appendChild(particle);
        particlesRef.current.push({ element: particle, layer, index: i });
      }
    }

    // GSAP 動畫時間軸
    const tl = gsap.timeline();

    particlesRef.current.forEach(({ element, layer, index }) => {
      // 計算角度（均勻分布）
      const angle = (index / petalsPerLayer) * Math.PI * 2;
      
      // 計算距離（外層飛得更遠）
      const distance = 150 + layer * 50;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      // 設定初始位置（中心）
      gsap.set(element, {
        x: 0,
        y: 0,
        scale: 0,
        rotation: angle * (180 / Math.PI),
        opacity: 0,
      });

      // 綻放動畫
      tl.to(element, {
        x: x,
        y: y,
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        delay: layer * 0.05, // 層次延遲
      }, 0);

      // 旋轉效果
      tl.to(element, {
        rotation: `+=${360 + Math.random() * 180}`,
        duration: 0.8,
        ease: 'power1.out',
      }, 0);

      // 消失動畫
      tl.to(element, {
        opacity: 0,
        scale: 0.3,
        duration: 0.4,
        ease: 'power2.in',
      }, 0.6);
    });

    // 清理
    return () => {
      tl.kill();
    };
  }, [trigger]);

  return (
    <div className={styles.container} ref={containerRef} />
  );
}
