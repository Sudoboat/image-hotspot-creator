/* eslint-disable jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState } from 'react'
import MagicDropzone from 'react-magic-dropzone'
import './selectImage.css'
import {
  Button,
  Stack,
  Select,
  FormControl,
  Spinner,
} from '@contentful/f36-components'
import { ArrowForwardIcon } from '@contentful/f36-icons'
import { element } from 'prop-types'
import cloneDeep from 'clone-deep'

const SelectImage = ({ setImageUrl, setImageStatus, imageUrl }) => {
  //import
  const contentful = require('contentful-management')
  const assetContentful = require('contentful')

  //state Declaratios
  const [imageFile, setImageFile] = useState()
  const [imageAssets, setImageAssets] = useState()
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
  const getImageUrl = async (id: string, status) => {
    const asset = await assetClient.getAsset(id).then((asset) => {
      if (status) {
        setUrl({ url: 'http:' + asset?.fields?.file?.url, contentful: true })
      } else {
        setImageUrl('http:' + asset?.fields?.file?.url)
        setImageStatus(true)
      }
    })
  }

  const onDrop = (accepted: any) => {
    console.log(accepted[0])
    setImageFile(accepted[0])
    setUrl({ url: accepted[0], contentful: false })
  }
  useEffect(() => {
    console.log(url, 'url')
  }, [url])
  const convertBuffer = async (file) => {
    const data = await new Promise((resolve, reject) => {
      var reader = new FileReader()
      reader.onload = () => {
        resolve(reader.result)
      }
      reader.onerror = reject
      reader.readAsArrayBuffer(file)
    })
    return data
  }
  const goToCreateUsi = async () => {
    // setImageStatus(true)
    console.log('im called')
    let tempUrl = cloneDeep(url)
    if (tempUrl.contentful) {
      setImageUrl(tempUrl.url)
      setImageStatus(true)
    } else {
      let bufferFile = await convertBuffer(tempUrl.url)
      console.log(bufferFile, 'buffer')
      uploadImage(bufferFile, imageFile)
    }
  }

  const uploadImage = async (bufferData, file) => {
    setImageAssets('')
    const data = await client
      .getSpace('ov64r3ga08sj')
      .then((space) => space.getEnvironment('master'))
      .then((environment) =>
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
      .then((asset) => asset.processForAllLocales())
      .then((asset) => {
        console.log(asset?.sys?.id, 'asset')
        getImageUrl(asset?.sys?.id)
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
                defaultValue=""
                onChange={(e) => getImageUrl(e.target.value, true)}
              >
                <Select.Option value="" isDisabled>
                  select image...
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
