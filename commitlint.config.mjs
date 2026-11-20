// 커밋 메시지 규칙이에요. d5ng-design-system 레포의 commitlint 설정을 블로그에 맞게 옮겼어요.
// 블로그는 패키지가 하나라 scope 규칙은 뺐어요.

// GitHub이 squash 커밋 제목 끝에 붙이는 " (#12)"는 요약의 일부로 보지 않아요.
const summaryOf = (subject) => (subject ?? "").replace(/\s*\(#\d+\)$/, "")

const local = {
  rules: {
    "subject-hangul": ({ subject }) => [
      /[가-힣]/.test(summaryOf(subject)),
      "요약은 한글로 써요. 예: feat: 글 목록 분류 칩 추가",
    ],
    // 명사형인지 다 가릴 수는 없어서 문장으로 끝나는 흔한 경우만 잡아요.
    "subject-noun-form": ({ subject }) => [
      !/[다요함.]$/.test(summaryOf(subject)),
      "요약은 짧은 명사형으로 써요. '추가했어요' 대신 '추가'",
    ],
    "no-attribution": ({ raw }) => [
      !/co-authored-by:|generated with|claude\.ai\/code/i.test(raw ?? ""),
      "Co-Authored-By, 'Generated with', 세션 링크 같은 참조자는 넣지 않아요",
    ],
    "body-yo-style": ({ body }) => [
      (body ?? "")
        .split("\n")
        .filter((line) => line.trim() !== "")
        .every((line) => /요[.!?)]*$/.test(line.trim())),
      "본문은 ~요체로 써요",
    ],
    "body-max-lines": ({ body }, _when, max) => [
      (body ?? "").split("\n").filter((line) => line.trim() !== "").length <= max,
      `본문은 ${String(max)}줄 이하로 짧게 써요`,
    ],
  },
}

const config = {
  extends: ["@commitlint/config-conventional"],
  plugins: [local],
  rules: {
    "type-enum": [2, "always", ["feat", "fix", "refactor", "docs", "chore", "test"]],
    // 영어 대소문자 규칙이라 "Button 로딩 상태 추가" 같은 한글 요약을 잘못 막아요.
    "subject-case": [0],
    "header-max-length": [2, "always", 72],

    "subject-hangul": [2, "always"],
    "subject-noun-form": [2, "always"],
    "no-attribution": [2, "always"],
    "body-yo-style": [1, "always"],
    "body-max-lines": [1, "always", 3],
  },
}

export default config
