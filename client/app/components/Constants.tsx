import axios from 'axios'

const API = axios.create({
    baseURL: "https://emkc.org/api/v2/piston"
})


export const CODE_SNIPPETS = {
    javascript: "function greet() {\n\tconsole.log('Hello, World!');\n}\n\ngreet();\n",
    python: 'print("Hello, World!")',
    java: '\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, World!");\n\t}\n}',
    // cplusplus: "\n#include <iostream>\n\nint main() {\n\tstd::cout << 'Hello, World!' << std::endl;\n\treturn 0;\n}",
    c: '\n#include <stdio.h>\n\nint main() {\n\tprintf("Hello, World!");\n\treturn 0;\n}',

}

export const LanguageOptions = {

    javascript: "18.15.0",
    python: "3.10.0",
    java: "15.0.2",
    c: "10.2.0",
}

// let LanguageOptions: { [key: string]: string } = {};

// export const fetchLanguagesAndVersions = async () => {
//     try {
//         const response = await API.get("/runtimes");
//         const data = response.data;


//         const LanguageOptions = data.reduce((acc: any, runtime: any) => {
//             acc[runtime.language] = runtime.version;
//             return acc;
//         }, {});

//         console.log("LanguageOptions populated:", LanguageOptions);
//     } catch (error: any) {
//         console.error(error.message);
//         throw error;
//     }
// };

// // export { LanguageOptions }

// console.log(LanguageOptions)