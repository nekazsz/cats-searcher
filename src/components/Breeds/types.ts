import { TBreedOption } from '../../redux/Breeds/types'
import { AppDispatch }  from '../../redux/store'


export type TBreedSelect = {
	options: TBreedOption[]
	status: string
	dispatch: AppDispatch
	value: string | null
	limit: string | null
}

export type TOption = {
	value: string | null
	label: string | null
} | null