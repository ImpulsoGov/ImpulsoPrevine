import React from "react";

import "./Content3Col.css";

const Content3Col = ({
    titulo,
    child1,
    child2,
    child3
}) => {
  return (
      <div className="Content3Col">
          <div className="Content3ColTitulo">{titulo}</div>
          <div className="Content3ColGrid">
            {child1}
            {child2}
            {child3}
          </div>

      </div>
)};

export {Content3Col};