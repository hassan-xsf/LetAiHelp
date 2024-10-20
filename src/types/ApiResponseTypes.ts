type TranslationResponse = {
    result: {
        translated_text: string,
    }
}

type ObjectDetectionResponse = {
    result: [
        {
            score: number,
            label: string
        }
    ]
}
type TextToImageResponse = {
    result: {
        description: string
    }
}

type SummarizeResponse = {
    result: {
        summary: string
    }
}

type CaptionResponse = {
    result: {
        text: string,
        word_count: number,
        vtt: string,
        words: [
            {
                word: string,
                start: number,
                end: number
            }
        ]
    }
}

type AITextResponse = {
    result: string
}

type ImageResponse = {
    result: {
        image: string,
    }
}