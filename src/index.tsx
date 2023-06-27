import * as React from 'react'
import { render } from 'react-dom'
import {
  DisplayText,
  Paragraph,
  SectionHeading,
  TextInput,
  Textarea,
  FieldGroup,
  RadioButtonField,
  Form,
} from '@contentful/forma-36-react-components'
import {
  init,
  locations,
  EditorExtensionSDK,
} from 'contentful-ui-extensions-sdk'
import '@contentful/forma-36-react-components/dist/styles.css'
import '@contentful/forma-36-fcss/dist/styles.css'
import './index.css'
import Usi from './components/main Usi/usi'

/**
 * To use this demo create a Content Type with the following fields:
 *  title: Short text
 *  body: Long text
 *  hasAbstract: Boolean
 *  abstract: Long text
 *
 *  See https://github.com/contentful/create-contentful-extension/blob/master/docs/examples/entry-editor-content-model.json for details.
 */

interface AppProps {
  sdk: EditorExtensionSDK
}

interface AppState {
  title: string
  body: string
  hasAbstract: boolean
  abstract: string
}

const App = ({ sdk }: any) => {
  return <Usi sdk={sdk} />
}

init((sdk) => {
  if (sdk.location.is(locations.LOCATION_ENTRY_EDITOR)) {
    render(
      <App sdk={sdk as EditorExtensionSDK} />,
      document.getElementById('root')
    )
  }
})
