import ComposableSecurities from "./views/ComposableSecurities";
import Splash from "./views/Splash";
import TradeableEntities from "./views/TradeableEntities";

export const App = () => {
  return (
    <>
      <Splash />
      <ComposableSecurities />
      <TradeableEntities />
    </>
  );
};
