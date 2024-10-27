type TranslationResponse = {
  result: {
    translated_text: string;
  };
};

type ObjectDetectionResponse = {
  result: [
    {
      score: number;
      label: string;
    },
  ];
};
type TextToImageResponse = {
  result: {
    description: string;
  };
};

type SummarizeResponse = {
  result: {
    summary: string;
  };
};

type CaptionResponse = {
  result: {
    text: string;
    word_count: number;
    vtt: string;
    words: [
      {
        word: string;
        start: number;
        end: number;
      },
    ];
  };
};

type AITextResponse = {
  response: string;
};

type AIDetectionResponse = {
  data: {
    isHuman: number;
    additional_feedback: string;
    textWords: number;
    aiWords: number;
    fakePercentage: number;
    feedback: string;
    h: string[];
    originalParagraph: string;
  };
};

type ParaphraseResponse = {
  data: {
    message: string;
  };
};
