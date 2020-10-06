import React from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import { Controlled as ControlledEditor } from 'react-codemirror2'

export default function Editor(props) {
    const {
        language,
        value,
        onChange
    } = props

    function handleChange(editor, data, value) {
        onChange(value)
    }

    return (
        <div className="editor">
            <ControlledEditor 
                onBeforeChange={handleChange}
                value={value}
                options={{
                    mode: language,
                    theme: 'material',
                    lineNumbers: true,
                    lineWrapping: true
                }}
            />
        </div>
    )
}
