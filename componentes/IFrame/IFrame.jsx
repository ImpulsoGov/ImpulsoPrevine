import React from "react";

import Typography, { ETYPOGRAPHY_VARIANTS } from "../Typography/Typography.jsx";


const IFrame = ({
  link
}) => {
  return (
    <div className="iframe" align="center">
      <iframe width="80%" height="4000" src={link} allowfullscreen></iframe>
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