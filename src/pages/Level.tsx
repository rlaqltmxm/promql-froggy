import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { QueryEditor } from '../components/level/QueryEditor';
import { ResultDisplay } from '../components/level/ResultDisplay';
import { FrogAnimation } from '../components/level/FrogAnimation';
import { useProgress } from '../hooks/useProgress';
import { useQuery } from '../hooks/useQuery';
import { levels } from '../data/levels';
import { validateSolution, querySimilarity } from '../engine/validator';
import './Level.css';

export const Level: React.FC = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();
  const { markLevelCompleted, incrementAttempts, isLevelCompleted } = useProgress();

  const currentLevel = levels.find((l) => l.id === Number(levelId));
  const [isSuccess, setIsSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const { query, setQuery, result, isLoading, executeQuery, clearResult } = useQuery(
    currentLevel?.sampleMetrics || []
  );

  useEffect(() => {
    if (currentLevel?.initialQuery) {
      setQuery(currentLevel.initialQuery);
    } else {
      setQuery('');
    }
    setIsSuccess(false);
    clearResult();
  }, [levelId, currentLevel]);

  if (!currentLevel) {
    return (
      <div className="level-error">
        <h2>Level not found</h2>
        <Button onClick={() => navigate('/levels')}>Back to Levels</Button>
      </div>
    );
  }

  const handleExecute = () => {
    executeQuery();
    incrementAttempts(currentLevel.id);
  };

  const handleCheckSolution = () => {
    if (!result) {
      alert('Please run your query first!');
      return;
    }

    const isValid = validateSolution(result, currentLevel.solutionQuery);
    const similarity = querySimilarity(query, currentLevel.solutionQuery);

    if (isValid && similarity > 0.7) {
      setIsSuccess(true);
      markLevelCompleted(currentLevel.id);
    } else {
      alert('Not quite right. Try again! 🐸\n\nHint: ' + (currentLevel.hint || 'Check the concept description'));
    }
  };

  const handleNextLevel = () => {
    const nextLevel = levels.find((l) => l.id === currentLevel.id + 1);
    if (nextLevel) {
      navigate(`/level/${nextLevel.id}`);
    } else {
      alert('Congratulations! You completed all levels! 🎉');
      navigate('/levels');
    }
  };

  const alreadyCompleted = isLevelCompleted(currentLevel.id);

  return (
    <div className="level-page">
      <div className="level-container">
        <div className="level-header">
          <Button variant="secondary" onClick={() => navigate('/levels')}>
            ← Back to Levels
          </Button>
          <h1 className="level-page-title">{currentLevel.title}</h1>
        </div>

        <div className="level-content">
          <div className="level-left">
            <Card className="concept-card">
              <h2>📚 Concept: {currentLevel.concept}</h2>
              <p className="concept-description">{currentLevel.description}</p>
              {currentLevel.hint && (
                <div className="hint-section">
                  <button
                    className="hint-toggle"
                    onClick={() => setShowHint(!showHint)}
                  >
                    💡 {showHint ? 'Hide Hint' : 'Show Hint'}
                  </button>
                  {showHint && <p className="hint-text">{currentLevel.hint}</p>}
                </div>
              )}
            </Card>

            <Card className="query-card">
              <h3>Your PromQL Query</h3>
              <QueryEditor
                value={query}
                onChange={setQuery}
                onExecute={handleExecute}
                isLoading={isLoading}
              />
              <div className="query-actions">
                <Button onClick={handleExecute} disabled={isLoading}>
                  {isLoading ? 'Running...' : '▶ Run Query'}
                </Button>
                <Button variant="success" onClick={handleCheckSolution} disabled={!result}>
                  ✓ Check Solution
                </Button>
              </div>
            </Card>

            {result && <ResultDisplay result={result} />}

            {currentLevel.alertContext && (
              <Card className="alert-card">
                <h3>🚨 Real-World Context</h3>
                <pre className="alert-context">{currentLevel.alertContext}</pre>
              </Card>
            )}
          </div>

          <div className="level-right">
            <Card className="animation-card">
              <FrogAnimation isSuccess={isSuccess} />
              {isSuccess && (
                <div className="success-actions">
                  <h3>Level Complete! 🎉</h3>
                  <Button variant="success" onClick={handleNextLevel}>
                    Next Level →
                  </Button>
                </div>
              )}
              {alreadyCompleted && !isSuccess && (
                <div className="completed-badge">
                  <span>✓ Already Completed</span>
                </div>
              )}
            </Card>

            <Card className="sample-data-card">
              <h3>📊 Sample Metrics</h3>
              <div className="sample-metrics">
                <p className="sample-count">
                  {currentLevel.sampleMetrics.length} metrics available
                </p>
                <details>
                  <summary>View sample data</summary>
                  <pre className="sample-data">
                    {JSON.stringify(currentLevel.sampleMetrics.slice(0, 3), null, 2)}
                    {currentLevel.sampleMetrics.length > 3 && '\n...'}
                  </pre>
                </details>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
