'use client'

import { useState } from 'react'
import { letters } from '~/letters'
import { cn } from '~/lib/utils'
import { Frank_Ruhl_Libre } from 'next/font/google'
import { LinkSlot } from '~/components/link-slot'
import Link from 'next/link'
import { Button } from '~/components/ui/button'
import { useIsMobile } from '~/hooks/is-mobile'

const frank = Frank_Ruhl_Libre({
  subsets: ['hebrew']
})

export default function Home() {
  const isMobile = useIsMobile()

  const [hovering, setHovering] = useState(false)

  function handleHovering(state: boolean) {
    if (state && isMobile) return

    setHovering(state)
  }

  return (
    <main
      className={cn(
        'w-full h-full bg-white flex flex-col items-center justify-center transition-all',
        hovering && 'bg-black/50'
      )}>
      <LinkSlot href='/play' asSlot={isMobile}>
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
      </LinkSlot>

      {isMobile && (
        <Link href='/play' className='block mt-10'>
          <Button>Start</Button>
        </Link>
      )}

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
