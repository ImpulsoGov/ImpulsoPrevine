import React from "react";
import cx from "classnames";

import styles from "./Typography.module.css";
const ETYPOGRAPHY_VARIANTS=()=>{
  return(
    HEADLINE_XXL = "headlineXXl",
    HEADLINE_XL = "headlineXl",
    HEADLINE_L = "headlineL",
    HEADLINE_M = "headlineM",
    HEADLINE_S = "headlineS",
    BODY_XL = "bodyXl",
    BODY_L = "bodyL",
    BODY_M = "bodyM",
    BODY_S = "bodyS",
    BUTTON_LABEL_L = "buttonLabelL",
    BUTTON_LABEL = "buttonLabel",
    LINK = "link",
    CAPTION = "caption"
  )
}
export {ETYPOGRAPHY_VARIANTS}

const Typography= ({
  as = "p",
  variant = ETYPOGRAPHY_VARIANTS.BODY_M,
  className,
  children,
  ...props
}) => {
  const Component = as;

  return (
    <Component
      className={cx(styles.type, styles[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Typography;