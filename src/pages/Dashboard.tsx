import {
  fetchBlockDetails,
  fetchLatestBlockNumber,
} from "@/services/EthereumService";
import { DailyTransaction } from "../components/DailyTransaction";
import { Header } from "../components/Header";
import { useEffect, useState } from "react";

export const Dashboard: React.FC = () => {
  const [latestBlock, setLatestBlock] = useState<number | null>(null);
  const [latency, setLatency] = useState<number | null>(null);
  const [activeUsers, setActiveUsers] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blockNumber = await fetchLatestBlockNumber();
        setLatestBlock(blockNumber);

        const { latency, activeUsers } = await fetchBlockDetails();
        setLatency(latency);
        setActiveUsers(activeUsers);
      } catch (error) {
        console.error("Error fetching data from Ethereum:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Header />
      <div className="px-6 py-4">
        <DailyTransaction
          latestBlock={latestBlock}
          latency={latency}
          activeUsers={activeUsers}
        />
      </div>
    </div>
  );
};
