import { CircleAlert } from 'lucide-react'
import { FC } from 'react'

import { Alert, AlertDescription, AlertTitle } from './alert'

interface ErrorAlertProps {
	title?: string
	content?: string
}
const ErrorAlert: FC<ErrorAlertProps> = ({ title, content }) => {
	return (
		<Alert variant='destructive' className='flex items-end gap-1'>
			<CircleAlert className='m-0 mr-1 size-4 stroke-1' />
			<AlertTitle className='font-regular m-0 text-sm leading-none'>
				{title}
				{title && ':'}
			</AlertTitle>
			<AlertDescription className='font-light leading-none'>
				{content}
			</AlertDescription>
		</Alert>
	)
}
export default ErrorAlert
