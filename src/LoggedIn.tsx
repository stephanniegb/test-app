import { Account } from "starknet";

interface LoggedInProps {
  userInfo?: any;
  address: string;
  account?: Account | null;
  strkBalance: string;
  connectorName?: any;
  transferRecipient: string;
  transferAmount: string;
  isLoading: boolean;
  disconnectLoading: boolean;
  disconnectError?: any;
  isTransferPending?: boolean;
  transferError?: any;
  balanceLoading?: boolean;
  balanceError?: any;
  onDeployAccount: () => void;
  onConnectAccount: () => void;
  onFetchBalance: () => void;
  onTransferToken: () => void;
  onDisconnect: () => void;
  onTransferRecipientChange: (value: string) => void;
  onTransferAmountChange: (value: string) => void;
}

export default function LoggedIn({
  userInfo,
  address,
  account,
  strkBalance,
  connectorName,
  transferRecipient,
  transferAmount,
  isLoading,
  disconnectLoading,
  disconnectError,
  isTransferPending,
  transferError,
  balanceLoading,
  balanceError,
  onConnectAccount,
  onFetchBalance,
  onTransferToken,
  onDisconnect,
  onTransferRecipientChange,
  onTransferAmountChange,
}: LoggedInProps) {
  return (
    <div className="dashboard">
      {/* Left Column */}
      <div className="dashboard-left">
        {/* User Profile Section */}
        <div className="profile-section">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-info">
                <div className="flex items-center mb-4 gap-4">
                  <div className="profile-avatar">
                    {userInfo?.profileImage ? (
                      <img
                        src={userInfo.profileImage}
                        alt={userInfo?.name || "User"}
                        className="avatar-image"
                        width={100}
                        height={100}
                      />
                    ) : (
                      <div className="avatar-placeholder">
                        {userInfo?.name?.charAt(0) || "U"}
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="profile-name">{userInfo?.name || "User"}</h2>
                    <p className="profile-email">{userInfo?.email}</p>
                  </div>
                </div>
                <div className="balance-display">
                  <span className="balance-label">Address:</span>
                  <span className="balance-value whitespace-normal">
                    {address || "Click 'Deploy Account' to create wallet"}
                  </span>
                </div>
                <div className="balance-display">
                  <span className="balance-label">STRK Balance:</span>
                  <span className="balance-value">
                    {balanceLoading ? "Loading..." : strkBalance} STRK
                  </span>
                </div>
                {balanceError && (
                  <div className="error-message">
                    Balance error: {balanceError.message || balanceError}
                  </div>
                )}
                <div className="connection-badge">
                  <span className="badge-icon">🔐</span>
                  Logged in via {userInfo?.authConnectionId || connectorName}
                </div>
                <div
                  className={`connection-badge ml-4 ${
                    address && account ? "connected" : "not-connected"
                  }`}
                >
                  <span className="badge-icon">
                    {address && account ? "🔗" : "❌"}
                  </span>
                  {address && account
                    ? "Connected to StarkNet"
                    : "Not Connected "}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="actions-grid">
          <button
            onClick={onConnectAccount}
            className="action-button secondary"
            disabled={isLoading}
          >
            {isLoading ? "⏳ Processing..." : "🔗 Connect Account"}
          </button>

          <button
            onClick={onFetchBalance}
            className="action-button secondary"
            disabled={isLoading || balanceLoading}
          >
            {isLoading || balanceLoading
              ? "⏳ Processing..."
              : "🔄 Refresh Balance"}
          </button>
        </div>

        {/* Actions Section */}
        <div className="actions-section">
          {/* Transfer Input Fields */}
          <div className=" flex  gap-4 my-4">
            <div className="input-group  w-full">
              <label htmlFor="recipient" className="input-label">
                Recipient Address:
              </label>
              <input
                id="recipient"
                type="text"
                value={transferRecipient}
                onChange={(e) => onTransferRecipientChange(e.target.value)}
                placeholder="0x..."
                className="input-field"
              />
            </div>
            <div className="input-group w-full">
              <label htmlFor="amount" className="input-label">
                Amount (STRK):
              </label>
              <input
                id="amount"
                type="number"
                value={transferAmount}
                onChange={(e) => onTransferAmountChange(e.target.value)}
                placeholder="1"
                min="0.000001"
                step="0.000001"
                className="input-field"
              />
            </div>
          </div>
          <div className="absolute">
            <button
              onClick={onTransferToken}
              className="action-button accent w-full"
              disabled={
                isLoading ||
                isTransferPending ||
                !transferRecipient ||
                !transferAmount ||
                parseFloat(transferAmount) <= 0
              }
            >
              {isLoading || isTransferPending
                ? "⏳ Processing..."
                : "💸 Transfer Token"}
            </button>
            {!transferRecipient && (
              <p className="text-sm text-gray-500 mt-1">
                Please enter recipient address
              </p>
            )}
            {!transferAmount && (
              <p className="text-sm text-gray-500 mt-1">
                Please enter transfer amount
              </p>
            )}
            {transferAmount && parseFloat(transferAmount) <= 0 && (
              <p className="text-sm text-red-500 mt-1">
                Amount must be greater than 0
              </p>
            )}
            {transferError && (
              <p className="text-sm text-red-500 mt-1">
                Transfer error: {transferError.message || transferError}
              </p>
            )}
            {isTransferPending && (
              <p className="text-sm text-blue-500 mt-1">
                Transaction pending...
              </p>
            )}
          </div>
        </div>

        {/* Disconnect Section */}
        <div className="disconnect-section">
          <button
            onClick={onDisconnect}
            className="disconnect-button"
            disabled={disconnectLoading}
          >
            {disconnectLoading ? "Disconnecting..." : "🔓 Disconnect"}
          </button>
          {disconnectError && (
            <div className="error-message">{disconnectError.message}</div>
          )}
        </div>
      </div>
    </div>
  );
}
