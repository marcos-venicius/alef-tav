import Link, { LinkProps } from 'next/link'

type Props = LinkProps & {
  asSlot?: boolean
  children: React.ReactNode
}

export function LinkSlot({ asSlot, ...props }: Props) {
  if (asSlot) return props.children

  return <Link {...props}>{props.children}</Link>
}
