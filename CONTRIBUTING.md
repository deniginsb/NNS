# Contributing to Nexus Name Service

First off, thanks for taking the time to contribute! 🎉

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (transaction hashes, domain names, wallet addresses)
- **Describe the behavior you observed and what you expected**
- **Include screenshots** if relevant
- **Note your environment** (browser, OS, wallet extension version)

**Example:**
```
Title: Domain registration fails for names with hyphens

Steps to reproduce:
1. Connect wallet to Nexus Testnet
2. Sign in with SIWE
3. Enter domain name "my-domain"
4. Click register
5. Transaction reverts

Expected: Domain should register successfully
Actual: Transaction fails with error "invalid name"

Environment:
- Browser: Chrome 120
- OS: macOS 14
- Wallet: MetaMask 11.5
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the proposed functionality
- **Explain why this enhancement would be useful**
- **List any similar features** in other naming services (ENS, Unstoppable Domains, etc)
- **Include mockups or examples** if applicable

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code, add tests (when test infrastructure is ready)
3. If you've changed APIs, update the documentation
4. Ensure the build passes (`npm run build`)
5. Make sure your code follows the existing style
6. Write meaningful commit messages
7. Issue that pull request!

## Development Process

### Setup Development Environment

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/NNS.git
cd NNS/namestone-example

# Add upstream remote
git remote add upstream https://github.com/deniginsb/NNS.git

# Install dependencies
npm install

# Create .env.local
cp .env.example .env.local
# Edit .env.local with your credentials
```

### Create a Feature Branch

```bash
git checkout -b feature/amazing-feature
```

### Make Your Changes

Edit code, test thoroughly, then commit:

```bash
git add .
git commit -m "feat: add amazing feature"
```

### Push and Create PR

```bash
git push origin feature/amazing-feature
```

Then open a Pull Request on GitHub.

## Code Style

### TypeScript

- Follow existing patterns in the codebase
- Use meaningful variable and function names
- Add JSDoc comments for public functions
- Prefer `const` over `let`, avoid `var`
- Use TypeScript types, avoid `any` when possible

**Good:**
```typescript
/**
 * Register a new .nexus domain
 * @param name - Domain name without .nexus extension
 * @param ownerAddress - Owner's wallet address
 * @param walletClient - Wagmi wallet client
 * @returns Transaction hash
 */
export async function registerDomain(
  name: string,
  ownerAddress: string,
  walletClient: WalletClient
): Promise<string> {
  // Implementation
}
```

**Bad:**
```typescript
export async function reg(n: any, addr: any, w: any): Promise<any> {
  // No documentation, unclear names, uses 'any'
}
```

### Solidity

- Follow [Solidity Style Guide](https://docs.soliditylang.org/en/latest/style-guide.html)
- Use OpenZeppelin contracts when possible
- Add NatSpec comments for all public functions
- Follow checks-effects-interactions pattern
- Consider gas optimization

**Good:**
```solidity
/**
 * @notice Register a new domain
 * @param name Domain name (without .nexus)
 * @param owner Address that will own the domain
 * @param duration Registration duration in seconds
 */
function register(
    string calldata name,
    address owner,
    uint256 duration
) external payable validName(name) nonReentrant {
    // Implementation
}
```

### React Components

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use proper TypeScript types for props

**Good:**
```typescript
interface ProfileCardProps {
  profile: NamestoneProfile
  onUpdate?: () => void
}

export function ProfileCard({ profile, onUpdate }: ProfileCardProps) {
  // Component implementation
}
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(registration): add support for emoji domains
fix(profile): resolve avatar upload timeout
docs(readme): update installation instructions
refactor(contracts): optimize gas usage in register function
test(nns): add unit tests for domain validation
chore(deps): update ethers to v6.8.0
```

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test additions

**Examples:**
- `feature/subdomain-support`
- `fix/avatar-upload-error`
- `docs/update-quickstart`
- `refactor/simplify-registry-logic`

## Smart Contract Guidelines

### Security First

- ✅ Use OpenZeppelin contracts when possible
- ✅ Follow checks-effects-interactions pattern
- ✅ Add comprehensive tests for edge cases
- ✅ Document all external functions with NatSpec
- ✅ Consider reentrancy attacks
- ✅ Validate all inputs
- ✅ Use SafeMath for Solidity <0.8.0 (we use 0.8.28, so built-in)

### Gas Optimization

- Minimize storage reads/writes
- Use `calldata` for function parameters when possible
- Cache storage variables in memory
- Batch operations when feasible
- Use events instead of storing data when possible

### Testing Requirements (Future)

All smart contract changes will require:

1. Unit tests for new functions
2. Integration tests for contract interactions
3. Edge case testing
4. Gas usage reporting

## Frontend Guidelines

### Component Structure

- Keep components focused on one responsibility
- Extract complex logic into hooks or utilities
- Use proper loading and error states
- Handle wallet connection edge cases

### State Management

- Use React hooks for local state
- Use Wagmi hooks for blockchain data
- Keep state as close to where it's used as possible
- Avoid prop drilling, use context if needed

### Styling

- Use Tailwind CSS utility classes
- Follow existing color scheme and spacing
- Ensure responsive design (test on mobile)
- Test on multiple browsers (Chrome, Firefox, Safari)

### Error Handling

- Always handle errors gracefully
- Show user-friendly error messages
- Log errors to console for debugging
- Don't expose sensitive information in errors

**Good:**
```typescript
try {
  await registerDomain(name, address, walletClient)
  toast.success('Domain registered successfully!')
} catch (error) {
  console.error('Registration error:', error)
  toast.error('Failed to register domain. Please try again.')
}
```

## Documentation

### Update These When Changing Code

- **README.md** - For user-facing changes
- **QUICKSTART.md** - For setup process changes
- **ARCHITECTURE.md** - For design changes
- **CONTRACTS.md** - For smart contract changes
- **DEPLOYMENT.md** - For deployment process changes
- **Inline code comments** - For complex logic

### Documentation Style

- Write for beginners, not experts
- Include code examples
- Add screenshots for UI changes
- Keep it concise but complete
- Use proper markdown formatting
- Add links to related docs

## Testing

### Manual Testing Checklist

Before submitting PR, test these flows:

- [ ] Wallet connection (MetaMask, WalletConnect)
- [ ] Network switching to Nexus Testnet
- [ ] SIWE sign-in
- [ ] Domain registration (various name lengths)
- [ ] Domain registration (edge cases: hyphens, numbers, etc)
- [ ] Avatar upload to IPFS
- [ ] Profile update (Twitter, Telegram)
- [ ] View registered domains
- [ ] NFT metadata API endpoint
- [ ] OpenSea compatibility
- [ ] Mobile responsiveness
- [ ] Browser compatibility

### Automated Tests (Coming Soon)

```bash
# Run all tests
npm test

# Run specific test file
npm test src/lib/nns.test.ts

# Coverage report
npm run test:coverage
```

## Community

### Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the community
- Help others learn and grow

### Getting Help

- Check [Documentation](./docs)
- Search existing [Issues](https://github.com/deniginsb/NNS/issues)
- Ask in GitHub Discussions (if available)
- Tag maintainers if urgent

### Communication

- Keep discussions on-topic
- Be patient with responses
- Provide context in questions
- Share screenshots/code when asking for help

## Recognition

Contributors will be:
- Listed in README.md (Contributors section - coming soon)
- Credited in release notes
- Given contributor badge on GitHub
- Mentioned in social media announcements (major contributions)

## Pull Request Review Process

1. **Automated Checks**
   - Build passes
   - Linting passes
   - Type checking passes
   - (Tests pass - when available)

2. **Code Review**
   - At least one maintainer approval required
   - Address all review comments
   - Make requested changes
   - Keep PR scope focused

3. **Merge**
   - Squash and merge (maintains clean history)
   - Delete feature branch after merge
   - Update linked issues

## Release Process

- Maintainers handle releases
- Version follows [Semantic Versioning](https://semver.org/)
- Changelog generated from commit messages
- Releases published on GitHub

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to open an issue with the `question` label or reach out to maintainers!

---

Thank you for contributing to Nexus Name Service! 🌐🚀

Your contributions help build a better decentralized future for everyone.
