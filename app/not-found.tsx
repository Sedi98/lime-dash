import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-100 to-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
        <div className="card-body items-center text-center">
          <div className="bg-error/10 p-6 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-5xl font-bold text-error">404</h1>
            <h2 className="text-3xl font-bold text-base-content">Səhifə mövcud deyil</h2>
            <p className="py-4 text-base-content/70">
              Oops! Görünür axtardığınız səhifə mövcud deyil və ya dəyişdirilib. Əgər hesabdan çıxış etmisinizsə yenidən daxil olun və təkrar cəhd edin
            </p>
          </div>
          
          <div className="card-actions mt-4">
            <Link href="/auth/login" className="btn btn-primary px-8 gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Daxil ol
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}