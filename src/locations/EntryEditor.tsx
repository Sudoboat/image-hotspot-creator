
import { EditorAppSDK } from '@contentful/app-sdk';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import Usi from '../components/main /home';

const Entry = () => {
  const sdk = useSDK<EditorAppSDK>();

  return <Usi sdk={sdk}/>;
};

export default Entry;
