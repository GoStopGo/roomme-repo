<template>
	<div class="me-search-block">
		<div class="me-search-block__wrapper">
			<div class="me-search-block__search-field-frame me-search-block--block-2">
				<me-search-field
					v-model="searchKeyword"
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
						@select="handleSearchSelection"
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
							:disabled-dates="{ to: checkInDate }"
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
						<label class="me-dtp__label">Check in</label>
						<me-date-picker
							v-model="checkOutDate"
							class="me-search-block__check-out-date-picker me-dtp__date"
						/>
						<me-icon class="me-dtp__icon" :icon="['fas', 'calendar-alt']" />
					</client-only>
				</div>
			</div>

			<div class="me-search-block__button-frame me-search-block--block-1">
				<me-button @click="searchData">Search</me-button>
			</div>
		</div>
	</div>
</template>

<script>
import { ADDITIONAL_DAYS } from '~/static/additional-days'

import { DURATIONS } from '~/static/durations'

export default {
	data() {
		return {
			additionalDay: null,
			checkInDate: null,
			checkOutDate: null,
			duration: null,
			searchKeyword: '',
			locations: [],
			durations: DURATIONS,
			additionalDays: ADDITIONAL_DAYS,
			formSearch: {
				searchResult: {},
				additionalDay: null,
				duration: null
			}
		}
	},
	created() {
		const date = new Date()
		this.checkInDate = date
		this.duration = 1
		this.additionalDay = 0
		this.calculateCheckOut()
	},
	methods: {
		calculateCheckOut() {
			const result = 0
			// TODO formula : check in + duration + additional days
			this.checkOutDate = result
		},
		getAutocompleteSuggestion(query) {
			// TODO:: hit api to get search suggestion
			const apiResponse = [
				{
					unit: {
						id: 1,
						name: 'Test Unit',
						slug: 'test-unit'
					},
					district: {
						id: 1,
						name: 'Menteng',
						slug: 'menteng'
					},
					city: {
						id: 1,
						name: 'Jakarta Utara',
						slug: 'jakarta-utara'
					},
					province: {
						id: 1,
						name: 'DKI Jakarta',
						slug: 'dki-jakarta'
					}
				},
				{
					unit: {},
					district: {
						id: 1,
						name: 'Menteng',
						slug: 'menteng'
					},
					city: {
						id: 1,
						name: 'Jakarta Utara',
						slug: 'jakarta-utara'
					},
					province: {
						id: 1,
						name: 'DKI Jakarta',
						slug: 'dki-jakarta'
					}
				},
				{
					unit: {},
					district: {},
					city: {
						id: 1,
						name: 'Jakarta Utara',
						slug: 'jakarta-utara'
					},
					province: {
						id: 1,
						name: 'DKI Jakarta',
						slug: 'dki-jakarta'
					}
				},
				{
					unit: {},
					district: {},
					city: {},
					province: {
						id: 1,
						name: 'DKI Jakarta',
						slug: 'dki-jakarta'
					}
				},
				{
					unit: {
						id: 1,
						name: 'Test Unit',
						slug: 'test-unit'
					},
					district: {
						id: 1,
						name: 'Menteng',
						slug: 'menteng'
					},
					city: {
						id: 1,
						name: 'Jakarta Utara',
						slug: 'jakarta-utara'
					},
					province: {
						id: 1,
						name: 'DKI Jakarta',
						slug: 'dki-jakarta'
					}
				}
			]

			const result = apiResponse.map((item) => {
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
			result.pop()

			this.locations = result
		},

		handleSearchSelection({ value, label }) {
			this.searchKeyword = label
			const ids = value.split('_')
			this.formSearch.searchResult = {
				unitId: ids[0],
				districtId: ids[1],
				cityId: ids[2],
				provinceId: ids[3]
			}

			this.$nextTick(() => {
				this.locations = []
			})
		},

		handleDurationSelection({ value }) {
			this.formSearch.duration = value
			this.duration = this.durations[value].label
		},

		handleAdditionalDaySelection({ value }) {
			this.formSearch.additionalDay = value
			this.additionalDay = this.additionalDays[value].label
		},

		searchData() {
			// TODO:: hit api to get data
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
