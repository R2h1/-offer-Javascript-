import { onMounted, onUnmounted, ref } from 'vue';
const vw = ref(document.documentElement.clientWidth);
const vh = ref(document.documentElement.clientHeight);

export default function () {
  const handleResize = () => {
    vw.value = document.documentElement.clientWidth;
    vh.value = document.documentElement.clientHeight;
  };
  onMounted(() => {
    window.addEventListener('resize', handleResize);
  });
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });
  return {
    vw,
    vh,
  };
}
