import type { Metric } from '../types';

// Sample metrics for different scenarios
export const httpRequestMetrics: Metric[] = [
  {
    __name__: 'http_requests_total',
    job: 'api-server',
    instance: 'localhost:8080',
    method: 'GET',
    status: '200',
    value: 1547,
  },
  {
    __name__: 'http_requests_total',
    job: 'api-server',
    instance: 'localhost:8080',
    method: 'GET',
    status: '404',
    value: 23,
  },
  {
    __name__: 'http_requests_total',
    job: 'api-server',
    instance: 'localhost:8080',
    method: 'GET',
    status: '500',
    value: 5,
  },
  {
    __name__: 'http_requests_total',
    job: 'api-server',
    instance: 'localhost:8080',
    method: 'POST',
    status: '200',
    value: 892,
  },
  {
    __name__: 'http_requests_total',
    job: 'api-server',
    instance: 'localhost:8080',
    method: 'POST',
    status: '500',
    value: 12,
  },
];

export const cpuMetrics: Metric[] = [
  {
    __name__: 'cpu_usage_percent',
    job: 'node-exporter',
    instance: 'server-1',
    cpu: 'cpu0',
    value: 45.3,
  },
  {
    __name__: 'cpu_usage_percent',
    job: 'node-exporter',
    instance: 'server-1',
    cpu: 'cpu1',
    value: 52.1,
  },
  {
    __name__: 'cpu_usage_percent',
    job: 'node-exporter',
    instance: 'server-2',
    cpu: 'cpu0',
    value: 78.9,
  },
  {
    __name__: 'cpu_usage_percent',
    job: 'node-exporter',
    instance: 'server-2',
    cpu: 'cpu1',
    value: 82.4,
  },
];

export const memoryMetrics: Metric[] = [
  {
    __name__: 'memory_usage_bytes',
    job: 'node-exporter',
    instance: 'server-1',
    value: 4294967296, // 4GB
  },
  {
    __name__: 'memory_total_bytes',
    job: 'node-exporter',
    instance: 'server-1',
    value: 8589934592, // 8GB
  },
  {
    __name__: 'memory_usage_bytes',
    job: 'node-exporter',
    instance: 'server-2',
    value: 7516192768, // 7GB
  },
  {
    __name__: 'memory_total_bytes',
    job: 'node-exporter',
    instance: 'server-2',
    value: 8589934592, // 8GB
  },
];

export const responseTimeMetrics: Metric[] = [
  {
    __name__: 'http_request_duration_seconds',
    job: 'api-server',
    instance: 'localhost:8080',
    endpoint: '/api/users',
    quantile: '0.5',
    value: 0.125,
  },
  {
    __name__: 'http_request_duration_seconds',
    job: 'api-server',
    instance: 'localhost:8080',
    endpoint: '/api/users',
    quantile: '0.9',
    value: 0.342,
  },
  {
    __name__: 'http_request_duration_seconds',
    job: 'api-server',
    instance: 'localhost:8080',
    endpoint: '/api/users',
    quantile: '0.99',
    value: 0.876,
  },
];

export const allMetrics: Metric[] = [
  ...httpRequestMetrics,
  ...cpuMetrics,
  ...memoryMetrics,
  ...responseTimeMetrics,
];
