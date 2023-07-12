/* eslint-disable react/no-unknown-property */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateUsi from './createHotspot'
import { useSDK } from '@contentful/react-apps-toolkit';


describe('Create Page', () => {

    const url="http://images.ctfassets.net/ov64r3ga08sj/59Z0IARVHOJeVTVnLaCWXX/58cbda0bf74ae0ca938c07306bf77020/DSC_1060.JPG"
    const name="DSC_1060.JPG "
  test('InputBox', async () => {
    render(<CreateUsi 
        imageUrl={url} 
        imageName={name}
    />)
    expect(true).toBe(true);
  })
})
