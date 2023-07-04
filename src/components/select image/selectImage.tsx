/* eslint-disable jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState } from 'react'
import MagicDropzone from 'react-magic-dropzone'
import './selectImage.css'
import { Button, Stack, Select, Spinner } from '@contentful/f36-components'
import { element } from 'prop-types'
import cloneDeep from 'clone-deep'

const SelectImage = ({
  setImageUrl,
  setImageStatus,
  imageUrl,
  setSelectedImage,
  selectedImage,
  setImageName,
}: any) => {
  //import
  const contentful = require('contentful-management')
  const assetContentful = require('contentful')

  //state Declaratios
  const [imageFile, setImageFile] = useState<any>()
  const [imageAssets, setImageAssets] = useState<any>()

  const [url, setUrl] = useState({
    url: '',
    contentful: true,
  })

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
  const getImageUrl = async (id: string, status: any) => {
    await assetClient.getAsset(id).then((asset: any) => {
      if (status) {
        setUrl({ url: 'http:' + asset?.fields?.file?.url, contentful: true })
      } else {
        setImageUrl('http:' + asset?.fields?.file?.url)
        setImageStatus(true)
      }
      setImageName(asset?.fields?.title)
    })
  }

  const onDrop = (accepted: any) => {
    setImageFile(accepted[0])
    setUrl({ url: accepted[0], contentful: false })
  }

  const convertBuffer = async (file: any) => {
    const data = await new Promise((resolve, reject) => {
      var reader = new FileReader()
      reader.onload = () => {
        resolve(reader.result)
      }
      reader.onerror = reject
      reader.readAsArrayBuffer(file)
    })
    console.log(data, 'data')
    return data
  }

  const goToCreateUsi = async () => {
    let tempUrl = cloneDeep(url)
    if (tempUrl.contentful) {
      setImageUrl(tempUrl.url)
      setImageStatus(true)
    } else {
      let bufferFile = await convertBuffer(tempUrl.url)
      uploadImage(bufferFile, imageFile)
    }
  }

  const uploadImage = async (bufferData: any, file: any) => {
    setImageAssets('')
    const data = await client
      .getSpace('ov64r3ga08sj')
      .then((space: any) => space.getEnvironment('master'))
      .then((environment: any) =>
        environment.createAssetFromFiles({
          fields: {
            title: {
              'en-US': file?.name,
            },
            description: {
              'en-US': file?.type,
            },
            file: {
              'en-US': {
                contentType: file?.type,
                fileName: file?.name,
                file: bufferData,
              },
            },
          },
        })
      )
      .then((asset: any) => asset.processForAllLocales())
      .then((asset: any) => {
        getImageUrl(asset?.sys?.id, false)
        asset.publish()
      })
      .catch(console.error)
  }

  useEffect(() => {
    getAssets()
  }, [])

  return (
    <div
      className="selectContainer"
      style={{ height: !imageAssets ? '100%' : '' }}
    >
      {imageAssets ? (
        <>
          {/* <div
            className="arrowContainer"
            aria-disabled={imageFile ? false : true}
            role="none"
            onClick={() => goToCreateUsi()}
          >
            <ArrowForwardIcon size="large" />
          </div> */}
          <div className="uploadSection">
            <MagicDropzone
              className="Dropzone"
              accept="image/jpeg, image/png, .jpg, .jpeg, .png"
              onDrop={(e: any) => onDrop(e)}
            >
              <div className="Dropzone-content">
                {imageFile ? (
                  // eslint-disable-next-line jsx-a11y/alt-text
                  <img
                    src={imageFile?.preview}
                    height={'100%'}
                    width={'100%'}
                  />
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
            <div className="selectParentContainer">
              <div style={{ color: '#5b5a5a' }}>Existing Images :</div>
              <Select
                name="optionSelect"
                id="optionSelect"
                // defaultValue=""
                value={selectedImage}
                onChange={(e) => {
                  setSelectedImage(e.target.value)
                  getImageUrl(e.target.value, true)
                }}
              >
                <Select.Option value="" isDisabled>
                  select image...
                </Select.Option>
                {(imageAssets || []).map((element: any) => {
                  // console.log(element, 'Element')
                  return (
                    <Select.Option value={element?.sys?.id} key={Math.random()}>
                      {element?.fields?.title?.['en-US']}
                    </Select.Option>
                  )
                })}
              </Select>
            </div>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Stack>
                <Button
                  variant="primary"
                  testId="ProceedButton"
                  isDisabled={url.url ? false : true}
                  onClick={() => goToCreateUsi()}
                >
                  Proceed
                </Button>
              </Stack>
            </div>
          </div>
        </>
      ) : (
        <Stack>
          <Spinner customSize={50} />
        </Stack>
      )}
    </div>
  )
}
export default SelectImage
