<template>
	<div class="details">
		<div class="details__container">
			<desktop-me-search-block />
			<div class="details__content">
				<me-gallery :images="images" />
				<me-description
					:category="unit.category"
					:name="unit.name"
					:address="unit.address"
					:desc="unit.desc"
				/>
				<div class="details__room">
					<div
						v-for="roomType in unit.roomTypes"
						:key="roomType.id"
						class="details__room-block"
					>
						<desktop-me-room-type-block
							:room-type="roomType"
							@select-room="handleRoomSelection"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
	async fetch() {
		try {
			await this.fetchUnit()
		} catch (e) {}
	},
	head() {
		return {
			title: 'Details'
		}
	},
	computed: {
		...mapState('search', ['unit']),

		images() {
			return this.unit.images
		}
	},
	methods: {
		...mapActions('search', ['fetchUnit']),

		handleRoomSelection(room) {
			alert(room.name)
		}
	}
}
</script>

<style lang="scss" scoped>
.details {
	&__content {
		padding-top: 30px;
	}

	&__room-block {
		padding-top: 30px;
	}
}
</style>
