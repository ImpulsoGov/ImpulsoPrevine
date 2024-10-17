import React from "react";

const AjustBar = ()=>{
    const style = {
        height: '90px',
        width: '100%',
        zIndex: 100,
        position: 'fixed'
    }
    return(
        <div 
            style={style}
        ></div>
    )
}

export {AjustBar}