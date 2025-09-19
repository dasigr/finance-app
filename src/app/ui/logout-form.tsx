import { logout } from '@/app/actions/auth'
import { useActionState } from 'react'
import { PowerIcon } from '@heroicons/react/20/solid'

export default function LogoutForm() {
  const [state, action, pending] = useActionState(logout, undefined)

  return (
    <form action={action}>
      <button className="-m-2.5 p-2.5">
        <PowerIcon className="size-6" />
        <div className="hidden md:block">Sign Out</div>
      </button>
    </form>
  )
}
