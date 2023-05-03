import { onMounted, onUnmounted, ref } from 'vue';

export default function (containRef: { value: HTMLDivElement | null }) {
  const showMenu = ref(false);
  const x = ref(0);
  const y = ref(0);

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    showMenu.value = true;
    x.value = event.clientX;
    y.value = event.clientY;
  };

  function closeMenu() {
    showMenu.value = false;
  }

  onMounted(() => {
    const div = containRef.value as HTMLDivElement;
    div.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('click', closeMenu, true);
    window.addEventListener('contextmenu', closeMenu, true);
  });

  onUnmounted(() => {
    const div = containRef.value as HTMLDivElement;
    div.removeEventListener('contextmenu', handleContextMenu);
    window.removeEventListener('click', closeMenu, true);
    window.removeEventListener('contextmenu', closeMenu, true);
  });

  return {
    x,
    y,
    showMenu,
  };
}
