import nextConfig from "eslint-config-next";

const config = [
  ...nextConfig,
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "dist/**", "next-env.d.ts"],
  },
];

export default config;
