import React, { useRef } from 'react';
import cx from 'classnames';

export default ({ loading, className, children,isDisable,  ...props }) => {
 
  const btnRef = useRef(null)
  const disabled = isDisable ? isDisable : loading;
  


  if(disabled) {
    btnRef.current.blur();
  }
  const classNames = cx(
    disabled ? 'opacity-50' : '',
    
    'focus:outline-none',
    {
      'pointer-events-none bg-opacity-75 select-none': loading
    },
    className
  );
  return (
    <button  ref= { btnRef }  disabled={disabled} className={classNames} {...props}>
      {loading && <div className="mr-2 btn-spinner" />}
      {children}
    </button>
  );
};
