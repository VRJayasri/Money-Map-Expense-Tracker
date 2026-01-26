const Header = () => {
  return (
    <header className="flex items-center gap-2 bg-yellow-200 px-4 py-3 shadow-md">
      <img src="src/assets/logo.svg" alt="logo" className="w-13 h-14" />

      <div className="font-extrabold text-[25px] text-black">Money tracker</div>
    </header>
  );
};

export default Header;
