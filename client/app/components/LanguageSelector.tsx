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
        <Box>
            <Text mb={2} fontSize='lg'>Language</Text>
            <Menu>
                <MenuButton as={Button} rightIcon={<FaChevronDown />}>
                    {language}
                </MenuButton>
                <MenuList >
                    {
                        languages.map(([language, version]) => (
                            <MenuItem key={language}
                                onClick={() => onSelect(language)}>
                                {language}
                                &nbsp;
                                <Text as='span' fontSize='sm' color='gray.600'>
                                    {version}
                                </Text>
                            </MenuItem>
                        ))
                    }
                </MenuList>
            </Menu>
        </Box>
    )

}

export default LanguageSelector;