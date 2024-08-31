import React, { useImperativeHandle, useState } from 'react'

type Props = {
  max: number
  current: number
}

export type ProgressBar = {
  updateCurrent(current: (actual: number) => number): void
}

export const ProgressBar = React.forwardRef<ProgressBar, Props>(function Component(props, ref) {
  const [current, setCurrent] = useState(props.current)

  const width = (100 * current) / props.max

  useImperativeHandle(
    ref,
    () => ({
      updateCurrent(newCurrent) {
        setCurrent(state => newCurrent(state))
      }
    }),
    []
  )

  return (
    <div className='fixed top-0 left-0 right-0 w-screen h-5 bg-sky-100'>
      <div
        className='h-5 bg-sky-600 transition-all'
        style={{
          width: `${width}%`
        }}
      />
    </div>
  )
})
