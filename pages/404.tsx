import Link from "next/link"

export default function PageNotFound() {
  return (
    <section className="w-screen h-[40vh] flex flex-col justify-center items-center gap-y-2.5">
      <span className="text-[3rem] font-bold">404</span>
      <p className="text-xl text-center">
        앗! 여기는 없는 페이지네요. <br />
        아래 링크를 통해 메인 페이지로 이동하세요 🙁
      </p>
      <div className="border px-6 py-3 mt-2.5">
        <Link href="/">홈으로 이동하기</Link>
      </div>
    </section>
  )
}
