import React from 'react';
import cx from 'classnames';

export default ({ loading, className, children,isDisable, ...props }) => {
 
 
  const disabled = isDisable ? isDisable : loading;
  console.log(disabled);

  const classNames = cx(
    disabled ? 'opacity-50' : '',
    'flex items-center',
    'focus:outline-none',
    {
      'pointer-events-none bg-opacity-75 select-none': loading
    },
    className
  );
  return (
    <button  disabled={disabled} className={classNames} {...props}>
      {loading && <div className="mr-2 btn-spinner" />}
      {children}
    </button>
  );
};
