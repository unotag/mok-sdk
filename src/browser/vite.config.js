import { resolve } from 'path';

export default {
    build: {
        rollupOptions: {
            input: {
                browser: 'src/browser.main.ts',
            }
        },
        lib: {
            entry: resolve('src', 'browser.main.ts'),
            name: 'browser',
            formats: ['es', 'umd'],
            fileName: (format) => `browser.${format}.js`,
        },
    }
}