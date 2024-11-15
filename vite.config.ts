import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import packageJson from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: process.env.VITE_BASE_PATH || '/',
	define: {
		'process.env.VERSION': JSON.stringify(packageJson.version),
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
