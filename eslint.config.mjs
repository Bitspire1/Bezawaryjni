import nextConfig from "eslint-config-next";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = [
    ...nextConfig,
    {
        plugins: { prettier: prettierPlugin },
        rules: {
            "prettier/prettier": "warn",
            "react-hooks/set-state-in-effect": "off",
            "react-hooks/immutability": "off",
        },
    },
    prettierConfig,
    {
        ignores: [
            "node_modules/**",
            ".next/**",
            "out/**",
            "build/**",
            ".tina/**",
            "tina/**",
            "next-env.d.ts",
        ],
    },
];

export default eslintConfig;
