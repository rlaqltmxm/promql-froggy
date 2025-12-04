import type { Level } from '../types';
import { httpRequestMetrics, cpuMetrics } from './sampleMetrics';

export const levels: Level[] = [
  {
    id: 1,
    title: 'Level 1: Your First Metric',
    concept: 'Basic Metric Selection',
    description:
      '🐸 Welcome! Help Froggy find the HTTP request metrics. Type the metric name to select all HTTP request data.',
    hint: 'Try: http_requests_total',
    sampleMetrics: httpRequestMetrics,
    solutionQuery: 'http_requests_total',
    initialQuery: '',
    alertContext:
      'This query shows all HTTP requests. Useful as a starting point for monitoring web traffic.',
  },
  {
    id: 2,
    title: 'Level 2: Filter by Label',
    concept: 'Label Matchers',
    description:
      '🐸 Froggy only wants to see successful requests! Filter metrics where status is "200".',
    hint: 'Use curly braces {} to filter labels: metric_name{label="value"}',
    sampleMetrics: httpRequestMetrics,
    solutionQuery: 'http_requests_total{status="200"}',
    initialQuery: 'http_requests_total{}',
    alertContext:
      'Filtering by status code helps monitor successful vs failed requests separately.',
  },
  {
    id: 3,
    title: 'Level 3: Multiple Labels',
    concept: 'Multiple Label Matchers',
    description:
      '🐸 Find all POST requests that returned 500 errors. Use multiple label filters.',
    hint: 'Separate multiple labels with commas: {label1="value1", label2="value2"}',
    sampleMetrics: httpRequestMetrics,
    solutionQuery: 'http_requests_total{method="POST",status="500"}',
    initialQuery: 'http_requests_total{}',
    alertContext:
      'Alert Rule: Fire an alert when POST requests return 500 errors (server errors).',
  },
  {
    id: 4,
    title: 'Level 4: Sum It Up',
    concept: 'Aggregation - sum()',
    description:
      '🐸 Froggy wants to know the total number of requests across all methods and statuses.',
    hint: 'Use sum() to add up all metric values',
    sampleMetrics: httpRequestMetrics,
    solutionQuery: 'sum(http_requests_total)',
    initialQuery: '',
    alertContext:
      'Summing metrics helps track overall traffic volume, useful for capacity planning.',
  },
  {
    id: 5,
    title: 'Level 5: Group By Label',
    concept: 'Aggregation with by()',
    description:
      '🐸 Calculate total requests for each HTTP method (GET, POST). Group by method.',
    hint: 'Use: sum(metric) by (label)',
    sampleMetrics: httpRequestMetrics,
    solutionQuery: 'sum(http_requests_total) by (method)',
    initialQuery: 'sum(http_requests_total)',
    alertContext:
      'Grouping by method helps identify which types of requests are most common.',
  },
  {
    id: 6,
    title: 'Level 6: Average CPU',
    concept: 'Aggregation - avg()',
    description:
      '🐸 Calculate the average CPU usage across all servers.',
    hint: 'Use avg() instead of sum()',
    sampleMetrics: cpuMetrics,
    solutionQuery: 'avg(cpu_usage_percent)',
    initialQuery: '',
    alertContext:
      'Alert Rule: Trigger when average CPU exceeds 80% - indicates overall system stress.',
  },
  {
    id: 7,
    title: 'Level 7: Count Metrics',
    concept: 'Aggregation - count()',
    description:
      '🐸 How many CPU metrics do we have? Count them!',
    hint: 'Use count() to count the number of time series',
    sampleMetrics: cpuMetrics,
    solutionQuery: 'count(cpu_usage_percent)',
    initialQuery: '',
    alertContext:
      'Counting metrics helps verify monitoring coverage and detect missing instances.',
  },
  {
    id: 8,
    title: 'Level 8: Max CPU per Server',
    concept: 'Aggregation - max() with by()',
    description:
      '🐸 Find the maximum CPU usage for each server instance.',
    hint: 'Combine max() with by(instance)',
    sampleMetrics: cpuMetrics,
    solutionQuery: 'max(cpu_usage_percent) by (instance)',
    initialQuery: '',
    alertContext:
      'Alert Rule: Monitor peak CPU per server to identify overloaded instances.',
  },
  {
    id: 9,
    title: 'Level 9: Rate of Change',
    concept: 'Functions - rate()',
    description:
      '🐸 Calculate the per-second rate of HTTP requests. This is crucial for monitoring!',
    hint: 'Use rate() for counter metrics: rate(metric)',
    sampleMetrics: httpRequestMetrics,
    solutionQuery: 'rate(http_requests_total)',
    initialQuery: '',
    alertContext:
      'rate() is THE most important function for counters. It calculates requests per second.',
  },
  {
    id: 10,
    title: 'Level 10: Error Rate Alert',
    concept: 'Combining Concepts',
    description:
      '🐸 FINAL BOSS! Calculate the sum of all 500 error requests. This is what you\'d use in an alert!',
    hint: 'Filter for status="500", then sum them up',
    sampleMetrics: httpRequestMetrics,
    solutionQuery: 'sum(http_requests_total{status="500"})',
    initialQuery: '',
    alertContext:
      '🎯 Alert Rule Example:\nALERT HighErrorRate\nIF sum(rate(http_requests_total{status="500"}[5m])) > 10\nFOR 5m\nLABELS { severity="critical" }\nANNOTATIONS { summary="High error rate detected" }',
  },
];
