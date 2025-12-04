import { useState, useEffect } from 'react';
import type { Progress } from '../types';

const STORAGE_KEY = 'promql-froggy-progress';

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const markLevelCompleted = (levelId: number) => {
    setProgress((prev) => ({
      ...prev,
      [levelId]: {
        completed: true,
        attempts: (prev[levelId]?.attempts || 0) + 1,
        lastAttempt: new Date().toISOString(),
      },
    }));
  };

  const incrementAttempts = (levelId: number) => {
    setProgress((prev) => ({
      ...prev,
      [levelId]: {
        completed: prev[levelId]?.completed || false,
        attempts: (prev[levelId]?.attempts || 0) + 1,
        lastAttempt: new Date().toISOString(),
      },
    }));
  };

  const resetProgress = () => {
    setProgress({});
    localStorage.removeItem(STORAGE_KEY);
  };

  const isLevelCompleted = (levelId: number): boolean => {
    return progress[levelId]?.completed || false;
  };

  const getCompletedCount = (): number => {
    return Object.values(progress).filter((p) => p.completed).length;
  };

  return {
    progress,
    markLevelCompleted,
    incrementAttempts,
    resetProgress,
    isLevelCompleted,
    getCompletedCount,
  };
}
