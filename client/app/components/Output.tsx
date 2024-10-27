"use client"

import { Box, Text, Button } from '@chakra-ui/react';
import { executeCode } from '../api/execute/route';
import { useState, useEffect } from 'react'
import axios from 'axios'

const Output: React.FC<{ editorRef: React.RefObject<any>, language: string }> = ({ editorRef, language }) => {

    const [output, setOutput] = useState<string[] | null>(null);
    const [isError, setIsError] = useState(false)

    const runCode = async () => {
        const sourceCode = editorRef.current.getValue();
        console.log(sourceCode);
        console.log(language);

        if (!sourceCode) {
            return;
        }
        try {
            const { run: result } = await executeCode(language, sourceCode);
            setOutput(result.output.split("\n"))
            result.stderr ? setIsError(true) : setIsError(false);

        } catch (error) {
            console.error(error);
            setIsError(true);
        }

    }

    return (
        <Box w={{ base: '100%', md: '50%' }} className='mt-1'>
            <Text mb={2} fontSize={{ base: 'md', md: 'lg' }} fontWeight="bold" className='text-[#007ACC]'>Output</Text>
            <button
                onClick={runCode}
                className='bg-black text-white font-bold hover:bg-slate-100 border border-white rounded-lg hover:text-black mb-2 p-2'
            >
                Run Code
            </button>
            <Box
                height={{ base: '50vh', md: '75vh' }}
                p={2}
                border='1px solid'
                color={
                    isError ? "red.300" : "#6A6A6A"
                }
                borderColor={
                    isError ? "red.500" : "#6A6A6A"
                }
                borderRadius={4}
            >
                {output ?
                    output.map(
                        (line: string, i: number) => <Text key={i}>{line}</Text>
                    )
                    : 'Click "Run Code" to see the output here'}

            </Box>

        </Box >
    )
}

export default Output;