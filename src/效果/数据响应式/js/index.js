const person = {
  name: 'zed',
  age: '27',
};

// 观察
observe(person);

// 显示姓氏
function showName() {
  document.querySelector('.name').textContent = `姓名：${person.name}`;
}

// 显示年龄
function showAge() {
  document.querySelector('.age').textContent = `年龄: ${person.age}`;
}

// 执行数据更新函数
wrapperRun(showName);
wrapperRun(showAge);
