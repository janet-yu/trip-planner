import { useLoadScript, LoadScriptProps } from '@react-google-maps/api';

const useUseLoadScript = (libraries: LoadScriptProps['libraries']) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || '', // @todo: figure out how to address dis
    libraries,
  });

  return { isLoaded, loadError };
};

export default useUseLoadScript;
