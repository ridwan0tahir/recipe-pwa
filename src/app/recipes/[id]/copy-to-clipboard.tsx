'use client'

import { Button } from '@/components/ui/button'
import { CheckCheck, Files } from 'lucide-react'
import { useState, FC, useEffect } from 'react'

interface CopyVariableToClipboardProps {
	text: string
}
export const CopyVariableToClipboard: FC<CopyVariableToClipboardProps> = ({
	text,
}) => {
	const [isTextCopied, setIsTextCopied] = useState(false)

	useEffect(() => {
		if (!isTextCopied) {
			return
		}

		const timeoutId = setTimeout(() => {
			setIsTextCopied(false)
		}, 1000)

		return () => {
			clearTimeout(timeoutId)
		}
	}, [isTextCopied])

	const handleCopy = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text)
			setIsTextCopied(true)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Button
			type='button'
			onClick={!isTextCopied ? () => handleCopy(text) : undefined}
		>
			{isTextCopied ? (
				<CheckCheck className='!size-8 !stroke-2' />
			) : (
				<Files className='!size-8 !stroke-2' />
			)}
			<span className='sr-only'>Copt to clipboard</span>
		</Button>
	)
}
