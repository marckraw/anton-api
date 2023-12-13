import { countTokens } from '@mrck-labs/anton-sdk/utils';
import { Message } from './dto/chat-gpt-request.dto';

export const countTokensFromMessages = (messages: Message[]) => {
  return messages.reduce((acc, message) => {
    return acc + countTokens(message.content);
  }, 0);
};

export default {
  countTokensFromMessages,
  countTokens,
};
