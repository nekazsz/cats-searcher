import React, { useEffect, useState } from 'react'
import s                              from '../Voting.module.scss'

import { fetchGetLikes } from '../../../redux/voting/asyncActions'
import { TLikesData }    from '../../../redux/voting/types'
import { TLikes }        from './types'

import { Spinner } from '../../Spinner'


const Likes: React.FC<TLikes> = ({ likeData, dispatch, status }) => {
	const [ isLoading, setIsLoading ] = useState(true)

	useEffect(() => {
		const promise = dispatch(fetchGetLikes())
		return () => promise.abort()
	}, [])

	useEffect(() => {
		setIsLoading(true)
		if (status === 'success') setTimeout(() => setIsLoading(false), 1000)

	}, [])

	const noItemsBoolean = (likeData.length === 0 && status === 'success')

	if (isLoading) return <Spinner/>

	return (
		<>
			{ noItemsBoolean && <div className='noItemFound '><span>No item found</span></div> }
			<div className={ s.voting__items }>
				{ likeData?.map((el: TLikesData, i) => {
					return (
						<div className={ `${ s.voting__itemsImg_wr } ${ s.unHoverClass }` } key={ el.id }>
							<img src={ el.image.url } alt='image'/>
						</div>
					)
				}) }
			</div>
		</>
	)
}

export default Likes
