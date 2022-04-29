import React, { useEffect, useState } from 'react'
import { API } from "../../src/backend";

function Tags() {
  const [tags, setTags] = useState([]);

  const getAllTags = ()=>{
    return fetch(`${API}/tags`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  }

  useEffect(()=>{
    getAllTags();
  },[])
  return (
    <div>
      {tags && tags.map((tag)=>{
        return <p>{tag?.tagname}</p>
      })}
    </div>
  )
}

export default Tags