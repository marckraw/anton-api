import { encode } from '@nem035/gpt-3-encoder';

export const countTokens = (str: string) => {
  if (str.length > 0) {
    const encoded = encode(str);

    return encoded.length;
  } else {
    return 0;
  }
};

export default {
  countTokens,
};
