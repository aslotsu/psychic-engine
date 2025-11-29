import Image from "next/image";
import { SampleForm } from '@/components/SampleForm';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-16 px-4 bg-white dark:bg-black sm:items-start sm:text-left">
        <div className="w-full max-w-md mx-auto">
          <div className="flex justify-center mb-8">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={100}
              height={20}
              priority
            />
          </div>
          <h1 className="text-2xl font-bold text-center mb-6 text-black dark:text-zinc-50">
            Shadcn/UI + React Hook Form Example
          </h1>
          <div className="mb-8">
            <SampleForm />
          </div>
          <div className="flex flex-col items-center gap-6 text-center mt-8">
            <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              This form demonstrates the integration of shadcn/ui components with react-hook-form and Zod validation.
            </p>
            <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Looking for a starting point or more instructions? Head over to{" "}
              <a
                href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                className="font-medium text-zinc-950 dark:text-zinc-50"
              >
                Templates
              </a>{" "}
              or the{" "}
              <a
                href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                className="font-medium text-zinc-950 dark:text-zinc-50"
              >
                Learning
              </a>{" "}
              center.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
