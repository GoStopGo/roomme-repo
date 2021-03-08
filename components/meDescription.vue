<template>
	<div class="me-description">
		<div class="me-description__wrapper">
			<div v-if="category" class="me-description__category">{{ category }}</div>
			<div v-if="name" class="me-description__name">{{ name }}</div>
			<div v-if="address" class="me-description__address">{{ address }}</div>
			<div v-if="desc" class="me-description__desc">
				<p v-if="!visibleAll">
					{{ descLead }}
					<span class="me-description__dots">...</span>
					<span class="me-description__more-btn" @click="visibleAll = true"
						>read more</span
					>
				</p>
				<p v-else>{{ desc }}</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		category: {
			type: String,
			default: ''
		},

		name: {
			type: String,
			default: ''
		},

		address: {
			type: String,
			default: ''
		},

		desc: {
			type: String,
			default: ''
		}
	},

	data() {
		return {
			visibleAll: true
		}
	},

	computed: {
		descLead() {
			return this.desc.slice(0, 250)
		}
	},

	created() {
		this.visibleAll = !(this.desc.length > 250)
	}
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/baseColor.scss';

.me-description {
	&__wrapper {
		background-color: $color-light;
		padding-top: 20px;
	}

	&__category {
		font-size: 14px;
		border-radius: 15px;
		border: 1px solid $color-default;
		text-align: center;
		display: inline-block;
		vertical-align: middle;
		padding: 3px 15px;
		margin-bottom: 1em;
	}

	&__name {
		font-size: 26px;
		margin-bottom: 1em;
	}

	&__address {
		margin-bottom: 1em;
	}

	&__desc {
		margin-bottom: 1em;
	}

	&__more-btn {
		color: $color-blue;
		cursor: pointer;
	}
}
</style>
