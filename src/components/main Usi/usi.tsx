import React, { useEffect, useState } from 'react'
import SelectImage from '../select image/selectImage'
import CreateUsi from '../create Usi/createUsi'
import './usi.css'

const Usi = ({ sdk }) => {
  const [imageUrl, setImageUrl] = useState<any>()
  const [imageStatus, setImageStatus] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
  const [imageName, setImageName] = useState<any>({ name: '', id: '' })
  useEffect(() => {
    if (sdk.entry.fields.imageUrl.getValue()) {
      const url = sdk.entry.fields.imageUrl.getValue()
      console.log(sdk.entry.fields)
      setImageUrl(url)
      setImageName(sdk.entry.fields.title.getValue())
      setSelectedImage(sdk.entry.fields.title.getValue())
      setImageStatus(true)
    }
  }, [])

  useEffect(() => {
    console.log(imageUrl)
  }, [imageUrl])

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
