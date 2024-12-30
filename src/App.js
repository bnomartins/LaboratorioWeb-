import { useState } from "react";
import CriptoDonativo from "./CriptoDonativo";

function App() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-6 text-blue-900">LABORATÓRIO WEB3 <span className="animate-pulse text-black">*</span> </h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <CriptoDonativo
          titulo="Cripto Donativo"
          descricao="Faça uma doaçõa cripto para o o instituto de apostas"
        />
        <CriptoDonativo
          titulo="Cripto Game"
          descricao="Faça uma doaçõa cripto para o o instituto de apostas"
        />
        <CriptoDonativo
          titulo="Cripto Votate"
          descricao="Faça uma doaçõa cripto para o o instituto de apostas"
        />
      </div>
    </div>
  );
}

export default App;
