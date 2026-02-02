import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex">
        {/* Left Image Section */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1539906071507-c5e9f091b3ce?q=80&w=1000&auto=format&fit=crop')`,
            }}
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}
