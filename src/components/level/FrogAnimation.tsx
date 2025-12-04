import React from 'react';
import './FrogAnimation.css';

interface FrogAnimationProps {
  isSuccess: boolean;
}

export const FrogAnimation: React.FC<FrogAnimationProps> = ({ isSuccess }) => {
  return (
    <div className={`frog-container ${isSuccess ? 'frog-success' : ''}`}>
      <div className="pond-area">
        <div className="lily-pad lily-pad-1">
          <span className="lily-emoji">🪷</span>
        </div>
        <div className="lily-pad lily-pad-2">
          <span className="lily-emoji">🪷</span>
        </div>
        <div className="lily-pad lily-pad-3">
          <span className="lily-emoji">🪷</span>
        </div>
      </div>
      <div className={`frog ${isSuccess ? 'frog-jump' : ''}`}>
        <span className="frog-emoji">🐸</span>
      </div>
      {isSuccess && (
        <div className="success-message">
          <span>Great job! 🎉</span>
        </div>
      )}
    </div>
  );
};
