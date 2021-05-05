export interface Word {
   word: string,
   translations: Translation[]
}
export interface Translation {
   word: string
}
export interface Words {
   getWords: Array<Word> | undefined
}

export interface IDictionary {
   id: number,
   difficulty: number,
   name: string,
   wordsCount: number,
   choosed: boolean
}