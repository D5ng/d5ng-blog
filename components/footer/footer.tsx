export default function Footer() {
  return (
    <footer className="mt-20">
      <div className="border-t flex justify-between">
        <div className="relative flex flex-col border-r px-5 sm:px-10 py-12 flex-2 w-3/12 [&_span+span]:mt-1">
          <span className="font-medium [&+span]:mt-2">Info</span>
          <span className="text-sm">Github</span>
          <span className="text-sm">Porfoilo</span>
        </div>
        <div className="relative flex flex-col border-r px-5 sm:px-10 py-12 w-4/12"></div>
        <div className="flex flex-col px-5 sm:px-10 py-12 w-5/12 [&_span+span]:mt-1">
          <span className="font-medium [&+span]:mt-2">Skill</span>
          <span className="text-sm">HTML</span>
          <span className="text-sm">CSS</span>
          <span className="text-sm">JavaScript</span>
          <span className="text-sm">TypeScript</span>
          <span className="text-sm">React</span>
          <span className="text-sm">Next</span>
        </div>
      </div>
      <div className="border-t flex justify-between items-center px-5 sm:px-10 py-12">
        <span className="text-sm">© 2024</span>
        <span className="text-sm">DongHyun all rights reserved.</span>
        <span className="text-sm">FrontEnd</span>
      </div>
    </footer>
  )
}
