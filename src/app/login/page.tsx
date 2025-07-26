import Link from 'next/link';
import Image from 'next/image';
import LoginForm from '@/app/ui/login-form';
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-32 w-full justify-center rounded-lg p-3 md:h-32">
          <div>
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Personal Finance</span>
              <Image
                src="/logo.svg"
                alt="Personal Finance"
                width={64}
                height={64}
                priority={false}
                className="h-16 w-auto"
              />
            </Link>
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
