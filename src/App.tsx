import React, { useEffect } from 'react'
import DesktopLayout        from './components/layouts/DesktopLayout'

import { AppDispatch, useAppDispatch } from './redux/store'

import { getLSTheme }    from './utils/theme'
import { getLsMessages } from './utils/infoMessageLS'


const App: React.FC = () => {
	const dispatch: AppDispatch = useAppDispatch()

	useEffect(() => {
		getLSTheme(dispatch)
		getLsMessages(dispatch)
	}, [])

	return (
		<main className='App'>
			<DesktopLayout/>
		</main>
	)
}

export default App