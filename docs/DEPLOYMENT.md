# Deployment Guide 🚀

Complete guide to deploying Nexus Name Service to production.

## Overview

This guide covers:
- ✅ Smart contract deployment to Nexus Testnet
- ✅ Frontend deployment to Vercel
- ✅ Environment configuration
- ✅ Custom domain setup
- ✅ Post-deployment verification

## Prerequisites

Before deploying, ensure you have:

- ✅ Nexus Testnet wallet with NEX tokens
- ✅ [Vercel account](https://vercel.com) (free tier works)
- ✅ [Pinata account](https://pinata.cloud) for IPFS
- ✅ [WalletConnect project ID](https://cloud.walletconnect.com)
- ✅ Custom domain (optional, e.g., nns.web.id)
- ✅ Node.js v18+ installed locally

---

## Part 1: Smart Contract Deployment

### Step 1: Setup Hardhat Environment

```bash
cd NNS/contracts

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

### Step 2: Configure .env

Edit `NNS/contracts/.env`:

```bash
# Your deployer wallet private key (must have NEX tokens!)
PRIVATE_KEY=your_private_key_here

# Nexus Testnet RPC
NEXUS_RPC_URL=https://testnet3.rpc.nexus.xyz

# Nexus Testnet Explorer API (for verification)
NEXUS_EXPLORER_API=https://testnet3.explorer.nexus.xyz/api
```

⚠️ **Security Warning**: Never commit your private key! Add `.env` to `.gitignore`.

### Step 3: Get Testnet NEX Tokens

You need ~2 NEX for deployment gas fees:

1. Visit [Nexus Testnet Faucet](https://faucet.nexus.xyz)
2. Enter your wallet address
3. Request tokens
4. Wait for confirmation (~30 seconds)

Verify balance:
```bash
npx hardhat run scripts/check-balance.js --network nexus
```

### Step 4: Deploy Contracts

Run deployment script:

```bash
npx hardhat run scripts/deploy-nexus.js --network nexus
```

**Expected output:**
```
Deploying Nexus Name Service contracts...

1. Deploying NNSRegistry...
   ✅ NNSRegistry deployed to: 0x84f1bF40B68Eb18bf17DD2220ea2364AD32EA754

2. Deploying PublicResolver...
   ✅ PublicResolver deployed to: 0xc0bEC1491c336b514CA4496bc00816C66E24a972

3. Deploying NexusRegistrar...
   ✅ NexusRegistrar deployed to: 0xDfB90263512321E6f14Cf63e30675A6E443924A8

4. Setting up permissions...
   ✅ Registry configured
   ✅ Resolver linked

Deployment complete! 🎉

Contract Addresses:
- NNSRegistry: 0x84f1bF40B68Eb18bf17DD2220ea2364AD32EA754
- PublicResolver: 0xc0bEC1491c336b514CA4496bc00816C66E24a972
- NexusRegistrar: 0xDfB90263512321E6f14Cf63e30675A6E443924A8

Save these addresses for frontend configuration!
```

### Step 5: Verify Contracts (Optional but Recommended)

Verify on Nexus Explorer for transparency:

```bash
npx hardhat verify --network nexus 0x84f1bF40B68Eb18bf17DD2220ea2364AD32EA754
npx hardhat verify --network nexus 0xc0bEC1491c336b514CA4496bc00816C66E24a972 0x84f1bF40B68Eb18bf17DD2220ea2364AD32EA754
npx hardhat verify --network nexus 0xDfB90263512321E6f14Cf63e30675A6E443924A8 0x84f1bF40B68Eb18bf17DD2220ea2364AD32EA754 0xc0bEC1491c336b514CA4496bc00816C66E24a972
```

✅ Verified contracts show a green checkmark on [Nexus Explorer](https://testnet3.explorer.nexus.xyz)

---

## Part 2: Frontend Deployment

### Step 1: Update Contract Addresses

Edit `src/config/nns-contracts.ts` with your deployed contract addresses:

```typescript
export const NNS_CONFIG = {
  chainId: 3940,
  chainName: "Nexus Testnet",
  rpcUrl: "https://testnet3.rpc.nexus.xyz",
  explorerUrl: "https://testnet3.explorer.nexus.xyz",

  contracts: {
    NNSRegistry: "0x84f1bF40B68Eb18bf17DD2220ea2364AD32EA754",      // ← Your address
    PublicResolver: "0xc0bEC1491c336b514CA4496bc00816C66E24a972",    // ← Your address
    NexusRegistrar: "0xDfB90263512321E6f14Cf63e30675A6E443924A8",   // ← Your address
  },

  // ... rest of config
}
```

### Step 2: Setup Environment Variables

Get required API keys:

**WalletConnect Project ID:**
1. Go to https://cloud.walletconnect.com
2. Create free account
3. Create new project
4. Copy Project ID

**Pinata JWT Token:**
1. Go to https://app.pinata.cloud
2. Sign up for free account
3. Go to API Keys → New Key
4. Enable Admin permissions
5. Copy JWT token

**Generate Session Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 3: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 4: Deploy to Vercel

```bash
cd namestone-example

# Login to Vercel
vercel login

# Deploy to production (Singapore region)
vercel --prod --yes --regions sin1
```

**During deployment, Vercel will ask for environment variables.**

If not, set them manually in Vercel Dashboard:

1. Go to https://vercel.com/dashboard
2. Select your project
3. Settings → Environment Variables
4. Add these variables:

| Variable | Value | Notes |
|----------|-------|-------|
| `SESSION_SECRET` | `your_generated_secret` | From Step 2 |
| `NEXT_PUBLIC_WALLETCONNECT_ID` | `your_walletconnect_id` | From WalletConnect |
| `PINATA_JWT` | `your_pinata_jwt` | From Pinata |
| `NEXT_PUBLIC_GATEWAY_URL` | `https://gateway.pinata.cloud` | Pinata gateway |

⚠️ Variables starting with `NEXT_PUBLIC_` are exposed to browser. Others are server-side only.

### Step 5: Redeploy with Environment Variables

If you added env vars after initial deployment:

```bash
vercel --prod --yes --regions sin1
```

**Successful deployment output:**
```
✅ Deployment ready at: https://namestone-example.vercel.app
```

---

## Part 3: Custom Domain Setup (Optional)

### Step 1: Add Domain in Vercel

1. Go to Vercel Dashboard → Your Project
2. Settings → Domains
3. Add domain: `nns.web.id`
4. Add domain: `www.nns.web.id`

### Step 2: Configure DNS

Add these records in your domain registrar (e.g., Cloudflare, Namecheap):

**For nns.web.id:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www.nns.web.id:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

⏱️ DNS propagation takes 5-60 minutes.

### Step 3: Configure Redirects

Create `vercel.json` in project root:

```json
{
  "regions": ["sin1"],
  "redirects": [
    {
      "source": "/:path*",
      "has": [
        {
          "type": "host",
          "value": "www.nns.web.id"
        }
      ],
      "destination": "https://nns.web.id/:path*",
      "permanent": true
    }
  ]
}
```

This redirects `www.nns.web.id` → `nns.web.id` permanently (SEO friendly).

### Step 4: Update Metadata

Update `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'Nexus Name Service (NNS)',
  description: 'Decentralized domain names on Nexus blockchain.',
  metadataBase: new URL(
    process.env.NODE_ENV === 'production'
      ? 'https://nns.web.id'  // ← Your custom domain
      : 'http://localhost:3000'
  ),
}
```

### Step 5: Update NFT Metadata URL

If you're using custom domain, update contract `tokenURI`:

```solidity
function tokenURI(uint256 tokenId) public view override returns (string memory) {
    require(_ownerOf(tokenId) != address(0), "Token does not exist");
    string memory domainName = tokenIdToName[tokenId];
    return string(abi.encodePacked("https://nns.web.id/api/metadata/", domainName));
    //                             ↑ Your custom domain
}
```

**Redeploy contract if you change this!**

---

## Part 4: Post-Deployment Verification

### ✅ Checklist

Test these flows after deployment:

**1. Wallet Connection**
- [ ] Connect MetaMask wallet
- [ ] Auto-switch to Nexus Testnet works
- [ ] Network auto-adds if not in wallet
- [ ] Toast notifications appear

**2. SIWE Authentication**
- [ ] Click "Sign In"
- [ ] Wallet prompts signature
- [ ] Sign in successful
- [ ] Session persists on refresh

**3. Domain Registration**
- [ ] Search domain availability
- [ ] Register new domain (0.5 NEX)
- [ ] Transaction confirms
- [ ] Domain appears in "My Domains"
- [ ] NFT minted to wallet

**4. Profile Updates**
- [ ] Upload avatar to IPFS
- [ ] Avatar preview shows
- [ ] Update Twitter handle
- [ ] Update Telegram username
- [ ] Changes save onchain
- [ ] Profile visible to others

**5. NFT Metadata**
- [ ] Visit `/api/metadata/yourname`
- [ ] JSON returns correct data
- [ ] Avatar IPFS link resolves
- [ ] OpenSea shows NFT correctly
- [ ] Domain name shows as NFT name

**6. Domain Display**
- [ ] Connected wallet shows `yourname.nexus`
- [ ] Not showing old `.shefi.eth`
- [ ] Domain clickable → profile

**7. Mobile Responsiveness**
- [ ] Test on mobile browser
- [ ] Wallet connect works (MetaMask mobile)
- [ ] UI scales correctly
- [ ] All features functional

### Test Commands

**Test API endpoints:**
```bash
# Health check
curl https://nns.web.id

# Metadata endpoint (replace 'alice' with real domain)
curl https://nns.web.id/api/metadata/alice

# Names endpoint (replace with real address)
curl https://nns.web.id/api/names?address=0xYourAddress
```

**Expected responses:**
```json
// /api/metadata/alice
{
  "name": "alice.nexus",
  "description": "alice.nexus - A decentralized domain on Nexus Name Service",
  "image": "ipfs://Qm...",
  "external_url": "https://nns.web.id/?domain=alice",
  "attributes": [...]
}

// /api/names?address=0x...
[
  {
    "name": "alice",
    "address": "0x...",
    "avatar": "ipfs://...",
    "twitter": "alice_crypto",
    "telegram": "alice_tg"
  }
]
```

---

## Troubleshooting

### Issue: "Insufficient funds for gas"

**Cause**: Deployer wallet doesn't have enough NEX

**Solution**:
```bash
# Check balance
npx hardhat run scripts/check-balance.js --network nexus

# Request more from faucet
https://faucet.nexus.xyz
```

### Issue: "Contract verification failed"

**Cause**: Constructor arguments mismatch or compiler version wrong

**Solution**:
```bash
# Use exact compiler version from hardhat.config.js
npx hardhat verify --network nexus <address> <constructor_args>

# For contracts with dependencies, create verify script:
npx hardhat run scripts/verify.js --network nexus
```

### Issue: Build fails on Vercel

**Cause**: Missing environment variables

**Solution**:
1. Check Vercel Dashboard → Project → Settings → Environment Variables
2. Ensure all variables are set (SESSION_SECRET, PINATA_JWT, NEXT_PUBLIC_WALLETCONNECT_ID)
3. Redeploy: `vercel --prod --yes`

### Issue: "Wrong network" error persists

**Cause**: Auto-switch network not triggering

**Solution**:
1. Check `useAutoSwitchNetwork` hook is imported in layout
2. Clear browser cache
3. Disconnect wallet completely and reconnect
4. Manually add Nexus Testnet to wallet first

### Issue: IPFS images not loading

**Cause**: Pinata gateway configuration

**Solution**:
1. Check `NEXT_PUBLIC_GATEWAY_URL=https://gateway.pinata.cloud`
2. Test IPFS link directly: `https://gateway.pinata.cloud/ipfs/Qm...`
3. Try alternative gateway: `https://ipfs.io/ipfs/Qm...`

### Issue: NFT not showing on OpenSea

**Cause**: Metadata URL not accessible or wrong format

**Solution**:
1. Test metadata endpoint: `curl https://nns.web.id/api/metadata/yourname`
2. Ensure JSON matches OpenSea standard
3. Refresh metadata on OpenSea (if testnet supported)
4. Check contract `tokenURI()` returns correct URL

### Issue: www redirect not working

**Cause**: DNS not propagated or vercel.json config wrong

**Solution**:
1. Wait 30-60 minutes for DNS propagation
2. Check `vercel.json` redirects configuration
3. Test: `curl -I https://www.nns.web.id` (should return 308 redirect)
4. Clear CDN cache in Vercel Dashboard

---

## Production Best Practices

### Security

- ✅ Never commit `.env` or `.env.local` files
- ✅ Use different `SESSION_SECRET` for dev/prod
- ✅ Rotate API keys periodically
- ✅ Enable 2FA on Vercel and Pinata accounts
- ✅ Use hardware wallet for contract deployer
- ✅ Verify contracts on explorer for transparency

### Performance

- ✅ Use Vercel Edge Functions for API routes
- ✅ Enable response caching (5 min TTL)
- ✅ Optimize images (WebP format, lazy loading)
- ✅ Deploy to closest region to users (sin1 for Asia)
- ✅ Monitor Core Web Vitals in Vercel Analytics

### Monitoring

- ✅ Enable Vercel Analytics
- ✅ Monitor error logs in Vercel dashboard
- ✅ Set up uptime monitoring (UptimeRobot, Pingdom)
- ✅ Track smart contract events for suspicious activity
- ✅ Monitor registration metrics (daily/weekly signups)

### Backups

- ✅ Smart contracts are immutable (no backup needed)
- ✅ Export domain data periodically from blockchain
- ✅ Keep deployment script backups
- ✅ Document all contract addresses
- ✅ Save ABIs in version control

---

## Deployment Checklist

Before going live, ensure:

**Smart Contracts:**
- [ ] Contracts deployed to Nexus Testnet
- [ ] Contracts verified on Explorer
- [ ] All 3 contracts deployed (Registry, Resolver, Registrar)
- [ ] Test registration works onchain
- [ ] Fee collected successfully (0.5 NEX)
- [ ] Ownership records correct

**Frontend:**
- [ ] Environment variables configured
- [ ] Contract addresses updated in config
- [ ] Domain metadata correct (title, description)
- [ ] Custom domain connected (if applicable)
- [ ] SSL certificate active (https)
- [ ] www redirect working

**Testing:**
- [ ] All checklist items passed
- [ ] Tested on desktop (Chrome, Firefox, Safari)
- [ ] Tested on mobile (iOS Safari, Android Chrome)
- [ ] Tested with multiple wallets (MetaMask, WalletConnect)
- [ ] Registration flow end-to-end
- [ ] Profile update flow
- [ ] NFT metadata visible

**Documentation:**
- [ ] README.md updated
- [ ] Contract addresses documented
- [ ] API endpoints documented
- [ ] Screenshots added (if applicable)
- [ ] GitHub repo public

---

## Maintenance

### Update Registration Fee

```solidity
// In NexusRegistrar.sol (requires contract owner)
function setRegistrationFee(uint256 newFee) external onlyOwner {
    registrationFee = newFee;
}
```

```bash
# Call via Hardhat script
npx hardhat run scripts/update-fee.js --network nexus
```

### Withdraw Collected Fees

```solidity
function withdraw() external onlyOwner {
    payable(owner()).transfer(address(this).balance);
}
```

### Reserve Additional Names

```solidity
function setReserved(string memory name, bool reserved) external onlyOwner {
    reserved[name] = reserved;
}
```

### Contract Ownership Transfer

```solidity
// Use OpenZeppelin Ownable transferOwnership
function transferOwnership(address newOwner) public virtual onlyOwner
```

⚠️ **Warning**: Be extremely careful with ownership operations. Test on testnet first!

---

## Upgrade Path (Future)

Currently, contracts are **not upgradeable** (no proxy pattern). To add new features:

1. Deploy new contract version
2. Update frontend config with new addresses
3. Migrate existing domains (if needed)
4. Sunset old contracts gracefully

**Future enhancement**: Consider implementing UUPS or Transparent Proxy pattern for upgradeability.

---

## Support

If you encounter issues:

1. Check [Troubleshooting](#troubleshooting) section
2. Review [Architecture docs](./ARCHITECTURE.md)
3. Search [GitHub Issues](https://github.com/deniginsb/NNS/issues)
4. Ask in Discussions
5. Contact maintainers

---

## Summary

Deployment flow:
```
1. Deploy Smart Contracts → Nexus Testnet
2. Verify Contracts → Nexus Explorer
3. Update Frontend Config → Contract addresses
4. Setup Environment Variables → Vercel
5. Deploy Frontend → Vercel (Singapore region)
6. Add Custom Domain → DNS + Vercel
7. Test Everything → Checklist
8. Monitor → Analytics + Logs
```

**Estimated time:** 30-60 minutes (excluding DNS propagation)

**Cost:**
- Smart contract deployment: ~0.05 NEX gas fees
- Vercel hosting: Free (Hobby plan)
- Pinata IPFS: Free (up to 1GB)
- WalletConnect: Free
- Custom domain: $10-15/year (optional)

Happy deploying! 🚀✨

---

Last updated: 2025-11-29
