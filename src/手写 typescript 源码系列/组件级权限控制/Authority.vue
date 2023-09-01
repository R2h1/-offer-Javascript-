<template>
  <slot v-if="isShow" :userPermissions="permissions"></slot>
</template>

<script setup>
import { computed } from 'vue';
import { useAuth } from './useAuth';

const props = defineProps({
  permission: { // 组件需要的权限
    type: [String, Array],
  }
})

const { permissions } = useAuth(); // 当前用户拥有的权限

const isShow = computed(() => {
  if (!props.permission) {
    // 没有传入权限，直接显示
    return true;
  }
  if (!permissions) {
    return false;
  }

  if (Array.isArray(props.permission)) {
    return props.permission.every((p) => permissions.value.includes(p));
  }
  return permissions.value.includes(props.permission);
})

</script>