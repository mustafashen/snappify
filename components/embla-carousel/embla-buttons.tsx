import React, { PropsWithChildren } from 'react'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'
type PropType = PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>

export const DotButton = (props: any) => {
  const { icon, children, ...restProps } = props

  return (
    <button type="button" {...restProps}>
      {icon}
      {children}
    </button>
  )
}

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className="w-6"
      type="button"
      {...restProps}
    >
      <ChevronLeftIcon/>
      {children}
    </button>
  )
}

export const NextButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className="w-6"
      type="button"
      {...restProps}
    >
      <ChevronRightIcon/>
      {children}
    </button>
  )
}
