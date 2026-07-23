import { createClient } from '@supabase/supabase-js'
import { resolveSupabaseConfig } from '~/utils/supabase-config'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const { url, anonKey } = resolveSupabaseConfig(config.public)

  const supabase = createClient(url, anonKey)

  return {
    provide: {
      supabase,
    },
  }
})
