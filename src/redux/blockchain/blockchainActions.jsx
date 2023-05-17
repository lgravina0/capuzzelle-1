// constants
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
// log
import { fetchData } from "../data/dataActions.jsx";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

const isMobile = {
  Android: function() {
      return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
  },
  any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};
export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    const abiResponse = await fetch("/config/abi.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const abi = await abiResponse.json();
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const CONFIG = await configResponse.json();
    const { ethereum } = window;
    
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if(isMobile.any() && !metamaskIsInstalled){
    window.location = 'https://metamask.app.link/dapp/capuzzelle-test.vercel.app';
    return;
 }
  
if (metamaskIsInstalled) {
  Web3EthContract.setProvider(ethereum);
  let web3 = new Web3(ethereum);
  try {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const networkId = await ethereum.request({
      method: "net_version",
    });
    if (networkId == CONFIG.NETWORK.ID) {
      const SmartContractObj = new Web3EthContract(
        abi,
        CONFIG.CONTRACT_ADDRESS
      );
      dispatch(
        connectSuccess({
          account: accounts[0],
          smartContract: SmartContractObj,
          web3: web3,
        })
      );
      // Add listeners start
      ethereum.on("accountsChanged", (accounts) => {
        dispatch(updateAccount(accounts[0]));
      });
      ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      // Add listeners end
    } else {
      dispatch(connectFailed(`Change network to ${CONFIG.NETWORK.NAME}.`));
    }
  } catch (err) {
    console.log('errore smart contract', err);
    dispatch(connectFailed("Something went wrong."));
  }
} else {
  dispatch(connectFailed("Install Metamask."));
}
};
};
export const updateAccount = (account) => {
return async (dispatch) => {
dispatch(updateAccountRequest({ account: account }));
dispatch(fetchData(account));
};
};
