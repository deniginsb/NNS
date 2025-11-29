# Architecture Overview

## System Design

Nexus Name Service (NNS) uses a **hierarchical naming system** inspired by ENS (Ethereum Name Service). The design provides:

- ✅ Decentralized ownership (onchain NFTs)
- ✅ Flexible profile storage (text records)
- ✅ Immutable registry (can't be taken down)
- ✅ Marketplace compatibility (ERC-721 standard)
- ✅ Simple smart contracts (easy to audit)

## Components

### 1. Smart Contracts Layer

```
┌─────────────────────────────────────────────────────┐
│                 Smart Contracts                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────┐                                  │
│  │  NNSRegistry │  ← Core ownership records        │
│  │              │                                   │
│  │  - owner()   │                                   │
│  │  - resolver()│                                   │
│  │  - setOwner()│                                   │
│  └──────┬───────┘                                   │
│         │                                           │
│         │ uses                                      │
│         ↓                                           │
│  ┌──────────────┐         ┌──────────────┐        │
│  │ PublicResolver│────────▶│ Text Records │        │
│  │              │  stores │ (avatar, etc)│         │
│  │  - setText() │         └──────────────┘         │
│  │  - text()    │                                   │
│  │  - setAddr() │                                   │
│  └──────────────┘                                   │
│         ▲                                           │
│         │                                           │
│  ┌──────┴──────────┐                               │
│  │ NexusRegistrar  │  ← ERC-721 NFT                │
│  │                 │                                │
│  │  - register()   │                                │
│  │  - available()  │                                │
│  │  - tokenURI()   │                                │
│  └─────────────────┘                               │
└─────────────────────────────────────────────────────┘
```

#### NNSRegistry Contract

**Purpose:** Core registry that stores who owns each domain node

**Key Functions:**
- `owner(bytes32 node)` - Returns owner of a domain
- `resolver(bytes32 node)` - Returns resolver address for a domain
- `setOwner(bytes32 node, address owner)` - Transfer domain ownership
- `setSubnodeOwner(bytes32 node, bytes32 label, address owner)` - Create subdomain

**State:**
- `mapping(bytes32 => Record) records` - Domain ownership records
- Each Record contains: `owner`, `resolver`, `ttl`

**Namehash:**
```
The registry uses namehash for domain identification:
- alice.nexus → namehash("alice.nexus")
- nexus → namehash("nexus")

Namehash is calculated recursively:
namehash('') = 0x0000...0000
namehash('nexus') = keccak256(namehash('') + keccak256('nexus'))
namehash('alice.nexus') = keccak256(namehash('nexus') + keccak256('alice'))
```

#### PublicResolver Contract

**Purpose:** Stores profile data and address mappings for domains

**Key Functions:**
- `text(bytes32 node, string key)` - Get text record (e.g., "avatar", "com.twitter")
- `setText(bytes32 node, string key, string value)` - Set text record
- `addr(bytes32 node)` - Get wallet address for domain
- `setAddr(bytes32 node, address addr)` - Set wallet address

**Text Records:**
```solidity
- "avatar" → IPFS hash for profile picture
- "com.twitter" → Twitter handle
- "org.telegram" → Telegram username
- "url" → Website URL (future)
- "email" → Email address (future)
```

**Authorization:**
Only domain owner can update records.

#### NexusRegistrar Contract

**Purpose:** Handle .nexus domain registration and NFT minting

**Key Properties:**
- Inherits `ERC721` - Standard NFT contract
- `registrationFee = 0.5 ether` - Cost in NEX
- `MIN_REGISTRATION_DURATION = 365 days` - 1 year minimum
- `baseNode = namehash("nexus")` - TLD node

**Key Functions:**
- `register(string name, address owner, uint256 duration)` - Register new domain
- `available(string name)` - Check if domain is available
- `getDomain(string name)` - Get domain info (owner, expires, tokenId)
- `getDomainsOfOwner(address owner)` - Get all domains owned by address
- `tokenURI(uint256 tokenId)` - NFT metadata URL

**Registration Flow:**
```solidity
1. User calls register("alice", userAddress, 365 days) with 0.5 NEX
2. Contract validates:
   - Name length (3-63 chars)
   - Name format (alphanumeric + hyphens)
   - Not reserved (www, mail, etc)
   - Available (not already registered)
3. Mint ERC-721 NFT to user
4. Store domain record (owner, expires, tokenId, name)
5. Set registry: setSubnodeRecord(nexusNode, label, owner, resolver)
6. Emit DomainRegistered event
```

### 2. Frontend Layer

```
┌─────────────────────────────────────────────────────┐
│                    Frontend (Next.js)               │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────┐                                  │
│  │  NameManager │  ← Main UI component             │
│  │  Component   │                                   │
│  └──────┬───────┘                                   │
│         │                                           │
│         ├─▶ useAutoSwitchNetwork()                 │
│         │   (auto switch to Nexus Testnet)         │
│         │                                           │
│         ├─▶ useSIWE()                               │
│         │   (Sign-In With Ethereum)                 │
│         │                                           │
│         ├─▶ useNamestone()                          │
│         │   (fetch user's domains)                  │
│         │                                           │
│         └─▶ nns.ts functions                        │
│             - registerDomain()                      │
│             - updateProfile()                       │
│             - checkAvailability()                   │
│                                                     │
│  ┌──────────────┐         ┌──────────────┐        │
│  │  wagmi/viem  │────────▶│  ethers.js   │        │
│  │  (wallet     │         │  (contract   │        │
│  │   connect)   │         │   calls)     │        │
│  └──────────────┘         └──────────────┘        │
└─────────────────────────────────────────────────────┘
```

#### Core React Hooks

**useAutoSwitchNetwork:**
```typescript
// Automatically switches to Nexus Testnet when wallet connects
// If network not in wallet, prompts user to add it
export function useAutoSwitchNetwork() {
  // Detects wrong network
  // Calls switchChain() or addEthereumChain()
  // Shows toast notifications
}
```

**useNamestone:**
```typescript
// Fetches user's registered domains from blockchain
export function useNamestone(address?: Address) {
  return useQuery({
    queryKey: ['namestone', address],
    queryFn: async () => {
      // Call /api/names?address=0x...
      // Returns array of user's domains with profile data
    }
  })
}
```

**useSIWE (ConnectKit):**
```typescript
// Sign-In With Ethereum for authentication
const { isSignedIn, signIn, signOut } = useSIWE()

// Sign in flow:
// 1. User clicks "Sign In"
// 2. Wallet prompts signature of message
// 3. Frontend sends signature to /api/siwe/verify
// 4. Server validates and creates session
```

#### NNS Library (`src/lib/nns.ts`)

**Key Functions:**

```typescript
// Check if domain is available
export async function checkAvailability(
  name: string,
  provider: Provider
): Promise<boolean>

// Register new domain
export async function registerDomain(
  name: string,
  ownerAddress: string,
  walletClient: WalletClient
): Promise<string> // returns tx hash

// Update profile data
export async function updateProfile(
  name: string,
  updates: { avatar?: string, twitter?: string, telegram?: string },
  walletClient: WalletClient
): Promise<void>

// Get profile data from blockchain
export async function getProfileData(
  domainName: string,
  provider: Provider
): Promise<ProfileData | null>
```

### 3. API Routes

```
┌─────────────────────────────────────────────────────┐
│                 Next.js API Routes                  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  /api/siwe/[...route]                              │
│  ├─ POST /verify → Verify SIWE signature           │
│  ├─ GET /session → Get current session             │
│  └─ POST /logout → Clear session                   │
│                                                     │
│  /api/names                                         │
│  └─ GET ?address=0x... → Fetch user's domains      │
│                                                     │
│  /api/metadata/[name]                              │
│  └─ GET /alice → NFT metadata JSON                 │
│     {                                               │
│       "name": "alice.nexus",                       │
│       "description": "...",                        │
│       "image": "ipfs://...",                       │
│       "attributes": [...]                          │
│     }                                               │
│                                                     │
│  /api/pinata/key                                    │
│  └─ GET → Generate temporary Pinata upload key     │
└─────────────────────────────────────────────────────┘
```

#### /api/names Flow

```
Client Request
    │
    ↓
GET /api/names?address=0xABCD...
    │
    ↓
Server fetches from blockchain:
1. Call NexusRegistrar.getDomainsOfOwner(address)
2. For each domain, call getProfileData():
   - Get avatar from resolver.text(node, "avatar")
   - Get twitter from resolver.text(node, "com.twitter")
   - Get telegram from resolver.text(node, "org.telegram")
3. Format response
    │
    ↓
Return JSON:
[
  {
    name: "alice",
    address: "0xABCD...",
    avatar: "ipfs://Qm...",
    twitter: "alice_crypto",
    telegram: "alice_tg"
  }
]
```

#### /api/metadata/[name] Flow

```
OpenSea/Marketplace Request
    │
    ↓
GET /api/metadata/alice
    │
    ↓
Server:
1. Fetch alice.nexus profile from blockchain
2. Generate OpenSea-compatible JSON:
   {
     "name": "alice.nexus",
     "description": "A decentralized domain on NNS",
     "image": "[avatar IPFS URL]",
     "external_url": "https://nns.web.id/?domain=alice",
     "attributes": [
       { "trait_type": "Domain", "value": "alice.nexus" },
       { "trait_type": "Length", "value": 5 },
       { "trait_type": "Twitter", "value": "@alice_crypto" }
     ]
   }
    │
    ↓
Return JSON (cached for 5 minutes)
```

### 4. Data Flow Diagrams

#### Domain Registration Flow

```
User Wallet                Frontend              Blockchain
    │                          │                      │
    │  1. Connect wallet       │                      │
    │─────────────────────────▶│                      │
    │                          │                      │
    │                          │  2. Auto-switch to   │
    │                          │     Nexus Testnet    │
    │◀─────────────────────────│                      │
    │  3. Approve switch       │                      │
    │                          │                      │
    │  4. Sign SIWE message    │  5. Verify signature │
    │◀─────────────────────────┼─────────────────────▶│
    │  (authenticate)          │     Create session   │
    │                          │                      │
    │  6. Enter "alice"        │  7. Check available  │
    │─────────────────────────▶┼─────────────────────▶│
    │                          │  registrar.available()│
    │                          │◀─────────────────────│
    │                          │  true ✓              │
    │                          │                      │
    │  8. Confirm (0.5 NEX)    │  9. register()       │
    │──────────────────────────┼─────────────────────▶│
    │                          │  with 0.5 NEX        │
    │                          │                      │
    │                          │  10. Mint NFT        │
    │                          │      Set registry    │
    │◀─────────────────────────┼──────────────────────│
    │  11. alice.nexus owned! │                      │
```

#### Profile Update Flow

```
User Wallet                Frontend              IPFS/Pinata          Blockchain
    │                          │                      │                      │
    │  1. Upload avatar image  │                      │                      │
    │─────────────────────────▶│  2. Upload to IPFS   │                      │
    │                          │─────────────────────▶│                      │
    │                          │                      │                      │
    │                          │  3. Return IPFS hash │                      │
    │                          │◀─────────────────────│                      │
    │                          │  ipfs://Qm...        │                      │
    │                          │                      │                      │
    │  4. Enter Twitter handle │                      │                      │
    │  5. Enter Telegram       │                      │                      │
    │─────────────────────────▶│                      │                      │
    │                          │                      │                      │
    │  6. Confirm update       │  7. setText() x3     │                      │
    │──────────────────────────┼──────────────────────┼─────────────────────▶│
    │                          │  - avatar: ipfs://...│                      │
    │                          │  - com.twitter: alice│                      │
    │                          │  - org.telegram: alice_tg                   │
    │                          │                      │                      │
    │                          │                      │  8. Store onchain    │
    │◀─────────────────────────┼──────────────────────┼──────────────────────│
    │  9. Profile updated! ✨  │                      │                      │
```

## Security Model

### Access Control

```
Owner (Deployer)
    │
    ├──▶ NNSRegistry
    │       │
    │       └──▶ Only owner can transfer base nodes
    │
    ├──▶ PublicResolver
    │       │
    │       └──▶ Anyone can read
    │       └──▶ Only domain owner can write
    │
    └──▶ NexusRegistrar
            │
            └──▶ Anyone can register (pay fee)
            └──▶ Owner can setRegistrationFee()
            └──▶ Owner can setReserved()
            └──▶ Owner can withdraw fees
```

### Authentication Flow (SIWE)

```
1. User clicks "Sign In"
2. Frontend generates SIWE message:
   "nns.web.id wants you to sign in with your Ethereum account:
    0xABCD...1234

    Sign in to Nexus Name Service

    URI: https://nns.web.id
    Version: 1
    Chain ID: 3940
    Nonce: [random]
    Issued At: [timestamp]"

3. User signs message with wallet
4. Frontend sends signature to /api/siwe/verify
5. Server validates:
   - Signature is valid
   - Message not expired
   - Chain ID matches (3940)
6. Server creates encrypted session (iron-session)
7. Session stored in cookie (httpOnly, secure)
8. Future requests include session cookie for auth
```

### Trust Assumptions

1. **Contract Immutability**: Contracts cannot be upgraded (no proxy pattern)
2. **Owner Honesty**: Contract owner can update fees and reserved names
3. **IPFS Availability**: Avatar images depend on IPFS/Pinata availability
4. **Nexus Blockchain**: System depends on Nexus L1 continuing to operate

### Attack Vectors & Mitigations

| Attack | Mitigation |
|--------|------------|
| Domain squatting | First-come-first-serve (fair), registration fee (spam prevention) |
| Unauthorized profile updates | Only domain owner can update (checked onchain) |
| Session hijacking | HttpOnly cookies, SIWE signature validation, short session TTL |
| Reentrancy | ReentrancyGuard on all payable functions |
| Frontrunning registration | Commit-reveal not implemented (future enhancement) |

## Performance Considerations

### Gas Costs

| Operation | Estimated Gas | Cost in NEX (@ 20 gwei) |
|-----------|--------------|-------------------------|
| Register domain (first time) | ~180,000 | ~0.0036 NEX + 0.5 fee |
| Register domain (subsequent) | ~160,000 | ~0.0032 NEX + 0.5 fee |
| Update avatar (setText) | ~60,000 | ~0.0012 NEX |
| Update all profile fields | ~150,000 | ~0.003 NEX |
| Transfer domain (NFT) | ~50,000 | ~0.001 NEX |

### Scalability

- **Throughput**: Limited by Nexus L1 block time (~2 seconds)
- **State Growth**: Each domain adds ~1KB to state
- **Frontend**: Next.js with static generation for fast loads
- **Caching**: API responses cached (5 min TTL)

### Optimization Strategies

**Smart Contracts:**
- Use `calldata` instead of `memory` for string parameters
- Batch profile updates in single transaction
- Cache storage reads in memory variables

**Frontend:**
- Use React Query for data caching
- Lazy load components
- Optimize images (WebP, lazy loading)
- Code splitting (Next.js automatic)

**API:**
- Response caching (Vercel Edge)
- Database indexing (if added in future)
- Rate limiting (prevent abuse)

## Future Enhancements

### Phase 2
- [ ] Subdomain support (bob.alice.nexus)
- [ ] Reverse resolution (address → primary domain)
- [ ] Domain marketplace (buy/sell/auction)
- [ ] Batch operations (register multiple, update multiple)

### Phase 3
- [ ] ENS compatibility layer (use .nexus in ENS-compatible dApps)
- [ ] Decentralized website hosting (IPFS content hash)
- [ ] More text records (email, GitHub, Discord, etc)
- [ ] Avatar NFT support (use owned NFT as avatar)

### Phase 4
- [ ] Cross-chain bridges (use .nexus on other chains)
- [ ] DAO governance (community-controlled parameters)
- [ ] Subname delegation (alice can create bob.alice.nexus)
- [ ] Advanced NFT traits (domain age, rarity, etc)

---

Last updated: 2025-01-29
