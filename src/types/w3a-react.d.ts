declare module "w3a-react" {
  import { Account } from "starknet";

  export interface UseAccountReturn {
    account: Account | null;
    address: string | null;
    web3AuthConnection: {
      isConnected: boolean;
      loading: boolean;
      error: any;
      connectorName: string;
    } | null;
    web3AuthDisconnect: {
      loading: boolean;
    } | null;
    userInfo: any;
    web3AuthConnectorError: any;
  }

  export interface UseConnectReturn {
    connect: () => void;
  }

  export interface UseDisconnectReturn {
    disconnect: () => void;
  }

  export interface UseWeb3AuthStatusReturn {
    status: string;
    isConnected: boolean;
    isInitializing: boolean;
    initError: any;
    error: any;
    hasError: boolean;
    getErrorMessage: () => string;
    isReady: boolean;
  }

  export interface UseContractReturn {
    contract: any;
  }

  export interface UseSendTransactionReturn {
    send: () => void;
    sendAsync: () => Promise<any>;
    isPending: boolean;
    isError: boolean;
    error: any;
    data: any;
  }

  export interface Balance {
    decimals: number;
    symbol: string;
    formatted: string;
    value: bigint;
  }

  export interface UseBalanceReturn {
    data: Balance | undefined;
    error: Error | null;
    fetchStatus: string;
    isError: boolean;
    isFetching: boolean;
    isLoading: boolean;
    isPending: boolean;
    isSuccess: boolean;
    refetch: () => void;
  }

  export interface UseReadContractReturn {
    data: any;
    error: Error | null;
    fetchStatus: string;
    isError: boolean;
    isFetching: boolean;
    isLoading: boolean;
    isPending: boolean;
    isSuccess: boolean;
    refetch: () => void;
  }

  export function useAccount(): UseAccountReturn;
  export function useConnect(): UseConnectReturn;
  export function useDisconnect(): UseDisconnectReturn;
  export function useWeb3AuthStatus(): UseWeb3AuthStatusReturn;
  export function useContract(config: {
    abi: any;
    address: string;
  }): UseContractReturn;
  export function useSendTransaction(config: {
    calls?: any[];
  }): UseSendTransactionReturn;
  export function useBalance(config: {
    token?: string;
    address?: string;
    watch?: boolean;
    blockIdentifier?: any;
    enabled?: boolean;
    refetchInterval?: number;
  }): UseBalanceReturn;
  export function useReadContract(config: {
    abi: any;
    address: string;
    functionName: string;
    args?: any[];
    blockIdentifier?: any;
    enabled?: boolean;
  }): UseReadContractReturn;
}
