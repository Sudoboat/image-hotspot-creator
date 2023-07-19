/* eslint-disable jsx-a11y/role-supports-aria-props */
import { useState } from 'react'
import MagicDropzone from 'react-magic-dropzone'
import './selectImage.css'
import { Button, Select } from '@contentful/f36-components'
import cloneDeep from 'clone-deep'
import { Stack } from '@mui/material'
import { Spinner } from '@contentful/forma-36-react-components'
const contentful = require('contentful-management')


const SelectImage = ({
  setImageUrl,
  setImageStatus,
  imageName,
  sdk,
  setSelectedImage,
  selectedImage,
  setImageName,
  imageAssets,
  url,
  setUrl,
  setImageAssets,
}: any) => {

  //state Declaratios
  const [imageFile, setImageFile] = useState<any>()
  const client = contentful.createClient({
    accessToken: sdk.parameters.instance.accessToken,
  })

  //getting the url of the image
  const getImageUrl = async (id: string, status: any) => {

    await sdk.space.getAsset(id).then((asset: any) => {
      if (status) {
        setUrl({ url: 'http:' + asset?.fields?.file["en-US"]?.url, contentful: true })
      } else {
        setImageUrl('http:' + asset?.fields?.file["en-US"]?.url)
        setImageStatus(true)
      }
      setImageName(asset?.fields?.title["en-US"])
    })
  }

// console.log(,"token")
  //function for on dropping the image 
  const onDrop = (accepted: any) => {
    setImageFile(accepted[0])
    setUrl({ url: accepted[0], contentful: false })
  }

  //converting image to buffer file for uploading in contentful 
  const convertBuffer = async (file: any) => {
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

  //navigating to the create page by setting value to a state
  const goToCreateUsi = async () => {
    let tempUrl = cloneDeep(url)
    if (tempUrl.contentful) {
      sdk.entry.fields.title.setValue(imageName)
      setImageUrl(tempUrl.url)
      setImageStatus(true)
    } else {
      sdk.entry.fields.title.setValue(url?.url?.name)
      let bufferFile = await convertBuffer(tempUrl.url)
      uploadImage(bufferFile, imageFile)
    }
  }

  //

  //Uploading a new image to contentful assets
  const uploadImage = async (bufferData: any, file: any) => {
    
    setImageAssets('')
    await client.getSpace(sdk.ids.space)
      .then((space: any) => space.getEnvironment(sdk.ids.environment))
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

 

  
  return (
    <div
      className="selectContainer"
      style={{ height: !imageAssets ? '100%' : '' }}
    >
      {imageAssets ? (
        <>
          {!selectedImage && <div className="uploadSection">
            <MagicDropzone
              className="Dropzone"
              accept="image/jpeg, image/png, .jpg, .jpeg, .png"
              onDrop={(e: any) => onDrop(e)}
            >
              <div className="Dropzone-content">
                {imageFile ? (
                  <img
                    src={imageFile?.preview}
                    height={'100%'}
                    width={'100%'}
                    alt="Preview_image"
                  />
                ) : (
                  <p>Upload Image</p>
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
          </div>}
          <div className="selectSection">
            <div className="selectParentContainer">
              <div style={{ color: '#5b5a5a' }}>Existing Images :</div>
              <Select
                name="optionSelect"
                id="optionSelect"
                value={selectedImage}
                testId="AutoComplte"
                isDisabled={imageFile}
                onChange={(e) => {
                  setSelectedImage(e.target.value)
                  getImageUrl(e.target.value, true)
                }}
              >
                <Select.Option value="" isDisabled>
                  select image...
                </Select.Option>
                {(imageAssets || []).map((element: any) => {
                  return (
                    <Select.Option
                      value={element?.sys?.id}
                      testId="selectOption"
                      key={Math.random()}
                    >
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
                justifyContent: 'center',
              }}
            >
              <div style={{display:"flex",gap:"10px"}}>
              {selectedImage && <Button
                  variant="negative"
                  testId="ProceedButton"
                  onClick={() => setSelectedImage('')}
                >
                  Clear
                </Button>}
                <Button
                  variant="primary"
                  testId="ProceedButton"
                  isDisabled={url.url ? false : true}
                  onClick={() => goToCreateUsi()}
                >
                  Proceed
                </Button>
              </div>
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
