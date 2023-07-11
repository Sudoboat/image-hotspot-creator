/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from 'react'
import './createUsi.css'
import 'react-image-crop/dist/ReactCrop.css'
import CancelIcon from '@mui/icons-material/Cancel'
import CropIcon from '@mui/icons-material/Crop'
import cloneDeep from 'clone-deep'
import { Button, Stack, Menu } from '@contentful/f36-components'
import { Alert, Snackbar, Tooltip } from '@mui/material'

const CreateUsi = ({
  imageUrl,
  sdk,
  imageName,
}: any) => {

  interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
    name: string;
    borderColor: string;
    hotspotX: number;
    hotspotY: number;
  } 

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef< HTMLDivElement >(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [editing, setEditing] = useState<boolean>(false)
  const [rect, setRect] = useState<Rectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    name: 'Boundingbox',
    borderColor: `#ffffff`,
    hotspotX: 0,
    hotspotY: 0,
  })
  const isDrawing = useRef(false)
  const [rectArray, setRectArray] = useState<Rectangle[]>([])
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [listArray, setListArray] = useState<any>([])
  const colorPalateList = [
    '#0058a3',
    '#ffdb00',
    '#cc0008',
    '#ffffff',
    '#f5f5f5',
    '#e9e9e9',
    '#cccccc',
    '#929292',
    '#484848',
    '#111111',
    '#004f2f',
    '#003f72',
    '#e00751',
    '#cc063d',
    '#b80029',
    '#333333',
    '#000000',
    '#004e93',
    '#808080',
    '#098a00',
    '#ffa424',
  ]
  const [nextDraw, setNextDraw] = useState<boolean>(true)
  const [canDraw, setCanDraw] = useState<boolean>(false)
  const [showColorPalate, setShowColorPalate] = useState<boolean>(false)
  const [selectedBoundingBoxIndex, setSelectedBoundingBoxIndex] = useState(null)
  const [draftRect, setDraftRect] = useState<Rectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    name: 'Boundingbox',
    borderColor: `#ffffff`,
    hotspotX: 0,
    hotspotY: 0,
  })
  const [canvasInfo, setCanvas] = useState<HTMLCanvasElement>()
  // const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    sdk.entry.fields.imageUrl.setValue(imageUrl)
    const container:HTMLDivElement|any = containerRef.current
    const canvas:HTMLCanvasElement | any = canvasRef.current
    const context = canvas?.getContext('2d')
    const image:HTMLImageElement|any = imageRef.current
    image.onload = () => {
      const containerWidth = container?.offsetWidth
      const containerHeight = container?.offsetHeight

      const imageWidth = image?.width
      const imageHeight = image?.height

      const widthRatio = containerWidth / imageWidth
      const heightRatio = containerHeight / imageHeight

      const scale = Math.min(widthRatio, heightRatio)

      const scaledWidth = imageWidth * scale
      const scaledHeight = imageHeight * scale

      canvas.width = scaledWidth
      canvas.height = scaledHeight
      context.drawImage(image, 0, 0, scaledWidth, scaledHeight)
      setCanvas(canvas)

      if (sdk.entry.fields.hotspots.getValue()?.hotspots) {
        setRectArray(sdk.entry.fields.hotspots.getValue().hotspots)
        setListArray(sdk.entry.fields.hotspots.getValue().hotspots)
      } else {
        sdk.entry.fields.hotspots.setValue({
          hotspots: [],
        })
        setRectArray(sdk.entry.fields.hotspots.getValue().hotspots)
        setListArray(sdk.entry.fields.hotspots.getValue().hotspots)
      }
    }
  }, [])

  const handleMouseDown = (event: any) => {
    if (canDraw) {
      if (!nextDraw) return
      const { offsetX, offsetY } = event.nativeEvent
      setDraftRect({
        x: offsetX,
        y: offsetY,
        width: 0,
        height: 0,
        name: 'Boundingbox',
        borderColor: `#ffffff`,
        hotspotX: 0,
        hotspotY: 0,
      })
      isDrawing.current = true
      setShowDetail(false)
      let tempRectArr = cloneDeep(rectArray)
      tempRectArr.unshift({
        x: offsetX,
        y: offsetY,
        width: 0,
        height: 0,
        name: 'Boundingbox',
        borderColor: `#ffffff`,
      })
      setRectArray(tempRectArr)
    }
  }

  const handleMouseMove = (event: any) => {
    if (canDraw) {
      if (!isDrawing.current) return
      const { offsetX, offsetY } = event.nativeEvent
      let temporaryBoundingBox: any = cloneDeep(draftRect)

      const width = offsetX - temporaryBoundingBox.x

      const height = offsetY - temporaryBoundingBox.y

      temporaryBoundingBox.width = width

      temporaryBoundingBox.height = height

      temporaryBoundingBox.hotspotX =
        temporaryBoundingBox.x + temporaryBoundingBox.width / 2

      temporaryBoundingBox.hotspotY =
        temporaryBoundingBox.y + temporaryBoundingBox.height / 2

      temporaryBoundingBox.name = 'Boundingbox'
      temporaryBoundingBox.x = (temporaryBoundingBox.x / canvasInfo.width) * 100
      temporaryBoundingBox.y =
        (temporaryBoundingBox.y / canvasInfo.height) * 100
      temporaryBoundingBox.width =
        (temporaryBoundingBox.width / canvasInfo.width) * 100
      temporaryBoundingBox.height =
        (temporaryBoundingBox.height / canvasInfo.height) * 100
      temporaryBoundingBox.hotspotX =
        (temporaryBoundingBox.hotspotX / canvasInfo.width) * 100
      temporaryBoundingBox.hotspotY =
        (temporaryBoundingBox.hotspotY / canvasInfo.height) * 100

      let tempRectArr = cloneDeep(rectArray)
      if (tempRectArr.length === 0) {
        tempRectArr.push(temporaryBoundingBox)
        setRectArray(tempRectArr)
      } else {
        tempRectArr[0] = temporaryBoundingBox
        setRectArray(tempRectArr)
      }
      setRect(temporaryBoundingBox)
    }
  }

  const handleMouseUp = () => {

    if (!canDraw) return
    let tempRect = cloneDeep(rect)
    if (tempRect.width === 0) {
      let BoundingArray = cloneDeep(rectArray)
      BoundingArray.shift()
      setRectArray(BoundingArray)
    } else {
      setShowDetail(true)

      setNextDraw(false)
    }
    isDrawing.current = false
  }

  const changeRectDetail = (value: any, key:any) => {
    if (key !== 'borderColor' && key !== 'name') {
      value = parseFloat(value)
    }
    let tempRect = JSON.parse(JSON.stringify(rect))
    tempRect[key] = value
    if(["x", "y", "width", "height"].includes(key)) {

      tempRect["hotspotY"] = tempRect.y + (tempRect.height/2)
      tempRect["hotspotX"] =tempRect.x + (tempRect.width/2)
    }
    setRect(tempRect)
  }

  const saveBoundingBox = () => {
    setListArray(rectArray)
    setCanDraw(false)
    setShowDetail(false)
    setNextDraw(true)
    setSelectedBoundingBoxIndex(null)
    setRect({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      name: 'Boundingbox',
      borderColor: `#ffffff`,
    })
    sdk.entry.fields.imageUrl.setValue(imageUrl)
    sdk.entry.fields.hotspots.setValue({ hotspots: rectArray })
    setEditing(false)
  }

  const deleteBoundingBox = (index: number, e: any) => {
    e.stopPropagation()
    let tempArr = cloneDeep(rectArray)
    tempArr.splice(index, 1)
    setSelectedBoundingBoxIndex(null)
    setShowDetail(false)
    setEditing(false)
    setRectArray(tempArr)
    setListArray(tempArr)
    sdk.entry.fields.imageUrl.setValue(imageUrl)
    sdk.entry.fields.hotspots.setValue({ hotspots: tempArr })
  }

  const cancelBoundingBox = () => {

    setRectArray(listArray)
    setShowDetail(false)
    setNextDraw(true)
    setCanDraw(false)
    setEditing(false)
    setSelectedBoundingBoxIndex(null)
  }

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height)
      if (rectArray.length > 0) {
        rectArray.forEach((element: any) => {
          context.strokeStyle = element.borderColor
          context.lineWidth = 1.5
          context.strokeRect(
            (element.x * canvasInfo.width) / 100,
            (element.y * canvasInfo.height) / 100,
            (element.width * canvasInfo.width) / 100,
            (element.height * canvasInfo.height) / 100
          )
          if (element.width !== 0 && element.height !== 0) {
            context.beginPath()
            context.arc(
              (element.hotspotX * canvas.width) / 100,
              (element.hotspotY * canvas.height) / 100,
              10,
              0,
              2 * Math.PI
            )
            context.fillStyle = 'white'
            context.fill()

            context.beginPath()
            context.arc(
              (element.hotspotX * canvas.width) / 100,
              (element.hotspotY * canvas.height) / 100,
              8,
              0,
              2 * Math.PI
            )
            context.fillStyle = 'rgb(3,111,227)'
            context.fill()
          }
        })
      }
    }
  }, [rectArray])

  useEffect(() => {
    let tempArray: any = cloneDeep(rectArray)
    let index: any = cloneDeep(selectedBoundingBoxIndex)
    if (index !== null && index > -1) {
      tempArray[index] = rect
      setRectArray(tempArray)
    } else {
      if (!rect.width) return
      tempArray[0] = rect
      setRectArray(tempArray)
    }
  }, [rect])

  useEffect(() => {
    if (selectedBoundingBoxIndex !== null) {
      let tempArr = cloneDeep(listArray)
      setRectArray(listArray)
      let selectedRect = tempArr[selectedBoundingBoxIndex]
      setRect(selectedRect)
      setShowDetail(true)
    }
  }, [selectedBoundingBoxIndex])

  // const handleClick = () => {
  //   setOpen(true)
  // }

  // const handleClose = () => {
  //   setOpen(false)
  // }

  return (
    <div className="createContainer">
      <div className="hotspotlist_container">
        <div className="hotspotlist_title">Existing Hotspots</div>

        {listArray.length > 0
          ? listArray.map((rect: any, index: any) => {
              return (
                <div className="hotspot_card" key={index}>
                  <div
                    className="cancel_icon"
                    onClick={(e) => deleteBoundingBox(index, e)}
                    role="none"
                  >
                    <CancelIcon fontSize="small" />
                  </div>
                  <div
                    className="hotspot_title_container"
                    onClick={() => {
                      setSelectedBoundingBoxIndex(index)
                      setEditing(true)
                    }}
                    role="none"
                    style={
                      selectedBoundingBoxIndex === index
                        ? {
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            border: '1px solid rgb(3,111,227)',
                          }
                        : {}
                    }
                  >
                    <div
                      className="hotspot_image_logo"
                      style={{
                        background: rect.borderColor,
                      }}
                    ></div>
                    <div className="hotpot_title">
                      {rect?.name ? rect?.name : 'bounding box'}
                    </div>
                  </div>
                </div>
              )
            })
          : ''}
      </div>
      <div className="image_container">
        <div className="image_title_container">
          <div className="image_title">
            {imageName ? imageName : 'Image Editor'}
          </div>
          <div className="add_hotspot_button">
            {editing || canDraw ? (
              <div
                className="add_icon"
                style={{ opacity: 0.5, cursor: 'auto' }}
                role="none"
              >
                <CropIcon color="primary" />
              </div>
            ) : (
              <div
                className="add_icon"
                style={
                  !canDraw ? { opacity: 1 } : { opacity: 0.5, cursor: 'auto' }
                }
                onClick={() => {
                  // handleClick()
                  setCanDraw(!canDraw)
                }}
                role="none"
              >
                <Tooltip title="Select Area" placement="left">
                  <CropIcon color="primary" />
                </Tooltip>
              </div>
            )}
          </div>
        </div>

        {/* <Snackbar
          open={canDraw}
          autoHideDuration={1000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert severity="info" sx={{ width: '70%' }}>
            Draw a Rectangle over the Image to Create Hotspots!
          </Alert>
        </Snackbar> */}
        <div
          id="image_container"
          className="editable_image_container"
          ref={containerRef}
        >
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{ position: 'absolute' }}
            id="usiCanvas"
          />
          <img
            id="uploaded_image"
            ref={imageRef}
            src={imageUrl}
            alt=""
            style={{ width: '100%', height: '100%', display: 'none' }}
          />
        </div>
      </div>
      <div className="hotspot_details_container">
        {showDetail ? (
          <>
            <div className="boundingBoxDetailContainer">
              <div className="boundingBox">
                <div> Box Name</div>
                <input
                  type="text"
                  value={rect?.name}
                  onChange={(e) => changeRectDetail(e.target.value, 'name')}
                />
              </div>
              <div className="boundingBox">
                <div> Box Top</div>
                <input
                  type="number"
                  min={1}
                  max={100-rect?.height}
                  value={rect?.y.toFixed(2)}
                  onChange={(e) => changeRectDetail(e.target.value, 'y')}
                />
              </div>
              <div className="boundingBox">
                <div> Box Left</div>
                <input
                  type="number"
                  min={1}
                  max={100-rect?.width}
                  value={rect?.x.toFixed(2)}
                  onChange={(e) => changeRectDetail(e.target.value, 'x')}
                />
              </div>
              <div className="boundingBox">
                <div> Box Height</div>
                <input
                  type="number"
                  min={1}
                  max={100 - rect?.y}
                  value={rect?.height.toFixed(2)}
                  onChange={(e) => changeRectDetail(e.target.value, 'height')}
                />
              </div>
              <div className="boundingBox">
                <div>Box Width</div>
                <input
                  type="number"
                  min={1}
                  max={100 - rect?.x}
                  value={rect?.width.toFixed(2)}
                  onChange={(e) => changeRectDetail(e.target.value, 'width')}
                />
              </div>
              <div className="boundingBox">
                <div>Border Color</div>
                <Menu
                  isOpen={showColorPalate}
                  onClose={() => setShowColorPalate(false)}
                >
                  <Menu.Trigger>
                    <div
                      style={{
                        background: `${rect?.borderColor}`,
                        width: '20px',
                        height: '20px',
                        border: '1px solid gray',
                      }}
                      onClick={() => setShowColorPalate(!showColorPalate)}
                      role="none"
                    ></div>
                  </Menu.Trigger>
                  <Menu.List
                    style={{
                      display: 'flex',
                      width: '190px',
                      flexWrap: 'wrap',
                      height: '150px',
                      gap: '10px',
                      padding: '10px',
                    }}
                  >
                    {colorPalateList.map((element, index) => {
                      return (
                        <div
                          key={index}
                          style={{
                            width: '20px',
                            height: '20px',
                            background: `${element}`,
                          }}
                          onClick={() => {
                            setRect({ ...rect, 'borderColor': element })
                            setShowColorPalate(false)
                          }}
                          role="none"
                        ></div>
                      )
                    })}
                  </Menu.List>
                </Menu>
              </div>
              <div className="boundingBox">
                <div>Hotspot Top</div>
                <input
                  type="number"
                  min={rect?.y}
                  max={rect?.y + rect?.height}
                  value={rect?.hotspotY.toFixed(2)}
                  onChange={(e) => changeRectDetail(e.target.value, 'hotspotY')}
                />
              </div>
              <div className="boundingBox">
                <div> Hotspot Left</div>
                <input
                  type="number"
                  min={Math.floor(rect?.x)}
                  max={Math.floor(rect?.x + rect?.width)}
                  value={rect?.hotspotX.toFixed(2)}
                  onChange={(e) => changeRectDetail(e.target.value, 'hotspotX')}
                />
              </div>
              <div className="buttonSection">
                <Stack>
                  <Button
                    variant="positive"
                    size="small"
                    isDisabled={rect?.name ? false : true}
                    onClick={() => saveBoundingBox()}
                  >
                    Save
                  </Button>
                  <Button onClick={() => cancelBoundingBox()} size="small">
                    Cancel
                  </Button>
                </Stack>
              </div>
            </div>
          </>
        ) : (
          <div className="userText">
            {' '}
            Click the crop icon and draw a rectangle in image. <br /> or <br />{' '}
            Select an Existing hotspot.
          </div>
        )}
      </div>
    </div>
  )
}
export default CreateUsi
