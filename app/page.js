"use client";

import React, { useState } from "react";
import { PARTS } from "./components/constants";
import { DollCanvas } from "./components/DollCanvas";

// --- Static UI Component ---
function ArrowButton({ direction, onClick }) {
  const isLeft = direction === "left";
  return (
    <button
      onClick={onClick}
      className={`
        w-14 h-14 flex items-center justify-center 
        bg-white/10 backdrop-blur-md rounded-full 
        hover:bg-white/30 active:scale-95 transition-all
        text-white border border-white/20
        shadow-lg
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={3}
        stroke="currentColor"
        className="w-8 h-8"
      >
        {isLeft ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        )}
      </svg>
    </button>
  );
}

function ControlRow({ onPrev, onNext, topClass }) {
    return (
        <div className={`absolute w-full px-8 flex justify-between items-center pointer-events-none ${topClass}`}>
            <div className="pointer-events-auto">
                <ArrowButton direction="left" onClick={onPrev} />
            </div>
            <div className="pointer-events-auto">
                <ArrowButton direction="right" onClick={onNext} />
            </div>
        </div>
    )
}

export default function Home() {
  const [headIndex, setHeadIndex] = useState(0);
  const [bodyIndex, setBodyIndex] = useState(0);
  const [legsIndex, setLegsIndex] = useState(0);

  const cycle = (setter, current, max, dir) => {
    setter((current + dir + max) % max);
  };

  return (
    <main className="w-screen h-screen overflow-hidden bg-neutral-900 flex items-center justify-center">
      
      {/* Main Container: 70vw width, 60vh height, centered */}
      <div className="relative w-[70vw] h-[60vh] bg-white/5 backdrop-blur-sm rounded-3xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex flex-col justify-center">
        
        {/* 3D Layer - Absolute Inset */}
        <DollCanvas
          headIndex={headIndex}
          bodyIndex={bodyIndex}
          legsIndex={legsIndex}
        />


        {/* Static UI Layer */}
        <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
            
            <ControlRow 
                topClass="top-[15%] left-0" 
                onPrev={() => cycle(setHeadIndex, headIndex, PARTS.head.length, -1)}
                onNext={() => cycle(setHeadIndex, headIndex, PARTS.head.length, 1)}
            />

            <ControlRow 
                topClass="top-[50%] left-0 -translate-y-1/2" 
                onPrev={() => cycle(setBodyIndex, bodyIndex, PARTS.body.length, -1)}
                onNext={() => cycle(setBodyIndex, bodyIndex, PARTS.body.length, 1)}
            />

            <ControlRow 
                topClass="top-[85%] left-0 -translate-y-full" 
                onPrev={() => cycle(setLegsIndex, legsIndex, PARTS.legs.length, -1)}
                onNext={() => cycle(setLegsIndex, legsIndex, PARTS.legs.length, 1)}
            />
        </div>

      </div>

    </main>
  );
};
