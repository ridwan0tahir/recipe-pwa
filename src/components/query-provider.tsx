'use client'

import { FC, ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@/lib/react-query'

interface ReactQueryProviderProps {
	children?: ReactNode
}
const ReactQueryProvider: FC<ReactQueryProviderProps> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}

export default ReactQueryProvider
