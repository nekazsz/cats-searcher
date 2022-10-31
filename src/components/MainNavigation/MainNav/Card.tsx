import React                 from 'react'
import s                     from './MainNav.module.scss'
import { Link, useLocation } from 'react-router-dom'
import { TCard }             from './types'


const Card: React.FC<TCard> = ({ name, img, color, to }) => {
	const location = useLocation()
	const loc = location.pathname.includes(to)

	return (
		<div className={ s.content__card }>
			<Link to={ to } className={ `${ s.card } ${ s[color] } ${ loc ? s.active : '' }` }>
				<div className={ s.card__img_wr }>
					<img src={ img } alt='card'/>
				</div>
			</Link>
			<div className={ `btn ${ s.card__btn } ${ loc ? s.active : '' }` }>{ name }</div>
		</div>

	)
}

export default Card
