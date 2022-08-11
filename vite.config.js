import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import viteImagemin from 'vite-plugin-imagemin';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

export default defineConfig({
   root,
   build: {
      outDir,
      emptyOutDir: true,
      cssCodeSplit: true,
      minify: false,
      rollupOptions: {
         input: {
            main: resolve(root, 'index.html'),
            about: resolve(root, 'pages', 'about.html'),
            menu: resolve(root, 'pages', 'menu.html'),
            iconFonts: resolve(root, 'fonts', 'icons.ttf'),
         },
         output: {
            chunkFileNames: 'assets/js/[name]-[hash].js',
            entryFileNames: 'assets/js/[name]-[hash].js',

            assetFileNames: ({ name }) => {
               if (/\.(gif|jpeg|jpg|png|svg)$/.test(name ?? '')) {
                  return 'assets/images/[name]-[hash][extname]';
               }

               if (/\.css$/.test(name ?? '')) {
                  return 'assets/css/[name]-[hash][extname]';
               }
               if (/\.(ttf|woff|woff2)$/.test(name ?? '')) {
                  return 'assets/fonts/[name]-[hash][extname]';
               }

               // default value
               // ref: https://rollupjs.org/guide/en/#outputassetfilenames
               return 'assets/[name]-[hash][extname]';
            },
         },
      },
   },
   plugins: [
      handlebars({
         partialDirectory: resolve(root, 'html'),
      }),
      viteImagemin({
         gifsicle: {
            optimizationLevel: 7,
            interlaced: false,
         },
         optipng: {
            optimizationLevel: 7,
         },
         mozjpeg: {
            quality: 20,
         },
         pngquant: {
            quality: [0.8, 0.9],
            speed: 4,
         },
         svgo: {
            plugins: [
               {
                  name: 'removeViewBox',
               },
               {
                  name: 'removeEmptyAttrs',
                  active: true,
               },
            ],
         },
      }),
   ],
});
