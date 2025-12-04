import React from 'react';
import type { QueryResult } from '../../types';
import './ResultDisplay.css';

interface ResultDisplayProps {
  result: QueryResult | null;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  if (!result) {
    return (
      <div className="result-display result-empty">
        <p>Run a query to see results here</p>
      </div>
    );
  }

  if (!result.success) {
    return (
      <div className="result-display result-error">
        <h3>Error</h3>
        <p>{result.error}</p>
      </div>
    );
  }

  if (!result.data || result.data.length === 0) {
    return (
      <div className="result-display result-empty">
        <p>No data returned (empty result set)</p>
      </div>
    );
  }

  return (
    <div className="result-display result-success">
      <h3>Query Results ({result.data.length} series)</h3>
      <div className="result-table-container">
        <table className="result-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Labels</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {result.data.map((metric, idx) => {
              const labels = Object.entries(metric)
                .filter(([key]) => key !== '__name__' && key !== 'value' && key !== 'timestamp')
                .map(([key, value]) => `${key}="${value}"`)
                .join(', ');

              return (
                <tr key={idx}>
                  <td className="metric-name">{metric.__name__}</td>
                  <td className="metric-labels">{labels || '-'}</td>
                  <td className="metric-value">
                    {typeof metric.value === 'number'
                      ? metric.value.toFixed(2)
                      : metric.value}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
