<script lang="ts" setup>
defineProps({
	title: {
		type: String,
	},
})
</script>
<template>
	<div class="grid lg:grid-cols-2 h-screen bg-gray-100 dark:bg-gray-950">
		<div class="left place-self-center w-full px-8 md:px-16 lg:px-24 xl:px-36 2xl:px-52">
			<div class="header text-center mb-6">
				<div class="flex justify-center my-4">
					<Logo class="block lg:hidden" />
				</div>
				<h1 class="text-xl font-bold mb-px">{{ title }}</h1>
				<slot name="header"></slot>
			</div>
			<UCard>
				<slot />
			</UCard>
		</div>
		<div class="right hidden lg:flex justify-center">
			<Logo class="text-white" />
		</div>
	</div>
</template>

<!-- <style lang="css" scoped>
.right {
	background: linear-gradient(-45deg, #e7e9ec, #6343f0, #0455a0, #020a22);
	background-size: 400% 400%;
	animation: gradient 15s ease infinite;
}

@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
</style> -->
