<script setup lang="ts">
const route = useRoute()

useHead({
	title: 'New Trello',
})
</script>

<template>
	<div class="flex flex-col text-center justify-center items-center h-screen">
		<h1>Nuxt Routing set up successfully!</h1>
		<p class="mb-5">Current route: {{ route.name }}</p>
		<AnimationCard />
	</div>
</template>
