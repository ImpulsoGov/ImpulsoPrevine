import React from "react";

const LogOut = (props)=>{
    return(
        <div onClick={() => props.out()}>Sign out</div>
        )
}

export {LogOut}