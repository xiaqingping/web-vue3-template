import { onMounted, type Ref, ref } from 'vue'
import useRequest, { type SendConfig } from '@/hooks/useRequest'

interface ParamsType {
  [key: string]: any
}

interface listConfigType {
  formatResult?: (res: any) => any
}

/**
 * @description: 分页列表hook
 * @param {*} service
 * @param _params
 * @param config
 * @param sendConfig
 * @return {*}
 */
const usePageList = <T, U>(service: any, _params: any = {}, config: listConfigType = {}, sendConfig: any = {}): {
  list: Ref<T, T>;
  state: Ref<U, U>;
  params: any;
  loading: Ref<boolean, any>;
  error: Ref<any>;
  query: (_params: ParamsType, config?: SendConfig) => void;
  flash: () => void;
  nextPage: () => void;
} => {

  const listConfig = { ...config }

  // 参数
  const params = ref()

  const list = ref<T>()

  const { send, loading, error, state } = useRequest<any, any>(service)

  onMounted(() => {
    flash()
  })

  const query = (_params?: ParamsType, config: SendConfig = {}) => {
    if (_params) {
      params.value = _params
    }
    send(params.value, { ...sendConfig, ...config }).then((res: any) => {
      list.value = res?.records || []
      if (listConfig?.formatResult) {
        const resFormat = listConfig.formatResult(res?.records)
        if (resFormat) list.value = resFormat
      }
    })
  }

  const flash = () => {
    params.value = _params
    query(_params, { loading: true })
  }

  const nextPage = () => {
    if ((list.value as any[])?.length < state.value?.total) {
      params.value.pageNo += 1
      query(params.value)
    }
  }

  return { state, list, params, loading, error, query, flash, nextPage }
}

export default usePageList
