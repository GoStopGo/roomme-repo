<template>
	<div class="me-room-type-block">
		<div class="me-room-type-block__wrapper">
			<div
				v-if="localRoomType.images.length"
				class="me-room-type-block__gallery"
			>
				<me-gallery :images="localRoomType.images" :layout="2" />
			</div>
			<div class="me-room-type-block__info">
				<div class="me-room-type-block__top">
					<div v-if="localRoomType.name" class="me-room-type-block__name">
						{{ localRoomType.name }}
					</div>
				</div>
				<div
					v-if="localRoomType.roomSize || localRoomType.bedSize"
					class="me-room-type-block__size"
				>
					{{ sizeTxt }}
				</div>
				<div
					v-if="localRoomType.facilities"
					class="me-room-type-block__facilities"
				>
					<div
						v-for="(facility, facilityIndex) in localRoomType.facilities"
						:key="facilityIndex"
						class="me-room-type-block__facility"
					>
						<me-icon class="font-red" :icon="['fas', 'wifi']" />
						{{ facility.name }}
					</div>
				</div>
				<div class="me-room-type-block__bottom">
					<div class="me-room-type-block__price">
						<div
							v-if="localRoomType.originalPrice"
							class="me-room-type-block__original-price"
						>
							{{ localRoomType.originalPrice | toRupiah }}
						</div>
						<div class="me-room-type-block__selling-price font-red">
							{{ localRoomType.sellingPrice | toRupiah }}
							<span class="me-room-type-block__selling-price-desc font-default"
								>/month</span
							>
						</div>
					</div>
					<div class="me-room-type-block__action">
						<me-button
							:disabled="!localRoomType.availableRooms"
							@click="selectRoom"
							>Select Room</me-button
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import helpers from '~/utils/helpers'
export default {
	filters: {
		toRupiah: helpers.numberToRupiah
	},

	props: {
		roomType: {
			type: Object,
			required: true
		}
	},

	data() {
		return {
			localRoomType: {
				name: '',
				roomSize: '',
				bedSize: '',
				originalPrice: null,
				sellingPrice: null,
				discountPercentage: null,
				availableRooms: null,
				facilities: [
					{
						iconUrl: '',
						name: ''
					}
				],
				images: []
			}
		}
	},

	computed: {
		sizeTxt() {
			return `Room Size: ${this.localRoomType.roomSize} | Bed Size: ${this.localRoomType.bedSize}`
		}
	},
	created() {
		this.init()
	},

	methods: {
		init() {
			this.localRoomType = {
				...this.localRoomType,
				...JSON.parse(JSON.stringify(this.roomType))
			}
		},
		selectRoom() {
			this.$emit('select-room', this.localRoomType)
		}
	}
}
</script>

<style lang="scss" scoped>
.me-room-type-block {
	&__wrapper {
		background-color: #f5f5f585;
		padding: 15px;
		box-shadow: 0 3px 5px rgb(0 0 0 / 8%);
		border-radius: 8px;
		display: flex;
	}

	&__gallery {
		max-width: 350px;
	}

	&__info {
		padding-left: 20px;
	}

	&__name {
		font-size: 24px;
		margin-bottom: 0.5em;
	}

	&__size {
		margin-bottom: 2em;
	}

	&__facilities {
		margin-bottom: 2em;
		display: flex;
		flex-wrap: wrap;
	}

	&__facility {
		width: calc(100% / 3);
		min-width: 150px;
		margin-bottom: 0.5em;
	}

	&__bottom {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}

	&__original-price {
		text-decoration: line-through;
	}

	&__selling-price {
		font-size: 21px;
	}

	&__selling-price-desc {
		font-size: 16px;
	}
}
</style>
