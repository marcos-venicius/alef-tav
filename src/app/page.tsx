'use client';

import { useState } from 'react'
import { letters } from '~/letters'
import { cn } from '~/lib/utils'
import { Frank_Ruhl_Libre } from 'next/font/google'
import Link from 'next/link';

const frank = Frank_Ruhl_Libre({
  subsets: ['hebrew']
})

export default function Home() {
  const [hovering, setHovering] = useState(false)

  return (
    <main
      className={cn(
        'w-full h-full bg-white flex items-center justify-center transition-all',
        hovering && 'bg-black/50'
      )}>
      <Link href="/play">
        <section
          dir='rtl'
          className='p-5 max-w-5xl flex flex-wrap justify-center items-center gap-5 cursor-pointer'
          onMouseEnter={setHovering.bind(null, true)}
          onMouseLeave={setHovering.bind(null, false)}>
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
      </Link>

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

