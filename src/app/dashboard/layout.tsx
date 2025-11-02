import Header from '@/app/ui/header';
import UserAction from '@/app/ui/user-action';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
            {children}
          </div>
        </div>
      </main>
      <UserAction />
    </>
  );
}
