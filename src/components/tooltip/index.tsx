import { Tooltip as Root, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'

type Props = {
  children: React.ReactNode
  hint: string
}

export function Tooltip({ hint, children }: Props) {
  return (
    <TooltipProvider>
      <Root>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent className='border-none text-zinc-500'>
          <p>{hint}</p>
        </TooltipContent>
      </Root>
    </TooltipProvider>
  )
}
