import OpenAI from 'openai';

const configuration = {
  apiKey: process.env.OPEN_AI_TOKEN,
};

export const openai = new OpenAI(configuration);
