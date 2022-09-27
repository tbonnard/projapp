import React from 'react'

const InfoTopMessage = ({message}) => {
    

    if (!message) {
        return null
    }
    return (
        <div className='infoTextTop'>
        <p className='infoTextforTop'>
            {message}
        </p>
        </div>
    )
}

export default InfoTopMessage