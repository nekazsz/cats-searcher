import React, { useEffect } from 'react'
import s                    from './SingleBreedInfo.module.scss'
import qs                   from 'qs'

import { Swiper, SwiperSlide }                               from 'swiper/react'
import SwiperCore, { Pagination, Autoplay, EffectCoverflow } from 'swiper'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

import { useSelector }      from 'react-redux'
import { useAppDispatch }   from '../../redux/store'
import { fetchSingleBreed } from '../../redux/Breeds/asyncActions'
import { selectBreeds }     from '../../redux/Breeds/selectors'
import { setActiveBtn }     from '../../redux/voting/slice'
import { TSingleBreed }     from '../../redux/Breeds/types'

import { BreadCrumbs }        from '../BreadCrumbs'
import { setActiveBreedName } from '../../redux/Breeds/slice'
import { Spinner }            from '../Spinner'


const SingleBreedInfo: React.FC = () => {
	const dispatch = useAppDispatch()
	const { singleBreed, status, activeBreedName } = useSelector(selectBreeds)
	const emptyData = singleBreed.length === 0

	SwiperCore.use([ Pagination, EffectCoverflow, Autoplay ])

	useEffect(() => {
		dispatch(setActiveBreedName(singleBreed[0]?.id))
	}, [ singleBreed, activeBreedName ])

	useEffect(() => {
		dispatch(setActiveBtn('Breeds'))

		if (emptyData && status === 'success') {
			if (window.location.search) {
				const params: any = qs.parse(window.location.search.slice(1))
				dispatch(fetchSingleBreed(params.breed_id))
			}
		}
	}, [])

	return (
		<>
			<div className={ s.breed }>
				<BreadCrumbs/>
				{
					singleBreed.length > 0 && status === 'success'
						? <>
							<Swiper
								className={ s.breed__main_slider }
								pagination={ { clickable: true } }
								effect='coverflow'
								coverflowEffect={ { rotate: 100, slideShadows: false } }
								slidesPerView={ 1 }
								wrapperTag='ul'
								autoplay={ { delay: 8000 } }>
								{
									singleBreed.map((sliderEl: TSingleBreed) => (
										<SwiperSlide tag='li' className={ s.breed__img_wr } key={ sliderEl.image }>
											<img src={ sliderEl.image } alt=''/>
										</SwiperSlide>
									))
								}
							</Swiper>
							<div className={ s.breed__desc_wr }>
								{ singleBreed ? singleBreed[0]?.desc : null }
							</div>
						</>
						: <Spinner/>
				}
			</div>

		</>
	)
}

export default SingleBreedInfo