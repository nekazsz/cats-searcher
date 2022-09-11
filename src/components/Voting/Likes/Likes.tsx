import React, { useEffect } from 'react'
import s                    from './Likes.module.scss'

import { fetchGetLikes } from '../../../redux/voting/asyncActions'
import { TLikesData }    from '../../../redux/voting/types'
import { TLikes }        from './types'


const Likes: React.FC<TLikes> = ({ likeData, dispatch, status }) => {

	useEffect(() => {
		dispatch(fetchGetLikes())
	}, [])

	const noItemsBoolean = (likeData.length === 0 && status === 'success')

	return (
		<>
			{ noItemsBoolean && <div className='noItemFound '><span>No item found</span></div> }
			<div className={ s.likes }>
				{ likeData?.map((el: TLikesData, i) => {
					return (
						<div className={ s.likes__img_wr } key={ el.id }>
							<img src={ el.image.url } alt='image'/>
						</div>
					)
				}) }
			</div>
		</>
	)
}

export default Likes
