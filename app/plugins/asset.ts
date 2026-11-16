export default defineNuxtPlugin(() => {
  const base = useRuntimeConfig().app.baseURL

  return {
    provide: {
      asset: (path: string) => (path.startsWith('http') ? path : base + path.replace(/^\//, '')),
    },
  }
})
