import { FC, HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'
import { SpoonIcon } from '@/components/icons'

interface SectionProps extends HTMLAttributes<HTMLElement> {}
export const Section: FC<SectionProps> = ({ className, ...rest }) => {
	return (
		<section
			className={cn('container relative scroll-mt-16 py-12', className)}
			{...rest}
		/>
	)
}

interface SectionHeaderProps extends HTMLAttributes<HTMLHeadingElement> {}
export const SectionHeader: FC<SectionHeaderProps> = ({
	className,
	children,
	...rest
}) => {
	return (
		<h2
			className={cn('text-base text-foreground lg:text-2xl', className)}
			{...rest}
		>
			{children}
			<SpoonIcon className='h-2.5 w-10 text-primary' />
		</h2>
	)
}

interface SectionSubHeaderProps extends HTMLAttributes<HTMLHeadingElement> {}
export const SectionSubHeader: FC<SectionSubHeaderProps> = ({
	className,
	...rest
}) => {
	return (
		<h3
			className={cn(
				'text-[clamp(3.625rem,6.5vw,5.625rem)] font-bold leading-tight text-primary',
				className
			)}
			{...rest}
		/>
	)
}
