// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },
	modules: ['@nuxt/ui', 'nuxt-typed-router'],

	nitro: {
		plugins: ['~/server/plugins/mongodb.ts'],
	},
	ui: {},
	runtimeConfig: {
		mongodbUri: process.env.NUXT_MONGODB_URI,
	},
})
