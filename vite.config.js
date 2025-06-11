import {defineConfig} from "vite"

export default defineConfig({
	plugins: [
		
	],
	build: {
		rollupOptions: {
			input: {
				main: 'index.html',
				destination: 'destination.html',
				crew: 'crew.html',
				technology: 'technology.html'
			}
		}
	}
})