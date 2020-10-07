import React, { useState, useEffect } from 'react'
import FileSaver, { saveAs } from 'file-saver'

import Editor from './components/Editor'
import NavBtn from './components/NavBtn'


export default function App() {

    const [ html, setHTML ] = useState('')
    const [ css, setCSS ] = useState('')
    const [ js, setJS ] = useState('')
    const [ tabIndex, setTabIndex ] = useState(0)
    const [ srcDoc, setSrcDoc ] = useState(``)

    useEffect(() => {
        setHTML(localStorage.getItem('html'))
        setCSS(localStorage.getItem('css'))
        setJS(localStorage.getItem('js'))
    }, [])

    useEffect(() => {
        localStorage.setItem("html", html)
        localStorage.setItem("css", css)
        localStorage.setItem("js", js)
    }, [ html, css, js ])

    function updateEditor() {
        setSrcDoc(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                ${css}
            </style>
        </head>
        <body>

            ${html}

            <script>
                ${js}
            </script>
        </body>
        </html>
    `)
    }

    function download() {
        var blob = new Blob([srcDoc])
        console.log(srcDoc)
        FileSaver.saveAs(blob, "index.html")
    }

    function getEditor() {
        if (tabIndex === 0) {
            return (
                <Editor 
                    language="xml"
                    value={html}
                    onChange={setHTML}
                />
            )
        } else if (tabIndex === 1) {
            return (
                <Editor 
                    language="css"
                    value={css}
                    onChange={setCSS}
                />
            )
        } else if (tabIndex === 2) {
            return (
                <Editor 
                    language="javascript"
                    value={js}
                    onChange={setJS}
                />
            )
        }
    }

    return (
        <>
            <div className="top-section">
                <nav>
                    <div className="nav-btns">
                        <NavBtn 
                            btnIndex={0} 
                            tabIndex={tabIndex} 
                            setTabIndex={setTabIndex}
                        >HTML</NavBtn>
                        <NavBtn 
                            btnIndex={1} 
                            tabIndex={tabIndex} 
                            setTabIndex={setTabIndex}
                        >CSS</NavBtn>
                        <NavBtn 
                            btnIndex={2} 
                            tabIndex={tabIndex} 
                            setTabIndex={setTabIndex}
                        >JAVASCRIPT</NavBtn>
                    </div>

                    <div className="control-btns">
                        <button 
                            className="reload-btn"
                            onClick={updateEditor}
                        >Reload</button>
                        <button 
                            className="download-btn"
                            onClick={download}
                        >Download</button>
                    </div>

                </nav>

                {getEditor()}
            </div>
            <iframe
                title="document"
                className="document"
                srcDoc={srcDoc}
            />
        </>
    )
}