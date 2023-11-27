import { writable } from 'svelte/store'
import type { InitData } from 'type/mobius'

export const store_data = writable<{ data: InitData | null; error: unknown | null }>({
  data: null,
  error: null,
})
