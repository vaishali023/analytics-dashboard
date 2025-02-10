import { Check, Globe } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const chains = [
  {
    name: "Ethereum",
    value: "ethereum",
    logo: "/logo/ethereum.png",
    disabled: false,
  },
  { name: "BSC", value: "bsc", logo: "/logo/bsc.png", disabled: true },
  { name: "Base", value: "base", logo: "/logo/base.png", disabled: true },
  { name: "Solana", value: "solana", logo: "/logo/solana.png", disabled: true },
];

export const ChainSelector: React.FC = () => {
  const [selectedChain, setSelectedChain] = useState(chains[0]);

  return (
    <Select
      onValueChange={(value) =>
        setSelectedChain(chains.find((chain) => chain.value === value)!)
      }
    >
      <SelectTrigger className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-all w-[220px]">
        <Globe className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        <SelectValue placeholder="Select Chain">
          {selectedChain.name}
        </SelectValue>
      </SelectTrigger>

      <SelectContent
        className="z-50 mt-0 w-[220px] rounded-md border border-gray-300 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
        position="popper"
      >
        {chains.map((chain) => (
          <SelectItem
            key={chain.value}
            value={chain.value}
            className={`flex items-center justify-between px-4 py-2 text-sm transition-all rounded-md ${
              chain.disabled
                ? "cursor-not-allowed text-gray-400"
                : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
            }`}
            disabled={chain.disabled}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <img src={chain.logo} alt={chain.name} className="w-5 h-5" />
                <span>{chain.name}</span>
              </div>

              {chain.disabled ? (
                <span className="text-xs italic text-gray-400 ml-4">
                  Coming Soon
                </span>
              ) : selectedChain.value === chain.value ? (
                <Check className="w-4 h-4 text-green-500 ml-10" />
              ) : null}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
