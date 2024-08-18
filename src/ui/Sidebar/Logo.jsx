import image from "../../../public/icon.png";

function Logo() {
  return (
    <div className="absolute left-9 top-5 flex items-center gap-2 sm:left-[116px] sm:top-5 sm:-translate-x-[58px] sm:flex-col">
      <img src={image} alt="Logo" className="h-12 w-12 sm:h-20 sm:w-20" />
      <p className="text-base font-bold tracking-widest sm:text-lg">
        Bella Pizza
      </p>
    </div>
  );
}

export default Logo;
