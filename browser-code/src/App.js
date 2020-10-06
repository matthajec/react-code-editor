import React, { useState, useEffect } from 'react'
import Editor from './components/Editor'
import NavBtn from './components/NavBtn'

export default function App() {

    const [ html, setHTML ] = useState(`<h1 class="count">0</h1>
<button class="increment">Increment</button>`)
    const [ css, setCSS ] = useState(`body {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
}

button {
    cursor: pointer;
}`)
    const [ js, setJS ] = useState(`const btn = document.querySelector(".increment")
const count = document.querySelector(".count")

btn.addEventListener('click', () => {
    count.textContent++
})`)
    const [ tabIndex, setTabIndex ] = useState(0)

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
                </nav>

                {getEditor()}
            </div>
            <iframe
                title="document"
                className="document"
                srcDoc={`
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
                `}
            />
        </>
    )
}