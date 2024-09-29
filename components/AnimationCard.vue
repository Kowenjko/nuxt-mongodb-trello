<script lang="ts" setup></script>

<template>
	<div class="card">Click here</div>
</template>

<style lang="css" scoped>
.card {
	cursor: pointer;
	border-radius: 10px;
	background-color: rgb(25, 25, 90);

	padding: 10px 30px;
	color: white;
	position: relative;
}
@property --angle {
	syntax: '<angle>';
	initial-value: 0deg;
	inherits: false;
}

.card::after,
.card::before {
	/* --angle: 0deg; */
	content: '';
	position: absolute;
	height: calc(100% + 3px);
	width: calc(100% + 3px);
	border-radius: 10px;

	background-color: red;
	top: 50%;
	left: 50%;
	translate: -50% -50%;
	z-index: -1;
	background-image: conic-gradient(from var(--angle), #ff4545, #00ff99, #006aff, #ff0095, #ff4545);
	animation: 1s spin linear infinite;
}
.card::before {
	filter: blur(1.5rem);
	opacity: 0.55;
}
@keyframes spin {
	from {
		--angle: 0deg;
	}
	to {
		--angle: 360deg;
	}
}
</style>
