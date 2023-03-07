import { abi } from "./SupportTokenABI.json";
import Web3 from "web3";
import { providers, Contract, ethers } from "ethers";

require("dotenv").config();

export async function getContract() {
  console.log("hey");
  const contractAddress = "0x188AB17e37aF04a43f69f1454Fc4caC3edd3Af2D";
  const contractABI = abi;
  let supportTokenContract;
  try {
    const { ethereum } = window;
    console.log(ethereum.chainId);
    if (ethereum.chainId === "0xaef3") {
      const provider = new providers.Web3Provider(ethereum);
      console.log("provider", provider);
      const signer = provider.getSigner();
      supportTokenContract = new Contract(contractAddress, contractABI, signer);
    } else {
      throw new Error("Please connect to the Alfajores network");
    }
  } catch (error) {
    console.log("ERROR:", error);
  }
  console.log(supportTokenContract);
  return supportTokenContract;
}

export async function donate(amount,address) {
  // Approve the transfer of donation amount to the charity address

  const contract = await getContract();
  const approvalTx = await contract.approve(
    address,
    amount
  );
  console.log(await contract);
  console.log(await approvalTx);
  // Transfer tokens to another account
  const transferTx = await contract.transfer(
   address,
    amount
  );
  console.log("Transfer transaction hash: ", transferTx.transactionHash);
  const finalTx = await contract.acceptDonation(amount, {
    value: amount,
  });
  console.log(finalTx);
  //   const finaleTx = await contract.withdrawChest();
  //   console.log(finaleTx);
}
