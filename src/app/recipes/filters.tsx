import { FC, useState } from 'react'
import { Filter } from 'lucide-react'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ITEMS_PER_PAGE } from '@/lib/utils'

export const useRecipeFilters = () => {
	const [type, setType] = useState('main course')
	const [cuisine, setCuisine] = useState('')
	const [diet, setDiet] = useState('')
	const [number, setNumber] = useState(ITEMS_PER_PAGE)

	const handleResetFilters = () => {
		setType('main course')
		setCuisine('')
		setDiet('')
		setNumber(ITEMS_PER_PAGE)
	}

	return {
		type,
		setType,
		cuisine,
		setCuisine,
		diet,
		setDiet,
		number,
		setNumber,
		resetFilters: handleResetFilters,
		filters: { type, cuisine, diet, number },
	}
}

// prettier-ignore
const CUISINE_LIST = ["African", "Asian", "European", "American", "Italian", "Middle Eastern"]

// prettier-ignore
const DIET_LIST = ["Vegetarian", "Paleo", "Primal", "Gluten Free", "Ketogenic"]

// prettier-ignore
const MEAL_TYPE_LIST = ["main course", "side dish", "soup", "desert", "drink"]

interface RecipeFiltersProps {
	type?: string
	setType: (type: string) => void
	cuisine?: string
	setCuisine: (cuisine: string) => void
	diet?: string
	setDiet: (diet: string) => void
	resetFilters?: () => void
}
const RecipeFilters: FC<RecipeFiltersProps> = ({
	type,
	setType,
	cuisine,
	setCuisine,
	diet,
	setDiet,
	resetFilters,
}) => {
	return (
		<ScrollArea className='h-full p-5'>
			<div className='flex flex-col gap-5'>
				<div className='flex items-center justify-between gap-3 text-foreground'>
					<h3 className='text-2xl font-semibold'>Filters</h3>
					<Filter className='size-6' />
				</div>
				<Accordion
					type='multiple'
					defaultValue={['type', 'cuisine', 'diet']}
					className='flex flex-col gap-2'
				>
					<AccordionItem value='type'>
						<AccordionTrigger className='text-lg font-semibold'>
							Meal Type
						</AccordionTrigger>
						<AccordionContent>
							<RadioGroup name='type' value={type} onValueChange={setType}>
								{MEAL_TYPE_LIST.map((type, index) => (
									<div key={index} className='flex items-center gap-3 py-1'>
										<RadioGroupItem id={type} value={type} />
										<Label htmlFor={type} className='capitalize'>
											{type}
										</Label>
									</div>
								))}
							</RadioGroup>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value='cuisine'>
						<AccordionTrigger className='text-lg font-semibold'>
							Cuisines
						</AccordionTrigger>
						<AccordionContent>
							<RadioGroup
								name='cuisine'
								value={cuisine}
								onValueChange={setCuisine}
								className='flex flex-col gap-y-2'
							>
								{CUISINE_LIST.map((type, index) => (
									<div key={index} className='flex items-center gap-3 py-1'>
										<RadioGroupItem id={type} value={type} />
										<Label htmlFor={type} className='capitalize'>
											{type}
										</Label>
									</div>
								))}
							</RadioGroup>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value='diet'>
						<AccordionTrigger className='text-lg font-semibold'>
							Diets
						</AccordionTrigger>
						<AccordionContent>
							<RadioGroup
								name='diet'
								value={diet}
								onValueChange={setDiet}
								className='flex flex-col gap-y-2'
							>
								{DIET_LIST.map((type, index) => (
									<div key={index} className='flex items-center gap-3 py-1'>
										<RadioGroupItem id={type} value={type} />
										<Label htmlFor={type} className='capitalize'>
											{type}
										</Label>
									</div>
								))}
							</RadioGroup>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
				<Button size='sm' variant='outline' onClick={() => resetFilters?.()}>
					Clear Filter
				</Button>
			</div>
		</ScrollArea>
	)
}

export default RecipeFilters
