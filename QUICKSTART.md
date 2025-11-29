# Quick Start Guide 🚀

Get Nexus Name Service running locally in 5 minutes!

## Prerequisites

- Node.js v18+ installed
- npm or yarn installed
- MetaMask wallet extension
- Some NEX tokens on Nexus Testnet (for registration)

## Installation

```bash
# Clone the repository
git clone https://github.com/deniginsb/NNS.git
cd NNS/namestone-example

# Install dependencies (takes 1-2 minutes)
npm install
```

## Environment Setup

### 1. Copy Environment Template

```bash
cp .env.example .env.local
```

### 2. Edit `.env.local`

Open `.env.local` and add your credentials:

```bash
# SIWE Session Secret (generate a random 48-character string)
SESSION_SECRET=your_random_secret_key_here_min_32_chars

# WalletConnect Project ID (get from https://cloud.walletconnect.com)
NEXT_PUBLIC_WALLETCONNECT_ID=your_walletconnect_project_id

# Pinata Configuration (for IPFS uploads)
# Get from https://app.pinata.cloud/developers/api-keys
PINATA_JWT=your_pinata_jwt_token
NEXT_PUBLIC_GATEWAY_URL=https://gateway.pinata.cloud
```

#### Get API Keys:

**WalletConnect:**
1. Visit https://cloud.walletconnect.com
2. Create a new project
3. Copy the Project ID

**Pinata:**
1. Visit https://app.pinata.cloud
2. Sign up for free account
3. Go to API Keys → New Key
4. Enable Admin permissions
5. Copy the JWT token

**SESSION_SECRET:**
```bash
# Generate random secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Run Development Server

```bash
npm run dev
```

Frontend runs at `http://localhost:3000` 🎉

## First Domain Registration

### 1. Add Nexus Testnet to MetaMask

The app will auto-prompt you, but you can add manually:

- **Network Name:** Nexus Testnet
- **RPC URL:** https://testnet3.rpc.nexus.xyz
- **Chain ID:** 3940
- **Symbol:** NEX
- **Explorer:** https://testnet3.explorer.nexus.xyz

### 2. Get Testnet NEX

You'll need ~1 NEX for testing (0.5 for registration + gas fees).

Contact Nexus team for testnet faucet or deploy your own contracts.

### 3. Register Your Domain

1. Open `http://localhost:3000`
2. Click **"Connect Wallet"**
3. Select MetaMask
4. Approve network switch to Nexus Testnet
5. Click **"Sign In"** and sign the SIWE message
6. Enter your desired name (e.g., "alice")
7. Click **"Register (0.5 NEX)"**
8. Confirm transaction in MetaMask
9. Wait for confirmation (~2 seconds)
10. Done! You now own **alice.nexus** 🎉

### 4. Update Your Profile

1. Click the camera icon to upload avatar
2. Select an image (will be uploaded to IPFS)
3. Add your Twitter handle (without @)
4. Add your Telegram username
5. Click **"Update Profile"**
6. Confirm transaction
7. Profile updated onchain! ✨

## Connect to Live Testnet

By default, the app connects to live Nexus Testnet. No additional configuration needed!

Contract addresses are already set in `src/config/nns-contracts.ts`.

## Troubleshooting

### "Cannot connect wallet"
- Make sure MetaMask is installed
- Try refreshing the page
- Check browser console for errors

### "Network switch failed"
- Approve the network add/switch prompt in MetaMask
- Add Nexus Testnet manually (see instructions above)

### "Insufficient funds"
- Make sure you have at least 0.6 NEX (0.5 + gas)
- Verify you're on Nexus Testnet (Chain ID: 3940)
- Check your balance in MetaMask

### "SIWE sign-in failed"
- Make sure SESSION_SECRET is set in .env.local
- Try disconnecting wallet and reconnecting
- Clear browser cache and try again

### "Avatar upload failed"
- Verify PINATA_JWT is valid in .env.local
- Check Pinata dashboard for API key status
- Ensure image size is reasonable (<5MB)

### "Transaction failed"
- Check if domain name is already registered
- Verify name is 3-63 characters, alphanumeric + hyphens
- Ensure you have enough NEX for gas

## Verify It Works

### Check Your Domain Onchain

```bash
# View your domain on Explorer
https://testnet3.explorer.nexus.xyz/address/0xDfB90263512321E6f14Cf63e30675A6E443924A8
```

### Check NFT Metadata

```bash
# View NFT metadata
https://nns.web.id/api/metadata/yourname
```

Should return JSON:
```json
{
  "name": "yourname.nexus",
  "description": "yourname.nexus - A decentralized domain on Nexus Name Service",
  "image": "https://gateway.pinata.cloud/ipfs/...",
  "attributes": [...]
}
```

### Verify on OpenSea (Testnet)

Your NFT should be viewable on OpenSea testnet:
```
https://testnets.opensea.io/assets/nexus-testnet/0xDfB90263512321E6f14Cf63e30675A6E443924A8/[TOKEN_ID]
```

## Next Steps

- [Read full documentation](./docs)
- [Understand the architecture](./docs/ARCHITECTURE.md)
- [Learn about smart contracts](./docs/CONTRACTS.md)
- [Deploy your own instance](./docs/DEPLOYMENT.md)
- [Contribute to the project](./CONTRIBUTING.md)

## Development Tips

### Hot Reload

The Next.js dev server has hot reload enabled. Changes to code will auto-refresh the browser.

### Type Checking

```bash
# Check TypeScript types
npm run type-check
```

### Build for Production

```bash
# Test production build locally
npm run build
npm run start
```

### Lint Code

```bash
# Run ESLint
npm run lint
```

## Need Help?

- Check [Documentation](./docs)
- Open an [Issue](https://github.com/deniginsb/NNS/issues)
- Read [Architecture Docs](./docs/ARCHITECTURE.md)
- Join discussions (if available)

Happy naming! 🌐✨
