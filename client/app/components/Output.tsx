import { Box, Text, Button } from '@chakra-ui/react';

const Output: React.FC<{ editorRef: React.RefObject<any>, language: string }> = ({ editorRef, language }) => {

    const runCode = async () => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) {
            return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/run`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }


    return (
        <Box w="50%">
            <Text mb={2} fontSize="lg" fontWeight="bold">Output</Text>
            <Button
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
                test

            </Box>

        </Box>
    )
}

export default Output;