import React, {useContext}from "react";
import {ReactReduxContext} from 'react-redux';

const withSaga = (key, saga) => WrappedComponent => {
   
  const Extended = (props, context) => {
    const { store } = useContext(ReactReduxContext);
    store.injectSaga(key, saga);
    return <WrappedComponent {...props} />
  };

  return Extended;
};

export default withSaga ;