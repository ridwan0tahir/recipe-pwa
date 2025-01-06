import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import Link, { LinkProps } from 'next/link'

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-white transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:stroke-1 [&_svg]:size-4 [&_svg]:shrink-0 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
	{
		variants: {
			variant: {
				primary: 'bg-primary text-background hover:bg-primary/90',
				outline:
					'border border-primary text-primary hover:border-primary/90 hover:text-opacity-90',
				link: 'text-foreground hover:text-primary',
				ghost: 'hover:bg-primary hover:text-primary',
			},
			size: {
				sm: 'h-9 px-3',
				lg: 'h-11 px-8',
				icon: 'h-8 w-8',
			},
		},
	}
)

interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		)
	}
)
Button.displayName = 'Button'

interface LinkButtonProps
	extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>,
		LinkProps,
		VariantProps<typeof buttonVariants> {}
export const LinkButton = ({
	className,
	variant,
	size,
	...props
}: LinkButtonProps) => {
	return (
		<Link
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	)
}
