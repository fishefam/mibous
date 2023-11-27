import { fetchData } from 'lib/mobius'
import { store_data } from 'page/store'
import { onMount } from 'svelte'

export const useFetchData = () => {
  onMount(async () => {
    try {
      const data = await fetchData()
      store_data.set({ data, error: null })
    } catch (error) {
      store_data.set({ data: null, error })
    }
  })
}
