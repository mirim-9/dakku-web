import { __RouterContext } from 'react-router-dom';
import { useContext } from 'react';

const useRouter = () => {
  return useContext(__RouterContext);
};

export default useRouter;
