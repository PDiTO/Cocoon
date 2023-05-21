const TokenizableEntities = () => {
  return (
    <section id="tokenize">
      <div className="flex flex-col  justify-center items-center h-screen text-white">
        <h1 className="text-4xl font-thin py-4">Tokenizable Entities Demo</h1>
        <div className="grid grid-flow-row md:grid-cols-4 gap-8">
          <div className="col-span-1 bg-white bg-opacity-25 w-52 h-72 rounded-md">
            <p className="text-center p-2 font-thin">Generate Entity</p>
          </div>
          <div className="col-span-1 bg-white bg-opacity-25 w-52 h-72 rounded-md">
            <p className="text-center p-2 font-thin">Tokenize Entity</p>
          </div>
          <div className="col-span-1 bg-white bg-opacity-25 w-52 h-72 rounded-md">
            <p className="text-center p-2 font-thin">Transfer</p>
          </div>
          <div className="col-span-1 bg-white bg-opacity-25 w-52 h-72 rounded-md">
            <p className="text-center p-2 font-thin">Burn & Create</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenizableEntities;
