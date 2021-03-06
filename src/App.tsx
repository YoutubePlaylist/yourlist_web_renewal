import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Navigation from './components/navigation'
import { setNavOpen } from './modules/navExpansion/actions'
import Header from './components/header'
import useScreenSize from './lib/hooks/useScreenSize'
import { setScreenSize } from './modules/screenSize/actions'
import { CustomToast } from './components/elements/CustomToast'
import MyRoutes from './routes'
import clsx from 'clsx'
import ReactModal from 'react-modal'

import './App.css'

ReactModal.setAppElement('#root')

function App() {
  const dispatch = useDispatch()
  const screenSize = useScreenSize()

  useEffect(() => {
    dispatch(setNavOpen())
  }, [dispatch])

  useEffect(() => {
    dispatch(setScreenSize(screenSize))
  }, [screenSize, dispatch])

  return (
    <div className="app flex w-screen h-screen">
      <BrowserRouter>
        <div className={'w-fit h-full'}>
          <Navigation />
        </div>
        <div
          className={clsx(
            'grid grid-cols-1 grid-rows-[4rem_minmax(100px,_auto)]',
            'flex-1 h-full max-h-full overflow-y-auto overflow-x-hidden',
            'bg-background-light rounded-l-3xl pl-6 pt-6',
          )}
        >
          <Header />
          <MyRoutes />
        </div>
      </BrowserRouter>
      <CustomToast />
    </div>
  )
}

export default App
