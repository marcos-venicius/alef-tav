import { shuffleArray } from './lib/utils'

export type LetterDefinition = {
  index: number
  name: string
  song: string
  letter: string
  final?: boolean
}

export const letters: Array<LetterDefinition> = [
  {
    index: 0,
    name: 'Alef',
    song: 'Silent',
    letter: 'א'
  },
  {
    index: 1,
    name: 'Bet',
    song: 'B as in Boy',
    letter: 'בּ'
  },
  {
    index: 2,
    name: 'Bet',
    song: 'V as Van',
    letter: 'ב'
  },
  {
    index: 3,
    name: 'Gimel',
    song: 'G as in Gas',
    letter: 'ג'
  },
  {
    index: 4,
    name: 'Dalet',
    song: 'D as in Dog',
    letter: 'ד'
  },
  {
    index: 5,
    name: 'Hey',
    song: 'H as in Hat',
    letter: 'ה'
  },
  {
    index: 6,
    name: 'Vav',
    song: 'V as in Van',
    letter: 'ו'
  },
  {
    index: 7,
    name: 'Zayin',
    song: 'Z as in Zoo',
    letter: 'ז'
  },
  {
    index: 8,
    name: 'Chet',
    song: 'CH as in BaCH',
    letter: 'ח'
  },
  {
    index: 9,
    name: 'Tet',
    song: 'T as in Top',
    letter: 'ט'
  },
  {
    index: 10,
    name: 'Yod',
    song: 'Y as in You',
    letter: 'י'
  },
  {
    index: 11,
    name: 'Kaf',
    song: 'K as in Key',
    letter: 'כּ'
  },
  {
    index: 12,
    name: 'Kaf',
    song: 'CH as in BaCH',
    letter: 'כ'
  },
  {
    index: 13,
    name: 'Kaf',
    song: 'CH as in BaCH',
    letter: 'ך',
    final: true
  },
  {
    index: 14,
    name: 'Lamed',
    song: 'L as in Lot',
    letter: 'ל'
  },
  {
    index: 15,
    name: 'Mem',
    song: 'M as in Mat',
    letter: 'מ'
  },
  {
    index: 16,
    name: 'Mem',
    song: 'M as in Mat',
    letter: 'ם',
    final: true
  },
  {
    index: 17,
    name: 'Nun',
    song: 'N as in Nut',
    letter: 'נ'
  },
  {
    index: 18,
    name: 'Nun',
    song: 'N as in Nut',
    letter: 'ן',
    final: true
  },
  {
    index: 19,
    name: 'Samech',
    song: 'S as in See',
    letter: 'ס'
  },
  {
    index: 20,
    name: 'Ayin',
    song: 'Silent',
    letter: 'ﬠ'
  },
  {
    index: 21,
    name: 'Pey',
    song: 'P as in Pie',
    letter: 'פּ'
  },
  {
    index: 22,
    name: 'Pey',
    song: 'F as in Fan',
    letter: 'פ'
  },
  {
    index: 23,
    name: 'Pey',
    song: 'F as in Fan',
    letter: 'ף',
    final: true
  },
  {
    index: 24,
    name: 'Tsade',
    song: 'TS as in CaTS',
    letter: 'צ'
  },
  {
    index: 25,
    name: 'Tsade',
    song: 'TS as in CaTS',
    letter: 'ץ',
    final: true
  },
  {
    index: 26,
    name: 'Qof',
    song: 'K as in Key',
    letter: 'ק'
  },
  {
    index: 27,
    name: 'Resh',
    song: 'R as in Rug',
    letter: 'ר'
  },
  {
    index: 28,
    name: 'Sin',
    song: 'S as in See',
    letter: 'שׂ'
  },
  {
    index: 29,
    name: 'Shin',
    song: 'SH as in SHe',
    letter: 'שׁ'
  },
  {
    index: 30,
    name: 'Tav',
    song: 'T as in Top',
    letter: 'ת'
  }
]

export function getLetters(shuffled: boolean): Array<LetterDefinition> {
  console.log(shuffled)
  if (!shuffled) return letters

  return shuffleArray(letters)
}
