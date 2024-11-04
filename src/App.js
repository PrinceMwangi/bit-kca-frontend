import logo from './logo.svg';
import './App.css';
import { useState } from "react";

//import the web3 module
import { Web3 } from "web3";

//import the contract address and the ABI
const ADDRESS = "0xC5Cf16c0C1907b246F776c5EE68ed2105CE43db8";
const ABI = [{"inputs":[{"internalType":"uint256","name":"startingPoint","type":"uint256"},{"internalType":"string","name":"startingMessage","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"decreaseNumber","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"increaseNumber","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"message","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"newMessage","type":"string"}],"name":"setMessage","outputs":[],"stateMutability":"nonpayable","type":"function"}]
 


function App() {
  const [number, setNumber] = useState("none");

  //initialise the web3 object
  const web3 = new Web3(window.ethereum);

  //initialise the contract ABI and ADDRESS
  const myContract = new web3.eth.Contract(ABI, ADDRESS);

  //reading functions
  //number
  async function getNumber() {
    const result = await myContract.methods.getNumber().call();

    setNumber(result.toString());

  }
  //writing functions
   async function increaseNumber() {
    const accountsConnected = await web3.eth.requestAccounts();
     
  
  const txReceipt = await myContract.methods.increaseNumber().send({ from: accountsConnected[0] });
    console.log(txReceipt);

    getNumber();
   }

  async function decreaseNumber() {
    const connectedAccounts =await web3.eth.requestAccounts();

    const txReceipt = await myContract.methods.decreaseNumber().send({ from: connectedAccounts[0] });
    console.log(txReceipt);

    getNumber();
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={getNumber}>Get number </button>
        <br />
        <button>Get message</button>
        <br />
        <button onClick={increaseNumber}>Increase Number</button>
        <br />
        <button>Decrease Number </button>
        <br />
        <p>Number: {number} </p>
        <br />
        <input />
        <br />
        <button>Update Message</button>
      </header>
    </div>
  );
}

export default App;
