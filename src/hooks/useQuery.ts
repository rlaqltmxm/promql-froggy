import { useState } from 'react';
import type { QueryResult, Metric } from '../types';
import { executePromQL } from '../engine/executor';

export function useQuery(sampleMetrics: Metric[]) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<QueryResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const executeQuery = (queryToExecute?: string) => {
    const finalQuery = queryToExecute || query;
    if (!finalQuery.trim()) {
      setResult({
        success: false,
        error: 'Please enter a query',
      });
      return;
    }

    setIsLoading(true);

    // Simulate async execution with a small delay
    setTimeout(() => {
      const queryResult = executePromQL(finalQuery, sampleMetrics);
      setResult(queryResult);
      setIsLoading(false);
    }, 300);
  };

  const clearResult = () => {
    setResult(null);
  };

  return {
    query,
    setQuery,
    result,
    isLoading,
    executeQuery,
    clearResult,
  };
}
