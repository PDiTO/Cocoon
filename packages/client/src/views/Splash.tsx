import cocoon from "../assets/logos/cocoon.svg";
import mudLogo from "../assets/logos/mud-logo.png";
import nftStorageLogo from "../assets/logos/nftstorage-logo.png";
import ScrollButton from "./components/ScrollButton";

const Splash = () => {
  return (
    <section id="splash">
      <div className="flex flex-col justify-center items-center h-screen">
        <img className="object-cover w-32 rotate-12" src={cocoon} />
        <h1 className="text-white text-8xl font-thin">Cocoon</h1>
        <p className="text-white text-xl font-thin">
          tokenizable entities, composable securities
        </p>

        <div className="mt-6">
          <p className="text-sm text-white font-thin gap text-center">
            powered by
          </p>
          <div className="grid gap-1 grid-cols-2 justify-center items-center">
            <img className="object-cover h-16 " src={mudLogo} />
            <img className="object-cover h-20" src={nftStorageLogo} />
          </div>
        </div>

        <div className="mt-6">
          <div className="grid gap-8 grid-cols-2 justify-center items-center">
            <ScrollButton
              buttonText="Tokenize Demo"
              sectionId="tokenize"
              buttonStyles="outline outline-1 text-white font-sm  font-thin my-4 py-2 px-4 rounded-lg uppercase hover:bg-white hover:text-slate-700 hover:outline-white"
            />
            <ScrollButton
              buttonText="Compose Demo"
              sectionId="compose"
              buttonStyles="outline outline-1 text-white font-sm  font-thin my-4 py-2 px-4 rounded-lg uppercase hover:bg-white hover:text-slate-700 hover:outline-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Splash;
