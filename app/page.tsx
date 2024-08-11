"use client"
import Image from "next/image";
import { useEffect } from "react";
// import { BatchData, BatchTransaction } from "sdk";
import { BatchTransaction, BatchData } from "token_batch_sdk";


export default function Home() {
  const batch = new BatchTransaction();
  console.log(batch);

  useEffect(() => {
    const initializeObj = async() => {
      const response = await batch.init();
      console.log("response ", response, batch);
      const address = await batch.signer?.getAddress();
      console.log(address, batch.signer, batch.batchProcessingContract);
    };
    initializeObj();
  }, []);

  const sendBatchTxn = async() => {
    // const response = await batch.init();
      // console.log("response ", response);
    const batchData: BatchData[] = [
      {
        recipient: "0xaed223306A006975c00A939dBEB6d7eBd9C04d80",
        amount: "0.01"
      },
      {
        recipient: "0xBFD232CebE066d048bdd042d285CC7924171323f",
        amount: "10",
        tokenAddress: "0x857616Fbc511212A2a848dA64B4fC3b9678af6F9"
      }
    ];
    console.log("Check contracts ", batch.batchContract, batch.batchProcessingContract, batch.signer);
    const txn = await batch.processBatchTransactions(batchData);
    console.log("Transaction ==> ", txn);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={sendBatchTxn}>Send Txn</button>
    </main>
  );
}
