<script setup lang="ts">
const route = useRoute()

definePageMeta({
	middleware: 'auth',
})

useHead({
	title: 'New Trello',
})
</script>

<template>
	<div class="flex flex-col text-center justify-center items-center h-screen">
		<h1>Index</h1>
		<nuxt-link to="/auth/signin">About</nuxt-link>
	</div>
</template>
