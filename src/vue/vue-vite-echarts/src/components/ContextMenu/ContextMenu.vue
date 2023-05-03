<template>
  <div ref="containRef">
    <slot></slot>
    <Teleport to="body">
      <Transition>
        <div v-size-ob="handleSize" v-if="showMenu" class="context-menu" :style="{
          left: pos.posX + 'px',
          top: pos.posY + 'px',
        }">
          <div class="menu-list">
            <div class="menu-item" v-for="(item) in menu" :key="item.label" @click="handleClick(item)">
              {{ item.label }}
            </div>
          </div>
        </div>
      </Transition>
  
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import useContextMenu from './useContextMenu';
import vSizeOb from './resize-directive';
import useViewport from './useViewport';

const props = defineProps({
  menu: {
    type: Array<{ label: string }>,
    default: () => []
  }
})
const containerRef = ref(null);
const emit = defineEmits(['select']);
const { x, y, showMenu } = useContextMenu(containerRef);

const w = ref(0);
const h = ref(0);
function handleSize(entry: ResizeObserverEntry) {
  const box = entry.borderBoxSize[0];
  w.value = box.inlineSize;
  h.value = box.blockSize;
}
const { vw, vh } = useViewport();
const pos = computed(() => {
  let posX = x.value;
  let posY = y.value;
  const maxX = vw.value - w.value;
  const maxY = vh.value - h.value;
  if (x.value > maxX) {
    posX = posX - w.value;
  }
  if (y.value > maxY) {
    posY = posY - (y.value - maxY);
  }
  return {
    posX,
    posY
  }
})

function handleClick(item: { label: string }) {
  showMenu.value = false;
  emit('select', item);
}
</script>

<style scoped>
.context-menu {
  position: fixed;
  background-color: #eee;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2), 1px 1px 5px rgba(0, 0, 0, 0.2);
  min-width: 100px;
  border-radius: 5px;
  color: #1d1d1f;
  font-size: 12px;
  line-height: 1.8;
  white-space: nowrap;
  overflow: hidden;
}
.menu-list {
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.menu-item {
  padding: 0 2px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
}
.menu-item:hover {
  background-color: #3477d9;
  color: #ffffff;
}
.v-enter-from {
  opacity: 0;
}
.v-enter-to {
  transition: .5s;
  opacity: 1;
}
</style>