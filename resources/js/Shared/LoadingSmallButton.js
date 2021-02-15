import React from 'react';
import SmallButton from "@/Shared/SmallButton";

export default ({ loading, className, children, ...props }) => {
  const { isSmall } = props;

  return (
    <SmallButton
      disabled={loading}
      className={`focus:outline-none flex items-center ${className}`}
      {...props}
    >
      {loading && <div className="btn-spinner mr-2" />}
      {children}
    </SmallButton>
  );
};
