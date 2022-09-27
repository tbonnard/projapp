import React, {useState} from 'react'
import { useDispatch } from 'react-redux'

import Moment from 'moment'

import { updateDaily, updateDailyDate, deactivateDaily } from '../../reducers/dailyReducer'
import deleteIcon from '../../files/delete.svg';


const Daily = ({item, limitDaily}) => {
    const dispatch = useDispatch()

    const [description, setDescription] = useState(item.description)
    const [dailyDate, setDailyDate] = useState(item.dailyDate)

    const handleSaveAutoDesc = (e) => {
        setDescription(e.target.value)
        const itemObject = {id:item.id, description:e.target.value}
        setTimeout(() => {
        dispatch(updateDaily(itemObject, limitDaily))
          }, 500);
    }


    const handleChangeDate = (e) => {
        setDailyDate(e.target.value)
        const itemObject = {id:item.id, dailyDate:e.target.value}
        dispatch(updateDailyDate(itemObject, limitDaily))
    }


    const handleDone = (e) => {
        e.preventDefault()
        // console.log(e.target.checked)
        const itemObject = {id:item.id}
        dispatch(deactivateDaily(itemObject, limitDaily))
    }

    return (
        <div className='lineItemDaily' >
            <div className='dailyTopSection' >
                <div className='dailyDate'>
                    {Moment(item.dailyDate).format('dddd, MMMM Do YYYY')}
                </div>
                <label>
                    <input type="date" className='dateInputDaily' value={Moment(dailyDate).format('YYYY-MM-DD')} onChange={(e) => handleChangeDate(e)}/>
                </label>
            </div>
            <div className=''>
                <textarea placeholder="title" value = {description} onChange={handleSaveAutoDesc}>
                </textarea>
            </div>

            <div className='iconsButtonsSection deleteDaily'>
                <button className='buttonIcons' onClick={handleDone} title='Delete the daily' ><img className='icons' src={deleteIcon} title='Delete the daily'  alt='Delete the daily' /></button>
            </div>

        </div>
    )
}

export default Daily