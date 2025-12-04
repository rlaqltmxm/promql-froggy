import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { useProgress } from '../hooks/useProgress';
import { levels } from '../data/levels';
import './Home.css';

export const Home: React.FC = () => {
  const { getCompletedCount } = useProgress();
  const completedCount = getCompletedCount();
  const totalLevels = levels.length;

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-icon">🐸</span>
            Welcome to PromQL Froggy!
          </h1>
          <p className="hero-subtitle">
            Learn Prometheus Query Language by helping our friendly frog solve puzzles
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">{totalLevels}</span>
              <span className="stat-label">Levels</span>
            </div>
            <div className="stat">
              <span className="stat-number">{completedCount}</span>
              <span className="stat-label">Completed</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {Math.round((completedCount / totalLevels) * 100)}%
              </span>
              <span className="stat-label">Progress</span>
            </div>
          </div>
          <div className="hero-actions">
            <Link to="/levels">
              <Button variant="success">Start Learning</Button>
            </Link>
            <Link to="/sandbox">
              <Button variant="secondary">Try Sandbox</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>What You'll Learn</h2>
        <div className="feature-grid">
          <Card>
            <div className="feature-icon">📊</div>
            <h3>Basic Selectors</h3>
            <p>Learn how to query metrics and filter by labels</p>
          </Card>
          <Card>
            <div className="feature-icon">🔢</div>
            <h3>Aggregations</h3>
            <p>Master sum, avg, count, and grouping operations</p>
          </Card>
          <Card>
            <div className="feature-icon">⚡</div>
            <h3>Functions</h3>
            <p>Use rate, irate, and other essential PromQL functions</p>
          </Card>
          <Card>
            <div className="feature-icon">🚨</div>
            <h3>Alerting Context</h3>
            <p>See how queries connect to real-world alerting rules</p>
          </Card>
        </div>
      </section>

      <section className="about">
        <Card>
          <h2>About PromQL Froggy</h2>
          <p>
            Inspired by <strong>Flexbox Froggy</strong>, this interactive learning platform
            teaches you PromQL through hands-on puzzles. Each level introduces a new concept
            and challenges you to write queries that help our frog friend complete their mission.
          </p>
          <p>
            Perfect for DevOps engineers, SREs, and developers who want to master Prometheus
            monitoring and alerting!
          </p>
        </Card>
      </section>
    </div>
  );
};
