import { shuffleArray } from './lib/utils'

export type LetterDefinition = {
  name: string
  song: string
  letter: string
  final?: boolean
}

export const letters: Array<LetterDefinition> = [
  {
    name: 'Alef',
    song: 'Silent',
    letter: 'א'
  },
  {
    name: 'Bet',
    song: 'B as in Boy',
    letter: 'בּ'
  },
  {
    name: 'Bet',
    song: 'V as Van',
    letter: 'ב'
  },
  {
    name: 'Gimel',
    song: 'G as in Gas',
    letter: 'ג'
  },
  {
    name: 'Dalet',
    song: 'D as in Dog',
    letter: 'ד'
  },
  {
    name: 'Hey',
    song: 'H as in Hat',
    letter: 'ה'
  },
  {
    name: 'Vav',
    song: 'V as in Van',
    letter: 'ו'
  },
  {
    name: 'Zayin',
    song: 'Z as in Zoo',
    letter: 'ז'
  },
  {
    name: 'Chet',
    song: 'CH as in BaCH',
    letter: 'ח'
  },
  {
    name: 'Tet',
    song: 'T as in Top',
    letter: 'ט'
  },
  {
    name: 'Yod',
    song: 'Y as in You',
    letter: 'י'
  },
  {
    name: 'Kaf',
    song: 'K as in Key',
    letter: 'כּ'
  },
  {
    name: 'Kaf',
    song: 'CH as in BaCH',
    letter: 'כ'
  },
  {
    name: 'Kaf',
    song: 'CH as in BaCH',
    letter: 'ך',
    final: true
  },
  {
    name: 'Lamed',
    song: 'L as in Lot',
    letter: 'ל'
  },
  {
    name: 'Mem',
    song: 'M as in Mat',
    letter: 'מ'
  },
  {
    name: 'Mem',
    song: 'M as in Mat',
    letter: 'ם',
    final: true
  },
  {
    name: 'Nun',
    song: 'N as in Nut',
    letter: 'נ'
  },
  {
    name: 'Nun',
    song: 'N as in Nut',
    letter: 'ן',
    final: true
  },
  {
    name: 'Samech',
    song: 'S as in See',
    letter: 'ס'
  },
  {
    name: 'Ayin',
    song: 'Silent',
    letter: 'ﬠ'
  },
  {
    name: 'Pey',
    song: 'P as in Pie',
    letter: 'פּ'
  },
  {
    name: 'Pey',
    song: 'F as in Fan',
    letter: 'פ'
  },
  {
    name: 'Pey',
    song: 'F as in Fan',
    letter: 'ף',
    final: true
  },
  {
    name: 'Tsade',
    song: 'TS as in CaTS',
    letter: 'צ'
  },
  {
    name: 'Tsade',
    song: 'TS as in CaTS',
    letter: 'ץ',
    final: true
  },
  {
    name: 'Qof',
    song: 'K as in Key',
    letter: 'ק'
  },
  {
    name: 'Resh',
    song: 'R as in Rug',
    letter: 'ר'
  },
  {
    name: 'Sin',
    song: 'S as in See',
    letter: 'שׂ'
  },
  {
    name: 'Shin',
    song: 'SH as in SHe',
    letter: 'שׁ'
  },
  {
    name: 'Tav',
    song: 'T as in Top',
    letter: 'ת'
  }
]

export function getLettersShuffled(): Array<LetterDefinition> {
  return shuffleArray(letters)
}
