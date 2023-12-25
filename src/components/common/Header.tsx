import Images from "../../images/Images";
import { IoMdLogIn } from "react-icons/io";

const Header = () => {
  const handleLoginButtonClick = () => {
    console.log("You click on login  button");
  };

  return (
    <header className="bg-slate-900 px-6 py-8 flex flex-row justify-between">
      <div>
        <img src={Images.logo} height={30} width={73} alt="logo" />
      </div>
      <div>
        <button
          title="Click to login"
          onClick={handleLoginButtonClick}
          className="flex flex-row gap-x-3 items-center hover:bg-slate-800 p-2 rounded"
        >
          <IoMdLogIn color="white" size={20} />
          <span className="text-white">Login</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
