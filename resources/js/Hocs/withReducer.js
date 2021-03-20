import React, {useContext}from "react";
import {ReactReduxContext} from 'react-redux';

const withReducer = (key, reducer) => WrappedComponent => {
   
  const Extended = (props, context) => {
    const { store } = useContext(ReactReduxContext);
    store.injectReducer(key, reducer);
    return <WrappedComponent {...props} />
  };

  return Extended;
};

export default withReducer ;