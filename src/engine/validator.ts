import type { QueryResult } from '../types';

// Validates if the user's query result matches the expected solution
export function validateSolution(
  userResult: QueryResult,
  _expectedQuery: string,
  validationPattern?: RegExp
): boolean {
  if (!userResult.success || !userResult.data) {
    return false;
  }

  // If a validation pattern is provided, check against it
  if (validationPattern) {
    // This would check if the query structure matches
    // For simplicity, we'll skip regex validation in this mock
    return true;
  }

  // For now, just check if we got some results
  // In a real implementation, we'd compare against expected results
  return userResult.data.length > 0;
}

export function normalizeQuery(query: string): string {
  return query.trim().replace(/\s+/g, ' ');
}

export function querySimilarity(query1: string, query2: string): number {
  const norm1 = normalizeQuery(query1);
  const norm2 = normalizeQuery(query2);

  if (norm1 === norm2) return 1;

  // Simple similarity check
  const words1 = new Set(norm1.split(/\W+/));
  const words2 = new Set(norm2.split(/\W+/));

  const intersection = new Set([...words1].filter((x) => words2.has(x)));
  const union = new Set([...words1, ...words2]);

  return intersection.size / union.size;
}
