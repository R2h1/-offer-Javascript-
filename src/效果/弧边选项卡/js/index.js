const doms = {
  button: document.querySelector('button'),
};

doms.button.addEventListener('click', function (e) {
  const { count } = e.currentTarget.dataset;
  e.currentTarget.dataset.count = Number(count) + 1;
});
