'use client'

import { letters } from '~/letters'
import { Frank_Ruhl_Libre } from 'next/font/google'
import { cn } from '~/lib/utils'
import { useRef, useState } from 'react'

const frank = Frank_Ruhl_Libre({
  subsets: ['hebrew'],
  weight: '400'
})

export function Letters() {
  const [hovering, setHovering] = useState<number>(-1)

  const timeout = useRef<NodeJS.Timeout>()

  function handleSetHovering(index: number) {
    if (timeout.current) clearTimeout(timeout.current)

    timeout.current = setTimeout(() => {
      setHovering(index)
    }, 500)
  }

  function handleUnsetHovering() {
    clearTimeout(timeout.current)

    setHovering(-1)
  }

  return (
    <section className='flex flex-wrap gap-5 max-w-4xl justify-center'>
      {letters.map((letter, index) => (
        <div
          key={letter.letter}
          className={cn('flex items-end select-none transition-all bg-sky-50 md:w-28 w-24 p-2 rounded', hovering !== -1 && hovering !== index && 'opacity-10')}
          onMouseEnter={handleSetHovering.bind(null, index)}
          onMouseLeave={handleUnsetHovering}>
          <strong className={cn('block text-4xl md:text-6xl transition-all w-10 text-sky-900', frank.className)}>
            {letter.letter}
          </strong>

          <p className='text-sm text-slate-600'>{letter.name}</p>
        </div>
      ))}
    </section>
  )
}
