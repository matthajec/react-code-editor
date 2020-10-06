import React from 'react'

export default function NavBtn(props) {

    const {
        btnIndex,
        tabIndex,
        setTabIndex
    } = props

    return (
        <button 
            className={`editor-selector ${tabIndex === btnIndex ? "selected" : ""}`}
            onClick={() => {setTabIndex(btnIndex)}}
        >{props.children}</button>
    )
}
