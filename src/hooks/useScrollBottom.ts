import type { Ref } from 'vue'

const useScrollBottom = (scrollContainer: Ref<any>, callback: any) => {
  const onScroll = () => {
    if (scrollContainer.value) {
      // 当前滚动高度
      const scrollTop = scrollContainer.value.scrollTop;
      // 容器内容高度
      const scrollHeight = scrollContainer.value.scrollHeight;
      // 容器可视高度
      const clientHeight = scrollContainer.value.clientHeight;

      // 判断是否滚动到底部
      if (scrollTop + clientHeight >= scrollHeight) {
        console.log('已触底');
        if (callback) {
          callback()
        }
      }
    }
  }

  return { onScroll }
}

export default useScrollBottom
