'use client'

import { Frank_Ruhl_Libre } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'
import { alphabet } from '~/alphabet'
import { ProgressBar } from '~/components/progress-bar'
import { Button } from '~/components/ui/button'
import { useIsMobile } from '~/hooks/is-mobile'
import { cn } from '~/lib/utils'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'

const hebrewFont = Frank_Ruhl_Libre({ subsets: ['hebrew'] })

const formSchema = z.object({
  name: z.string({ required_error: 'write the letter name' }).trim().min(3, 'write the letter name')
})

export default function LearnAlphabet() {
  const [errors, setErrors] = useState<Set<number>>(new Set())
  const [success, setSuccess] = useState<Set<number>>(new Set())
  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0)
  const [startTime, setStartTime] = useState(0)

  const isMobile = useIsMobile()

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: ''
    },
    reValidateMode: 'onSubmit',
    resetOptions: {
      keepDirty: false,
      keepErrors: false,
      keepTouched: false,
      keepIsSubmitted: false,
      keepIsValid: false
    },
    resolver: zodResolver(formSchema)
  })

  const router = useRouter()

  const progressBar = useRef<ProgressBar>(null)

  const currentLetter = alphabet[currentLetterIndex]

  const submit = function (data: z.infer<typeof formSchema>) {
    const submitedName = data.name.trim().toLowerCase()

    const endTime = Date.now()

    if (submitedName !== alphabet[currentLetterIndex].name) {
      setErrors(state => {
        const updated = new Set(state)

        updated.add(currentLetterIndex)

        return updated
      })

      toast.error('Wrong answer')
      return
    }

    form.clearErrors()
    form.reset()

    if (progressBar.current) {
      progressBar.current.updateCurrent(state => state + 1)
    }

    if (!errors.has(currentLetterIndex)) {
      setSuccess(state => {
        const updated = new Set(state)

        updated.add(currentLetterIndex)

        return updated
      })
    }

    if (currentLetterIndex < alphabet.length - 1) {
      return setCurrentLetterIndex(state => state + 1)
    }

    const time = endTime - startTime
    const errorsList = Array.from(errors).join(',')
    const successList = Array.from(success).join(',')

    router.push(`/play/learn-alphabet/results?time=${time}&errors=${errorsList}&success=${successList}`)
  }

  useEffect(() => {
    setStartTime(Date.now())
  }, [])

  return (
    <main className='w-full h-full flex items-center justify-center'>
      <ProgressBar ref={progressBar} max={alphabet.length} current={0} />

      <div className='flex flex-col items-center'>
        <h1 className={cn(hebrewFont.className, 'text-sky-900 text-6xl select-none pointer-events-none')}>
          {currentLetter.letter}
        </h1>

        <Form {...form}>
          <form className='flex gap-3 mt-10' onSubmit={form.handleSubmit(submit)}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='write the letter name'
                      type='text'
                      autoFocus
                      autoCorrect='off'
                      autoComplete='off'
                      autoCapitalize='off'
                      spellCheck={false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isMobile && (
              <Button type='submit' variant='tertiary'>
                submit
              </Button>
            )}
          </form>
        </Form>
      </div>
    </main>
  )
}
