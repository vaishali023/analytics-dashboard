import { ethers } from "ethers";

const infuraApiKey = import.meta.env.VITE_INFURA_API_KEY;

const provider = new ethers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${infuraApiKey}`
);

// Fetch the latest block number
export const fetchLatestBlockNumber = async (): Promise<number> => {
  return await provider.getBlockNumber();
};

export const fetchBlockDetails = async (): Promise<{
    latency: number;
    activeUsers: number;
  }> => {
    try {
      const startTime = performance.now();
  
      const latestBlock = await provider.getBlock("latest");
      if (!latestBlock) throw new Error("Failed to fetch latest block.");
  
      const previousBlock = await provider.getBlock(latestBlock.number - 1);
      if (!previousBlock) throw new Error("Failed to fetch previous block.");
  
      const endTime = performance.now();
  
      const latestTimestampMs = latestBlock.timestamp * 1000;
      const previousTimestampMs = previousBlock.timestamp * 1000;
  
      const fetchLatency = (endTime - startTime) / 1000;
  
      const networkLatency =
        (latestTimestampMs - previousTimestampMs) / 1000 + fetchLatency;
  
      const activeUsers = latestBlock.transactions.length;
  
      // Use parseFloat to preserve the full precision for graph
      return { latency: networkLatency, activeUsers };
    } catch (error) {
      console.error("Error fetching block details:", error);
      return { latency: 0, activeUsers: 0 };
    }
  

  
};
