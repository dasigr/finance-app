import { Metadata } from 'next'
import { lusitana } from '@/app/ui/fonts'

export const metadata: Metadata = {
  title: 'Profile',
}

export default async function Page() {
  return (
    <div className="w-full pb-12">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Profile</h1>
      </div>
      <div className="mt-5 flex w-full justify-center gap-2">
        <p>-- Content here --</p>
      </div>
    </div>
  )
}
