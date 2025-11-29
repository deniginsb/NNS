# Nexus Name Service (NNS) 🌐

Your decentralized identity on Nexus blockchain. One name for all your Web3 needs.

![Nexus Name Service](https://img.shields.io/badge/Nexus-Name%20Service-8b5cf6?style=for-the-badge)
![Solidity](https://img.shields.io/badge/Solidity-0.8.28-363636?style=for-the-badge&logo=solidity)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

![NNS Preview](docs/images/nns-preview.jpg)

## 🌟 What is NNS?

NNS (Nexus Name Service) is a decentralized naming system built on Nexus blockchain. Instead of sharing your long wallet address like `0xE197e528a1585e38dAFd943b2261F813814F6931`, you can share a simple, memorable name like **yourname.nexus**.

It's more than just a name - it's your complete Web3 identity with profile info, social links, and an NFT that you truly own.

### Why NNS?

- **Easy to Remember** - `alice.nexus` is way easier than `0x742d35Cc6...`
- **Truly Yours** - Your domain is an ERC-721 NFT, you own it completely
- **Decentralized** - All data stored onchain, no central server can take it down
- **Multi-Purpose** - Use it for payments, profile, login, and more
- **Tradeable** - Sell your domain as an NFT on marketplaces like OpenSea

## 🎯 Live Demo

**Live App:** [https://nns.web.id/](https://nns.web.id/)
**Testnet Explorer:** [https://testnet3.explorer.nexus.xyz](https://testnet3.explorer.nexus.xyz/)

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/deniginsb/NNS.git
cd NNS/namestone-example

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Start development server
npm run dev
```

Visit `http://localhost:3000` and start registering!

[📖 Detailed Quick Start Guide →](./QUICKSTART.md)

## ✨ Features

### Core Features
- ✅ **Domain Registration** - Register your .nexus name (3-63 characters)
- ✅ **NFT Ownership** - Each domain is an ERC-721 NFT
- ✅ **Web3 Profile** - Set avatar (IPFS), Twitter, and Telegram
- ✅ **SIWE Authentication** - Secure sign-in with Ethereum
- ✅ **Auto Network Switch** - Automatically switches to Nexus Testnet
- ✅ **OpenSea Compatible** - Full metadata support for marketplaces

### Smart Contract Features
- ✅ **ERC-721 Standard** - Fully compatible with NFT ecosystems
- ✅ **Text Records** - Store profile data onchain
- ✅ **Address Resolution** - Map domains to wallet addresses
- ✅ **Domain Transfer** - Transfer ownership via NFT transfer
- ✅ **Renewal System** - Keep your domain active (1 year minimum)

## 🏗️ Architecture

```
┌─────────────┐         ┌──────────────────┐         ┌─────────────┐
│   Frontend  │────────▶│  Smart Contracts │────────▶│  Nexus L1   │
│  (Next.js)  │         │  (Solidity 0.8)  │         │  Blockchain │
└─────────────┘         └──────────────────┘         └─────────────┘
      │                          │
      │                          ├── NNSRegistry
      │                          ├── PublicResolver
      │                          └── NexusRegistrar (ERC-721)
      │
      └── ConnectKit + Wagmi + Viem + Ethers.js
```

[🏗️ Full Architecture Details →](./docs/ARCHITECTURE.md)

## 🔧 Technology Stack

### Smart Contracts
- **Solidity 0.8.28** - Smart contract language
- **Hardhat** - Development environment
- **OpenZeppelin** - Secure contract libraries (ERC-721, Ownable)
- **Ethers.js v6** - Contract interactions

### Frontend
- **Next.js 14** - React framework (App Router)
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **ConnectKit** - Beautiful wallet connection
- **Wagmi + Viem** - Web3 interactions
- **Pinata** - IPFS storage for avatars

### Blockchain
- **Nexus Testnet**
- **Chain ID:** 3940
- **RPC:** https://testnet3.rpc.nexus.xyz
- **Explorer:** https://testnet3.explorer.nexus.xyz

## 📝 Smart Contracts

### Deployed Contracts (Nexus Testnet)

| Contract | Address | Purpose |
|----------|---------|---------|
| NNSRegistry | `0x84f1bF40B68Eb18bf17DD2220ea2364AD32EA754` | Core registry (ownership records) |
| PublicResolver | `0xc0bEC1491c336b514CA4496bc00816C66E24a972` | Profile data storage |
| NexusRegistrar | `0xDfB90263512321E6f14Cf63e30675A6E443924A8` | Registration logic + ERC-721 NFT |

[🔍 View detailed contract documentation →](./docs/CONTRACTS.md)

## 💰 Pricing

- **Registration Fee**: 0.5 NEX (one-time payment)
- **Duration**: 1 year minimum (renewable)
- **Profile Updates**: Only gas fees (no additional cost)
- **NFT Transfers**: Standard gas fees

## 🎮 How to Use

### Register Your Domain

1. Visit [nns.web.id](https://nns.web.id)
2. Connect your wallet (MetaMask recommended)
3. Auto-switch to Nexus Testnet (approve when prompted)
4. Sign in with SIWE
5. Enter your desired name (3-63 characters)
6. Pay 0.5 NEX registration fee
7. Done! You now own **yourname.nexus** 🎉

### Update Your Profile

1. Upload avatar (stored on IPFS via Pinata)
2. Add Twitter handle
3. Add Telegram username
4. Confirm transaction to save onchain

### Use Your Domain

Your `.nexus` domain can be used for:
- 🪙 Receiving payments (future integration)
- 🎨 NFT identity on marketplaces (OpenSea compatible)
- 🌐 Decentralized website hosting (future)
- 🔐 Universal Web3 login across dApps

[📖 Full User Guide →](./docs/USER_GUIDE.md)

## 📚 Documentation

- [📖 Quick Start Guide](./QUICKSTART.md) - Get started in 5 minutes
- [🏗️ Architecture Overview](./docs/ARCHITECTURE.md) - System design and data flow
- [📝 Smart Contract Docs](./docs/CONTRACTS.md) - All deployed contracts and ABIs
- [🚀 Deployment Guide](./docs/DEPLOYMENT.md) - Deploy your own instance
- [👤 User Guide](./docs/USER_GUIDE.md) - How to use NNS
- [🤝 Contributing Guide](./CONTRIBUTING.md) - How to contribute

## 🔐 Security

### Smart Contract Security
- ✅ **OpenZeppelin Standards** - Battle-tested ERC-721 implementation
- ✅ **ReentrancyGuard** - Protection against reentrancy attacks
- ✅ **Ownable** - Proper access control
- ✅ **Input Validation** - Domain name sanitization (3-63 alphanumeric + hyphens)

### Frontend Security
- ✅ **SIWE (Sign-In With Ethereum)** - Secure authentication standard
- ✅ **Session Management** - Encrypted sessions with iron-session
- ✅ **Type Safety** - TypeScript for compile-time checks
- ✅ **Environment Variables** - Secrets not exposed to client

## 🧪 Testing

```bash
# Run smart contract tests (coming soon)
cd NNS/contracts
npx hardhat test

# Build frontend
npm run build

# Type checking
npm run type-check

# Lint code
npm run lint
```

## 🚢 Deployment

### Deploy Smart Contracts

```bash
cd NNS/contracts

# Compile contracts
npx hardhat compile

# Deploy to Nexus Testnet
npx hardhat run scripts/deploy-nexus.js --network nexus
```

### Deploy Frontend to Vercel

```bash
cd namestone-example

# Deploy to production
vercel --prod
```

[📖 Full deployment guide →](./docs/DEPLOYMENT.md)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) before submitting PRs.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🗺️ Roadmap

### Phase 1 (Current) ✅
- [x] Domain registration
- [x] Profile management (avatar, socials)
- [x] ERC-721 NFT implementation
- [x] OpenSea metadata

### Phase 2 (Coming Soon)
- [ ] Subdomain support (alice.bob.nexus)
- [ ] Reverse resolution (address → domain)
- [ ] Domain marketplace
- [ ] Batch operations

### Phase 3 (Future)
- [ ] Mobile app
- [ ] Mainnet deployment
- [ ] More social integrations (GitHub, Discord)
- [ ] IPFS website hosting support
- [ ] Cross-chain bridges

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Built with amazing open-source tools:

- [ENS (Ethereum Name Service)](https://ens.domains/) - Inspiration for naming system
- [OpenZeppelin](https://www.openzeppelin.com/) - Secure smart contract libraries
- [Nexus Blockchain](https://nexus.xyz/) - Fast and scalable L1
- [ConnectKit](https://docs.family.co/connectkit) - Beautiful wallet connection
- [Wagmi](https://wagmi.sh/) - React hooks for Ethereum
- [Pinata](https://www.pinata.cloud/) - IPFS infrastructure
- [Vercel](https://vercel.com/) - Hosting and deployment

## ⚠️ Disclaimer

**This project is deployed on Nexus Testnet for demonstration purposes.**

- ⚠️ Do not use for production without proper security audit
- ⚠️ Testnet tokens have no real value
- ⚠️ Use at your own risk
- ⚠️ Always DYOR (Do Your Own Research)

For production deployment, please get a professional security audit.

## 📞 Links

- **Live App:** https://nns.web.id/
- **GitHub:** https://github.com/deniginsb/NNS
- **Twitter:** [@DBzhx7955](https://x.com/DBzhx7955)
- **Explorer:** https://testnet3.explorer.nexus.xyz/
- **Documentation:** [./docs](./docs)

---

<div align="center">
  <p><strong>Built with ❤️ for the Nexus ecosystem</strong></p>
  <p>
    <a href="https://nns.web.id/">Website</a> •
    <a href="./docs">Documentation</a> •
    <a href="https://testnet3.explorer.nexus.xyz/">Explorer</a> •
    <a href="https://github.com/deniginsb/NNS/issues">Issues</a>
  </p>
</div>
