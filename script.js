/**
 * 动画函数
 * @param {HTMLElement} element - 要进行动画的元素
 * @param {Object} properties - 要应用的CSS属性
 * @param {number} duration - 动画持续时间（毫秒）
 * @returns {Promise} - 返回一个Promise，动画完成后解决
 */
function animateElement(element, properties, duration) {
    return new Promise((resolve) => {
      // 设置动画持续时间
      element.style.transition = `all ${duration}ms ease`;
  
      // 应用新的样式属性
      Object.assign(element.style, properties);
  
      // 定义事件处理函数
      function handleTransitionEnd(event) {
        if (event.target === element) {
          element.removeEventListener('transitionend', handleTransitionEnd);
          resolve();
        }
      }
  
      // 监听动画结束事件
      element.addEventListener('transitionend', handleTransitionEnd);
    });
  }
  
  /**
   * 延迟函数
   * @param {number} ms - 延迟时间（毫秒）
   * @returns {Promise} - 返回一个在指定时间后解决的Promise
   */
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  /**
   * 执行动画序列
   */
  async function runAnimations() {
    const box = document.getElementById('box');
  
    try {
      // 第一步动画：向右移动100px
      await animateElement(box, { transform: 'translateX(100px)' }, 1000);
      console.log('第一步动画完成');
  
      // 延迟500毫秒
      await delay(500);
  
      // 第二步动画：背景颜色变为蓝色
      await animateElement(box, { backgroundColor: 'blue' }, 500);
      console.log('第二步动画完成');
  
      // 延迟300毫秒
      await delay(300);
  
      // 第三步动画：向下移动50px
      await animateElement(box, { transform: 'translateY(50px)' }, 800);
      console.log('第三步动画完成');
    } catch (error) {
      console.error('动画执行过程中发生错误:', error);
    }
  }
  
  // 绑定点击事件，启动动画序列
  document.getElementById('startButton').addEventListener('click', runAnimations);
  