import Link from 'next/link'
import { UserIcon } from '@heroicons/react/24/outline'
import LogoutForm from '@/app/ui/logout-form'

export default function UserMenu() {
  const is_logged_id = true

  return (
    <>
    {is_logged_id ? (
      <LogoutForm />
    ) : (
      <Link href="/login">
        <UserIcon className="size-6" />
      </Link>
    )}
    </>
  )
}