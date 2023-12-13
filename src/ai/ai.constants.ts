export type ChatGPTModel = 'gpt-4' | 'gpt-3.5-turbo' | 'gpt-3.5-turbo-16k';

export const FALLBACK_MAX_GPT3_TOKENS = 2000;
export const FALLBACK_MAX_GPT4_TOKENS = 4000;
export const FALLBACK_TEMPERATURE = 0.5;
export const FALLBACK_SYSTEM_PROMPT = 'Act as assistant';
export const FALLBACK_MODEL: ChatGPTModel = 'gpt-3.5-turbo-16k';

export const DEFAULT_MODEL = 'gpt-4-1106-preview';
