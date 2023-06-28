import React, { useState } from 'react'
import SelectImage from '../select image/selectImage'
import CreateUsi from '../create Usi/createUsi'
import './usi.css'

const Usi = ({ sdk }) => {
  const [imageUrl, setImageUrl] = useState()
  const [imageStatus, setImageStatus] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
  const [imageName, setImageName] = useState<any>({ name: '', id: '' })

  return (
    <div className="mainContainer">
      {!imageStatus ? (
        <SelectImage
          setImageUrl={setImageUrl}
          setImageStatus={setImageStatus}
          imageUrl={imageUrl}
          selectedImage={selectedImage}
          setImageName={setImageName}
          setSelectedImage={setSelectedImage}
        />
      ) : (
        <CreateUsi
          setImageUrl={setImageUrl}
          setImageStatus={setImageStatus}
          imageUrl={imageUrl}
          sdk={sdk}
          imageName={imageName}
          selectedImage={selectedImage}
        />
      )}
    </div>
  )
}
export default Usi
