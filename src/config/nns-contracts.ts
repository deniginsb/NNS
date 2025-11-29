/**
 * NNS Contract Configuration
 * Deployed on Nexus Testnet with .nexus TLD
 */

export const NNS_CONFIG = {
  chainId: 3940,
  chainName: "Nexus Testnet",
  rpcUrl: "https://testnet3.rpc.nexus.xyz",
  explorerUrl: "https://testnet3.explorer.nexus.xyz",
  nativeCurrency: {
    name: "Nexus Token",
    symbol: "NEX",
    decimals: 18,
  },
  contracts: {
    NNSRegistry: "0x84f1bF40B68Eb18bf17DD2220ea2364AD32EA754",
    PublicResolver: "0xc0bEC1491c336b514CA4496bc00816C66E24a972",
    NexusRegistrar: "0xDfB90263512321E6f14Cf63e30675A6E443924A8",
  },
  config: {
    tld: "nexus",
    registrationFee: "0.5", // NEX
    minDuration: 31536000, // 1 year in seconds
    nexusNamehash: "0x085ca054d8366db2f77a3cc19a1c6965f2b6b7349aaaf999145952a1dd507b5d",
  },
} as const;

// Contract ABIs
export const NNS_REGISTRY_ABI = [
  "function setRecord(bytes32 node, address owner, address resolver, uint64 ttl) external",
  "function setOwner(bytes32 node, address owner) external",
  "function setResolver(bytes32 node, address resolver) external",
  "function owner(bytes32 node) external view returns (address)",
  "function resolver(bytes32 node) external view returns (address)",
  "function recordExists(bytes32 node) external view returns (bool)",
] as const;

export const PUBLIC_RESOLVER_ABI = [
  "function setAddr(bytes32 node, address addr) external",
  "function addr(bytes32 node) external view returns (address)",
  "function setName(bytes32 node, string calldata name) external",
  "function name(bytes32 node) external view returns (string)",
  "function setText(bytes32 node, string calldata key, string calldata value) external",
  "function text(bytes32 node, string calldata key) external view returns (string)",
] as const;

export const NEXUS_REGISTRAR_ABI = [
  "function register(string calldata name, address owner, uint256 duration) external payable",
  "function renew(string calldata name, uint256 duration) external payable",
  "function transfer(string calldata name, address to) external",
  "function available(string calldata name) external view returns (bool)",
  "function getDomain(string calldata name) external view returns (address owner, uint256 expires, bool exists, uint256 tokenId)",
  "function getDomainsOfOwner(address owner) external view returns (string[] memory)",
  "function registrationFee() external view returns (uint256)",
  "function domains(bytes32 label) external view returns (address owner, uint256 expires, bool exists, uint256 tokenId, string name)",
  "event DomainRegistered(string indexed name, bytes32 indexed label, address indexed owner, uint256 expires, string domainName, uint256 tokenId)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
] as const;

// Domain validation
export const DOMAIN_VALIDATION = {
  minLength: 3,
  maxLength: 63,
  pattern: /^[a-z0-9-]+$/,
  tld: ".nexus",
} as const;

export function isValidDomainName(name: string): boolean {
  if (!name || name.length < DOMAIN_VALIDATION.minLength || name.length > DOMAIN_VALIDATION.maxLength) {
    return false;
  }

  if (!DOMAIN_VALIDATION.pattern.test(name)) {
    return false;
  }

  // Cannot start or end with hyphen
  if (name.startsWith('-') || name.endsWith('-')) {
    return false;
  }

  return true;
}

export function formatDomainName(name: string): string {
  // Remove .nexus if present
  const cleanName = name.toLowerCase().replace(/\.nexus$/i, '');
  return `${cleanName}.nexus`;
}

export function getDomainLabel(name: string): string {
  // Remove .nexus suffix to get just the label
  return name.toLowerCase().replace(/\.nexus$/i, '');
}
