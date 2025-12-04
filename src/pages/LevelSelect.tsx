import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { useProgress } from '../hooks/useProgress';
import { levels } from '../data/levels';
import './LevelSelect.css';

export const LevelSelect: React.FC = () => {
  const navigate = useNavigate();
  const { isLevelCompleted } = useProgress();

  return (
    <div className="level-select">
      <div className="level-select-header">
        <h1>Choose Your Level</h1>
        <p>Select a level to start learning PromQL</p>
      </div>

      <div className="level-grid">
        {levels.map((level) => {
          const completed = isLevelCompleted(level.id);

          return (
            <Card
              key={level.id}
              className="level-card"
              onClick={() => navigate(`/level/${level.id}`)}
            >
              <div className="level-card-header">
                <span className="level-number">Level {level.id}</span>
                {completed && <span className="level-badge">✓</span>}
              </div>
              <h3 className="level-title">{level.title}</h3>
              <p className="level-concept">{level.concept}</p>
              <div className="level-description">{level.description}</div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
