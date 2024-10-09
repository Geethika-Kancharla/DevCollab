import { Box, Text } from "@chakra-ui/react";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button
} from '@chakra-ui/react'
import { FaChevronDown } from 'react-icons/fa'

interface LanguageSelectorProps {
    language: string;
    onSelect: (language: string) => void;
}


const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, onSelect }) => {


    const LanguageOptions = {

        javascript: "18.15.0",
        python: "3.11.1",
        java: "17.0.1",
        c: "17.0.1",

    }

    const languages = Object.entries(LanguageOptions)

    return (
        <Box mb={4} ml={4}>
            <Text mb={2} fontSize='lg'>Language</Text>
            <Menu isLazy>
                <MenuButton as={Button} rightIcon={<FaChevronDown />}>
                    {language}
                </MenuButton>
                <MenuList bg='#110c1b'>
                    {
                        languages.map(([lang, version]) => (
                            <MenuItem key={lang}
                                color={
                                    lang === language ? "blue.400" : "white"
                                }
                                bg={
                                    lang === language ? "gray.400" : ""
                                }
                                _hover={{
                                    bg: "gray.900",
                                    color: "blue.400"
                                }}
                                onClick={() => onSelect(lang)}>
                                {lang}
                                &nbsp;
                                <Text as='span' fontSize='sm' color='gray.600'>
                                    {version}
                                </Text>
                            </MenuItem>
                        ))
                    }
                </MenuList>
            </Menu>
        </Box >
    )

}

export default LanguageSelector;