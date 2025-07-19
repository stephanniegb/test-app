import { PaymasterRpc, RpcProvider } from "starknet";
import { StarknetConfig, mainnet, sepolia } from "w3a-react";

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const chains = [sepolia];
  // StarkNet provider setup
  const starknetProvider = new RpcProvider({
    nodeUrl: "https://starknet-sepolia.public.blastapi.io/rpc/v0_8",
  });

  const paymasterRpc = new PaymasterRpc({
    nodeUrl: "https://sepolia.paymaster.avnu.fi",
    headers: {
      "x-paymaster-api-key": "874b0d50-e322-4cd4-ad3c-e8810b3d37f0",
    },
  });

  return (
    <StarknetConfig
      chains={chains}
      provider={starknetProvider}
      paymasterProvider={paymasterRpc}
      autoConnect
    >
      {children}
    </StarknetConfig>
  );
};

export default Provider;
