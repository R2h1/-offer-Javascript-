<template>
  <div class="watermark-container">
    <slot></slot>
  </div>
</template>


<script setup>
import { onMounted, onUnmounted, ref, watchEffect } from 'vue';
import useWatermarkBg from './useWatermarkBg';
const props = defineProps({
  // 背景图文本
  text: {
    type: String,
    required: true,
    default: 'watermark'
  },
  // 背景图的字体大小
  fontSize: {
    type: Number,
    default: 40,
  },
  // 背景图的间距
  gap: {
    type: Number,
    default: 20,
  },
})
const bg = useWatermarkBg(props);
const parentRef = ref(null);
const flag = ref(0);

let div;
watchEffect(() => {
  flag.value;
  if (!parentRef.value) {
    return;
  }
  if (div) {
    div.remove();
  }
  const { base64, styleSize } = bg.value;
  div = document.createElement('div');
  div.style.backgroundImage = `url(${base64})`;
  div.style.backgroundSize = `${styleSize}px ${styleSize}px`;
  div.style.backgroundRepeat = 'repeat';
  div.style.zIndex = '9999';
  div.style.position = 'absolute';
  div.style.inset = 0; // 同时设置4个方向的值（left, top, right, bottom）
  parentRef.value.appendChild(div);
})

let ob;
onMounted(() => {
  ob = new MutationObserver((records) => {
    for (const record of records) {
      for (const dom of record.removedNodes) {
        if (dom === div) {
          flag.value = flag.value + 1;
          return;
        }
      }

      if (record.target === div) {
        flag.value = flag.value + 1;
        return;
      }
    }
  });
  ob.observe(parentRef.value, {
    childList: true,
    attributes: true,
    subtree: true
  });
})

onUnmounted(() => {
  ob && ob.disconnect();
  div = null;
})

</script>

<style scoped>
.watermark-container {
  position: relative;
}
</style>