import React, { useEffect, useState }   from 'react'
import qs                               from 'qs'
import { useNavigate }                  from 'react-router'
import { useLocation, useSearchParams } from 'react-router-dom'
import { AppDispatch }                  from '../../redux/store'
import { fetchSingleBreed }             from '../../redux/Breeds/asyncActions'

import { Pagination, SkeletonLoader } from '../common'
import { TFilters, TSearchData }      from '../../redux/Search/types'
import { setToSearchData }            from '../../redux/Search/slice'


type TSearchedItems = {
	data: TSearchData[] | null
	dispatch: AppDispatch
	firstPage: boolean
	lastPage: boolean | null
	status: string
	filters: TFilters
	pageNumberForUI: number
}

const SearchedItems: React.FC<TSearchedItems> = ({ dispatch, data, firstPage, lastPage, status, filters, pageNumberForUI }) => {
	const navigate = useNavigate()
	const location = useLocation()
	const [ loaded, setLoaded ] = useState(false)
	const [ _, setSearchParams ] = useSearchParams()
	const emptyData = data === null
	const locGallery = location.pathname.includes('gallery')

	useEffect(() => {
		if (status === 'success') setTimeout(() => setLoaded(true), 0)

		return () => {
			dispatch(setToSearchData(null))
		}
	}, [])

	const onClickBreedName = (breedId: string, name: string) => {
		const queryString = qs.stringify({
			breed_id: breedId,
			breed_name: name,
		})
		dispatch(fetchSingleBreed(breedId))
		navigate(`/description?${ queryString }`)
	}

	const createParams = (value: string, limit: string, order: string, page: number, type: string) => {
		return qs.stringify({
			q: value,
			limit,
			order,
			page,
			type
		})
	}

	const onClickNext = () => {
		setSearchParams(createParams(filters.value, filters.limit, filters.order, pageNumberForUI + 1, filters.type))
	}
	const onClickPrev = () => {
		setSearchParams(createParams(filters.value, filters.limit, filters.order, pageNumberForUI - 1, filters.type))
	}

	if (status === 'pending') return <SkeletonLoader count={ 5 }/>

	return (
		<>
			{ emptyData && loaded && <div className='noItemFound'>Nothing found.</div> }
			<div className='items'>
				{
					data?.map((el: TSearchData) => {
						return (
							el
								? <div className='itemsImg_wr' key={ el.id }>
									<img src={ el.url } alt='image'/>
									{
										!locGallery && <button
											className={ 'hoverBtn ' }
											onClick={ () => onClickBreedName(el.breedId, el.name) }>
											{ el.name }
										</button>
									}
								</div>
								: ''
						)
					})
				}
			</div>
			{
				!lastPage && <Pagination
					firstPage={ firstPage }
					lastPage={ lastPage }
					onClickNext={ onClickNext }
					onClickPrev={ onClickPrev }
				/>
			}
		</>
	)
}

export default SearchedItems