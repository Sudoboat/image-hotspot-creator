/* eslint-disable jsx-a11y/role-supports-aria-props */
import { useState } from 'react'
import MagicDropzone from 'react-magic-dropzone'
import './selectImage.css'
import { Button, Select } from '@contentful/f36-components'
import cloneDeep from 'clone-deep'
import { Stack } from '@mui/material'
import { Spinner } from '@contentful/forma-36-react-components'
import { createClient } from 'contentful-management'



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

  // const newAsset = async (bufferData:any, file:any) => {
    
  //   console.log(bufferData,"data")
    
  // };

  // async function createAssetWithContentfulSDK(blobFile:any) {
  //   try {
  //     // Convert the Blob into a base64 string using FileReader.
  //     const base64String = await new Promise((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(blobFile);
  //       reader.onloadend = () => resolve(reader.result.split(',')[1]);
  //       reader.onerror = (error) => reject(error);
  //     });
  
  //     // Make sure the Contentful SDK is properly initialized and authenticated.
  //     // For example: const sdk = contentful.createClient({ ... });
  
  //     // Create the asset using the Contentful SDK.
  //     const newAsset = await sdk.space.createAsset({
  //       fields: {
  //         title: {
  //           'en-US': blobFile?.name,
  //         },
  //         description: {
  //           'en-US': blobFile?.type,
  //         },
  //         file: {
  //           'en-US': {
  //             contentType: blobFile?.type,
  //             fileName: blobFile?.name,
  //             file: `data:${blobFile?.type};base64,${base64String}`,
  //           },
  //         },
  //       },
  //     });
  
  //     // Save the created asset.
  //     const savedAsset = await newAsset.processForAllLocales().then((asset) => asset.publish());
  
  //     // If you want to use the asset ID or other properties, you can access them from 'savedAsset'.
  //     console.log('Asset created and published successfully:', savedAsset);
  
  //     return savedAsset;
  //   } catch (error) {
  //     console.error('Error creating asset:', error);
  //     throw error;
  //   }
  // }

  //Uploading a new image to contentful assets
 
  const uploadImage = async (bufferData: any, file: any) => {
    // newAsset(bufferData,file);
    const cma = createClient(
      { apiAdapter: sdk.cmaAdapter },
    )
    
    const space = await cma.getSpace(sdk.ids.space)
    
    setImageAssets('')
    await space.getEnvironment(sdk.ids.environment)
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
