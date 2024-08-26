'use client'

import { Frank_Ruhl_Libre } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'
import { ProgressBar } from '~/components/progress-bar'
import { Tooltip } from '~/components/tooltip'
import { Button } from '~/components/ui/button'
import { useIsMobile } from '~/hooks/is-mobile'
import { LetterDefinition, getLettersShuffled } from '~/letters'
import { cn, shuffleArray } from '~/lib/utils'

const hebrewFont = Frank_Ruhl_Libre({ subsets: ['hebrew'] })

export default function Play() {
  const [errors, setErrors] = useState<Set<number>>(new Set())
  const [success, setSuccess] = useState<Set<number>>(new Set())
  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0)
  const [options, setOptions] = useState<Array<LetterDefinition>>([])

  const startTime = useMemo(() => Date.now(), [])
  const alphabet = useMemo(() => getLettersShuffled(), [])

  const router = useRouter()
  const isMobile = useIsMobile()

  const progressBar = useRef<ProgressBar>(null)

  const currentLetter = alphabet[currentLetterIndex]

  const submit = useCallback(
    function (letter: LetterDefinition) {
      const endTime = Date.now()

      const letterIndex = alphabet[currentLetterIndex].index

      if (letter.letter !== alphabet[currentLetterIndex].letter) {
        setErrors(state => {
          const updated = new Set(state)

          updated.add(letterIndex)

          return updated
        })

        toast.error('Wrong answer')
        return
      }

      if (progressBar.current) {
        progressBar.current.updateCurrent(state => state + 1)
      }

      if (!errors.has(letterIndex)) {
        setSuccess(state => {
          const updated = new Set(state)

          updated.add(letterIndex)

          return updated
        })
      }

      if (currentLetterIndex < alphabet.length - 1) {
        return setCurrentLetterIndex(state => state + 1)
      }

      const time = endTime - startTime
      const errorsList = Array.from(errors).join(',')
      const successList = Array.from(success).join(',')

      router.push(`/results?time=${time}&errors=${errorsList}&success=${successList}`)
    },
    [alphabet, currentLetterIndex, errors, startTime, success, router]
  )

  useEffect(() => {
    const letter = alphabet[currentLetterIndex]
    let count = 3

    const newOptions: Record<string, LetterDefinition> = {
      [letter.name]: letter
    }

    while (count > 0) {
      const option = alphabet[Math.floor(Math.random() * alphabet.length)]

      if (option.name in newOptions) continue

      newOptions[option.name] = option
      --count
    }

    const shuffledOptions = shuffleArray(Object.values(newOptions))

    setOptions(shuffledOptions)
  }, [currentLetterIndex, alphabet])

  useEffect(() => {
    if (isMobile) return

    const keys = new Array(options.length).fill(0).map((_, i) => i + 1)

    function handleEvent(event: KeyboardEvent) {
      const key = Number(event.key)

      if (!keys.includes(key)) return

      submit(options[key - 1])
    }

    window.addEventListener('keydown', handleEvent, {
      once: false
    })

    return () => {
      window.removeEventListener('keydown', handleEvent)
    }
  }, [options, isMobile, submit])

  return (
    <main className='w-full h-full flex items-center justify-center'>
      <ProgressBar ref={progressBar} max={alphabet.length} current={0} />

      <div className='flex flex-col items-center'>
        <Tooltip hint={currentLetter.song}>
          <h1 className={cn(hebrewFont.className, 'text-6xl select-none pointer-events-none')}>
            {currentLetter.letter}
          </h1>
        </Tooltip>

        <span className='text-zinc-300 text-xs block mt-5'>you can hover the letter to view how it sounds like</span>

        <div className='mt-10 flex flex-wrap gap-5'>
          {options.map((option, index) => (
            <Button key={option.letter} variant='secondary' onClick={submit.bind(null, option)} className='relative'>
              {option.name}

              {!isMobile && (
                <span className='absolute text-xs text-zinc-500 -bottom-2 -right-1 pointer-events-none'>
                  {index + 1}
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>
    </main>
  )
}
