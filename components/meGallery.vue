<template>
	<div class="me-gallery" :class="layoutClass">
		<div class="me-gallery__wrapper">
			<div class="me-gallery__main">
				<img :src="mainImg" />
			</div>
			<div class="me-gallery__opt">
				<div
					v-for="(i, index) in optImg"
					:key="index"
					:class="`me-gallery__opt-box${layout}`"
				>
					<div class="me-gallery__opt-frame">
						<img :src="i" />
						<div v-if="index == 3 && visibleMask" class="me-gallery__opt-mask">
							{{ seeMoreTxt }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		images: {
			type: Array,
			required: true
		},
		layout: {
			type: Number,
			default: 1 // available: 1, 2
		}
	},

	data() {
		return {
			mainImg: '',
			optImg: []
		}
	},

	computed: {
		layoutClass() {
			return `me-gallery--type${this.layout}`
		},

		countImages() {
			return this.images.length
		},

		visibleMask() {
			return this.countImages > 4
		},

		seeMoreTxt() {
			return `See all ${this.countImages} photos`
		}
	},

	created() {
		this.initImg()
	},

	methods: {
		initImg() {
			this.mainImg = this.images[0]
			this.optImg = this.images.slice(1, 5)
		},
		seeMore() {
			this.$emit('see-more')
		}
	}
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/baseColor.scss';

.me-gallery {
	&__wrapper {
		display: flex;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	&__opt-frame {
		position: relative;
		height: 100%;
	}

	&__opt-mask {
		background-color: rgba(0, 0, 0, 0.5);
		height: 100%;
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		color: $color-light;
	}

	&__opt-box1 {
		height: calc(100% / 4);
		padding: 2.5% 0 2.5% 5%;

		&:first-child {
			padding: 0 0 2.5% 5%;
		}

		&:last-child {
			padding: 2.5% 0 0 5%;
		}
	}

	&__opt-box2 {
		width: calc(100% / 4);
		padding: 2.5% 1.25% 0 1.25%;

		&:first-child {
			padding: 2.5% 1.25% 0 0;
		}

		&:last-child {
			padding: 2.5% 0 0 1.25%;
		}
	}
}

.me-gallery--type1 {
	.me-gallery__wrapper {
		max-height: 500px;
	}

	.me-gallery__main {
		width: 80%;
	}

	.me-gallery__opt {
		width: 20%;
	}
}

.me-gallery--type2 {
	.me-gallery__wrapper {
		flex-wrap: wrap;
	}

	.me-gallery__main {
		max-height: 500px;
		width: 100%;
	}

	.me-gallery__opt {
		display: flex;
		max-height: 150px;
		width: 100%;
	}
}
</style>
