import React from 'react'

import TipTapMenuBar from './TipTapMenuBar'
import TipTapEditor from './TipTapEditor'

const TipTapGlobal = ({selectedNote}) => {

  return (
      <div>
        <TipTapEditor selectedNote={selectedNote}/>
      </div>
    )
  }

  export default TipTapGlobal