import React from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { QueryEditor } from '../components/level/QueryEditor';
import { ResultDisplay } from '../components/level/ResultDisplay';
import { useQuery } from '../hooks/useQuery';
import { allMetrics } from '../data/sampleMetrics';
import './Sandbox.css';

export const Sandbox: React.FC = () => {
  const { query, setQuery, result, isLoading, executeQuery, clearResult } =
    useQuery(allMetrics);

  return (
    <div className="sandbox-page">
      <div className="sandbox-container">
        <div className="sandbox-header">
          <h1>🧪 PromQL Sandbox</h1>
          <p>
            Experiment with PromQL queries on sample metrics. No pressure, just learning!
          </p>
        </div>

        <div className="sandbox-content">
          <div className="sandbox-main">
            <Card>
              <h2>Your Query</h2>
              <QueryEditor
                value={query}
                onChange={setQuery}
                onExecute={executeQuery}
                isLoading={isLoading}
                placeholder="Try: http_requests_total{status='200'}"
              />
              <div className="sandbox-actions">
                <Button onClick={() => executeQuery()} disabled={isLoading}>
                  {isLoading ? 'Running...' : '▶ Run Query'}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setQuery('');
                    clearResult();
                  }}
                >
                  Clear
                </Button>
              </div>
            </Card>

            {result && <ResultDisplay result={result} />}
          </div>

          <div className="sandbox-sidebar">
            <Card className="examples-card">
              <h3>📖 Example Queries</h3>
              <div className="examples-list">
                <button
                  className="example-btn"
                  onClick={() => setQuery('http_requests_total')}
                >
                  http_requests_total
                </button>
                <button
                  className="example-btn"
                  onClick={() => setQuery('http_requests_total{status="200"}')}
                >
                  http_requests_total{'{'}status="200"{'}'}
                </button>
                <button
                  className="example-btn"
                  onClick={() => setQuery('sum(http_requests_total)')}
                >
                  sum(http_requests_total)
                </button>
                <button
                  className="example-btn"
                  onClick={() => setQuery('sum(http_requests_total) by (method)')}
                >
                  sum(http_requests_total) by (method)
                </button>
                <button
                  className="example-btn"
                  onClick={() => setQuery('avg(cpu_usage_percent)')}
                >
                  avg(cpu_usage_percent)
                </button>
                <button
                  className="example-btn"
                  onClick={() => setQuery('max(cpu_usage_percent) by (instance)')}
                >
                  max(cpu_usage_percent) by (instance)
                </button>
              </div>
            </Card>

            <Card className="metrics-card">
              <h3>📊 Available Metrics</h3>
              <ul className="metrics-list">
                <li>http_requests_total</li>
                <li>cpu_usage_percent</li>
                <li>memory_usage_bytes</li>
                <li>memory_total_bytes</li>
                <li>http_request_duration_seconds</li>
              </ul>
              <p className="metrics-note">
                Total: {allMetrics.length} sample metrics loaded
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
