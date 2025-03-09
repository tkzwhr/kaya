import dts from "vite-plugin-dts";
import svgLoader from "vite-svg-loader";
import {defineConfig} from "vite";

export default defineConfig({
    plugins: [dts(), svgLoader()],
    build: {
        lib: {
            entry: './lib/index.ts',
            name: 'index',
            fileName: 'index'
        },
    },
});
