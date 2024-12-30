import { useState } from "react";
import { getEthBalance, transferEth, getAddress } from "./MetaMaskService";

function CriptoDonativo(props) {
  const [fromAddress, setFromAddress] = useState(
    ''
  );
  const [toAddress, setToAddress] = useState(
    // process.env.REACT_APP_CARTEIRA_ENDERECO_DESTINO
    "0x8869902889Dc3edF2F29ddAE80F0b40D55307A78"
  );
  const [value, setValue] = useState("0.00001");
  // 0x8869902889Dc3edF2F29ddAE80F0b40D55307A78
  const [balance, setBalance] = useState("");
  const [message, setMessage] = useState("");

  async function checkBalance() {
    try {
      setMessage("");
      let balance = await getEthBalance(fromAddress);
      setBalance(balance);
    } catch (err) {
      setMessage(err.message);
    }
  }

  function transferClick(from, to, val) {
    transferEth(from, to, val)
      .then((tx) => setMessage("Recibo da transferência realizada: " + tx))
      .catch((err) => setMessage(err.message));
  }

  function getAddressClick() {
    getAddress()
      .then((address) => setFromAddress(address[0]))
      .catch((err) => setMessage(err.message));
  }

  return (
    <div className="h-full p-4">
      <div className=" bg-gray-100 px-8 pt-3 pb-5 relative w-[128] rounded-lg shadow-md ring-2 ring-gray-500">
        <div className="col-span-3 text-3xl my-2 text-center font-bold uppercase text-blue-600">
          {props.titulo}
        </div>
        <div className="m-2 font-bold text-gray-500 mb-6">
          {props.descricao}
        </div>
        <div className="text-center w-full">
          <button
            className="rounded-md ring-2 ring-blue-600 text-blue-600 hover:ring-blue-400 px-2 font-bold"
            onClick={getAddressClick}
          >
            Conectar Carteira
          </button>
        </div>
        <p>
          <label className="font-bold">Origem :</label>
          <input
            type="text"
            className="border-gray-600 rounded bg-gray-200 w-full ring-1 ring-gray-400 px-2 font-bold text-gray-600 text-sm"
            onChange={(evt) => setFromAddress(evt.target.value)}
            value={fromAddress}
            disabled
          />
          <br />

          <label className="font-bold text-sm text-blue-400">
            Saldo: {balance ? parseFloat(balance).toFixed(9) + " (eth)" : ""}
          </label>

          <input
            type="button"
            className="px-1 mx-2 rounded-md ring-2 ring-orange-600 text-orange-600 hover:ring-orange-400 rounded-md font-bold"
            value="Ver Saldo"
            onClick={(evt) => checkBalance()}
          />
          <br />

          <label className="font-bold">Destinatário :</label>
          <input
            type="text"
            className="border-gray-600 rounded bg-gray-200 w-full ring-1 ring-gray-400 px-2 font-bold text-gray-600 text-sm"
            onChange={(evt) => {
              evt.target.value !== fromAddress
                ? setToAddress(evt.target.value)
                : setMessage(
                    "A conta de destino tem que ser diferente da conta de origem"
                  );
            }}
            value={toAddress}
          />
        </p>
        <p className="mt-2">
          <label className="font-bold">Tranferir:</label>
          <input
            type="text"
            className="border-gray-600 rounded bg-gray-200 w-3/5 ring-1 ring-gray-400 px-2 font-bold text-gray-600 text-sm"
            onChange={(evt) => setValue(evt.target.value)}
            value={value}
          />{" "}
          <span className="font-bold">(ETH)</span>
          <br />
        </p>
        <p></p>
        <p>
          <input
            type="button"
            className="px-2 rounded-md ring-2 ring-emerald-600 text-emerald-600 hover:ring-emerald-400 rounded-md  font-bold w-full my-4 py-2"
            value="Transferência"
            onClick={() => transferClick(fromAddress, toAddress, value)}
          />
        </p>
        <hr />

        {message ? (
          <p className="ring-red-400 ring-1 bg-red-100 p-2 text-red-800 font-bold">
            {message}
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
export default CriptoDonativo;
