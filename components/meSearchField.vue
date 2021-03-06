<template>
	<div class="me-search-field">
		<div class="me-search-field__wrapper">
			<label class="me-search-field__label">
				{{ label }}
			</label>
			<div class="me-search-field__input-group">
				<div class="me-search-field__icon-frame">
					<span class="me-search-field__icon">
						<img
							class="me-search-field__icon"
							src="~assets/icon/search.svg"
							alt="search"
						/>
					</span>
				</div>
				<input
					v-model="keyword"
					class="me-search-field__input"
					type="text"
					:placeholder="placeholder"
				/>
			</div>
			<div v-if="hasResult" class="me-search-field__result">
				<ul class="me-search-field__result-frame">
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
			default: 'Search'
		},
		placeholder: {
			type: String,
			default: 'Cari'
		},
		value: {
			required: true,
			type: String
		},
		hasResult: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			keyword: ''
		}
	},
	watch: {
		value() {
			this.updateData()
		},
		keyword() {
			this.emitToParent()
		}
	},
	methods: {
		updateData() {
			this.keyword = this.value
		},
		emitToParent() {
			this.$emit('input', this.keyword)
			this.$emit('remote-method', this.keyword)
		}
	}
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/baseColor.scss';

.me-search-field {
	&__wrapper {
		font-size: 13px;
		position: relative;
	}

	&__label {
		line-height: 2;
	}

	&__input-group {
		display: flex;
		border: 1px solid $color-grey;
		border-radius: 4px;
		align-items: center;
		overflow: hidden;
	}

	&__input {
		color: $color-default;
		height: 36px;
		border: none;
		padding: 6px 8px 6px 0;
		width: 100%;
	}

	&__icon-frame {
		padding: 5px;
	}

	&__icon {
		vertical-align: middle;
		width: 24px;
		height: 24px;
	}

	&__result {
		position: absolute;
		width: 100%;
		margin: 0;
		box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
		background-color: $color-light;
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
