<template>
	<button class="me-button" :class="btnClass" @click="triggered">
		<slot />
	</button>
</template>
<script>
export default {
	props: {
		color: {
			type: String,
			default: 'red' // allowed: red, green, blue
		},
		disabled: Boolean
	},

	computed: {
		btnClass() {
			return `me-button--${this.color}`
		}
	},

	methods: {
		triggered() {
			this.$emit('click')
		}
	}
}
</script>
<style lang="scss" scoped>
@import '~assets/scss/baseColor.scss';

.me-button {
	color: $color-default;
	height: 38px;
	width: 100%;
	padding: 6px 12px;
	border-radius: 4px;
	border: 1px solid $color-default;
	background-color: $color-light;
	font-size: 16px;
	cursor: pointer;

	&--red {
		background-color: $color-red;
		border-color: $color-red;
		color: $color-light;

		&:hover {
			color: $color-red;
		}
	}

	&--green {
		background-color: $color-green;
		border-color: $color-green;
		color: $color-light;

		&:hover {
			color: $color-green;
		}
	}

	&--blue {
		background-color: $color-blue;
		border-color: $color-blue;
		color: $color-light;

		&:hover {
			color: $color-blue;
		}
	}

	&:hover {
		background-color: $color-light;
	}
}
</style>
