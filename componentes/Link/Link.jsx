import React from "react";
import cx from "classnames";

import styles from "./Link.module.css";
import Typography, { ETYPOGRAPHY_VARIANTS } from "../Typography";

const ELINK_VARIANTS=()=> {
  return(
    DEFAULT = "default",
    LINK_PRIMARY = "linkPrimary",
    BUTTON_PRIMARY = "buttonPrimary",
    BUTTON_SECONDARY = "buttonSecondary"
  )
}
export {ELINK_VARIANTS}


const Link = ({
  children,
  className,
  href,
  variant = ELINK_VARIANTS.DEFAULT,
  fontVariant = ETYPOGRAPHY_VARIANTS.BODY_M,
  uppercase = false,
  ...props
}) => {
  return (
      <a
        className={cx(
          styles.anchor,
          styles[variant],
          styles[fontVariant],
          { [styles.uppercase]: uppercase },
          className
        )}
        {...props}
      >
        <Typography as="span" variant={fontVariant}>
          {children}
        </Typography>
      </a>
  );
};

export default Link;