'use client'

import { useSIWE } from 'connectkit'
import React, { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import toast, { Toaster } from 'react-hot-toast'
import { useAccount, useWalletClient } from 'wagmi'

import { createName } from '@/actions/create'
import { updateName } from '@/actions/update'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { useIsMounted } from '@/hooks/useIsMounted'
import { useNamestone } from '@/hooks/useNamestone'
import { useAutoSwitchNetwork } from '@/hooks/useAutoSwitchNetwork'
import { pinata } from '@/lib/pinata'
import { cn } from '@/lib/utils'
import { registerDomain, updateProfile, checkAvailability } from '@/lib/nns'
import { formatDomainName, getDomainLabel, DOMAIN_VALIDATION } from '@/config/nns-contracts'

import { ConnectButton } from './ConnectButton'
import { CameraIcon } from './Icons'
import { Spinner } from './Spinner'

export function NameManager({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { address } = useAccount()
  const { data: walletClient } = useWalletClient()
  const { isSignedIn, signIn } = useSIWE()
  const names = useNamestone(address)
  const isMounted = useIsMounted()

  // Auto switch to Nexus Testnet when wallet is connected
  useAutoSwitchNetwork()

  const [imgUploading, setImgUploading] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [createState, createAction] = useFormState(createName, {} as any)
  const [updateState, updateAction] = useFormState(updateName, {} as any)

  useEffect(() => {
    if (createState.data?.success) {
      names.refetch()
    }
  }, [createState.data])

  const handleRegister = async (formData: FormData) => {
    if (!address || !isSignedIn || !walletClient) {
      signIn()
      toast('Please sign in with your wallet', { icon: '✍️' })
      return
    }

    const name = formData.get('name') as string

    if (!name) {
      toast.error('Please enter a name')
      return
    }

    // Validate first via server action
    const validationResult = await createAction(formData) as any

    if (validationResult?.error) {
      toast.error(validationResult.error)
      return
    }

    setIsRegistering(true)

    try {
      // Create provider for availability check (read-only)
      const { BrowserProvider } = await import('ethers')
      const provider = new BrowserProvider(window.ethereum!)

      // Check availability
      const available = await checkAvailability(name, provider)

      if (!available) {
        toast.error(`${name}${DOMAIN_VALIDATION.tld} is already registered`)
        setIsRegistering(false)
        return
      }

      // Register domain
      toast.loading('Registering domain...', { id: 'register' })
      const txHash = await registerDomain(name, address, walletClient)

      toast.success(`Successfully registered ${formatDomainName(name)}!`, { id: 'register' })

      // Refetch names
      setTimeout(() => {
        names.refetch()
      }, 2000)

    } catch (error: any) {
      console.error('Registration error:', error)
      const errorMessage = error?.message || 'Failed to register domain'
      toast.error(errorMessage, { id: 'register' })
    } finally {
      setIsRegistering(false)
    }
  }

  const handleUpdate = async (formData: FormData) => {
    if (!address || !isSignedIn || !walletClient) {
      toast.error('Please sign in first')
      return
    }

    if (!names.data?.first) {
      toast.error('No domain found to update')
      return
    }

    // Validate first via server action
    const validationResult = await updateAction(formData) as any

    if (validationResult?.error) {
      toast.error(validationResult.error)
      return
    }

    setIsUpdating(true)

    try {
      const avatar = formData.get('avatar') as string || ''
      const twitter = formData.get('twitter') as string || ''
      const telegram = formData.get('telegram') as string || ''

      toast.loading('Updating profile...', { id: 'update' })

      await updateProfile(
        names.data.first.name,
        {
          avatar,
          twitter,
          telegram,
        },
        walletClient
      )

      toast.success('Profile updated successfully!', { id: 'update' })

      // Refetch names
      setTimeout(() => {
        names.refetch()
      }, 2000)

    } catch (error: any) {
      console.error('Update error:', error)
      const errorMessage = error?.message || 'Failed to update profile'
      toast.error(errorMessage, { id: 'update' })
    } finally {
      setIsUpdating(false)
    }
  }

  if ((address && names.isLoading) || !isMounted) {
    return <Spinner />
  }

  if (address && isSignedIn && names.data?.first) {
    // Update name form
    return (
      <form
        className={cn('flex w-full max-w-md flex-col gap-2', className)}
        action={handleUpdate}
      >
        <FileUploader
          imgUploading={imgUploading}
          setImgUploading={setImgUploading}
          defaultValue={names.data.first.avatar}
        />
        <input type="hidden" name="name" value={names.data.first.name} />
        <input type="hidden" name="address" value={address} />

        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            name="twitter"
            label="Twitter / X"
            autoCapitalize="none"
            placeholder="shefiorg"
            defaultValue={names.data.first.twitter}
          />
          <Input
            name="telegram"
            label="Telegram"
            autoCapitalize="none"
            placeholder="shefiorg"
            defaultValue={names.data.first.telegram}
          />
        </div>

        <Button
          type="submit"
          className="mt-1 sm:mt-0"
          loading={isUpdating || imgUploading}
        >
          {imgUploading ? 'Uploading...' : isUpdating ? 'Updating...' : 'Save'}
        </Button>

        {updateState?.data?.error || updateState?.validationErrors ? (
          <p className="text-sm text-red-500">
            {updateState?.data?.error ||
              (updateState?.validationErrors &&
                'Inputs should not have spaces')}
          </p>
        ) : (
          <p className="text-sm">Note: this is public information</p>
        )}
      </form>
    )
  }

  // Register form
  return (
    <form
      className={cn('flex w-full max-w-80 flex-col gap-2', className)}
      action={handleRegister}
    >
      <Input
        name="name"
        placeholder="Enter your name"
        suffix={DOMAIN_VALIDATION.tld}
        disabled={isRegistering}
      />

      <input type="hidden" name="address" value={address} />

      {(() => {
        if (address && isSignedIn) {
          return (
            <Button type="submit" loading={isRegistering}>
              {isRegistering ? 'Registering...' : 'Register (0.5 NEX)'}
            </Button>
          )
        }

        if (address) {
          return <Button type="button" onClick={() => signIn()}>Sign In</Button>
        }

        return <ConnectButton />
      })()}

      {createState.data?.error && (
        <p className="text-sm text-red-500">{createState.data?.error}</p>
      )}

      <p className="text-xs text-gray-500">
        Registration fee: 0.5 NEX • Duration: 1 year
      </p>
    </form>
  )
}

function FileUploader({
  imgUploading,
  setImgUploading,
  defaultValue,
}: {
  imgUploading: boolean
  setImgUploading: (uploading: boolean) => void
  defaultValue: string | undefined
}) {
  const [ipfsUri, setIpfsUri] = useState(defaultValue ?? '')
  const [localFileUrl, setLocalFileUrl] = useState<string | undefined>(
    defaultValue
      ? defaultValue.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/')
      : undefined
  )

  const uploadFile = async (file: File) => {
    try {
      const keyRequest = await fetch('/api/pinata/key')
      const keyData = await keyRequest.json()
      const upload = await pinata.upload.file(file).key(keyData.JWT)
      console.log(upload)
      setIpfsUri(`ipfs://${upload.IpfsHash}`)
    } catch (e) {
      console.error(e)
      alert('Trouble uploading file')
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) {
      alert('No file selected')
      return
    }

    setLocalFileUrl(URL.createObjectURL(file))
    setImgUploading(true)
    await uploadFile(file)
    setImgUploading(false)
  }

  return (
    <div
      className="relative mx-auto aspect-square w-fit rounded-full border border-brand-orange bg-gradient-card"
      style={
        localFileUrl
          ? {
              backgroundImage: `url('${localFileUrl}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }
          : {}
      }
    >
      <label
        htmlFor="file"
        className="flex h-20 w-20 cursor-pointer items-center justify-center transition-opacity hover:opacity-75"
      >
        {!localFileUrl && <CameraIcon />}
      </label>
      <input
        type="file"
        id="file"
        accept="image/*"
        multiple={false}
        onChange={handleFileChange}
        className="invisible absolute left-0 top-0 h-full w-full"
      />
      {ipfsUri && <input type="hidden" name="avatar" value={ipfsUri} />}
    </div>
  )
}
