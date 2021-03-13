import React, { useContext } from 'react';
export default function withTest(WrappedComponent) {
    

    return function(props) {
        return <WrappedComponent  {...props} />;
    };
  }