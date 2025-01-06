import NextImage, { ImageProps as NextImageProps } from 'next/image'

import { cn } from '@/lib/utils'

type ImageProps = NextImageProps
export const Image = ({ className, ...props }: ImageProps) => {
	return (
		<div className={cn('relative z-20 h-auto w-auto', className)}>
			<NextImage
				fill
				sizes='100%'
				className='size-full object-cover'
				{...props}
			/>
		</div>
	)
}
