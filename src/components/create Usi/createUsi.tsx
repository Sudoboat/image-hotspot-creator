/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import './createUsi.css'
import 'react-image-crop/dist/ReactCrop.css'
import usiImage from '../../assets/usi-image/ikeausi.avif'
import crop from '../../assets/crop-image/crop.png'
import ColorPicker from 'react-pick-color'
import cloneDeep from 'clone-deep'
import {
  Button,
  Stack,
  Select,
  FormControl,
  Menu,
} from '@contentful/f36-components'
import { element } from 'prop-types'

const CreateUsi = ({ setImageUrl, imageUrl, sdk }) => {
  interface boundingBoxDetail {
    top: number
    left: number
    width: number
    height: number
    name: string
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const canvasRef = useRef<any>(null)
  const imageRef = useRef<any>(null)
  const [rect, setRect] = useState<any>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    name: '',
    borderColor: `#FF0000`,
    hotspotX: 0,
    hotspotY: 0,
  })
  const isDrawing = useRef(false)
  const [rectArray, setRectArray] = useState([])
  const [showDetail, setShowDetail] = useState(false)
  const [listArray, setListArray] = useState([])
  const [colorPalateList, setColor] = useState([
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
  ])

  const [nextDraw, setNextDraw] = useState(true)
  const [canDraw, setCanDraw] = useState(false)
  const [showColorPalate, setShowColorPalate] = useState(false)
  const [selectedBoundingBoxIndex, setSelectedBoundingBoxIndex] = useState(null)
  const [draftRect, setDraftRect] = useState<any>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    name: '',
    borderColor: `#FF0000`,
    hotspotX: 0,
    hotspotY: 0,
  })
  useEffect(() => {
    console.log(sdk, 'sdk')
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const image = imageRef.current
    // console.log(imageRef, 'image--->')

    image.onload = () => {
      const parent = canvas.parentElement
      const { width, height } = parent.getBoundingClientRect()

      canvas.width = width
      canvas.height = height
      context.drawImage(image, 0, 0, width, height)
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
        name: '',
        borderColor: `#FF0000`,
        hotspotX: 0,
        hotspotY: 0,
      })
      isDrawing.current = true
      setShowDetail(false)
      let tempRectArr = cloneDeep(rectArray)
      tempRectArr.push({
        x: offsetX,
        y: offsetY,
        width: 0,
        height: 0,
        name: '',
        borderColor: `#FF0000`,
      })
      setRectArray(tempRectArr)
    }
  }

  const handleMouseMove = (event: any) => {
    if (canDraw) {
      if (!isDrawing.current) return

      const { offsetX, offsetY } = event.nativeEvent
      let temporaryBoundingBox = cloneDeep(draftRect)
      const width = offsetX - temporaryBoundingBox.x
      const height = offsetY - temporaryBoundingBox.y
      temporaryBoundingBox.width = width
      temporaryBoundingBox.height = height
      temporaryBoundingBox.hotspotX =
        temporaryBoundingBox.x + temporaryBoundingBox.width / 2
      temporaryBoundingBox.hotspotY =
        temporaryBoundingBox.y + temporaryBoundingBox.height / 2
      let tempRectArr = cloneDeep(rectArray)
      if (tempRectArr.length == 0) {
        tempRectArr.push(temporaryBoundingBox)
        setRectArray(tempRectArr)
      } else {
        tempRectArr[tempRectArr.length - 1] = temporaryBoundingBox
        setRectArray(tempRectArr)
      }
      setRect(temporaryBoundingBox)
      // drawRectangle()
    }
  }

  const handleMouseUp = () => {
    if (!canDraw) return
    console.log('handle mouse up calling')
    setShowDetail(true)
    isDrawing.current = false
    let temprectArr = cloneDeep(rectArray)
    if (temprectArr.length == 1) {
      let currentRect = cloneDeep(rect)
      temprectArr.push(currentRect)
    }
    setNextDraw(false)
    // setCanDraw(false)
  }

  // const drawRectangle = () => {
  //   const canvas = canvasRef.current
  //   const context = canvas.getContext('2d')

  //   context.clearRect(0, 0, canvas.width, canvas.height)
  //   context.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height)
  //   if (rectArray.length > 0) {
  //     rectArray.forEach((rect) => {
  //       context.strokeStyle = rect.borderColor
  //       context.lineWidth = 1.5
  //       context.strokeRect(rect.x, rect.y, rect.width, rect.height)
  //       context.beginPath()
  //       context.arc(rect.hotspotX, rect.hotspotY, 10, 0, 2 * Math.PI)
  //       context.fillStyle = 'grey'
  //       context.fill()

  //       context.beginPath()
  //       context.arc(rect.hotspotX, rect.hotspotY, 5, 0, 2 * Math.PI)
  //       context.fillStyle = 'white'
  //       context.fill()
  //     })
  //   }
  //   let temporaryBoundingBox = cloneDeep(rect)
  //   context.strokeStyle = temporaryBoundingBox.borderColor
  //   context.lineWidth = 2
  //   context.strokeRect(
  //     temporaryBoundingBox.x,
  //     temporaryBoundingBox.y,
  //     temporaryBoundingBox.width,
  //     temporaryBoundingBox.height
  //   )
  // }

  const drawCommonRectangle = (tempArray: any) => {
    // console.log(tempArray, 'changing')
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height)
    // let temporaryBoundingBox = cloneDeep(rect)
    tempArray.forEach((element: any) => {
      context.strokeStyle = element.borderColor
      context.lineWidth = 1.5
      context.strokeRect(element.x, element.y, element.width, element.height)
      context.beginPath()
      context.arc(element.hotspotX, element.hotspotY, 10, 0, 2 * Math.PI)
      context.fillStyle = 'grey'
      context.fill()

      context.beginPath()
      context.arc(element.hotspotX, element.hotspotY, 5, 0, 2 * Math.PI)
      context.fillStyle = 'white'
      context.fill()
    })
  }

  const changeRectDetail = (value: any, key) => {
    console.log(key, value, 'ddd', key != 'borderColor')
    if (key != 'borderColor' && key != 'name') {
      value = parseFloat(value)
    }
    // const canvas = canvasRef.current
    // const context = canvas.getContext('2d')
    // setRect({ ...rect, [key]: value })

    let tempRect = JSON.parse(JSON.stringify(rect))
    tempRect[key] = value
    setRect(tempRect)
  }
  const saveBoundingBox = () => {
    setListArray(rectArray)
    setShowDetail(false)
    setNextDraw(true)
    setSelectedBoundingBoxIndex(null)
    sdk.entry.fields.hotspots.setValue({ image: imageUrl, hotspots: rectArray })
  }

  const drawCanvasImage = (canvasDetail, id) => {
    console.log(canvasDetail, document.getElementById(id), 'draw')
    const canvas = document.getElementById(id)
    const context = canvas.getContext('2d')
    const image = imageRef.current
    const parent = canvas.parentElement
    console.log(canvas.parentElement, 'parent')
    const { width, height } = parent.getBoundingClientRect()
    canvas.width = width
    canvas.height = height
    console.table(rect)
    context.drawImage(image, 180, 180, 100, 100, 0, 0, 200, 200)
  }

  const deleteBoundingBox = (index: any, e: any) => {
    e.stopPropagation()
    // console.log(showDetail, 'sssshow')
    let tempArr = cloneDeep(rectArray)
    console.log('delete calling', tempArr)
    tempArr.splice(index, 1)
    console.log(tempArr, 'after delete')
    setSelectedBoundingBoxIndex(null)
    setRectArray(tempArr)
    setListArray(tempArr)
    sdk.entry.fields.hotspots.setValue({ image: imageUrl, hotspots: tempArr })
  }

  const cancelBoundingBox = () => {
    let tempArr = cloneDeep(rectArray)
    tempArr.pop()
    // console.log(tempArr, 'temp')
    drawCommonRectangle(tempArr)
    setRectArray(tempArr)
    setShowDetail(false)
    setNextDraw(true)
    setSelectedBoundingBoxIndex(null)
    sdk.entry.fields.hotspots.setValue({ image: imageUrl, hotspots: tempArr })
  }
  useEffect(() => {
    // drawCommonRectangle(rectArray)
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height)
    // let temporaryBoundingBox = cloneDeep(rect)
    if (rectArray.length > 0) {
      rectArray.forEach((element: any) => {
        context.strokeStyle = element.borderColor
        context.lineWidth = 1.5
        context.strokeRect(element.x, element.y, element.width, element.height)
        if (element.white != 0 && element.height != 0) {
          context.beginPath()
          context.arc(element.hotspotX, element.hotspotY, 10, 0, 2 * Math.PI)
          context.fillStyle = 'grey'
          context.fill()

          context.beginPath()
          context.arc(element.hotspotX, element.hotspotY, 5, 0, 2 * Math.PI)
          context.fillStyle = 'white'
          context.fill()
        }
      })
    }
  }, [rectArray])
  useEffect(() => {
    console.log('rect worko')
    let tempArray = cloneDeep(rectArray)
    let index = cloneDeep(selectedBoundingBoxIndex)
    console.log(index, 'ind')
    if (index != null && index > -1) {
      console.log('selected', rect, index)
      tempArray[index] = rect

      console.log(tempArray, 'selected tempArray')
      console.log('selected temprect', rect, tempArray.length)
      // drawCommonRectangle(tempArray)
      setRectArray(tempArray)
    } else {
      console.log('unselected')
      tempArray[tempArray.length - 1] = rect

      console.log(tempArray, 'tempArray')
      console.log('temprect', rect, tempArray.length)
      // drawCommonRectangle(tempArray)
      setRectArray(tempArray)
    }
  }, [rect])

  useEffect(() => {
    // console.log(index)
    if (selectedBoundingBoxIndex != null) {
      let tempArr = cloneDeep(rectArray)
      let selectedRect = tempArr[selectedBoundingBoxIndex]
      setRect(selectedRect)
      setShowDetail(true)
      console.log(selectedBoundingBoxIndex, 'selc ind')
    }
  }, [selectedBoundingBoxIndex])

  useEffect(() => {
    console.log(showDetail, 'show')
  }, [showDetail])
  // const editBoundingBox = (index: any) => {
  //   console.log(index)
  //   let tempArr = cloneDeep(rectArray)
  //   let selectedRect = tempArr[index]
  //   setRect(selectedRect)
  //   setShowDetail(true)
  // }

  useEffect(() => {
    console.log(imageUrl, 'image url')
  }, [imageUrl])
  return (
    <div className="createContainer">
      <div className="imageSection">
        <div style={{ marginBottom: '10px' }}>
          <Stack>
            <Button
              isActive={canDraw}
              onClick={() => setCanDraw(!canDraw)}
              className="cropButton"
            >
              <img width={'25px'} src={crop} alt="" />
            </Button>
          </Stack>
        </div>
        <div id="imageContainer" className="imageContainer">
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              style={{ position: 'absolute', top: 0, left: 0 }}
              id="usiCanvas"
            />
            <img
              ref={imageRef}
              src={imageUrl}
              alt=""
              style={{ width: '100%', display: 'none' }}
            />
          </div>
        </div>
        <div className="imageDetailMainContainer">
          {showDetail && (
            <>
              <div className="imageDetailContainer">
                <div className="boundingBoxDetailContainer">
                  <div className="boundingBox">
                    <div> Box Top:</div>
                    <input
                      type="number"
                      value={rect?.y}
                      onChange={(e) => changeRectDetail(e.target.value, 'y')}
                    />
                  </div>
                  <div className="boundingBox">
                    <div> Box Left:</div>
                    <input
                      type="number"
                      value={rect?.x}
                      onChange={(e) => changeRectDetail(e.target.value, 'x')}
                    />
                  </div>
                  <div className="boundingBox">
                    <div> Box Height:</div>
                    <input
                      type="number"
                      value={rect?.height}
                      onChange={(e) =>
                        changeRectDetail(e.target.value, 'height')
                      }
                    />
                  </div>
                  <div className="boundingBox">
                    <div>Box Width:</div>
                    <input
                      type="number"
                      value={rect?.width}
                      onChange={(e) =>
                        changeRectDetail(e.target.value, 'width')
                      }
                    />
                  </div>
                  <div className="boundingBox">
                    <div> Box Name:</div>
                    <input
                      type="text"
                      value={rect?.name}
                      onChange={(e) => changeRectDetail(e.target.value, 'name')}
                    />
                  </div>
                  <div className="boundingBox">
                    <div>Border Color:</div>
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
                                setRect({ ...rect, ['borderColor']: element })
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
                    <div>Hotspot Top:</div>
                    <input
                      type="number"
                      value={rect?.hotspotY}
                      onChange={(e) =>
                        changeRectDetail(e.target.value, 'hotspotY')
                      }
                    />
                  </div>
                  <div className="boundingBox">
                    <div> Hotspot Left:</div>
                    <input
                      type="number"
                      value={rect?.hotspotX}
                      onChange={(e) =>
                        changeRectDetail(e.target.value, 'hotspotX')
                      }
                    />
                  </div>
                  <div className="buttonSection">
                    <Stack>
                      <Button
                        variant="primary"
                        size="small"
                        isDisabled={rect?.name ? false : true}
                        onClick={() => saveBoundingBox()}
                      >
                        save
                      </Button>
                      <Button
                        onClick={() => cancelBoundingBox()}
                        variant="negative"
                        size="small"
                      >
                        cancel
                      </Button>
                    </Stack>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="hotspotSection">
        {listArray.length > 0
          ? listArray.map((rect, index) => {
              // let elem = drawCanvasImage(rect, `myCanvas-${index}`)
              // console.log(elem, 'elem')
              return (
                <div
                  key={index}
                  className="boundingBoxList"
                  onClick={() => setSelectedBoundingBoxIndex(index)}
                  role="none"
                >
                  <div className="listDetail">
                    <div style={{ width: '50px', color: 'black' }}>
                      {index + 1}
                    </div>
                    <div
                      style={{
                        width: '30px',
                        height: '30px',
                        background: rect.borderColor,
                        border: '1px solid gray',
                      }}
                    ></div>
                    <div
                      style={{
                        width: '250px',
                        color: 'black',
                        fontFamily: 'sans-serif',
                      }}
                    >
                      {rect?.name ? rect?.name : 'bounding box'}
                    </div>
                  </div>
                  <div>
                    <Stack>
                      <Button
                        onClick={(e) => deleteBoundingBox(index, e)}
                        variant="negative"
                        size="small"
                      >
                        Delete
                      </Button>
                    </Stack>
                  </div>
                </div>
              )
            })
          : ''}
      </div>
    </div>
  )
}
export default CreateUsi
