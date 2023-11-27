<script lang="ts">
  import type { InitData } from 'type/mobius'
  import { useFetchData } from './hook/mobius'
  import { useSubscription } from './hook/store'
  import { store_data } from './store'

  let init: { data: InitData | null; error: unknown } = { data: null, error: null }
  useFetchData()
  useSubscription({
    store: store_data,
    cb: ({ data, error }) => {
      init.data = data
      init.error = error
    },
  })
</script>

{#if init.data}
  <div>Has data</div>
{:else if init.error}
  <div>Oops Error!</div>
{:else}
  <div>Loading</div>
{/if}
