import { Card } from "./Card";

interface DailyTransactionProps {
  latestBlock: number | null;
  latency: number | null;
  activeUsers: number | null;
}

export const DailyTransaction: React.FC<DailyTransactionProps> = ({
  latestBlock,
  latency,
  activeUsers,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card
        title="Latest Block Number"
        value={latestBlock !== null ? latestBlock : "Loading..."}
        description="Current Ethereum block number"
      />
      <Card
        title="Network Latency"
        value={latency !== null ? `${latency.toFixed(2)} seconds` : "Loading..."}
        description="Time between last two blocks"
      />
      <Card
        title="Active Users"
        value={activeUsers !== null ? activeUsers : "Loading..."}
        description="Unique addresses in the latest block"
      />
    </div>
  );
};
