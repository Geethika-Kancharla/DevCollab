"use client";

import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import * as monaco from "monaco-editor"; 

const Output: React.FC<{ editorRef: React.RefObject<monaco.editor.IStandaloneCodeEditor>, language: string }> = ({ editorRef, language }) => {
    const [output, setOutput] = useState<string[] | null>(null);
    const [isError, setIsError] = useState(false);

    const runCode = async () => {
        const sourceCode = editorRef.current?.getValue();
        if (!sourceCode) {
            return;
        }
        console.log(sourceCode);
        console.log(language);

        try {
            const response = await fetch("/api/execute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ language, sourceCode }),
            });

            if (!response.ok) throw new Error("Error executing code");

            const data: { run: { output: string; stderr?: string } } = await response.json(); // Properly type API response
            setOutput(data.run.output.split("\n"));
            setIsError(!!data.run.stderr);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error("An unknown error occurred");
            }
            setIsError(true);
        }
    };

    return (
        <Box w={{ base: "100%", md: "50%" }} className="mt-1">
            <Text mb={2} fontSize={{ base: "md", md: "lg" }} fontWeight="bold" className="text-[#007ACC]">
                Output
            </Text>
            <button
                onClick={runCode}
                className="bg-black text-white font-bold hover:bg-slate-100 border border-white rounded-lg hover:text-black mb-2 p-2"
            >
                Run Code
            </button>
            <Box
                height={{ base: "50vh", md: "75vh" }}
                p={2}
                border="1px solid"
                color={isError ? "red.300" : "#6A6A6A"}
                borderColor={isError ? "red.500" : "#6A6A6A"}
                borderRadius={4}
            >
                {output ? output.map((line: string, i: number) => <Text key={i}>{line}</Text>) : 'Click "Run Code" to see the output here'}
            </Box>
        </Box>
    );
};

export default Output;
