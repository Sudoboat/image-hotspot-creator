import React, { useState } from 'react'
import SelectImage from '../select image/selectImage'
import CreateUsi from '../create Usi/createUsi'
import './usi.css'

const Usi = ({ sdk }) => {
  const [imageUrl, setImageUrl] = useState()
  const [imageStatus, setImageStatus] = useState(false)

  return (
    <div className="mainContainer">
      {!imageStatus ? (
        <SelectImage
          setImageUrl={setImageUrl}
          setImageStatus={setImageStatus}
          imageUrl={imageUrl}
        />
      ) : (
        <CreateUsi
          setImageUrl={setImageUrl}
          setImageStatus={setImageStatus}
          imageUrl={imageUrl}
          sdk={sdk}
        />
      )}
    </div>
  )
}
export default Usi
