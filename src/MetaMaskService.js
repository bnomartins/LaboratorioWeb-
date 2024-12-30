import Web3 from "web3";

async function getMetaMaskProvider() {
  if (!window.ethereum) throw new Error(`No MetaMask found!`);

  const web3 = new Web3(window.ethereum);

  const accounts = await web3.eth.requestAccounts();

  if (!accounts || !accounts.length)
    throw new Error("Wallet not found/allowed!");
  return { web3, accounts };
}

export async function getAddress() {
  const { web3 } = await getMetaMaskProvider();
  const address = web3.eth.requestAccounts();
  return address;
}

export async function getEthBalance(address) {
  const { web3 } = await getMetaMaskProvider();
  const balance = await web3.eth.getBalance(address);
  return web3.utils.fromWei(balance, "ether"); // Gera erro
  // return balance;
}
//  ether

export async function transferEth(myAddress, toAddress, quantity) {
  const {web3} = await getMetaMaskProvider();
  const value = web3.utils.toWei(quantity, "ether");

  const nonce = await web3.eth.getTransactionCount(myAddress, "latest");
  const transaction = {
    from: myAddress,
    to: toAddress,
    value,
    gas: 21000,
    nonce,
  };
  const tx = await web3.eth.sendTransaction(transaction);

  return tx.transactionHash;
}


export async function transfer(from, to, quantity){
    const web3 = await getMetaMaskProvider();
    const value = web3.toWei(quantity, 'ether');

    const nonce = await web3.eth.getTransactionCount(from, 'latest')

    // Montar uma transação
    const transaction = {
        from,
        to,
        value,
        gas: 21000,
        nonce
    }

    // Enviando para blockchain - Recibo de Transação
    const tx = web3.eth.sendTransaction(transaction);
    return tx.transactionHash;

}