import {defineConfig} from "vite"

export default defineConfig({
	plugins: [
		
	],
	build: {
		rollupOptions: {
			input: {
				main: 'index.html',
				destination: 'destination.html',
				'destination-moon': 'destination-moon.html',
				'destination-mars': 'destination-mars.html',
				'destination-europa': 'destination-europa.html',
				'destination-titan': 'destination-titan.html',
				crew: 'crew.html',
				'crew-commander': 'crew-commander.html',
				'crew-specialist': 'crew-specialist.html',
				'crew-pilot': 'crew-pilot.html',
				'crew-engineer': 'crew-engineer.html',
				technology: 'technology.html',
				'technology-vehicle': 'technology-vehicle.html',
				'technology-spaceport': 'technology-spaceport.html',
				'technology-capsule': 'technology-capsule.html'
			}
		}
	}
})