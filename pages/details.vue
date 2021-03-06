<template>
	<div class="details">
		<div class="details__container">
			<desktop-me-search-block />
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			count: 0
		}
	},
	head() {
		return {
			title: 'Details'
		}
	}
}
</script>

<style lang="scss" scoped>
.details {
	background: #fff;
}
</style>
