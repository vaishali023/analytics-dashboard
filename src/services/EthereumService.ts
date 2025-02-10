import { ethers } from "ethers";

const infuraApiKey = import.meta.env.VITE_INFURA_API_KEY;

// Create a provider using the Infura endpoint
const provider = new ethers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${infuraApiKey}`
);

// Fetch the latest block number
export const fetchLatestBlockNumber = async (): Promise<number> => {
  return await provider.getBlockNumber();
};

// Fetch details of the latest block
export const fetchBlockDetails = async (): Promise<{
  latency: number | null;
  activeUsers: number | null;
}> => {
  try {
    const latestBlock = await provider.getBlock("latest");
    if (!latestBlock) {
      throw new Error("Unable to fetch the latest block.");
    }

    const previousBlock = await provider.getBlock(latestBlock.number - 1);
    if (!previousBlock) {
      throw new Error("Unable to fetch the previous block.");
    }

    const latency = latestBlock.timestamp - previousBlock.timestamp;

    const activeUsers = latestBlock.transactions.length;

    return { latency, activeUsers };
  } catch (error) {
    console.error("Error fetching block details:", error);
    return { latency: null, activeUsers: null };
  }
};
