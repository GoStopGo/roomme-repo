<template>
	<div class="me-input-field">
		<label v-if="label" class="me-input-field__label">
			{{ label }}
		</label>
		<input
			v-model="input"
			class="me-input-field__input"
			type="text"
			:placeholder="placeholder"
			:disabled="disabled"
		/>
	</div>
</template>

<script>
export default {
	props: {
		placeholder: {
			type: String,
			default: ''
		},
		label: {
			type: String,
			default: 'test'
		},
		value: {
			required: true,
			type: [Number, String]
		},
		disabled: Boolean
	},
	data() {
		return {
			input: ''
		}
	},
	watch: {
		value() {
			this.updateData()
		},
		input() {
			this.emitToParent()
		}
	},
	methods: {
		updateData() {
			this.input = this.value
		},
		emitToParent() {
			this.$emit('input', this.input)
		}
	}
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/baseColor.scss';

.me-input-field {
	font-size: 13px;

	&__label {
		line-height: 2;
	}

	&__input {
		color: $color-default;
		border: 1px solid $color-grey;
		border-radius: 4px;
		width: 100%;
		padding: 6px 8px 6px 30px;
		height: 38px;
		line-height: 1;
	}
}
</style>
