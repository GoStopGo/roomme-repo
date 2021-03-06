<template>
	<div class="me-dropdown">
		<div class="me-dropdown__wrapper">
			<label class="me-dropdown__label">
				{{ label }}
			</label>
			<button
				class="me-dropdown__button background-light"
				@click="toggleDropdown"
			>
				<slot name="prefix" />
				<span class="me-dropdown__button-text">{{
					selectedData || 'Select'
				}}</span>
				<me-icon :icon="['fas', 'chevron-down']" />
			</button>
			<div v-if="visibleDropdownList" class="me-dropdown__result">
				<ul class="me-dropdown__result-frame">
					<slot />
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		label: {
			type: String,
			default: ''
		},
		value: {
			type: [Number, String],
			default: null
		}
	},
	data() {
		return {
			selectedData: '',
			visibleDropdownList: false
		}
	},
	watch: {
		value() {
			this.updateData()
		},
		selectedData() {
			this.emitToParent()
		}
	},
	methods: {
		toggleDropdown() {
			this.visibleDropdownList = !this.visibleDropdownList
		},
		updateData() {
			this.selectedData = this.value
			this.visibleDropdownList = false
		},
		emitToParent() {
			this.$emit('input', this.selectedData)
		}
	}
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/baseColor.scss';

.me-dropdown {
	&__wrapper {
		font-size: 13px;
		position: relative;
	}

	&__label {
		line-height: 2;
	}

	&__button {
		color: $color-default;
		border: 1px solid $color-grey;
		border-radius: 4px;
		width: 100%;
		padding: 6px 8px;
		height: 38px;
		line-height: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		overflow: hidden;
	}

	&__button-text {
		margin: 0 5px;
	}

	&__result {
		position: absolute;
		width: 100%;
		margin: 0;
		box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
		background-color: $color-light;
		max-height: 250px;
		overflow: auto;
		border-radius: 4px;
	}

	&__result-frame {
		list-style: none;
		padding: 6px 0;
		margin: 0;
		box-sizing: border-box;
	}
}
</style>
