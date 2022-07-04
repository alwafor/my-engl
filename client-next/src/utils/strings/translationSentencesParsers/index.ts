/**
 * This function takes a string like 'dog - собака, пёс' and parses
 * it into an object with word and translations, removing spaces
 * @param translationSentence
 */

export function parseTranslationString(translationSentence: string) {
  translationSentence = translationSentence.toLowerCase()
  const tStringWithoutDoubleSpaces = translationSentence.trim().replaceAll(/\s{2,}/g,' ')

  let [word, translationsString] = tStringWithoutDoubleSpaces.split(/ - (.*)/s)

  if(!translationsString) {
    return null
  }

  word = word.trim()
  let regFullSpaces = /^\s*$/
  let regLettersSpacesDigitals = /^[-\p{L}\s\d]+$/u

  const translations = translationsString.split(',').map(tr => tr.trim()).filter(tr => !regFullSpaces.test(tr))

  if(regFullSpaces.test(word) || translations.length === 0 || translations.some(tr => !regLettersSpacesDigitals.test(tr))) {
    return null
  }

  return {word, translations}
}