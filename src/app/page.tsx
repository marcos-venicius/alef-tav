import Link from 'next/link'
import { Letters } from '~/components/letters'

export default function Home() {
  return (
    <main className='mx-auto w-fit p-5'>
      <Letters />

      <div className='flex flex-col gap-5 w-full max-w-4xl mt-10'>
        <Link href='/play/learn-letters' className='w-full p-5 transition-colors border border-sky-200 rounded text-sky-600 hover:bg-sky-100'>
          Learn the hebrew letters
        </Link>

        <Link href='/play/learn-alphabet' className='w-full p-5 transition-colors border border-sky-200 rounded text-sky-600 hover:bg-sky-100'>
          Remember the hebrew alphabet
        </Link>
      </div>
    </main>
  )
}
