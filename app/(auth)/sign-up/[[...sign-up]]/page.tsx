import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-[calc(100vh-7rem)] flex items-center justify-center py-12">
      <SignUp
        appearance={{
          elements: {
            rootBox: 'mx-auto',
            card: 'bg-white shadow-sm border border-stone-200 rounded-lg',
            headerTitle: 'text-stone-800 font-light',
            headerSubtitle: 'text-stone-500',
            socialButtonsBlockButton: 'border-stone-300 text-stone-700 hover:bg-stone-50',
            formFieldLabel: 'text-stone-600',
            formFieldInput: 'border-stone-300 focus:border-stone-500 focus:ring-stone-500',
            formButtonPrimary: 'bg-stone-800 hover:bg-stone-900',
            footerActionLink: 'text-stone-600 hover:text-stone-800',
          },
        }}
      />
    </div>
  )
}
