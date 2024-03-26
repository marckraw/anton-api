export type ChatGPTModel = 'gpt-4' | 'gpt-3.5-turbo' | 'gpt-3.5-turbo-16k';

export interface ClaudeMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ClaudeChat {
  messages: ClaudeMessage[];
  max_tokens?: number;
  model?: ClaudeModels;
}

export interface ClaudeChatCompletionRequest {
  body: ClaudeChat;
}

export const claudeModels = [
  'claude-3-opus-20240229',
  'claude-3-sonnet-20240229',
  'claude-3-haiku-20240307',
] as const;
export type ClaudeModels = (typeof claudeModels)[number];

export const FALLBACK_MAX_GPT3_TOKENS = 2000;
export const FALLBACK_MAX_GPT4_TOKENS = 4000;
export const FALLBACK_TEMPERATURE = 0.5;
export const FALLBACK_SYSTEM_PROMPT = 'Act as assistant';
export const FALLBACK_MODEL: ChatGPTModel = 'gpt-3.5-turbo-16k';

export const DEFAULT_MODEL = 'gpt-4-1106-preview';
