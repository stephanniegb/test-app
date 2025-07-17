# Test React App

This is a test application for the `w3a-react` SDK. It demonstrates how to integrate and use the SDK in a React application with StarkNet wallet connectivity.

## 📁 Project Structure

```
w3a-react/       → Your React SDK (Provider, Hooks, etc.)
test-react-app/  → Your consumer app that uses the SDK (this project)
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- pnpm package manager
- yalc (for local SDK development)

### ✅ One-Time Setup

#### In your SDK project (`w3a-react`):

```bash
# Install yalc globally (only once)
npm install -g yalc

# Install SDK dependencies
pnpm install

# Build the SDK
pnpm run build

# Make the SDK available locally
yalc publish
```

#### In this consumer app (`test-react-app`):

```bash
# Link the local SDK
yalc add w3a-react

# Install dependencies
pnpm install
```

## 🛠️ Daily Development Workflow

### In `w3a-react` (SDK):

1. Make code changes to your provider, hooks, or components
2. Rebuild the SDK:
   ```bash
   pnpm run build
   ```
3. Push changes to the consumer app:
   ```bash
   yalc push
   ```

### In `test-react-app` (this consumer app):

1. Start the development server:
   ```bash
   pnpm dev
   ```
2. Open your browser and navigate to `http://localhost:5173`
3. Test your app using the latest SDK changes

## 📦 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## 🔧 Dependencies

This app uses:

- **React 19** with TypeScript
- **Vite** for fast development and building
- **StarkNet** for blockchain integration
- **w3a-react** SDK (linked locally via yalc)

## 🔁 Troubleshooting

### If local links get corrupted:

```bash
# Remove the local SDK link
yalc remove w3a-react

# Reinstall dependencies
pnpm install

# Re-add the local SDK
yalc add w3a-react

# Install again
pnpm install
```

### If you need to reset everything:

```bash
# Remove node_modules and lock files
rm -rf node_modules pnpm-lock.yaml yalc.lock .yalc

# Reinstall everything
pnpm install
yalc add w3a-react
pnpm install
```

## 🎯 What This App Tests

This test app demonstrates:

- SDK provider integration
- Wallet connection flow
- User authentication states
- StarkNet transaction handling
- SDK hook usage patterns

## 📝 Notes

- The app is configured to use the local `w3a-react` SDK via yalc
- Changes to the SDK require rebuilding and pushing with yalc
- The development server runs on `http://localhost:5173` by default
- Hot reload is enabled for fast development iteration
