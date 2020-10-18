import React from 'react'

import MonacoEditor from 'react-monaco-editor'

export default function Editor(props) {

    const {
        language,
        value,
        onChange
    } = props

    return (
        <div className="editor">
            <MonacoEditor 
                width="100vw"
                height="35vh"
                theme="vs-dark"
                options={{
                    autoClosingBrackets: true
                }}
                language={language}
                value={value}
                onChange={onChange}
            />

        </div>
    )
}
