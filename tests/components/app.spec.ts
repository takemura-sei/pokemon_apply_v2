import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import App from '~/app.vue'

describe('app.vue', () => {
  it('マウントできる', async () => {
    const wrapper = await mountSuspended(App)
    expect(wrapper.exists()).toBe(true)
  })
})
