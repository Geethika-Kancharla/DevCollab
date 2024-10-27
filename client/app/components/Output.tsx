"use client"

import { Box, Text, Button } from '@chakra-ui/react';
import { executeCode } from '../api/execute/route';
import { useState, useEffect } from 'react'
import axios from 'axios'

const Output: React.FC<{ editorRef: React.RefObject<any>, language: string }> = ({ editorRef, language }) => {

    const [output, setOutput] = useState(null);

    const runCode = async () => {
        const sourceCode = editorRef.current.getValue();
        console.log(sourceCode);
        console.log(language);

        if (!sourceCode) {
            return;
        }
        try {
            const { run: result } = await executeCode(language, sourceCode);
            setOutput(result.output)

        } catch (error) {
            console.error(error);
        }

    }



    return (
        <Box w="50%">
            <Text mb={2} fontSize="lg" fontWeight="bold" className='text-blue-800'>Output</Text>
            <Button
                onClick={runCode}
                variant="outline"
                colorScheme="green"
                size="sm"
                mb={4}
            >
                Run Code
            </Button>
            <Box
                height='75vh'
                p={2}
                border='1px solid'
                borderColor='#333'
                borderRadius={4}
            >
                {output ? output : 'Click "Run Code" to see the output here'}

            </Box>

        </Box>
    )
}

export default Output;