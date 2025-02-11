import { ethers } from "ethers";

const infuraApiKey = import.meta.env.VITE_INFURA_API_KEY;

const provider = new ethers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${infuraApiKey}`
);

// Cache timestamps for blocks
const blockTimestamps = new Map<number, string>();

// Fetch the latest block number
export const fetchLatestBlockNumber = async (): Promise<number> => {
  return await provider.getBlockNumber();
};

export const fetchBlockDetails = async (): Promise<{
  latency: number;
  activeUsers: number;
  timestamp: string; // Add timestamp
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

    if (!blockTimestamps.has(latestBlock.number)) {
      const timestampISO = new Date(latestTimestampMs).toISOString();
      const formattedTimestamp = timestampISO.split("T")[1].split("Z")[0];
      blockTimestamps.set(latestBlock.number, formattedTimestamp);
    }

    return {
      latency: parseFloat(networkLatency.toFixed(3)),
      activeUsers,
      timestamp: blockTimestamps.get(latestBlock.number)!,
    };
  } catch (error) {
    console.error("Error fetching block details:", error);
    return {
      latency: 0,
      activeUsers: 0,
      timestamp: new Date().toISOString().split("T")[1].split("Z")[0],
    };
  }
};
