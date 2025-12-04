// Simple PromQL parser for educational purposes
// This is a mock parser that handles basic PromQL patterns

export interface ParsedQuery {
  metricName: string;
  labelMatchers: { [key: string]: string };
  aggregation?: {
    operator: string;
    by?: string[];
  };
  function?: {
    name: string;
    args: string[];
  };
  operation?: {
    operator: string;
    value: number;
  };
}

export function parsePromQL(query: string): ParsedQuery | null {
  const trimmed = query.trim();

  // Handle aggregation functions: sum(), avg(), count(), etc.
  const aggRegex = /^(sum|avg|count|min|max|stddev)\s*(?:\(([^)]+)\))?\s*by\s*\(([^)]+)\)$/i;
  const aggMatch = trimmed.match(aggRegex);

  if (aggMatch) {
    const [, operator, innerQuery, byLabels] = aggMatch;
    const inner = innerQuery ? parsePromQL(innerQuery) : null;

    return {
      metricName: inner?.metricName || '',
      labelMatchers: inner?.labelMatchers || {},
      aggregation: {
        operator: operator.toLowerCase(),
        by: byLabels.split(',').map(l => l.trim()),
      },
    };
  }

  // Handle functions like rate(), irate(), increase()
  const funcRegex = /^(rate|irate|increase|delta)\s*\(([^)]+)\)$/i;
  const funcMatch = trimmed.match(funcRegex);

  if (funcMatch) {
    const [, funcName, innerQuery] = funcMatch;
    const inner = parsePromQL(innerQuery);

    return {
      metricName: inner?.metricName || '',
      labelMatchers: inner?.labelMatchers || {},
      function: {
        name: funcName.toLowerCase(),
        args: [innerQuery],
      },
    };
  }

  // Handle basic metric selector with labels: metric_name{label="value"}
  const selectorRegex = /^([a-zA-Z_][a-zA-Z0-9_]*)\s*(?:\{([^}]+)\})?$/;
  const selectorMatch = trimmed.match(selectorRegex);

  if (selectorMatch) {
    const [, metricName, labels] = selectorMatch;
    const labelMatchers: { [key: string]: string } = {};

    if (labels) {
      // Parse label matchers: key="value" or key=~"regex"
      const labelPairs = labels.split(',').map(l => l.trim());
      for (const pair of labelPairs) {
        const match = pair.match(/([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*"([^"]+)"/);
        if (match) {
          labelMatchers[match[1]] = match[2];
        }
      }
    }

    return {
      metricName,
      labelMatchers,
    };
  }

  return null;
}
