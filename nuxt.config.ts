// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: false },
	modules: ['@nuxt/ui', 'nuxt-typed-router', 'nuxt-server-utils', '@sidebase/nuxt-auth'],

	nitro: {
		// plugins: ['~/server/plugins/mongodb.ts'],
	},
	colorMode: {
		preference: 'light',
	},
	ui: {},
	runtimeConfig: {
		mongodbUri: process.env.NUXT_MONGODB_URI,
		auth: {
			origin: process.env.NUXT_AUTH_ORIGIN,
			secret: process.env.NUXT_AUTH_SECRET,
		},
	},
	nuxtServerUtils: {
		mongodbUri: process.env.NUXT_MONGODB_URI,
	},
	auth: {
		baseURL: process.env.NUXT_AUTH_ORIGIN,
		provider: {
			type: 'authjs',
		},
	},
})
