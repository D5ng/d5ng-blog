// eslint-disable-next-line no-unused-vars
type Callback = () => void

export function throttle(callback: Callback, delay: number) {
  let timer: boolean

  return () => {
    if (timer) return
    timer = !!setTimeout(() => (timer = false), delay)
    callback()
  }
}
