import { Metadata } from 'next'
import { lusitana } from '@/app/ui/fonts'
import Header from '@/app/ui/header'

export const metadata: Metadata = {
  title: 'Profile',
}

export default async function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
            <div className="flex w-full items-center justify-between">
              <h1 className={`${lusitana.className} text-2xl`}>Profile</h1>
            </div>
            <div className="mt-5 flex w-full justify-center gap-2">
              <p>-- Content here --</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
