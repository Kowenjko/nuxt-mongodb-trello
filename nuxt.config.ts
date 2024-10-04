// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: false },
	modules: [
		'@nuxt/ui',
		'nuxt-typed-router',
		'nuxt-server-utils',
		'@sidebase/nuxt-auth',
		'@nuxt/image',
	],

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
		stripeSecretKey: process.env.NUXT_STRIPE_SECRET_KEY,
		stripeWebhookSecret: process.env.NUXT_STRIPE_WEBHOOK_SECRET,
		public: {
			pixabayApiKey: process.env.NUXT_PIXABAY_API_KEY,
			priceId: process.env.NUXT_STRIPE_PRICE_ID,
			stripePublicKey: process.env.NUXT_STRIPE_PUBLIC_KEY,
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
