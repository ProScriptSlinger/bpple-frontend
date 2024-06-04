import { VersionedTransaction } from "@solana/web3.js";

const getVersionedTransaction = (encodedTransaction) => {
  const recoveredTransaction = VersionedTransaction.deserialize(
    Buffer.from(encodedTransaction, "base64")
  );

  return recoveredTransaction;
};

export default getVersionedTransaction;
