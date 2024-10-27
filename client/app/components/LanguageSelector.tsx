import { Box, Text } from "@chakra-ui/react";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button
} from '@chakra-ui/react'
import { FaChevronDown } from 'react-icons/fa'
import { LanguageOptions } from "./Constants";

interface LanguageSelectorProps {
    language: string;
    onSelect: (language: string) => void;
}


const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, onSelect }) => {

    const languages = Object.entries(LanguageOptions)

    return (
        <Box mb={4} ml={4}>
            <h1 className="text-[#007ACC] mb-2 font-bold text-lg">Language</h1>
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