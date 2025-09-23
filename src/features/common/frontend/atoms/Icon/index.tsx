import React from "react";
import type { ImageProps } from "next/image";
import Image from "next/image";

type IconProps = {} & ImageProps;

export const Icon: React.FC<IconProps> = ({
    src,
    alt,
    width,
    height,
    ...props
}) => {
    return (
        <Image src={src} alt={alt} width={width} height={height} {...props} />
    );
};
