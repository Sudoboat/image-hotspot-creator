/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { boxesIntersect, useSelectionContainer } from 'react-drag-to-select'
import './createUsi.css'
import 'react-image-crop/dist/ReactCrop.css'
import usiImage from '../../assets/usi-image/ikeausi.avif'
import cloneDeep from 'clone-deep'

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from 'react-image-crop'
import { element, number } from 'prop-types'

const CreateUsi = ({ setImageUrl, imageUrl }) => {
  interface boundingBoxDetail {
    top: number
    left: number
    width: number
    height: number
    name: string
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const canvasRef = useRef(null)
  const imageRef = useRef(null)
  const rect = useRef({ x: 0, y: 0, width: 0, height: 0 })
  const isDrawing = useRef(false)
  const [rectArray, setRectArray] = useState([])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const image = imageRef.current

    image.onload = () => {
      const parent = canvas.parentElement
      const { width, height } = parent.getBoundingClientRect()

      canvas.width = width
      canvas.height = height
      context.drawImage(image, 0, 0, width, height)
    }
  }, [])

  const handleMouseDown = (event) => {
    const { offsetX, offsetY } = event.nativeEvent
    rect.current.x = offsetX
    rect.current.y = offsetY
    isDrawing.current = true
  }

  const handleMouseMove = (event) => {
    if (!isDrawing.current) return

    const { offsetX, offsetY } = event.nativeEvent
    const width = offsetX - rect.current.x
    const height = offsetY - rect.current.y
    rect.current.width = width
    rect.current.height = height

    drawRectangle()
  }

  const handleMouseUp = () => {
    isDrawing.current = false
    let currentRect = cloneDeep(rect)
    let temporarayArr = cloneDeep(rectArray)
    temporarayArr.push(currentRect)
    setRectArray(temporarayArr)
  }

  const drawRectangle = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    context.clearRect(0, 0, canvas.width, canvas.height)
    context.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height)
    if (rectArray.length > 0) {
      rectArray.forEach((rect) => {
        context.strokeStyle = 'red'
        context.lineWidth = 2
        context.strokeRect(
          rect.current.x,
          rect.current.y,
          rect.current.width,
          rect.current.height
        )
      })
    }

    context.strokeStyle = 'red'
    context.lineWidth = 2
    context.strokeRect(
      rect.current.x,
      rect.current.y,
      rect.current.width,
      rect.current.height
    )
  }
  return (
    <div className="createContainer">
      <div className="imageSection">
        <div id="imageContainer" className="imageContainer">
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              style={{ position: 'absolute', top: 0, left: 0 }}
            />
            <img
              ref={imageRef}
              src={usiImage}
              alt="Image"
              style={{ width: '100%', height: '100%', display: 'none' }}
            />
          </div>
          {/* </div> */}
        </div>
        <div className="imageDetailContainer">
          {/* {currentBoundingBox && (
            <>
              <div>
                <input type="text" value={currentBoundingBox?.top} />
                <input type="text" value={currentBoundingBox?.left} />
                <input type="text" value={currentBoundingBox?.top} />
                <input type="text" value={currentBoundingBox?.top} />
                <input type="text" value={currentBoundingBox?.top} />{' '}
              </div>
              <div />
            </>
          )} */}
        </div>
      </div>
      <div className="hotspotSection" />
    </div>
  )
}
export default CreateUsi
