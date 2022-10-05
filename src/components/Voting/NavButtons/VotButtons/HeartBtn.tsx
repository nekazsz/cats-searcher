import React from 'react'
import s     from '../NavButtons.module.scss'

import { TDataObj }  from '../../../../redux/voting/types'
import { THeartBtn } from './types'

import heartTWhiteImg      from '../../../../assets/images/voting/heartWhite.webp'
import heartTransparentImg from '../../../../assets/images/voting/heartTransparent.webp'
import { SmallSpinner }    from '../../../Spinner'


const HeartBtn: React.FC<THeartBtn> = ({ onFavourite, imgObj, status, onFavourites, setBtnName, btnName }) => {
	const imgInFavourites = onFavourites.find((el: TDataObj) => el?.id === imgObj?.id)

	const onClickBtn = (imgObj: TDataObj) => {
		setBtnName('voteFavourite')
		onFavourite(imgObj)
	}

	return (
		<button
			disabled={ status === 'pending' }
			onClick={ () => onClickBtn(imgObj) }
			className={ `${ s.nav_button_wr } ${ s.heart_bg }` }>
			{
				status === 'pending' && btnName === 'voteFavourite'
					? <SmallSpinner height={ 20 } width={ 20 } color='#FFFFFF'/>
					: <img src={ !imgInFavourites ? heartTransparentImg : heartTWhiteImg } alt='icon'/>
			}
		</button>
	)
}

export default HeartBtn
