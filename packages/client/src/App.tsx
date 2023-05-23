import AndBeyond from "./views/AndBeyond";
import ComposableSecurities from "./views/ComposableSecurities";
import Navbar from "./views/Navbar";
import Splash from "./views/Splash";
import TokenizableEntities from "./views/TokenizableEntities";

export const App = () => {
  return (
    <>
      <Navbar />
      <Splash />
      <TokenizableEntities />
      <ComposableSecurities />
      <AndBeyond />
    </>
  );
};
