# Quick Start Guide 🚀

Get your `.nexus` domain in 5 minutes!

## Prerequisites

- MetaMask wallet extension ([Download](https://metamask.io))
- NEX tokens on Nexus Testnet (free from faucet)
- Web browser (Chrome, Firefox, or Safari)

---

## Step 1: Install MetaMask

If you don't have MetaMask yet:

1. Visit [metamask.io](https://metamask.io)
2. Click "Download" and install the browser extension
3. Create a new wallet and save your seed phrase securely
4. Complete the setup

---

## Step 2: Get Testnet NEX

You need ~0.5 NEX to register a domain:

1. Visit [Nexus Faucet](https://faucet.nexus.xyz)
2. Connect your wallet
3. Request testnet tokens
4. Wait ~30 seconds for tokens to arrive

Verify you received them by checking your MetaMask balance.

---

## Step 3: Visit NNS

Go to **[nns.web.id](https://nns.web.id)**

---

## Step 4: Connect Wallet

1. Click **"Connect Wallet"** button (top right)
2. Select **MetaMask** from the options
3. Approve the connection request
4. **Automatic network switch:**
   - A popup will ask to switch to Nexus Testnet
   - Click **"Approve"** or **"Switch Network"**
   - If Nexus Testnet isn't in your wallet, it will be added automatically

Your wallet is now connected! 🎉

---

## Step 5: Sign In (SIWE)

1. Click **"Sign In"** button
2. MetaMask will open with a signature request
3. Read the message (it's just for authentication, no transaction)
4. Click **"Sign"**

You're now authenticated and ready to register!

---

## Step 6: Register Your Domain

### Choose Your Name

1. Enter your desired domain name in the search box
   - Example: `alice`, `bob123`, `my-name`
2. Click **"Search"** or press Enter

**Domain name rules:**
- ✅ 3-63 characters long
- ✅ Letters (a-z), numbers (0-9), hyphens (-)
- ✅ Cannot start or end with hyphen
- ❌ No special characters

### Check Availability

The system will check if your name is available:
- ✅ **Available** - You can register it!
- ❌ **Taken** - Try a different name
- ❌ **Reserved** - System reserved name

### Complete Registration

1. Click **"Register"** button
2. Review the details:
   - Domain: `yourname.nexus`
   - Duration: 1 year
   - Fee: 0.5 NEX
3. Click **"Confirm Registration"**
4. MetaMask opens - review gas fee (~0.003 NEX)
5. Click **"Confirm"** in MetaMask
6. Wait 10-30 seconds for confirmation

**Congratulations! You now own `yourname.nexus`! 🎉**

---

## Step 7: Setup Your Profile (Optional)

Make your domain unique with a custom profile!

### Upload Avatar

1. Find your domain in **"My Domains"** section
2. Click **"Edit Profile"**
3. Click **"Upload Avatar"** or drag-and-drop an image
4. Wait for IPFS upload (~5-10 seconds)
5. Preview appears when ready

### Add Social Links

1. **Twitter:** Enter your handle without @ (e.g., `alice_crypto`)
2. **Telegram:** Enter your username without @ (e.g., `alice_tg`)

### Save Changes

1. Click **"Save Profile"**
2. Confirm transaction in MetaMask
3. Wait for confirmation

Your profile is now live onchain! ✨

---

## What You Can Do Now

### Share Your Domain

Instead of sharing your long wallet address:
```
0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
```

Share your simple domain:
```
yourname.nexus
```

### View Your NFT

Each domain is an NFT! Find it:
- In your MetaMask wallet (Assets → NFTs)
- On OpenSea: `testnets.opensea.io`
- Metadata API: `https://nns.web.id/api/metadata/yourname`

### Transfer Ownership

You can transfer your domain to another wallet:
1. Go to **"My Domains"**
2. Click **"Transfer"**
3. Enter recipient address
4. Confirm transaction

⚠️ **Warning:** Transfers are permanent!

---

## Verify Your Domain

### Check on Explorer

View your domain onchain:
```
https://testnet3.explorer.nexus.xyz/address/0xDfB90263512321E6f14Cf63e30675A6E443924A8
```

### Check NFT Metadata

```
https://nns.web.id/api/metadata/yourname
```

Should return JSON with your domain info, avatar, and social links.

### View Public Profile

```
https://nns.web.id/?domain=yourname
```

Anyone can view your public profile!

---

## Troubleshooting

### "Wrong network" error

**Solution:**
- Click "Switch Network" when prompted
- Or manually add Nexus Testnet in MetaMask:
  - Network Name: `Nexus Testnet`
  - RPC URL: `https://testnet3.rpc.nexus.xyz`
  - Chain ID: `3940`
  - Symbol: `NEX`
  - Explorer: `https://testnet3.explorer.nexus.xyz`

### "Insufficient funds" error

**Solution:**
- Get more NEX from [faucet](https://faucet.nexus.xyz)
- Need at least 0.5 NEX + gas (~0.003 NEX)
- Total: ~0.51 NEX minimum

### "Domain unavailable"

**Solution:**
- Someone already owns it - try a different name
- It's reserved (system names like `www`, `admin`)
- Invalid format - check naming rules above

### Transaction stuck

**Solution:**
- Wait 1-2 minutes (network might be busy)
- Check transaction on [Explorer](https://testnet3.explorer.nexus.xyz)
- If failed, try again with higher gas

### Can't connect wallet

**Solution:**
- Make sure MetaMask is installed
- Try refreshing the page
- Check you're using supported browser
- Try incognito/private mode

### Avatar won't upload

**Solution:**
- Image might be too large (max 10 MB)
- Try compressing the image
- Check file format (PNG, JPG, GIF supported)
- Wait and try again (IPFS might be slow)

---

## Next Steps

### For Users

- [📖 Full User Guide](./docs/USER_GUIDE.md) - Complete documentation
- [❓ FAQ](./docs/USER_GUIDE.md#faq) - Common questions
- [💡 Use Cases](./docs/USER_GUIDE.md#use-cases) - What you can do with domains

### For Developers

- [🏗️ Architecture](./docs/ARCHITECTURE.md) - System design overview
- [📝 Smart Contracts](./docs/CONTRACTS.md) - Contract documentation
- [🚀 Deployment](./docs/DEPLOYMENT.md) - Deploy your own instance
- [🤝 Contributing](./CONTRIBUTING.md) - How to contribute

---

## Need Help?

- **Questions:** Open a [GitHub Discussion](https://github.com/deniginsb/NNS/discussions)
- **Bug Reports:** Create an [Issue](https://github.com/deniginsb/NNS/issues)
- **Twitter:** [@DBzhx7955](https://x.com/DBzhx7955)

---

## Summary

**What you just did:**
1. ✅ Installed MetaMask
2. ✅ Got free testnet NEX
3. ✅ Connected to NNS
4. ✅ Registered `yourname.nexus` domain
5. ✅ Set up your profile (avatar, socials)
6. ✅ Own an NFT representing your domain!

**Your domain is:**
- 🔐 Owned by you (ERC-721 NFT)
- 🌐 Stored onchain (decentralized)
- 💱 Tradeable (sell on marketplaces)
- 🔄 Transferable (send to anyone)
- ⏰ Valid for 1 year (renewable)

Welcome to the Nexus Name Service community! 🌐✨

Happy naming! 🎉

---

Last updated: 2025-11-29
