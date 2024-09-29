<script setup lang="ts">
const route = useRoute()
</script>

<template>
	<div class="flex flex-col text-center justify-center h-screen">
		<h1>Nuxt Routing set up successfully!</h1>
		<p>Current route: {{ route.name }}</p>
	</div>
</template>
