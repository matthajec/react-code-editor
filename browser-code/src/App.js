import React, { useState, useEffect } from 'react'
import FileSaver from 'file-saver'
import {Link, Switch, Route , useLocation} from 'react-router-dom'

import Editor from './components/Editor'
import Loading from './components/Loading'

export default function App() {

    const {pathname} = useLocation()

    const [ html, setHTML ] = useState('')
    const [ css, setCSS ] = useState('')
    const [ js, setJS ] = useState('')
    const [ srcDoc, setSrcDoc ] = useState(``)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const localHtml = localStorage.getItem('html')
        const localCss = localStorage.getItem('css')
        const localJs = localStorage.getItem('js')

        setHTML(localHtml ? localHtml : '') 
        setCSS(localCss ? localCss : '') 
        setJS(localJs ? localJs : '') 
        updateEditor()

    }, [])

    useEffect(() => {
        localStorage.setItem("html", html)
        localStorage.setItem("css", css)
        localStorage.setItem("js", js)
    }, [ html, css, js ])

    function updateEditor() {
        setLoading(true)
        setTimeout(() => {
            setLoading()
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
            `)}, 400
        )
    }


    function download() {
        if(html || css | js) {
            var blob = new Blob([srcDoc])
            console.log(srcDoc)
            FileSaver.saveAs(blob, "index.html")
        }
    }

    return (
        <>
            <div className="top-section">
                <nav>
                    <div className="nav-btns">
                        <Link 
                            to="/"
                            className={`editor-selector ${pathname === '/' && 'selected'}`}
                        >HTML</Link>
                        <Link 
                            to="/css"
                            className={`editor-selector ${pathname === '/css' && 'selected'}`}
                        >CSS</Link>
                        <Link 
                            to="/javascript"
                            className={`editor-selector ${pathname === '/javascript' && 'selected'}`}
                        >JAVASCRIPT</Link>
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

                <Switch>
                    <Route exact path="/">                
                        <Editor 
                            language="html"
                            value={html}
                            onChange={setHTML}
                        />
                    </Route>
                    <Route exact path="/css">                
                        <Editor 
                            language="css"
                            value={css}
                            onChange={setCSS}
                        />
                    </Route>
                    <Route exact path="/javascript">                
                        <Editor 
                            language="javascript"
                            value={js}
                            onChange={setJS}
                        />
                    </Route>
                </Switch>
            </div>
            {loading ?
                <Loading /> :
                <iframe
                title="document"
                className="document"
                srcDoc={srcDoc}
            />
            }

        </>
    )
}