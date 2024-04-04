import React from "react";

const PaddingWrapper: React.FC<{
  children: React.ReactNode;
  padding?: string;
  width?: string;
}> = ({ children, padding = "0px", width = "100%" }) => {
  return (
    <div
      style={{
        padding,
        width,
        boxSizing: "border-box", // Include padding in the width calculation
      }}
    >
      {children}
    </div>
  );
};

export default PaddingWrapper;
