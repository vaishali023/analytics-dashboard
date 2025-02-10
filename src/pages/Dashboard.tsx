import {
  fetchBlockDetails,
  fetchLatestBlockNumber,
} from "@/services/EthereumService";
import { DailyTransaction } from "../components/DailyTransaction";
import { Header } from "../components/Header";
import { useEffect, useState } from "react";
import { EthereumCharts } from "@/components/EthereumCharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Dashboard: React.FC = () => {
  const [latestBlock, setLatestBlock] = useState<number | null>(null);
  const [activeUsers, setActiveUsers] = useState<number | null>(null);
  const [blockNumbers, setBlockNumbers] = useState<number[]>([]);
  const [latency, setLatency] = useState<number | null>(null);
  const [latencyValues, setLatencyValues] = useState<number[]>([]);
  const [timeStamps, setTimeStamps] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blockNumber = await fetchLatestBlockNumber();
        const { latency, activeUsers } = await fetchBlockDetails();

        if (latency !== null && !isNaN(latency)) {
          const now = new Date().toLocaleTimeString();

          setLatestBlock(blockNumber);
          setActiveUsers(activeUsers);
          setLatency(latency);
          setLatencyValues((prev) => [...prev.slice(-9), latency]);
          setBlockNumbers((prev) => [...prev.slice(-9), blockNumber]);
          setTimeStamps((prev) => [...prev.slice(-9), now]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
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
        <div className="mt-6 flex flex-col items-center">
          <Tabs defaultValue="blockNumbers" className="w-full">
            <TabsList className="w-[320px] flex justify-between bg-gray-100 dark:bg-[#111] py-6 rounded-full border border-gray-300 dark:border-gray-700">
              <TabsTrigger
                value="blockNumbers"
                className="w-1/2 text-center px-4 py-2 text-md rounded-full font-medium transition-all duration-300 ease-in-out
                    data-[state=active]:bg-[#6F41D2] dark:data-[state=active]:bg-[#6F41D2] data-[state=active]:text-white
                    hover:bg-[#6F41D2]/20 dark:hover:bg-[#6F41D2]/40
                    focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-[#6F41D2]/50 dark:focus-visible:ring-[#6F41D2]/60"
              >
                Block Numbers
              </TabsTrigger>
              <TabsTrigger
                value="networkLatency"
                className="w-1/2 text-center px-4 py-2 text-md rounded-full font-medium transition-all duration-300 ease-in-out
                    data-[state=active]:bg-[#6F41D2] dark:data-[state=active]:bg-[#6F41D2] data-[state=active]:text-white
                    hover:bg-[#6F41D2]/20 dark:hover:bg-[#6F41D2]/40
                    focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-[#6F41D2]/50 dark:focus-visible:ring-[#6F41D2]/60"
              >
                Network Latency
              </TabsTrigger>
            </TabsList>

            <div className="mt-4 w-full">
              <TabsContent
                value="blockNumbers"
                className="transition-all duration-300 ease-in-out"
              >
                <EthereumCharts
                  title="Block Numbers"
                  labels={timeStamps}
                  dataPoints={blockNumbers}
                  type="line"
                />
              </TabsContent>

              <TabsContent
                value="networkLatency"
                className="transition-all duration-300 ease-in-out"
              >
                <EthereumCharts
                  title="Network Latency (Seconds)"
                  labels={timeStamps}
                  dataPoints={latencyValues}
                  type="bar"
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
