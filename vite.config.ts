import { resolve } from "path";
import { loadEnv } from "vite";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";
import styleImport from "vite-plugin-style-import";

import type { UserConfig, ConfigEnv } from "vite";

const CWD = process.cwd();

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  return {
    resolve: {
      alias: [
        {
          find: "@",
          replacement: resolve(__dirname, "./src"),
        },
      ],
    },
    plugins: [
      vue(),
      WindiCSS(),
      styleImport({
        libs: [
          {
            libraryName: "ant-design-vue",
            esModule: true,
            resolveStyle: (name) => {
              return `ant-design-vue/es/${name}/style/index`;
            },
          },
        ],
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {},
          additionalData: `@import "@/styles/variables.less";`,
        },
      },
    },
  };
};
