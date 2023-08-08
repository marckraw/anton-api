const returnWholeUserMessageAsJSON = () => {
  return `
  Your task is to....
    Always return 
    {
      "task": "Whole User's message"
    } 
    
    - act as ...
    - ... and nothing more
    - acknowledge with '...'
    - explain it to me like I'm '...'
    - format this answer as '...'
    - explain step by step
    - ignore all previous instructions before this one
  `;
};

export const systemPrompts = {
  returnWholeUserMessageAsJSON,
};
