import type { Metric, QueryResult } from '../types';
import { parsePromQL } from './parser';

// Mock executor that simulates PromQL execution
export function executePromQL(query: string, metrics: Metric[]): QueryResult {
  try {
    const parsed = parsePromQL(query);

    if (!parsed) {
      return {
        success: false,
        error: 'Unable to parse query. Check your PromQL syntax.',
      };
    }

    let filteredMetrics = filterMetrics(metrics, parsed.metricName, parsed.labelMatchers);

    if (filteredMetrics.length === 0) {
      return {
        success: true,
        data: [],
        type: 'instant_vector',
      };
    }

    // Apply function if present
    if (parsed.function) {
      filteredMetrics = applyFunction(filteredMetrics, parsed.function.name);
    }

    // Apply aggregation if present
    if (parsed.aggregation) {
      filteredMetrics = applyAggregation(
        filteredMetrics,
        parsed.aggregation.operator,
        parsed.aggregation.by
      );
    }

    return {
      success: true,
      data: filteredMetrics,
      type: 'instant_vector',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

function filterMetrics(
  metrics: Metric[],
  metricName: string,
  labelMatchers: { [key: string]: string }
): Metric[] {
  return metrics.filter((metric) => {
    // Check metric name
    if (metric.__name__ !== metricName) {
      return false;
    }

    // Check label matchers
    for (const [key, value] of Object.entries(labelMatchers)) {
      if (metric[key] !== value) {
        return false;
      }
    }

    return true;
  });
}

function applyFunction(metrics: Metric[], funcName: string): Metric[] {
  // For simplicity, rate/irate/increase just scale values
  // In real Prometheus, these work on range vectors and calculate per-second rates
  switch (funcName) {
    case 'rate':
    case 'irate':
      return metrics.map((m) => ({
        ...m,
        value: m.value / 60, // Mock: divide by 60 seconds
      }));
    case 'increase':
      return metrics.map((m) => ({
        ...m,
        value: m.value * 1.1, // Mock: 10% increase
      }));
    case 'delta':
      return metrics.map((m) => ({
        ...m,
        value: m.value * 0.9, // Mock: 10% delta
      }));
    default:
      return metrics;
  }
}

function applyAggregation(
  metrics: Metric[],
  operator: string,
  by?: string[]
): Metric[] {
  if (!by || by.length === 0) {
    // Aggregate all
    const result = aggregateMetrics(metrics, operator);
    return [
      {
        __name__: metrics[0]?.__name__ || 'result',
        value: result,
      },
    ];
  }

  // Group by labels
  const groups = new Map<string, Metric[]>();

  for (const metric of metrics) {
    const key = by.map((label) => `${label}=${metric[label]}`).join(',');
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(metric);
  }

  // Aggregate each group
  const results: Metric[] = [];
  for (const [, groupMetrics] of groups) {
    const aggregated = aggregateMetrics(groupMetrics, operator);
    const resultMetric: Metric = {
      __name__: groupMetrics[0].__name__,
      value: aggregated,
    };

    // Copy grouping labels
    for (const label of by) {
      if (groupMetrics[0][label] !== undefined) {
        resultMetric[label] = groupMetrics[0][label];
      }
    }

    results.push(resultMetric);
  }

  return results;
}

function aggregateMetrics(metrics: Metric[], operator: string): number {
  const values = metrics.map((m) => m.value);

  switch (operator) {
    case 'sum':
      return values.reduce((a, b) => a + b, 0);
    case 'avg':
      return values.reduce((a, b) => a + b, 0) / values.length;
    case 'count':
      return values.length;
    case 'min':
      return Math.min(...values);
    case 'max':
      return Math.max(...values);
    case 'stddev':
      const mean = values.reduce((a, b) => a + b, 0) / values.length;
      const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
      return Math.sqrt(variance);
    default:
      return 0;
  }
}
