import {parseTranslationString} from './index'

describe('parseTranslationString', function () {
  it('should work with single translation', function () {
    expect(parseTranslationString('some - что-то')).toEqual({
      word: 'some',
      translations: ['что-то']
    })
  })

  it('should work with multiple values', () => {
    expect(parseTranslationString('here - здесь, тут')).toEqual({
      word: 'here',
      translations: ['здесь', 'тут']
    })
  })

  it('should work with phrases', function () {
    expect(parseTranslationString('go there - пойди туда, иди туда, сходи туда')).toEqual({
      word: 'go there',
      translations: ['пойди туда', 'иди туда', 'сходи туда']
    })
  })

  it('should return null on bad inputs', function () {
    expect(parseTranslationString(`   eo -r j  igji jjwj  eii`)).toEqual(null)
    expect(parseTranslationString(`ei juiej riuewiruweior uwieoruiowetuewititwwu`)).toEqual(null)
  })
})