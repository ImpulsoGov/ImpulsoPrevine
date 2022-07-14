import React from "react";


const IFrame = ({
  height,
  link,
  id
}) => {
  return (
    <div className="iframe" align="center" id="formulario">
      <iframe width="80%" height={height} src={link} allowFullScreen></iframe>
      <style jsx>{`
        .iframe{
          margin-top: 40px;
          margin-bottom: 40px;
        }
      `}</style>
    </div>
  );
};

export {IFrame};