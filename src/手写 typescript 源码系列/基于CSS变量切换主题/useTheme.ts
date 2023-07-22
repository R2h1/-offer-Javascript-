import { ref, watchEffect } from 'vue';

const LOCAL_KEY = '__theme__';
type Theme = 'light' | 'dark' | 'OS';

const theme = ref<Theme>((window.localStorage.getItem(LOCAL_KEY) as Theme) || 'light');
const match = matchMedia('(prefers-color-scheme: dark)');

function followOS() {
  if (match.matches) {
    document.documentElement.dataset.theme = 'dark';
  } else {
    document.documentElement.dataset.theme = 'light';
  }
}

watchEffect(() => {
  localStorage.setItem(LOCAL_KEY, theme.value);
  if (theme.value === 'OS') {
    followOS();
    match.addEventListener('change', followOS);
  } else {
    document.documentElement.dataset.theme = theme.value;
    math.removeEventListener('change', followOS);
  }
});

export default function useTheme() {
  return {
    theme
  };
}
