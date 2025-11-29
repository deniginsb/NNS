# Smart Contracts Documentation

## Overview

Nexus Name Service uses three main smart contracts deployed on Nexus Testnet:

1. **NNSRegistry** - Core ownership registry
2. **PublicResolver** - Profile data storage
3. **NexusRegistrar** - Registration logic + ERC-721 NFT

All contracts are written in Solidity 0.8.28 and use OpenZeppelin libraries for security.

## Deployed Contracts (Nexus Testnet)

### Main Contracts

| Contract | Address | Explorer | Verified |
|----------|---------|----------|----------|
| **NNSRegistry** | `0x84f1bF40B68Eb18bf17DD2220ea2364AD32EA754` | [View](https://testnet3.explorer.nexus.xyz/address/0x84f1bF40B68Eb18bf17DD2220ea2364AD32EA754) | ✅ |
| **PublicResolver** | `0xc0bEC1491c336b514CA4496bc00816C66E24a972` | [View](https://testnet3.explorer.nexus.xyz/address/0xc0bEC1491c336b514CA4496bc00816C66E24a972) | ✅ |
| **NexusRegistrar** | `0xDfB90263512321E6f14Cf63e30675A6E443924A8` | [View](https://testnet3.explorer.nexus.xyz/address/0xDfB90263512321E6f14Cf63e30675A6E443924A8) | ✅ |

### Configuration

- **TLD**: `.nexus`
- **Registration Fee**: `0.5 NEX`
- **Min Duration**: `365 days` (1 year)
- **Max Duration**: `3650 days` (10 years)
- **Nexus Namehash**: `0x085ca054d8366db2f77a3cc19a1c6965f2b6b7349aaaf999145952a1dd507b5d`

## Contract Details

### 1. NNSRegistry

**Purpose:** Core registry that tracks domain ownership and resolver assignments

**Inheritance:** None (standalone contract)

**Key Storage:**
```solidity
struct Record {
    address owner;      // Domain owner address
    address resolver;   // Resolver contract address
    uint64 ttl;         // Time-to-live (cache duration)
}

mapping(bytes32 => Record) public records;
mapping(address => mapping(address => bool)) public operators;
```

**Key Functions:**

#### `owner(bytes32 node) → address`
Returns the owner of a domain node.

**Example:**
```javascript
const node = namehash("alice.nexus")
const owner = await registry.owner(node)
// Returns: 0xABCD...1234
```

#### `setOwner(bytes32 node, address owner)`
Transfer domain ownership to a new address.

**Requirements:**
- Caller must be current owner or approved operator

**Example:**
```javascript
const node = namehash("alice.nexus")
await registry.setOwner(node, newOwnerAddress)
```

#### `setSubnodeOwner(bytes32 node, bytes32 label, address owner)`
Create a subdomain and assign owner.

**Example:**
```javascript
const parentNode = namehash("alice.nexus")
const label = keccak256("blog")  // "blog.alice.nexus"
await registry.setSubnodeOwner(parentNode, label, subdomainOwner)
```

#### `resolver(bytes32 node) → address`
Get resolver contract address for a domain.

**Example:**
```javascript
const node = namehash("alice.nexus")
const resolverAddress = await registry.resolver(node)
// Returns: 0xc0bEC149... (PublicResolver)
```

### 2. PublicResolver

**Purpose:** Stores profile data (text records, addresses) for domains

**Inheritance:** None

**Key Storage:**
```solidity
mapping(bytes32 => mapping(string => string)) public texts;
mapping(bytes32 => address) public addresses;
```

**Text Record Keys:**
- `"avatar"` - IPFS hash for profile picture
- `"com.twitter"` - Twitter handle
- `"org.telegram"` - Telegram username
- `"url"` - Website URL
- `"email"` - Email address
- `"description"` - Bio/description

**Key Functions:**

#### `text(bytes32 node, string key) → string`
Get text record value.

**Example:**
```javascript
const node = namehash("alice.nexus")
const avatar = await resolver.text(node, "avatar")
// Returns: "ipfs://QmX5s7g..."

const twitter = await resolver.text(node, "com.twitter")
// Returns: "alice_crypto"
```

#### `setText(bytes32 node, string key, string value)`
Set text record value.

**Requirements:**
- Caller must be domain owner (checked via registry)

**Example:**
```javascript
const node = namehash("alice.nexus")
await resolver.setText(node, "com.twitter", "alice_crypto")
await resolver.setText(node, "avatar", "ipfs://QmX5s7g...")
```

#### `addr(bytes32 node) → address`
Get wallet address mapped to domain.

**Example:**
```javascript
const node = namehash("alice.nexus")
const walletAddr = await resolver.addr(node)
// Returns: 0xABCD...1234
```

#### `setAddr(bytes32 node, address addr)`
Set wallet address for domain.

**Requirements:**
- Caller must be domain owner

**Example:**
```javascript
const node = namehash("alice.nexus")
await resolver.setAddr(node, "0xABCD...1234")
```

### 3. NexusRegistrar

**Purpose:** Handle .nexus domain registration and NFT minting

**Inheritance:**
- `ERC721` (OpenZeppelin) - NFT standard
- `ERC721Enumerable` - Token enumeration
- `Ownable` - Access control
- `ReentrancyGuard` - Reentrancy protection

**Key Storage:**
```solidity
struct Domain {
    address owner;      // Domain owner
    uint256 expires;    // Expiration timestamp
    bool exists;        // Domain exists flag
    uint256 tokenId;    // NFT token ID
    string name;        // Domain name (without .nexus)
}

mapping(bytes32 => Domain) public domains;          // label → domain
mapping(string => bool) public reserved;            // reserved names
mapping(uint256 => string) public tokenIdToName;    // tokenId → name
mapping(string => uint256) public nameToTokenId;    // name → tokenId

uint256 public registrationFee = 0.5 ether;
uint256 public constant MIN_REGISTRATION_DURATION = 365 days;
```

**Reserved Names:**
- `www`, `mail`, `ftp`, `admin`, `root`, `nexus`

**Key Functions:**

#### `register(string name, address owner, uint256 duration) payable`
Register a new .nexus domain.

**Parameters:**
- `name` - Domain name (without .nexus), 3-63 chars
- `owner` - Address that will own the domain
- `duration` - Registration duration in seconds (min 1 year)

**Requirements:**
- Must send `>= registrationFee` in NEX
- Name must be 3-63 characters
- Name must be alphanumeric + hyphens (no hyphens at start/end)
- Name must not be reserved
- Name must be available (not registered or expired)

**Example:**
```javascript
const name = "alice"
const owner = "0xABCD...1234"
const duration = 365 * 24 * 60 * 60  // 1 year in seconds
const fee = ethers.parseEther("0.5")

await registrar.register(name, owner, duration, { value: fee })
```

**Events Emitted:**
```solidity
event DomainRegistered(
    string indexed name,
    bytes32 indexed label,
    address indexed owner,
    uint256 expires,
    string domainName,
    uint256 tokenId
)
```

#### `available(string name) → bool`
Check if a domain name is available for registration.

**Returns:**
- `true` if available
- `false` if already registered, reserved, or invalid

**Example:**
```javascript
const isAvailable = await registrar.available("alice")
// Returns: false (if alice.nexus is taken)

const isAvailable2 = await registrar.available("bob")
// Returns: true (if bob.nexus is available)
```

#### `getDomain(string name) → (address owner, uint256 expires, bool exists, uint256 tokenId)`
Get domain information.

**Example:**
```javascript
const [owner, expires, exists, tokenId] = await registrar.getDomain("alice")
// Returns:
// owner: 0xABCD...1234
// expires: 1735689600 (timestamp)
// exists: true
// tokenId: 1
```

#### `getDomainsOfOwner(address owner) → string[]`
Get all domain names owned by an address.

**Example:**
```javascript
const domains = await registrar.getDomainsOfOwner("0xABCD...1234")
// Returns: ["alice", "bob", "charlie"]
```

#### `tokenURI(uint256 tokenId) → string`
Get NFT metadata URL (OpenSea compatible).

**Returns:**
```
https://nns.web.id/api/metadata/alice
```

**Metadata Format:**
```json
{
  "name": "alice.nexus",
  "description": "alice.nexus - A decentralized domain on Nexus Name Service",
  "image": "https://gateway.pinata.cloud/ipfs/Qm...",
  "external_url": "https://nns.web.id/?domain=alice",
  "attributes": [
    { "trait_type": "Domain", "value": "alice.nexus" },
    { "trait_type": "TLD", "value": ".nexus" },
    { "trait_type": "Length", "value": 5 },
    { "trait_type": "Character Set", "value": "Letters" },
    { "trait_type": "Twitter", "value": "alice_crypto" },
    { "trait_type": "Telegram", "value": "alice_tg" }
  ]
}
```

#### `renew(string name, uint256 duration) payable`
Renew an existing domain.

**Requirements:**
- Must send `>= registrationFee` in NEX
- Domain must exist and not be expired

**Example:**
```javascript
const name = "alice"
const duration = 365 * 24 * 60 * 60  // 1 more year
const fee = ethers.parseEther("0.5")

await registrar.renew(name, duration, { value: fee })
```

#### `transfer(string name, address to)`
Transfer domain to new owner.

**Requirements:**
- Caller must be current domain owner
- Domain must not be expired
- Transfers both NFT and registry ownership

**Example:**
```javascript
await registrar.transfer("alice", newOwnerAddress)
```

## Contract Interactions

### Register Domain Flow

```javascript
import { ethers } from 'ethers'

// 1. Check availability
const isAvailable = await registrar.available("alice")
if (!isAvailable) throw new Error("Domain not available")

// 2. Calculate fee
const fee = await registrar.registrationFee()  // 0.5 NEX

// 3. Register domain
const duration = 365 * 24 * 60 * 60  // 1 year
const tx = await registrar.register(
  "alice",              // name
  userAddress,          // owner
  duration,             // duration
  { value: fee }        // payment
)

// 4. Wait for confirmation
const receipt = await tx.wait()
console.log("Registered! TX:", receipt.hash)

// 5. Domain is now owned by userAddress
// 6. NFT minted with tokenId
// 7. Registry updated with ownership
```

### Update Profile Flow

```javascript
import { ethers } from 'ethers'

// 1. Calculate namehash
const fullName = "alice.nexus"
const node = ethers.namehash(fullName)

// 2. Upload avatar to IPFS (via Pinata)
const ipfsHash = await uploadToIPFS(imageFile)
// Returns: "ipfs://QmX5s7g..."

// 3. Update text records
await resolver.setText(node, "avatar", ipfsHash)
await resolver.setText(node, "com.twitter", "alice_crypto")
await resolver.setText(node, "org.telegram", "alice_tg")

// Profile updated onchain! ✅
```

### Query Domain Data

```javascript
// Get all domains owned by address
const domains = await registrar.getDomainsOfOwner(userAddress)
// Returns: ["alice", "bob"]

// For each domain, get profile data
for (const name of domains) {
  const fullName = `${name}.nexus`
  const node = ethers.namehash(fullName)

  // Get profile data
  const avatar = await resolver.text(node, "avatar")
  const twitter = await resolver.text(node, "com.twitter")
  const telegram = await resolver.text(node, "org.telegram")
  const walletAddr = await resolver.addr(node)

  console.log({
    name: fullName,
    avatar,
    twitter,
    telegram,
    address: walletAddr
  })
}
```

## Security Considerations

### Access Control

- **NNSRegistry**: Only domain owner can update records
- **PublicResolver**: Only domain owner can update text records/addresses
- **NexusRegistrar**: Anyone can register (with fee), only owner can transfer

### Input Validation

**Domain Name Rules:**
```javascript
// Valid:
"alice"           // ✅ letters
"bob123"          // ✅ alphanumeric
"my-domain"       // ✅ hyphen in middle
"a1b2c3"          // ✅ mixed

// Invalid:
"ab"              // ❌ too short (<3 chars)
"-alice"          // ❌ starts with hyphen
"alice-"          // ❌ ends with hyphen
"alice.bob"       // ❌ contains dot
"Alice"           // ❌ uppercase (converted to lowercase)
"alice@bob"       // ❌ special chars
```

### Reentrancy Protection

All payable functions use `nonReentrant` modifier:
```solidity
function register(...) external payable nonReentrant {
    // Safe from reentrancy attacks
}
```

### Overflow Protection

Solidity 0.8.28 has built-in overflow protection (no SafeMath needed).

## Gas Optimization Tips

### Batch Updates

Instead of:
```javascript
// 3 separate transactions (expensive)
await resolver.setText(node, "avatar", ipfsHash)
await resolver.setText(node, "com.twitter", "alice")
await resolver.setText(node, "org.telegram", "alice_tg")
```

Use multicall (future enhancement):
```javascript
// 1 transaction (cheaper)
await resolver.multicall([
  resolver.interface.encodeFunctionData("setText", [node, "avatar", ipfsHash]),
  resolver.interface.encodeFunctionData("setText", [node, "com.twitter", "alice"]),
  resolver.interface.encodeFunctionData("setText", [node, "org.telegram", "alice_tg"])
])
```

## Testing

### Mainnet Fork Testing

```bash
# Fork Nexus Testnet
npx hardhat node --fork https://testnet3.rpc.nexus.xyz

# Deploy to fork
npx hardhat run scripts/deploy-nexus.js --network localhost

# Run tests
npx hardhat test --network localhost
```

### Unit Tests (Coming Soon)

```bash
npx hardhat test
```

Example test:
```javascript
describe("NexusRegistrar", function () {
  it("should register domain successfully", async function () {
    const [owner] = await ethers.getSigners()

    const fee = await registrar.registrationFee()
    const duration = 365 * 24 * 60 * 60

    await expect(
      registrar.register("alice", owner.address, duration, { value: fee })
    ).to.emit(registrar, "DomainRegistered")

    const isAvailable = await registrar.available("alice")
    expect(isAvailable).to.be.false
  })
})
```

## ABIs

Full ABIs available in:
- `src/config/nns-contracts.ts` (Frontend)
- `NNS/contracts/artifacts/contracts/` (Hardhat build)

Minimal ABI for common operations included in frontend config.

---

Last updated: 2025-11-29
