<template>
	<li class="me-dropdown-list" @click="emitToParent">
		<span>{{ label }}</span>
	</li>
</template>

<script>
export default {
	props: {
		value: {
			type: String,
			required: true
		},
		label: {
			type: String,
			default: ''
		}
	},
	methods: {
		emitToParent() {
			this.$emit('select', { value: this.value, label: this.label })
		}
	}
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/baseColor.scss';

.me-dropdown-list {
	font-size: 13px;
	padding: 0 20px;
	position: relative;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	color: $color-default;
	height: 34px;
	line-height: 34px;
	box-sizing: border-box;
	cursor: pointer;

	&:hover {
		background-color: $color-grey;
	}
}
</style>
