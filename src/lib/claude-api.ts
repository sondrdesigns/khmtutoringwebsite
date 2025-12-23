/**
 * Utility functions for calling Claude API through the secure backend proxy
 */

export interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ClaudeRequestOptions {
  message: string | ClaudeMessage[];
  model?: string;
  max_tokens?: number;
  system?: string;
}

export interface ClaudeResponse {
  content: string;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
  model: string;
}

/**
 * Call Claude API through the secure backend proxy
 * 
 * @param options - Request options including message, model, etc.
 * @returns Promise with Claude's response
 * @throws Error if the API call fails
 */
export async function callClaude(options: ClaudeRequestOptions): Promise<ClaudeResponse> {
  const { message, model = 'claude-3-5-sonnet-20241022', max_tokens = 1024, system } = options;

  try {
    const response = await fetch('/api/claude', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        model,
        max_tokens,
        system,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `API request failed with status ${response.status}`);
    }

    const data: ClaudeResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to call Claude API');
  }
}

/**
 * Simple helper function for single message conversations
 * 
 * @param message - The user's message
 * @param systemPrompt - Optional system prompt
 * @returns Promise with Claude's response text
 */
export async function askClaude(
  message: string,
  systemPrompt?: string
): Promise<string> {
  const response = await callClaude({
    message,
    system: systemPrompt,
  });
  return response.content;
}



