import Link from 'next/link'
import Image from 'next/image'

export default function Branding() {
  return (
    <Link href="/" className="-m-1.5 p-1.5">
      <span className="sr-only">Finance</span>
      <Image
        src="/logo.png"
        alt="Personal Finance"
        width={48}
        height={48}
        priority={true}
        className="h-12 w-auto"
      />
    </Link>
  )
}