import { Toaster } from 'react-hot-toast'

import { ConnectButton } from '@/components/ConnectButton'
import { XIcon } from '@/components/Icons'
import { NameManager } from '@/components/NameManager'
import { ProfileCard } from '@/components/ProfileCard'
import { Squiggle } from '@/components/Squiggle'
import { DOMAIN_VALIDATION, NNS_CONFIG } from '@/config/nns-contracts'

export default async function Home() {
  // Note: Since we don't have a specific address to filter by on the homepage,
  // we'll let the client-side components handle fetching their own data
  // For now, we show an empty state until users register
  const profiles: any[] = []

  return (
    <main>
      <section className="bg-gradient-radial">
        {/* Nav */}
        <nav className="flex items-center justify-between p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <img src="/logo.webp" alt="logo" className="w-20 sm:w-28" />
            <span className="text-sm font-medium text-brand-dark sm:text-base">
              NNS
            </span>
          </div>

          <ConnectButton />
        </nav>

        {/* Hero */}
        <section className="mx-auto flex min-h-[75svh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
          <h1 className="text-4xl sm:text-6xl">
            Nexus Name Service
          </h1>

          <span className="mb-4 mt-3 text-lg sm:text-xl">
            Your identity on the Nexus blockchain
          </span>

          <span className="mb-8 text-sm text-gray-600">
            Register your {DOMAIN_VALIDATION.tld} domain on {NNS_CONFIG.chainName}
          </span>

          {/* Main interactive form */}
          <NameManager />
        </section>
      </section>

      <Squiggle className="bg-gradient-to-b from-[#EDEDEB] to-transparent" />

      {/* Connect */}
      <section className="flex min-h-[25svh] flex-col items-center justify-center gap-6 px-6 py-10 text-center sm:gap-8 sm:px-8 sm:py-14">
        <h2 className="text-2xl sm:text-4xl">Registered Profiles</h2>

        {profiles.length > 0 ? (
          <div className="grid w-full max-w-4xl grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
            {profiles?.map((profile) => (
              <ProfileCard key={profile.name} profile={profile} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No profiles yet. Be the first to register!
          </p>
        )}
      </section>

      {/* Footer */}
      <footer className="flex items-center justify-between gap-6 bg-brand-dark px-6 py-4 text-brand-light sm:px-8 sm:py-6">
        <div className="flex flex-col text-sm sm:text-base">
          <span>
            Powered by{' '}
            <a
              href={NNS_CONFIG.explorerUrl}
              target="_blank"
              className="text-brand-pink underline"
            >
              Nexus Blockchain
            </a>
          </span>
          <span>
            <a
              href="https://github.com/deniginsb/NNS"
              target="_blank"
              className="text-brand-pink underline"
            >
              View the code on GitHub
            </a>
          </span>
        </div>

        <div className="flex gap-3 text-brand-pink">
          <a href="https://x.com/DBzhx7955" target="_blank">
            <XIcon className="h-6 w-6" />
          </a>
        </div>
      </footer>

      <Toaster position="bottom-center" />
    </main>
  )
}
