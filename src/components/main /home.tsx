import React, { useEffect, useState } from 'react'
import SelectImage from '../select image/selectImage'
import CreateUsi from '../create/createHotspot'
import './home.css'
import { Stack } from '@contentful/f36-components'
import { Spinner } from '@contentful/forma-36-react-components'
// import {space_token} from "../../tokens.js";
// import { error } from 'console'
// const contentful = require('contentful-management')

const Usi = ({ sdk }: any) => {
  const [url, setUrl] = useState({
    url: '',
    contentful: true,
  })

  // const client = contentful.createClient({
  //   accessToken: space_token,
  // })


  // const accesTokenManagement=process.env.SPACE_MANAGEMENT_TOKEN;
  const [imageUrl, setImageUrl] = useState<string>()
  const [imageStatus, setImageStatus] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [imageName, setImageName] = useState<string>()
  const [imageAssets, setImageAssets] = useState<[]>()
 

  //This UseEffect is used for the first time if there is already values for that entry
  useEffect(() => {
    if (sdk?.entry?.fields?.imageUrl?.getValue()) {
      const url = sdk.entry.fields.imageUrl.getValue()
      setImageUrl(url)
      setImageName(sdk.entry.fields.title.getValue())
      setSelectedImage(sdk.entry.fields.title.getValue())
      setImageStatus(true)
    }
  }, [])

  //This function is used to get all the assets from the contentful assets
  const getAssets = async () => {
    await sdk.space.getAssets().then((response:any)=>{setImageAssets(response.items)})
      .catch(console.error)
  }

  //This useEffect is used to call getAssets function for the first time after render
  useEffect(() => {
    getAssets()
  }, [])

  return (
    <div className="mainContainer">
      {!imageStatus ? (
        imageAssets ? (
          <SelectImage
            sdk={sdk}
            url={url}
            setUrl={setUrl}
            imageName={imageName}
            setImageUrl={setImageUrl}
            setImageStatus={setImageStatus}
            imageUrl={imageUrl}
            selectedImage={selectedImage}
            setImageName={setImageName}
            setSelectedImage={setSelectedImage}
            imageAssets={imageAssets}
            setImageAssets={setImageAssets}
          />
        ) : (
          <Stack>
            <Spinner customSize={50} />
          </Stack>
        )
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
