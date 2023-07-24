<template>
  <template v-if="formState">
    <a-form-item :label="formState.payload.label">
      <template v-if="formState.type === 'input'">
        <a-input v-model:value="formState.payload.value"></a-input>
      </template>
      <template v-else-if="formState.type === 'checkbox'">
        
      </template>
      <template v-else-if="formState.type === 'select'">
      </template>
      <template v-else-if="formState.type === 'radio'">
      </template>
    </a-form-item>
    <FormItemComp :form-state="getNext()"></FormItemComp>
  </template>
</template>

<script setup lang="ts">
import { FormItem } from './FormItem';

const props = defineProps<{
  formState: FormItem | null;
}>();

function getNext(): FormItem | null {
  let current: FormItem | null = props.formState;
  if (!current) {
    return null;
  }
  const ancestors = [];
  ancestors.unshift(current);
  while (current.parent) {
    current = current.parent;
    ancestors.unshift(current);
  }
  return props.formState!.next(props.formState!, ancestors);
}
</script>