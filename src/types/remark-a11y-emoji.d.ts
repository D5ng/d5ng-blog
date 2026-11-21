// 이 패키지는 타입을 내보내지 않아요. remark 플러그인 모양만 알려 줘요.
declare module "@fec/remark-a11y-emoji" {
  const remarkA11yEmoji: () => (tree: unknown) => void
  export default remarkA11yEmoji
}
