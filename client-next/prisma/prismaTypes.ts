export interface IWord {
  id: number
  word: string
  translations: ITranslation[]
}

export interface ITranslation {
  id: number
  translation: string
}