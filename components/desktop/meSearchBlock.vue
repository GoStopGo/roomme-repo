<template>
	<div class="me-search-block">
		<div class="me-search-block__wrapper">
			<div class="me-search-block__search-field-frame me-search-block--block-2">
				<me-search-field
					v-model="searchLocationKeyword"
					label="Search Location"
					placeholder="Cari Lokasi Kost"
					:has-result="!!locations.length"
					@remote-method="getAutocompleteSuggestion"
				>
					<me-dropdown-list
						v-for="l in locations"
						:key="l.value"
						:label="l.label"
						:value="l.value"
						@select="handleAutocompleteSelection"
					/>
				</me-search-field>
			</div>

			<div class="me-search-block__check-in-frame me-search-block--block-1">
				<div class="me-search-block__date-group me-dtp">
					<client-only>
						<label class="me-dtp__label">Check in</label>
						<me-date-picker
							v-model="checkInDate"
							class="me-search-block__check-in-date-picker me-dtp__date"
							:disabled-dates="{ to: new Date() }"
							@selected="handleCheckInSelection"
						/>
						<me-icon class="me-dtp__icon" :icon="['fas', 'calendar-alt']" />
					</client-only>
				</div>
			</div>

			<div class="me-search-block__durations-frame me-search-block--block-1">
				<me-dropdown v-model="duration" label="Duration">
					<template #prefix>
						<me-icon :icon="['fas', 'clock']" />
					</template>
					<me-dropdown-list
						v-for="(d, value) in durations"
						:key="value"
						:label="d.label"
						:value="value"
						@select="handleDurationSelection"
					/>
				</me-dropdown>
			</div>

			<div
				class="me-search-block__additional-days-frame me-search-block--block-1"
			>
				<me-dropdown v-model="additionalDay" label="Additional">
					<template #prefix>
						<me-icon :icon="['fas', 'calendar-plus']" />
					</template>
					<me-dropdown-list
						v-for="(a, value) in additionalDays"
						:key="value"
						:label="a.label"
						:value="value"
						@select="handleAdditionalDaySelection"
					/>
				</me-dropdown>
			</div>

			<div class="me-search-block__check-out-frame me-search-block--block-1">
				<div class="me-search-block__date-group me-dtp">
					<client-only>
						<label class="me-dtp__label">Check out</label>
						<me-date-picker
							v-model="checkOutDate"
							class="me-search-block__check-out-date-picker me-dtp__date"
							:disabled-dates="minCheckOutDate"
							@selected="handleCheckOutSelection"
						/>
						<me-icon class="me-dtp__icon" :icon="['fas', 'calendar-alt']" />
					</client-only>
				</div>
			</div>

			<div class="me-search-block__button-frame me-search-block--block-1">
				<me-button :disabled="!searchLocationKeyword" @click="searchData"
					>Search</me-button
				>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import helpers from '~/utils/helpers'
import { ADDITIONAL_DAYS } from '~/static/additional-days'

import { DURATIONS } from '~/static/durations'

export default {
	data() {
		return {
			additionalDay: null,
			checkInDate: null,
			checkOutDate: null,
			duration: null,
			searchLocationKeyword: '',
			locations: [],
			durations: DURATIONS,
			additionalDays: ADDITIONAL_DAYS,
			formSearch: {
				selectedLocation: {},
				additionalDay: null,
				duration: null
			}
		}
	},
	computed: {
		...mapState('search', ['autoComplete']),

		minCheckOutDate() {
			const date = new Date()
			const daysInMonth = helpers.countDaysInMonth(this.checkInDate)
			date.setDate(this.checkInDate.getDate() + daysInMonth - 1)
			return { to: date }
		}
	},

	created() {
		this.calculateCheckIn()
		this.init()
		this.calculateCheckOut(this.checkInDate)
	},

	methods: {
		...mapActions('search', [
			'fetchAutoComplete',
			'fetchUnit',
			'clearAutoComplete'
		]),

		init() {
			this.additionalDay = this.additionalDays['0'].label
			this.duration = this.durations['1'].label
			this.formSearch.duration = 1
			this.formSearch.additionalDay = 0
		},

		calculateCheckIn() {
			const tomorrow = new Date()
			tomorrow.setDate(new Date().getDate() + 1)
			this.checkInDate = tomorrow
		},

		calculateCheckOut(checkIndate) {
			const daysInMonth = helpers.countDaysInMonth(checkIndate)
			const days =
				+daysInMonth * +this.formSearch.duration +
				+this.formSearch.additionalDay

			const result = new Date()
			result.setDate(checkIndate.getDate() + days)
			this.checkOutDate = result
		},

		async getAutocompleteSuggestion(query) {
			this.clearAutoComplete()
			this.locations = []

			if (!query) {
				return
			}

			const params = {
				searchQuery: query
			}
			try {
				const { data } = await this.fetchAutoComplete({ params })
				let list = JSON.parse(JSON.stringify(data.data))
				list = list.map((item) => {
					let label = ''
					let value = ''
					for (const subItem of Object.values(item)) {
						value += subItem.id ? `${subItem.id}_` : '_'
						label += subItem.name ? `${subItem.name}, ` : ''
					}
					value = value.replace(/_\s*$/, '')
					label = label.replace(/,\s*$/, '')

					return { value, label }
				})
				list.pop()

				this.locations = list
			} catch (e) {}
		},

		handleAutocompleteSelection({ value, label }) {
			this.searchLocationKeyword = label
			const [unitId, districtId, cityId, provinceId] = value.split('_')
			this.formSearch.selectedLocation = {
				unitId,
				districtId,
				cityId,
				provinceId
			}

			this.$nextTick(() => {
				setTimeout(() => {
					this.locations = []
				}, 400)
			})
		},

		handleCheckInSelection(date) {
			this.init()
			this.calculateCheckOut(date)
		},

		handleDurationSelection({ value }) {
			this.formSearch.duration = value
			this.duration = this.durations[value].label
			this.calculateCheckOut(this.checkInDate)
		},

		handleAdditionalDaySelection({ value }) {
			this.formSearch.additionalDay = value
			this.additionalDay = this.additionalDays[value].label

			this.calculateCheckOut(this.checkInDate)
		},

		handleCheckOutSelection(checkOutDate) {
			const range = Math.round(
				helpers.getNumberOfDays(this.checkInDate, checkOutDate)
			)
			const daysInMonth = helpers.countDaysInMonth(this.checkInDate)
			let duration = Math.floor(range / daysInMonth)
			const moduloFromDuration = range % daysInMonth

			if (moduloFromDuration <= 15) {
				this.formSearch.additionalDay = moduloFromDuration
				this.additionalDay = this.additionalDays[`${moduloFromDuration}`].label
			} else {
				duration += 1
				this.formSearch.additionalDay = 0
				this.additionalDay = this.additionalDays[`0`].label
			}

			this.formSearch.duration = duration
			this.duration = this.durations[`${duration}`].label
		},

		async searchData() {
			const params = { ...this.formSearch }
			try {
				await this.fetchUnit({ params })
			} catch (e) {}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/baseColor.scss';
@import '~assets/scss/vueDatePicker.scss';

.me-search-block {
	&__wrapper {
		box-shadow: 0 3px 5px rgb(0 0 0 / 8%);
		background-color: #fff;
		padding: 15px;
		border-radius: 10px;
		display: flex;
		flex-wrap: wrap;
	}

	&--block-1 {
		width: calc(100% / 7);
		padding: 0 10px 0 0;
	}

	&--block-2 {
		width: calc((100% / 7) * 2);
		padding: 0 10px 0 0;
	}

	&__button-frame {
		padding-top: 25px;
	}
}
</style>
