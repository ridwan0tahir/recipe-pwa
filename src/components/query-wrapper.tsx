import { ReactElement, ReactNode } from 'react'
import { UseQueryResult } from '@tanstack/react-query'

import { Spinner } from './ui/spinner'
import { Button } from './ui/button'
import { ErrorAlert } from './ui/alert'

interface QueryWrapperProps<TData, TError> {
	currentQuery: UseQueryResult<TData, TError>
	children?: ReactNode
	CustomLoader?: ReactElement | ReactNode
}
const QueryWrapper = <TData, TError>({
	currentQuery,
	children,
	CustomLoader,
}: QueryWrapperProps<TData, TError>) => {
	const { isPending, isError, error, refetch } = currentQuery || {}

	const handleRefetch = () => {
		refetch()
	}

	if (isPending) {
		if (CustomLoader) {
			return CustomLoader
		}
		return (
			<div className='flex min-h-56 flex-1 items-center justify-center'>
				<Spinner size='xl' />
			</div>
		)
	}

	if (isError) {
		return (
			<div className='flex min-h-56 flex-1 items-center justify-center'>
				<div className='flex flex-col items-center justify-center gap-4'>
					<ErrorAlert content={(error as Error)?.message} />
					<Button className='px-8' onClick={handleRefetch}>
						Retry
					</Button>
				</div>
			</div>
		)
	}

	return <>{children}</>
}
export default QueryWrapper
