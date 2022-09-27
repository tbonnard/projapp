import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getUserDaily } from '../../reducers/dailyReducer' 

import DailyList from './DailyList'

const Dailys = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const dailyItems = useSelector(state => state.daily)
    const limitDaily = useSelector(state => state.limitDaily)


    useEffect(() => {
        dispatch(getUserDaily(limitDaily))
      }, [dispatch, limitDaily])


    if (!user ) {
        return null
    }
    
    return (
        <div className='containerGlobal'>
            <DailyList items={dailyItems} limitDaily={limitDaily} />
         </div>
    )
}

export default Dailys