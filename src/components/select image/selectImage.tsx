/* eslint-disable jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState } from 'react'
import MagicDropzone from 'react-magic-dropzone'
import './selectImage.css'
import { Button, Stack, Select, FormControl } from '@contentful/f36-components'
import { ArrowForwardIcon } from '@contentful/f36-icons'
import { element } from 'prop-types'

const SelectImage = ({ setImageUrl, setImageStatus, imageUrl }) => {
  //import
  const contentful = require('contentful-management')
  const assetContentful = require('contentful')

  //state Declaratios
  const [imageFile, setImageFile] = useState()
  const [imageAssets, setImageAssets] = useState()

  const client = contentful.createClient({
    accessToken: 'CFPAT-XKF92MSjNN50kOIwzZbLjsYxwguJHTURek20n68Kl74',
  })

  const assetClient = assetContentful.createClient({
    space: 'ov64r3ga08sj',
    accessToken: 'eCA_T4CqDY8bM5jKqigY48DXMDKUOG9jXvlov0nxbUQ',
  })

  //functions
  const getAssets = async () => {
    const asset = await client
      .getSpace('ov64r3ga08sj')
      .then((space: any) => space.getEnvironment('master'))
      .then((environment: any) => environment.getAssets())
      .then((response: any) => setImageAssets(response.items))
      .catch(console.error)
  }

  //get contentful image url
  const getImageUrl = async (id: string) => {
    const asset = await assetClient
      .getAsset(id)
      .then((asset) => setImageUrl('http:' + asset?.fields?.file?.url))
  }
  const onDrop = (accepted: any) => {
    console.log(accepted)
    setImageFile(accepted[0])
  }

  const goToCreateUsi = () => {
    setImageStatus(true)
  }

  useEffect(() => {
    getAssets()
  }, [])

  return (
    <div className="selectContainer">
      <div
        className="arrowContainer"
        aria-disabled={imageFile ? false : true}
        role="none"
        onClick={() => (imageUrl ? goToCreateUsi() : '')}
      >
        <ArrowForwardIcon size="large" />
      </div>
      <div className="uploadSection">
        <MagicDropzone
          className="Dropzone"
          accept="image/jpeg, image/png, .jpg, .jpeg, .png"
          onDrop={(e: any) => onDrop(e)}
        >
          <div className="Dropzone-content">
            {imageFile ? (
              // eslint-disable-next-line jsx-a11y/alt-text
              <img src={imageFile?.preview} height={'100%'} width={'100%'} />
            ) : (
              <p>Drop some file</p>
            )}
          </div>
        </MagicDropzone>
        {imageFile ? (
          <div className="buttonContainer">
            <Stack>
              <Button
                variant="negative"
                size="small"
                onClick={() => setImageFile(null)}
              >
                clear
              </Button>
            </Stack>
          </div>
        ) : (
          ' '
        )}
      </div>
      <div className="selectSection">
        {imageAssets ? (
          <div className="selectParentContainer">
            <div style={{ color: '#5b5a5a' }}>select Image :</div>
            <Select
              name="optionSelect"
              id="optionSelect"
              defaultValue=""
              onChange={(e) => getImageUrl(e.target.value)}
            >
              <Select.Option value="" isDisabled>
                select existing image...
              </Select.Option>
              {(imageAssets || []).map((element: any) => {
                return (
                  <Select.Option value={element?.sys?.id} key={Math.random()}>
                    {element?.fields?.title?.['en-US']}
                  </Select.Option>
                )
              })}
            </Select>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
export default SelectImage
