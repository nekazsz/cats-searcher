import { AppDispatch }                       from '../../../redux/store'
import { TFavouritesData, TInfoInfoMessage } from '../../../redux/voting/types'


export type TFavourites = {
	dispatch: AppDispatch
	favoritesData: TFavouritesData[]
	infoMessage: TInfoInfoMessage[]
	status: string
}
export type TFavoriteItem = {
	el: TFavouritesData
	status: string
	dispatch: AppDispatch
}

