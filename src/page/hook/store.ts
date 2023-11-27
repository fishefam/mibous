import { onDestroy, onMount } from 'svelte'
import type { Readable, Subscriber, Unsubscriber, Writable } from 'svelte/store'

export const useSubscription = <T>(params: { cb: Subscriber<T>; store: Writable<T> | Readable<T> }) => {
  let unsubscribe: Unsubscriber
  onMount(() => {
    unsubscribe = params.store.subscribe(params.cb)
  })
  onDestroy(() => (unsubscribe ? unsubscribe() : null))
}
