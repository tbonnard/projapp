import React, {useState} from 'react'
import { useDispatch } from 'react-redux'

import { getSearchNote , getUserNote} from '../../reducers/NotesReducer'

import unfilterIcon from '../../files/unfilter.svg'
import SearchIcon from '../../files/search.svg'

const Search = () => {

    const dispatch = useDispatch()

    const [text, setText] = useState('');
    const [filteredIcon, setFilteredIcon] = useState(false);


    const handleSubmit = (e) => {
        //console.log(e.target.value)
        e.preventDefault()
        dispatch(getSearchNote(text))
        if (text ==='') {
            setFilteredIcon(false)
        } else {
            setFilteredIcon(true)
        }
    }

    const handleChange= (e) => {
        setText(e.target.value)
    }

    const handleClick= () => {
        setFilteredIcon(false)
        dispatch(getUserNote())
        setText('')
    }

    return (
        <form onSubmit={handleSubmit} className='formSearch'>
            <input type="search" id='serchNoteInput' value={text} tabIndex={-1} placeholder='search a note' onChange={(e) => handleChange(e)} />
            
            {filteredIcon && 
            <div>
                <img className='unfilterIcon unfilterActiveIcon' src={unfilterIcon} alt='Reset Search' title={`Reset Search`} onClick={handleClick}/>
            </div>
            }
            
            {text.trim().length > 0 && 
            <div className=''>
                <img className='unfilterIcon' src={SearchIcon} alt='Search' title={`Search`} onClick={handleSubmit}/>
            </div>
            }

        </form>
    )
}

export default Search