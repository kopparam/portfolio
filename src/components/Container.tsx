import { forwardRef } from 'react'
import clsx from 'clsx'

export const Container = forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(function Container({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={clsx('kl-gutter mx-auto w-full max-w-page', className)}
      {...props}
    />
  )
})
