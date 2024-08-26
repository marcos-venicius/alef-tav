type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asSlot?: boolean
}

export function ButtonSlot({ asSlot, ...props }: Props) {
  if (asSlot) return props.children

  return <button {...props}>{props.children}</button>
}
