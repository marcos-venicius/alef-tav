import { RedirectType, redirect } from 'next/navigation'
import { LetterDefinition, letters } from '~/letters'
import { Frank_Ruhl_Libre } from 'next/font/google'
import { cn } from '~/lib/utils'
import { Button } from '~/components/ui/button'
import Link from 'next/link'

type Props = {
  searchParams: {
    time?: string
    errors?: string
    success?: string
  }
}

const frank = Frank_Ruhl_Libre({
  subsets: ['hebrew']
})

// TODO: - do some tests
//       - separate in another file
function formatDuration(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  let result = 'You took '

  if (minutes > 0) {
    result += `${minutes} minute${minutes > 1 ? 's' : ''}`
  }

  if (minutes > 0 && seconds > 0) {
    result += ' e '
  }

  if (seconds > 0) {
    result += `${seconds} second${seconds > 1 ? 's' : ''}`
  }

  return result
}

// TODO: - do some tests
//       - separate in another file
function params(sp: Props['searchParams']) {
  if (sp?.time === undefined) return redirect('/', RedirectType.replace)
  if (sp?.errors === undefined) return redirect('/', RedirectType.replace)
  if (sp?.success === undefined) return redirect('/', RedirectType.replace)

  let time = Number(sp.time)
  const errors: Array<LetterDefinition> = []
  const success: Array<LetterDefinition> = []

  if (Number.isNaN(time)) return redirect('/', RedirectType.replace)

  const errorIndexes = sp.errors.split(',').filter(x => !!x)
  const successIndexes = sp.success.split(',').filter(x => !!x)

  for (const index of errorIndexes) {
    const n = Number(index)

    if (Number.isNaN(n) || n < 0 || n > letters.length - 1) return redirect('/', RedirectType.replace)

    errors.push(letters[n])
  }

  for (const index of successIndexes) {
    const n = Number(index)

    if (Number.isNaN(n) || n < 0 || n > letters.length - 1) return redirect('/', RedirectType.replace)

    success.push(letters[n])
  }

  return {
    time: formatDuration(time),
    errors,
    success
  }
}

export default function Results({ searchParams }: Props) {
  const { time, errors, success } = params(searchParams)

  return (
    <main className='w-full h-full p-5 flex gap-5 flex-col items-center justify-center'>
      <section className='w-full max-w-5xl'>
        <h2 className='text-slate-800 font-bold text-5xl' dir='rtl'>
          Time
        </h2>

        <p className='text-slate-800 font-bold mt-5' dir='rtl'>
          {time}
        </p>

        <h2 className='text-slate-800 font-bold text-5xl mt-10' dir='rtl'>
          Right answers
        </h2>

        {success.length > 0 && (
          <div className='mt-5 flex items-center flex-wrap gap-5' dir='rtl'>
            {success.map(letter => (
              <p key={letter.letter} className={cn('text-6xl select-none pointer-events-none', frank.className)}>
                {letter.letter}
              </p>
            ))}
          </div>
        )}

        {success.length === 0 && (
          <p dir='rtl' className='text-sm text-zinc-500 mt-5'>
            You don&apos;t have any right answers
          </p>
        )}

        <h2 className='text-slate-800 font-bold text-5xl mt-10' dir='rtl'>
          Wrong answers
        </h2>

        {errors.length > 0 && (
          <div className='flex items-center flex-wrap gap-5 mt-5' dir='rtl'>
            {errors.map(letter => (
              <p
                key={letter.letter}
                className={cn('text-6xl select-none pointer-events-none transition-all', frank.className)}>
                {letter.letter}
              </p>
            ))}
          </div>
        )}

        {errors.length === 0 && (
          <p dir='rtl' className='text-sm text-zinc-500 mt-5'>
            You don&apos;t have any wrong answers
          </p>
        )}

        <Link href='/' className='block w-fit ml-auto mt-10'>
          <Button>Play again</Button>
        </Link>
      </section>
    </main>
  )
}
