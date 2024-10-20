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