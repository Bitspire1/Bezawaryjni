import nextConfig from "eslint-config-next";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = [
    ...nextConfig,
    {
        rules: {
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
            "public/admin/**",
            "next-env.d.ts",
        ],
    },
];

export default eslintConfig;
