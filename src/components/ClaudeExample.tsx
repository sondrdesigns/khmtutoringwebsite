/**
 * Example component demonstrating how to use Claude API
 * 
 * This is a reference implementation. You can delete this file
 * or use it as a starting point for your own components.
 */

import { useState } from 'react';
import { useClaude } from '../hooks/use-claude';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

export function ClaudeExample() {
  const [input, setInput] = useState('');
  const { askClaude, response, isLoading, error, clearError } = useClaude();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      await askClaude(
        input,
        'You are a helpful assistant for KHM Tutoring, a tutoring service in Hawaii. Be friendly and professional.'
      );
      setInput(''); // Clear input on success
    } catch (err) {
      // Error is already handled by the hook
      console.error('Failed to get response:', err);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Claude API Example</CardTitle>
        <CardDescription>
          Ask Claude a question and get an AI-powered response
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              clearError(); // Clear error when user types
            }}
            placeholder="Ask Claude anything..."
            rows={4}
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Thinking...
              </>
            ) : (
              'Ask Claude'
            )}
          </Button>
        </form>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {response && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Response:</h3>
            <p className="text-sm whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


