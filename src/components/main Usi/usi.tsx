import React, { useEffect, useState } from 'react'
import SelectImage from '../select image/selectImage'
import CreateUsi from '../create Usi/createUsi'
import './usi.css'
import { Stack } from '@contentful/f36-components'
import { Spinner } from '@contentful/forma-36-react-components'
const contentful = require('contentful-management')

const Usi = ({ sdk }: any) => {
  const [url, setUrl] = useState({
    url: '',
    contentful: true,
  })
  const [imageUrl, setImageUrl] = useState<string>()
  const [imageStatus, setImageStatus] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [imageName, setImageName] = useState<string>()
  const [imageAssets, setImageAssets] = useState<[]>()
  const client = contentful.createClient({
    accessToken: 'CFPAT-XKF92MSjNN50kOIwzZbLjsYxwguJHTURek20n68Kl74',
  })

  useEffect(() => {

    if (sdk?.entry?.fields?.imageUrl?.getValue()) {
      const url = sdk.entry.fields.imageUrl.getValue()
      setImageUrl(url)
      setImageName(sdk.entry.fields.title.getValue())
      setSelectedImage(sdk.entry.fields.title.getValue())
      setImageStatus(true)
    }
  }, [])

  //functions
  const getAssets = async () => {
    await client
      .getSpace('ov64r3ga08sj')
      .then((space: any) => space.getEnvironment('master'))
      .then((environment: any) => environment.getAssets())
      .then((response: any) => setImageAssets(response.items))
      .catch(console.error)
  }

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
