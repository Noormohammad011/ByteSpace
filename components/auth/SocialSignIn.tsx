import Image from 'next/image'
import { Button } from '@/components/ui/button'

const socialProviders = [
  { name: 'Facebook', icon: '/assets/auth/icons/facebook.svg' },
  { name: 'Google', icon: '/assets/auth/icons/google.svg' },
] as const

const SocialSignIn = () => {
  return (
    <div className="mt-48 flex flex-col items-center gap-40 xl:mt-[70px]">
      <p className="flex w-full items-center gap-12 font-body text-body-l text-shuttle-gray-400 xl:max-w-[439px] xl:self-start">
        <span aria-hidden className="h-[2px] flex-1 bg-shuttle-gray-100" />
        or
        <span aria-hidden className="h-[2px] flex-1 bg-shuttle-gray-100" />
      </p>
      <div className="flex gap-16">
        {socialProviders.map((provider) => (
          <Button
            key={provider.name}
            type="button"
            variant="outline"
            aria-label={`Continue with ${provider.name}`}
            className="size-[72px] rounded-[20px] border-[1.5px] border-shuttle-gray-200 bg-neutral-white hover:bg-shuttle-gray-50"
          >
            <Image src={provider.icon} alt="" width={32} height={32} />
          </Button>
        ))}
      </div>
    </div>
  )
}

export default SocialSignIn
