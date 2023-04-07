(async function () {
  const myChart = echarts.init(document.querySelector('.geo'));
  console.log(myChart);
  myChart.showLoading();
  const resp = await fetch('./data/china.geojson.json').then((resp) => resp.json());
  const ranks = await fetch('./data/rank.json').then((resp) => resp.json());
  echarts.registerMap('China', resp);
  myChart.setOption({
    title: {
      text: '全国各省级行政区图',
    },
    tooltip: {
      formatter: '{b} {c}',
    },
    visualMap: {
      left: 'left',
      top: 'center',
      min: 1,
      max: 36,
      text: ['高', '低'],
      calculable: true,
    },
    series: [
      {
        type: 'map',
        map: 'China',
        roam: true,
        scaleLimit: {
          min: 0.7,
          max: 3,
        },
        data: ranks,
      },
    ],
  });
  myChart.hideLoading();
})();
