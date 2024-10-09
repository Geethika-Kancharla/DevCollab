"use client"

import { useState, useRef } from 'react'
import Editor, { useMonaco } from '@monaco-editor/react';

const CodeEditor: React.FC = () => {
    const editorRef = useRef();

    const onMount = (editor: any) => {
        editorRef.current = editor;
        editor.focus();
    }

    const [code, setCode] = useState("");

    return (
        <div>
            <Editor height="75vh"
                theme='vs-dark'
                defaultValue="// some comment"
                defaultLanguage="javascript"
                onMount={onMount}
                value={code}
                onChange={() => setCode(code)}


            />
        </div>
    )
}

export default CodeEditor