import React, { useState } from 'react'
import BookmarkIcon from '@mui/icons-material/Bookmark';

function Bookmark() {

  const [bookmark, setBookmark] = useState(false);

  const BookmarkQuestion = ()=>{
    if(bookmark)
    {
      //do the api call
    }
    setBookmark(!bookmark)
  }

  return (
    <BookmarkIcon onClick={BookmarkQuestion} style={{"color": bookmark? "burlywood": "darkgray"}}/>
  )
}

export default Bookmark