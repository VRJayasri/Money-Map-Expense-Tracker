const Header = () => {
  return (
    <header className="flex items-center gap-2 bg-[rgb(78,52,46)]   px-4 py-3 shadow-md">
      <img src="src/assets/logo.svg" alt="logo" className="w-13 h-14" />

      <div className="font-extrabold text-[25px] ">
        <button
          onClick={() => window.location.reload()}
          className="cursor-pointer hover:opacity-80 transition text-[rgb(225,255,240)] "
        >
          Money tracker
        </button>
      </div>
    </header>
  );
};

export default Header;
