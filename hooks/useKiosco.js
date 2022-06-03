import { useContext } from 'react';
import  KioscoContext  from '../context/KioscoProvider.jsx';

const useKiosco = () => {
  return useContext(KioscoContext);
}

export default useKiosco;