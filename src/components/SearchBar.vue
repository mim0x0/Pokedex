<script setup>
defineProps({ modelValue: String })
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="mb-3">
    <input
      type="text"
      class="form-control form-control-lg"
      placeholder="Search Pokemon by name…"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
