# User Guide 📖

Welcome to Nexus Name Service! This guide will help you register and manage your `.nexus` domain.

## What is NNS? 🤔

**Nexus Name Service (NNS)** is a decentralized naming system on Nexus blockchain that lets you:

- ✅ Register a unique `.nexus` domain (like `alice.nexus`)
- ✅ Own it as an NFT (tradeable on marketplaces)
- ✅ Set up your profile (avatar, Twitter, Telegram)
- ✅ Use it as your Web3 identity
- ✅ Map it to your wallet address
- ✅ Transfer ownership to others

**Example:** Instead of sharing `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`, you share `alice.nexus` ✨

![NNS Preview](./images/nns-preview.jpg)

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Register Your Domain](#register-your-domain)
3. [Setup Your Profile](#setup-your-profile)
4. [View Your Domains](#view-your-domains)
5. [Transfer Domain](#transfer-domain)
6. [View on OpenSea](#view-on-opensea)
7. [Use Cases](#use-cases)
8. [FAQ](#faq)
9. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Prerequisites

Before you start, you need:

1. **A Web3 Wallet**
   - [MetaMask](https://metamask.io) (recommended)
   - Or any WalletConnect-compatible wallet

2. **Nexus Testnet Tokens (NEX)**
   - Get free testnet NEX from [Nexus Faucet](https://faucet.nexus.xyz)
   - You need at least **0.5 NEX** to register a domain

3. **Web Browser**
   - Chrome, Firefox, Safari, or Edge
   - Mobile browsers also supported!

### Step 1: Install MetaMask

If you don't have MetaMask:

1. Go to [metamask.io](https://metamask.io)
2. Click "Download"
3. Install browser extension
4. Create new wallet (save your seed phrase safely!)

### Step 2: Get Testnet NEX

1. Visit [Nexus Faucet](https://faucet.nexus.xyz)
2. Connect your wallet
3. Request testnet tokens
4. Wait ~30 seconds for tokens to arrive

**Verify balance:**
- Open MetaMask
- Click network dropdown
- Add Nexus Testnet (or it will auto-add when you connect)
- Check you have ≥ 0.5 NEX

---

## Register Your Domain

### Step 1: Visit NNS Website

Go to **[nns.web.id](https://nns.web.id)**


### Step 2: Connect Your Wallet

1. Click **"Connect Wallet"** button (top right)
2. Select your wallet (MetaMask or WalletConnect)
3. Approve connection request
4. **Auto-switch to Nexus Testnet**
   - A popup will appear asking to switch networks
   - Click "Approve" or "Switch Network"
   - If network not in wallet, it will be added automatically


### Step 3: Sign In with Ethereum (SIWE)

After connecting, you'll be asked to sign a message:

1. Click **"Sign In"**
2. MetaMask opens with signature request
3. Read the message (it's safe, just authentication)
4. Click **"Sign"**

✅ You're now authenticated!


### Step 4: Search for Your Domain

1. Enter your desired domain name in the search box
   - Example: `alice`, `bob123`, `my-domain`
2. Click **"Search"** or press Enter

**Domain Name Rules:**
- ✅ 3-63 characters long
- ✅ Letters (a-z), numbers (0-9), hyphens (-)
- ✅ Cannot start or end with hyphen
- ❌ No uppercase letters (auto-converted to lowercase)
- ❌ No special characters (`.` `@` `#` etc)

**Valid examples:**
- ✅ `alice`
- ✅ `bob123`
- ✅ `my-domain`
- ✅ `crypto-wallet`

**Invalid examples:**
- ❌ `ab` (too short)
- ❌ `-alice` (starts with hyphen)
- ❌ `alice-` (ends with hyphen)
- ❌ `alice.bob` (contains dot)
- ❌ `alice@crypto` (special character)


### Step 5: Check Availability

The system will check if your domain is available:

- ✅ **Available** - Green checkmark, "Register" button appears
- ❌ **Taken** - Red X, shows current owner
- ❌ **Reserved** - System reserved (e.g., `www`, `admin`, `nexus`)


### Step 6: Register Your Domain

1. Click **"Register"** button
2. Review registration details:
   - Domain: `yourname.nexus`
   - Duration: 1 year (365 days)
   - Fee: 0.5 NEX
3. Click **"Confirm Registration"**
4. MetaMask opens with transaction
5. Review gas fee (should be ~0.003 NEX)
6. Click **"Confirm"**

⏱️ **Wait for confirmation** (10-30 seconds)


### Step 7: Success! 🎉

You now own `yourname.nexus`!

- ✅ Domain registered onchain
- ✅ NFT minted to your wallet
- ✅ You're the official owner


---

## Setup Your Profile

Make your domain stand out with a custom profile!

### Step 1: Navigate to Profile Settings

After registering, you'll see your domain in **"My Domains"** section.

1. Click on your domain card
2. Click **"Edit Profile"** button


### Step 2: Upload Avatar

1. Click **"Upload Avatar"** or drag-and-drop image
2. Select image file (PNG, JPG, GIF)
   - Recommended: Square image, 512x512px or larger
   - Max size: 10 MB
3. Wait for IPFS upload (~5-10 seconds)
4. Preview appears when ready

**Your avatar is stored on IPFS** - decentralized and permanent!


### Step 3: Add Social Links

**Twitter:**
1. Enter your Twitter handle (without @)
   - Example: `alice_crypto` not `@alice_crypto`

**Telegram:**
1. Enter your Telegram username (without @)
   - Example: `alice_tg` not `@alice_tg`


### Step 4: Save Profile

1. Click **"Save Profile"** button
2. MetaMask opens with transaction
3. Review changes:
   - Setting avatar → IPFS hash
   - Setting Twitter → your handle
   - Setting Telegram → your username
4. Click **"Confirm"**
5. Wait for confirmation (~10-30 seconds)

✅ **Profile updated onchain!**


### Step 5: View Your Profile

Your profile is now live! Anyone can view it by:

1. Going to `nns.web.id/?domain=yourname`
2. Searching your domain
3. Viewing your NFT on marketplace

**Public profile shows:**
- Domain name: `yourname.nexus`
- Avatar image
- Twitter handle (clickable link)
- Telegram username (clickable link)
- Wallet address
- Registration date
- Expiry date


---

## View Your Domains

### My Domains Dashboard

Access all your domains in one place:

1. Click **"My Domains"** tab (or scroll down)
2. See all domains you own
3. Each card shows:
   - Domain name
   - Avatar (if set)
   - Social links (if set)
   - Expiry date
   - **Edit Profile** button
   - **Transfer** button


### Domain Details

Click on any domain to see:
- Full profile information
- Registration timestamp
- Expiration timestamp
- Token ID (NFT identifier)
- Owner address
- Resolver address
- Transaction history (via Explorer link)

---

## Transfer Domain

Want to transfer ownership to someone else?

### Option 1: Transfer via NNS Website

1. Go to **"My Domains"**
2. Click on domain you want to transfer
3. Click **"Transfer"** button
4. Enter recipient wallet address
   - Example: `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`
5. Click **"Confirm Transfer"**
6. MetaMask opens with transaction
7. Click **"Confirm"**
8. Wait for confirmation

✅ **Domain transferred!** The new owner can now manage it.

⚠️ **Warning**: This action is **irreversible**! Double-check the address.


### Option 2: Transfer via NFT Marketplace

Your `.nexus` domain is an ERC-721 NFT, so you can:

1. List it for sale on OpenSea/LooksRare
2. Send it directly from wallet (MetaMask → Send NFT)
3. Auction it
4. Use it in DeFi protocols

**When transferring as NFT:**
- Both NFT ownership AND domain ownership transfer together
- New owner gets full control of domain and profile

---

## View on OpenSea

Your `.nexus` domain appears as an NFT on marketplaces!

### Step 1: Find Your NFT

1. Go to [OpenSea Testnet](https://testnets.opensea.io)
2. Connect your wallet
3. Click **"Profile"**
4. Look for **"Nexus Name Service"** collection
5. Your domain should appear as `yourname.nexus`


### NFT Metadata Includes:

- **Name**: `yourname.nexus`
- **Description**: "A decentralized domain on Nexus Name Service"
- **Image**: Your avatar (or default gradient)
- **Traits**:
  - Domain: `yourname.nexus`
  - TLD: `.nexus`
  - Length: 5 (character count)
  - Character Set: Letters/Numbers/Mixed
  - Twitter: `@your_twitter`
  - Telegram: `@your_telegram`

### Step 2: Share Your NFT

Click **"Share"** on OpenSea to get shareable link:
```
https://testnets.opensea.io/assets/nexus/0xDfB.../123
```

Send this to friends to show off your domain! 🚀

---

## Use Cases

What can you do with your `.nexus` domain?

### 1. Web3 Identity 🆔

Use your domain as your universal Web3 username:

**Instead of:**
```
Send payment to: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
```

**Say:**
```
Send payment to: alice.nexus
```

Much easier to remember and share!

### 2. Social Profile 👤

Your onchain profile with avatar and social links:

- Add to Twitter bio: "Find me onchain at alice.nexus"
- Share in Discord/Telegram: "My domain: alice.nexus"
- Add to email signature
- Print on business cards

### 3. Decentralized Website 🌐

*Coming soon:* Point your domain to IPFS website

```
alice.nexus → ipfs://Qm... → Your decentralized website
```

No hosting fees, censorship-resistant!

### 4. Wallet Address Resolution 💸

*Coming soon:* Apps can resolve your domain to wallet address

```javascript
const address = await resolver.addr("alice.nexus")
// Returns: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
```

Send crypto to `alice.nexus` instead of long addresses!

### 5. NFT Collection 🖼️

Build your digital identity:

- Register multiple domains (`alice`, `alice-dao`, `alice-nft`)
- Each is a unique NFT
- Showcase in your NFT gallery
- Trade on marketplaces

### 6. DAO Membership 🏛️

Use as proof of community membership:

- DAOs can recognize `.nexus` holders
- Airdrops to domain owners
- Voting rights based on domain ownership
- Community perks

### 7. Subdomain Business 🏢

*Future feature:* Create and sell subdomains

```
alice.nexus (you own)
  ↳ blog.alice.nexus (sell to blogger)
  ↳ shop.alice.nexus (sell to store)
  ↳ dao.alice.nexus (give to DAO)
```

### 8. Cross-Chain Identity 🔗

*Future feature:* Use your domain across multiple chains

- Ethereum: alice.nexus
- Polygon: alice.nexus
- Arbitrum: alice.nexus
- Same identity, everywhere!

---

## FAQ

### How much does it cost?

**Registration:** 0.5 NEX (+ small gas fee ~0.003 NEX)

**Profile updates:** Only gas fees (~0.001-0.003 NEX each)

**Renewal:** 0.5 NEX per year (+ gas)

### How long does registration last?

**1 year (365 days)** from registration date.

You can renew anytime before expiration.

### What happens if my domain expires?

- Domain becomes available for others to register
- Your NFT remains but loses domain ownership
- Profile data stays onchain but domain no longer resolves
- You lose control of the name

**Tip:** Set a calendar reminder 1 month before expiration!

### Can I get a refund?

**No.** All registrations are final. Registration fees are non-refundable.

Make sure to:
- Check spelling before registering
- Verify domain is available
- Read confirmation details

### What names are reserved?

These names cannot be registered:

- `www`
- `mail`
- `ftp`
- `admin`
- `root`
- `nexus`

More may be added for security/functionality reasons.

### Can I register emoji domains?

**Not yet.** Currently only alphanumeric + hyphens.

Emoji support may come in future updates!

### Can I create subdomains?

**Not yet.** Subdomain feature is planned for Phase 2.

Future: `blog.alice.nexus`, `shop.alice.nexus`, etc.

### Is my data private?

**No.** All data is **public onchain**:
- Domain ownership
- Avatar (IPFS link)
- Social handles
- Wallet address

Don't put sensitive info in your profile!

### Can I delete my profile?

You can't delete blockchain data, but you can:
- Clear avatar (set to empty)
- Clear social links (set to empty)
- Transfer domain to new address
- Let domain expire

### What wallet addresses are supported?

Currently only **Nexus blockchain addresses** (EVM-compatible).

Future: Multi-chain address support planned.

### Can I sell my domain?

**Yes!** Your domain is an NFT, so you can:
- List on OpenSea
- Transfer to buyer directly
- Accept offers
- Auction it

**Transfer:** Domain + NFT ownership transfer together automatically.

---

## Troubleshooting

### "Wrong network" error

**Solution:**
1. Check you're on **Nexus Testnet** (Chain ID: 3940)
2. Click "Switch Network" when prompted
3. Or manually switch in MetaMask:
   - Click network dropdown
   - Select "Nexus Testnet"
   - If not listed, it will auto-add on connect

### "Insufficient funds" error

**Solution:**
- Get more NEX from [Nexus Faucet](https://faucet.nexus.xyz)
- Need at least 0.5 NEX + gas (~0.003 NEX)
- Total: ~0.51 NEX minimum

### Domain shows as "Unavailable"

**Possible reasons:**
1. Someone already owns it
2. It's reserved (system names)
3. It's invalid (too short, special characters)

**Solution:**
- Try different name
- Check spelling
- Remove special characters
- Make it at least 3 characters

### Transaction stuck/pending

**Solution:**
1. Wait 1-2 minutes (network might be congested)
2. Check transaction on [Nexus Explorer](https://testnet3.explorer.nexus.xyz)
3. If failed, try again with higher gas
4. If stuck >10 minutes, contact support

### Avatar not uploading

**Possible causes:**
1. Image too large (>10 MB)
2. Pinata service down
3. Network issues

**Solution:**
- Compress image (use TinyPNG, Squoosh)
- Try different image
- Wait and try again later
- Check Pinata status page

### Profile changes not saving

**Solution:**
1. Make sure transaction confirmed
2. Refresh page
3. Clear browser cache
4. Check transaction on Explorer
5. Try updating one field at a time

### Domain not showing in "My Domains"

**Solution:**
1. Refresh page
2. Ensure transaction confirmed (check Explorer)
3. Make sure you're connected with correct wallet
4. Wait 1-2 minutes for indexing
5. Check you own the NFT (MetaMask → Assets → NFTs)

### NFT not appearing on OpenSea

**Possible reasons:**
1. Nexus testnet not supported on OpenSea
2. Metadata endpoint not accessible
3. NFT indexing delay

**Solution:**
- Check metadata URL directly: `https://nns.web.id/api/metadata/yourname`
- Use NFT viewer that supports custom chains
- Wait 24 hours for indexing
- Refresh metadata on OpenSea (if supported)

### Can't connect wallet on mobile

**Solution:**
1. Use MetaMask mobile app browser
2. Or use WalletConnect instead
3. Ensure you're on supported browser (Safari, Chrome)
4. Update wallet app to latest version

### "Sign In" button not working

**Solution:**
1. Make sure wallet is connected first
2. Check you're on Nexus Testnet
3. Try disconnecting and reconnecting
4. Clear browser cache
5. Try incognito/private mode

---

## Support & Community

Need help? Here's how to get support:

### Documentation
- [Architecture Guide](./ARCHITECTURE.md)
- [Smart Contracts Reference](./CONTRACTS.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Quick Start](../QUICKSTART.md)

### Help Channels
- GitHub Issues: [Report bugs](https://github.com/deniginsb/NNS/issues)
- GitHub Discussions: [Ask questions](https://github.com/deniginsb/NNS/discussions)
- Twitter: [@DBzhx7955](https://x.com/DBzhx7955)

### Contributing
Want to help improve NNS? See [Contributing Guide](../CONTRIBUTING.md)

---

## Tips for Success

### Choosing a Good Domain Name

✅ **Good domain names:**
- Short and memorable (`alice`, `bob`)
- Brandable (`cryptoking`, `nftlover`)
- Your real name (`johnsmith`)
- Community/project name (`myDAO`, `nft-guild`)

❌ **Avoid:**
- Too generic (`user123`)
- Hard to spell (`x2z9k3m`)
- Too long (`thisisaverylongdomainname`)
- Confusing (`alicee` vs `alice`)

### Profile Best Practices

- ✅ Use high-quality avatar (512x512px minimum)
- ✅ Verify social handles are correct
- ✅ Use consistent branding across platforms
- ✅ Update profile when you change social handles
- ❌ Don't put sensitive info (email, phone)
- ❌ Don't use copyrighted images without permission

### Security Tips

- ✅ Never share your private key/seed phrase
- ✅ Double-check addresses before transferring
- ✅ Use hardware wallet for valuable domains
- ✅ Enable 2FA on wallet if available
- ✅ Bookmark the official site (nns.web.id)
- ❌ Don't click suspicious links
- ❌ Don't trust DMs offering "domain support"

---

## What's Next?

Now that you have your `.nexus` domain:

1. ✅ Share it with friends!
2. ✅ Add to your Twitter/Discord bio
3. ✅ Set up your profile with avatar and socials
4. ✅ Register more domains for different purposes
5. ✅ Join the NNS community
6. ✅ Follow updates on Twitter
7. ✅ Contribute to the project on GitHub

**Welcome to the Nexus Name Service community! 🌐✨**

Your decentralized identity starts now.

---

Last updated: 2025-11-29
