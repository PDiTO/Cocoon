import cocoon from "../assets/logos/cocoon.svg";

const Splash = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img className="object-cover w-10 rotate-12" src={cocoon} />
      <h1 className="text-white text-6xl font-thin">Cocoon</h1>
      <p className="text-white text-md font-thin">
        composable securities, tradeable entities
      </p>
    </div>
  );
};

export default Splash;
