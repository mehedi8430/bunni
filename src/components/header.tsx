export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full bg-sidebar border-b border-border">
      <div className="flex items-center">
        <div className="w-[328px] flex items-center justify-center">
          <div className="w-[109px] h-[78px] flex items-center justify-center">
            <img src="/react.svg" alt="logo" className="object-cover" />
          </div>
        </div>

        <div className="pl-24 pr-14 flex items-center justify-between w-full">
          <div>
            <p>Support</p>
          </div>

          <div>
            <p>Support</p>
          </div>
        </div>
      </div>
    </header>
  );
}
