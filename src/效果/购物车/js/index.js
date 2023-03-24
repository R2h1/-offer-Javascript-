// 单件商品的 UI 数据
class UIGoods {
  constructor(data) {
    data = JSON.parse(JSON.stringify(data));
    // 冻结
    Object.freeze(data);
    // 单件商品的原始数据
    Object.defineProperty(this, 'data', {
      get() {
        return data;
      },
      set() {
        throw new Error('属性 data 是只读的');
      },
    });
    // 该商品选择数量
    let initSelectedCount = 0;
    Object.defineProperty(this, 'selectedCount', {
      configurable: false,
      get() {
        return initSelectedCount;
      },
      set(val) {
        if (typeof val !== 'number') {
          throw new Error('属性 selectedCount 只能是数字');
        }
        if (val < 0 || val !== parseInt(val)) {
          throw new Error('属性 selectedCount 只能是自然数');
        }
        initSelectedCount = val;
      },
    });
    // 密封
    Object.seal(this);
  }
  // 单件商品的选中总价
  get selectedPrice() {
    // 选中数量乘以单价
    return this.selectedCount * this.data.price;
  }
  // 本商品是否有选中
  get isSelected() {
    return this.selectedCount > 0;
  }
  // 增加选中数量
  selectedCountIncrease(count = 1) {
    this.selectedCount = this.selectedCount + count;
  }
  // 减少选中数量
  selectedCountDecrease(count = 1) {
    if (this.selectedCount < count) {
      this.selectedCount = 0;
      return;
    }
    this.selectedCount = this.selectedCount - count;
  }
}

class UIData {
  constructor(goods, { deliveryThreshold = 18, deliveryFee = 4.5 } = {}) {
    this.uiGoods = UIData.createUiGoods(goods);
    // 配送门槛
    this.deliveryThreshold = deliveryThreshold;
    // 配送费
    this.deliveryFee = deliveryFee;
  }
  static createUiGoods(goods) {
    return goods.reduce((acc, item, index) => {
      acc.push(new UIGoods(item));
      return acc;
    }, []);
  }
  // 总共的选中价格
  get totalSelectedPrice() {
    return this.uiGoods.reduce((acc, item) => {
      acc = acc + item.selectedPrice;
      return acc;
    }, 0);
  }
  // 总共的选中数量
  get totalSelectedCount() {
    return this.uiGoods.reduce((acc, item) => {
      acc = acc + item.selectedCount;
      return acc;
    }, 0);
  }
  // 购物车是否有东西
  get hasGoodsInShoppingCart() {
    return this.totalSelectedCount > 0;
  }
  // 是否达到配送门槛
  get isOverDeliveryThreshold() {
    return this.totalSelectedPrice >= this.deliveryThreshold;
  }
  // 还差多少到达配送门槛
  get priceGapOfDeliveryThreshold() {
    const diff = this.deliveryThreshold - this.totalSelectedPrice;
    return diff > 0 ? diff : 0;
  }
  // 增加某件商品的选中数量
  selectedIncrease(index, count = 1) {
    this.uiGoods[index].selectedCountIncrease(count);
  }
  // 减少某件商品的选中数量
  selectedDecrease(index, count = 1) {
    this.uiGoods[index].selectedCountDecrease(count);
  }
  // 某件商品是否选中
  isSelected(index) {
    return this.uiGoods[index].isSelected;
  }
}

class UI {
  constructor(
    goods,
    options = {
      deliveryThreshold: 18,
      deliveryFee: 4.5,
    }
  ) {
    this.uiData = new UIData(goods, options);
    this.doms = {
      goodsContainer: document.querySelector('.goods-list'),
      deliveryFee: document.querySelector('.fee'),
      payContainer: document.querySelector('.pay-container'),
      gapDeliveryThreshold: document.querySelector('.gap-delivery-threshold'),
      totalPrice: document.querySelector('.total-price .price'),
      cart: document.querySelector('.cart'),
      badge: document.querySelector('.badge'),
      addToCartContainer: document.querySelector('.add-to-cart'),
      addToCartIcon: document.querySelector('.add-to-cart .i-jiajianzujianjiahao'),
    };
    const cartRect = this.doms.cart.getBoundingClientRect();
    this.jumpTarget = {
      x: cartRect.left + cartRect.width / 2,
      y: cartRect.top + cartRect.height / 5,
    };
    this.createGoodsElements();
    this.initEvent();
  }

  // 根据商品数据创建商品列表元素
  createGoodsElements() {
    this.doms.goodsContainer.innerHTML = this.uiData.uiGoods.reduce(
      (acc, { data: { pic, title, desc, sellNumber, favorRate, price }, selectedCount }, index) => {
        acc =
          acc +
          `<div class="goods-item">
      <img src="${pic}" alt="" class="goods-pic">
      <div class="goods-info">
        <h2 class="goods-title">${title}</h2>
        <p class="goods-desc">${desc}</p>
        <p class="goods-sell">
          <span>月售 ${sellNumber}</span>
          <span>好评率${favorRate}%</span>
        </p>
        <div class="goods-confirm">
          <p class="goods-price">
            <span class="goods-price-unit">￥</span>
            <span>${price}</span>
          </p>
          <div class="goods-btns">
            <i data-index="${index}" class="iconfont i-jianhao"></i>
            <span>${selectedCount}</span>
            <i data-index="${index}" class="iconfont i-jiajianzujianjiahao"></i>
          </div>
        </div>
      </div>
    </div>`;
        return acc;
      },
      ''
    );
  }
  // 事件初始化
  initEvent() {
    const { addToCartContainer, goodsContainer, addToCartIcon } = this.doms;
    goodsContainer.addEventListener('click', (e) => {
      const { classList, dataset } = e.target;
      const { index } = dataset;
      if (classList.contains('i-jiajianzujianjiahao')) {
        this.increase(index);
      } else if (classList.contains('i-jianhao')) {
        this.decrease(index);
      }
    });
    addToCartIcon.addEventListener('transitionend', () => {
      addToCartContainer.style.display = 'none';
      this.cartAnimate();
      this.isAnimating = false;
    });
  }
  // 增加某个商品
  increase(index, count = 1) {
    // 如果动画正在进行中
    if (this.isAnimating) {
      return;
    }
    this.uiData.selectedIncrease(index, count);
    this.updateGoodsItemUI(index);
    this.updateFooterUI();
    this.jumpAnimate(index);
  }
  // 减少某个商品
  decrease(index, count = 1) {
    this.uiData.selectedDecrease(index, count);
    this.updateGoodsItemUI(index);
    this.updateFooterUI();
  }
  // 更新商品 item UI
  updateGoodsItemUI(index) {
    const goodsDom = this.doms.goodsContainer.children[index];
    if (this.uiData.isSelected(index)) {
      !goodsDom.classList.contains('active') && goodsDom.classList.add('active');
    } else {
      goodsDom.classList.remove('active');
    }
    const selectedCountDom = goodsDom.querySelector('.goods-btns span');
    selectedCountDom.textContent = this.uiData.uiGoods[index].selectedCount;
  }
  // 更新 footer UI
  updateFooterUI() {
    this.updateCartUI();
    this.updateDeliveryFeeUI();
    this.updateTotalPriceUI();
    this.updatePayUI();
  }
  // 更新购物车UI
  updateCartUI() {
    // 设置购物车中的数量
    this.doms.badge.textContent = this.uiData.totalSelectedCount;
    // 设置购物车的样式状态
    if (this.uiData.hasGoodsInShoppingCart) {
      !this.doms.cart.classList.contains('active') && this.doms.cart.classList.add('active');
    } else {
      this.doms.cart.classList.remove('active');
    }
  }
  // 更新总价UI
  updateTotalPriceUI() {
    // 设置总价
    this.doms.totalPrice.textContent = this.uiData.totalSelectedPrice.toFixed(2);
  }
  // 更新配送费 UI
  updateDeliveryFeeUI() {
    // 设置配送费
    this.doms.deliveryFee.textContent = this.uiData.deliveryFee;
  }
  updatePayUI() {
    // 达到配送标准 且 payContainer 没有 active
    const { classList } = this.doms.payContainer;
    if (this.uiData.isOverDeliveryThreshold) {
      !classList.contains('active') && classList.add('active');
    } else {
      classList.contains('active') && classList.remove('active');
      this.doms.gapDeliveryThreshold.textContent = this.uiData.priceGapOfDeliveryThreshold.toFixed(2);
    }
  }
  // 商品 + 图标抛物线跳到购物车
  jumpAnimate(index) {
    const { addToCartContainer, addToCartIcon, goodsContainer } = this.doms;
    // 找到对应商品的加号
    const addDom = goodsContainer.children[index].querySelector('.i-jiajianzujianjiahao');
    const { left: startX, top: startY } = addDom.getBoundingClientRect();
    this.isAnimating = true;
    // 设置初始位置
    addToCartContainer.style.transform = `translateX(${startX}px)`;
    addToCartIcon.style.transform = `translateY(${startY}px)`;
    addToCartContainer.style.display = 'block';
    // 下一次重绘之前执行
    window.requestAnimationFrame(() => {
      // 设置结束位置
      addToCartContainer.style.transform = `translateX(${this.jumpTarget.x}px)`;
      addToCartIcon.style.transform = `translateY(${this.jumpTarget.y}px)`;
    });
  }
  cartAnimate() {
    this.doms.cart.classList.add('animate');
  }
}

new UI(goods);
