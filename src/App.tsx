import "./App.css";
import {
  useAccount,
  useWeb3AuthStatus,
  useConnect,
  useDisconnect,
  useSendTransaction,
  useContract,
  useBalance,
  useReadContract,
  useNetwork,
  useCall,
} from "w3a-react";
import LoggedOut from "./LoggedOut";
import LoggedIn from "./LoggedIn";
import { useState } from "react";
import type { Account } from "starknet";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./abi";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [transferRecipient, setTransferRecipient] = useState<string>("");
  const [transferAmount, setTransferAmount] = useState<string>("1");

  const {
    account,
    address,
    web3AuthConnection,
    web3AuthDisconnect,
    userInfo,
    web3AuthConnectorError,
  } = useAccount();

  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const {
    status: web3AuthStatus,
    isConnected: isWeb3AuthConnected,
    isInitializing: isWeb3AuthInitializing,
    initError: web3AuthInitError,
    error: starknetError,
    hasError,
    getErrorMessage,
    isReady,
  } = useWeb3AuthStatus();

  const { contract } = useContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
  });

  // Use the balance hook to get token balance
  const {
    data: balanceData,
    error: balanceError,
    isLoading: balanceLoading,
    isError: balanceIsError,
    refetch: refetchBalance,
  } = useBalance({
    token: CONTRACT_ADDRESS,
    address: address as string,
    enabled: !!address && !!CONTRACT_ADDRESS,
    watch: true,
  });

  // Use balance from hook instead of local state
  const strkBalance = balanceData?.formatted || "0";

  const {
    send,
    sendAsync,
    isPending,
    isError,
    error,
    data: txResponse,
  } = useSendTransaction({
    calls:
      contract && address && transferRecipient && transferAmount
        ? [
            contract.populate("transfer", [
              transferRecipient,
              BigInt(parseFloat(transferAmount) * 10 ** 18), // Convert to wei (assuming 18 decimals)
            ]),
          ]
        : undefined,
  });

  const handleFetchBalance = () => {
    if (refetchBalance) {
      refetchBalance();
    }
  };

  const handleTransferToken = async () => {
    if (!transferRecipient || !transferAmount) {
      alert("Please enter both recipient address and amount");
      return;
    }

    try {
      setIsLoading(true);
      const result = await sendAsync();
      console.log("Transfer successful:", result);
      alert("Transfer successful! Check the console for transaction details.");
      // Clear form after successful transfer
      setTransferRecipient("");
      setTransferAmount("1");
    } catch (error) {
      console.error("Transfer failed:", error);
      alert(
        `Transfer failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Event handlers for UI
  const handleTransferRecipientChange = (value: string) => {
    setTransferRecipient(value);
  };

  const handleTransferAmountChange = (value: string) => {
    setTransferAmount(value);
  };

  const handleConnect = () => {
    connect();
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const { chain } = useNetwork();
  const { data, error: readerr } = useReadContract({
    abi: CONTRACT_ABI,
    functionName: "balanceOf",
    address: CONTRACT_ADDRESS,
    args: [address],
    enabled: !!address,
  });

  console.log("🌸read:", {
    data,
    readerr,
    chain,
  });

  const { data: callme, error: callerr } = useCall({
    abi: [
      {
        name: "symbol",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::felt252",
          },
        ],
        state_mutability: "view",
      },
    ],
    functionName: "symbol",
    address: chain.nativeCurrency.address,
    args: [],
  });

  console.log({
    callme,
    callerr,
  });

  // Render based on connection state
  if (web3AuthConnection?.isConnected) {
    return (
      <div className="app-container">
        <main className="app-main">
          <LoggedIn
            userInfo={userInfo}
            address={address as string}
            account={account as Account}
            strkBalance={strkBalance}
            connectorName={web3AuthConnection?.connectorName ?? null}
            transferRecipient={transferRecipient}
            transferAmount={transferAmount}
            isLoading={isLoading}
            disconnectLoading={web3AuthDisconnect?.loading ?? false}
            disconnectError={web3AuthConnectorError}
            isTransferPending={isPending}
            transferError={error}
            balanceLoading={balanceLoading}
            balanceError={balanceError}
            onDeployAccount={() => {}}
            onConnectAccount={() => {}}
            onFetchBalance={handleFetchBalance}
            onTransferToken={handleTransferToken}
            onDisconnect={handleDisconnect}
            onTransferRecipientChange={handleTransferRecipientChange}
            onTransferAmountChange={handleTransferAmountChange}
          />
        </main>
      </div>
    );
  } else {
    return (
      <div className="app-container">
        <main className="app-main">
          <LoggedOut
            connectLoading={web3AuthConnection?.loading ?? false}
            connectError={web3AuthConnection?.error}
            web3AuthStatus={web3AuthStatus}
            isWeb3AuthInitializing={isWeb3AuthInitializing}
            web3AuthInitError={web3AuthInitError}
            starknetError={starknetError}
            hasError={hasError}
            errorMessage={getErrorMessage()}
            isReady={isReady}
            onConnect={handleConnect}
          />
        </main>
      </div>
    );
  }
}

export default App;
