// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import reactConfig from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default tseslint.config([
    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    {
        plugins: {
            react: reactConfig,
            "react-hooks": reactHooks,
        },
        rules: {
            "react/jsx-handler-names": [
                "error",
                {
                    eventHandlerPrefix: "handle",
                    eventHandlerPropPrefix: "on",
                },
            ],
            "react-hooks/rules-of-hooks": "error",
            "react/hook-use-state": "error",
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    // desativa regras de formatação do eslint para evitar conflitos com o prettier
    prettierConfig,
    {
        rules: {
            "@typescript-eslint/switch-exhaustiveness-check": "error",
            "@typescript-eslint/ban-ts-comment": [
                "error",
                {
                    // só permite @ts-expect-error com descrição
                    "ts-expect-error": "allow-with-description",
                },
            ],
            "@typescript-eslint/consistent-type-definitions": ["error", "type"],
            "@typescript-eslint/no-unused-vars": [
                "warn", // or "error"
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
            "@typescript-eslint/array-type": ["error", { default: "generic" }],
            "@typescript-eslint/consistent-type-imports": "error",
            "@typescript-eslint/explicit-function-return-type": "warn",
            "no-restricted-syntax": [
                "error",
                {
                    selector: "TSEnumDeclaration",
                    message:
                        "Replace enum with a literal type or a const assertion.",
                },
            ],
            "@typescript-eslint/naming-convention": [
                "warn",
                {
                    selector: "variable",
                    types: ["boolean"],
                    format: ["PascalCase"],
                    prefix: [
                        "is",
                        "are",
                        "should",
                        "has",
                        "can",
                        "did",
                        "will",
                    ],
                },
                {
                    selector: "typeAlias",
                    format: ["PascalCase"],
                },
                {
                    // Parâmetros de tipo genéricos devem começar com a letra T, seguida de qualquer letra maiúscula. Exemplos: TUser, TProduct.
                    selector: "typeParameter",
                    format: ["PascalCase"],
                    custom: { regex: "^T[A-Z]", match: true },
                },
            ],
        },
    },
    {
        // substitui o uso do `.eslintignore`
        ignores: [
            ".next/",
            "node_modules/",
            "coverage/",
            "**/__snapshots__/**",
            "package-lock.json",
            "public/",
        ],
    },
]);
