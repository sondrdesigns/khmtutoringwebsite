import { useState, useCallback } from 'react';
import { callClaude, askClaude, type ClaudeRequestOptions, type ClaudeResponse } from '../lib/claude-api';

interface UseClaudeReturn {
  response: string | null;
  isLoading: boolean;
  error: string | null;
  callClaude: (options: ClaudeRequestOptions) => Promise<ClaudeResponse>;
  askClaude: (message: string, systemPrompt?: string) => Promise<string>;
  clearError: () => void;
  reset: () => void;
}

/**
 * React hook for calling Claude API
 * 
 * @example
 * ```tsx
 * const { askClaude, response, isLoading, error } = useClaude();
 * 
 * const handleSubmit = async () => {
 *   await askClaude("What is React?");
 * };
 * ```
 */
export function useClaude(): UseClaudeReturn {
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCallClaude = useCallback(async (options: ClaudeRequestOptions) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await callClaude(options);
      setResponse(result.content);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAskClaude = useCallback(async (message: string, systemPrompt?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await askClaude(message, systemPrompt);
      setResponse(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setResponse(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    response,
    isLoading,
    error,
    callClaude: handleCallClaude,
    askClaude: handleAskClaude,
    clearError,
    reset,
  };
}
