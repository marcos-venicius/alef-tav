'use client'

import { useState } from 'react'
import { letters } from '~/letters'
import { cn } from '~/lib/utils'
import { Frank_Ruhl_Libre } from 'next/font/google'
import { Switch } from '~/components/ui/switch'
import { Button } from '~/components/ui/button'
import { useIsMobile } from '~/hooks/is-mobile'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '~/components/ui/form'
import { ButtonSlot } from '~/components/button-slot'
import { useRouter } from 'next/navigation'

const frank = Frank_Ruhl_Libre({
  subsets: ['hebrew']
})

const formSchema = z.object({
  shuffle_letters: z.boolean().default(true)
})

export default function Home() {
  const isMobile = useIsMobile()

  const [hovering, setHovering] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shuffle_letters: true
    }
  })

  const router = useRouter()

  function handleHovering(state: boolean) {
    if (state && isMobile) return

    setHovering(state)
  }

  function handleSubmit(data: z.infer<typeof formSchema>) {
    router.push(`/play?shuffled=${Number(data.shuffle_letters)}`)
  }

  return (
    <main
      className={cn(
        'w-full h-full bg-white flex flex-col items-center justify-center transition-all',
        hovering && 'bg-black/50'
      )}>
      <Form {...form}>
        <form className='block' onSubmit={form.handleSubmit(handleSubmit)}>
          <ButtonSlot asSlot={isMobile} type='submit'>
            <section
              dir='rtl'
              className='p-5 max-w-5xl flex flex-wrap justify-center items-center gap-5 cursor-pointer'
              onMouseEnter={handleHovering.bind(null, true)}
              onMouseLeave={handleHovering.bind(null, false)}>
              {letters.map(letter => (
                <p
                  key={letter.letter}
                  className={cn(
                    'text-6xl select-none pointer-events-none transition-all',
                    frank.className,
                    hovering && 'scale-50'
                  )}>
                  {letter.letter}
                </p>
              ))}
            </section>
          </ButtonSlot>

          <FormField
            control={form.control}
            name='shuffle_letters'
            render={({ field }) => (
              <FormItem
                className={cn(
                  'flex flex-row items-center justify-between p-4 max-w-2xl mx-auto mt-10 transition-all',
                  hovering && 'opacity-30'
                )}>
                <div className='space-y-0.5'>
                  <FormLabel>Shuffle alphabet letters</FormLabel>
                  {field.value ? (
                    <FormDescription>It&apos;s better when you are trying to learn all the letters</FormDescription>
                  ) : (
                    <FormDescription>It&apos;s better when you trying to remember the whole alphabet</FormDescription>
                  )}
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {isMobile && (
            <Button type='submit' className='block mt-10 mx-auto'>
              Start
            </Button>
          )}
        </form>
      </Form>

      <p
        className={cn(
          'absolute text-white font-bold text-5xl pointer-events-none opacity-0 transition-all',
          hovering && 'opacity-1'
        )}>
        Start
      </p>
    </main>
  )
}
