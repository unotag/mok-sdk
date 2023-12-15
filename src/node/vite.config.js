import { resolve } from 'path';

export default {
    build: {
        manifest: true,
        rollupOptions: {
            input: {
                node: 'src/node.main.ts'
            },
            external: ['axios']
        },
        lib: {
            entry: resolve('src', 'node.main.ts'),
            name: 'node',
            formats: ['es', 'cjs'],
            fileName: (format) => `node.${format}.js`,
        },
    }
}