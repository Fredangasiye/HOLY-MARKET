import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/clerk-react";
import Calculator from "./calculator";
import WelcomePage from "./welcome";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-primary-green text-white py-6 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🇿🇦</div>
            <h1 className="text-2xl md:text-3xl font-bold text-black drop-shadow-lg">My Lobola</h1>
          </div>
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-white text-primary-green font-semibold py-2 px-4 rounded-lg">Sign In</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/"/>
            </SignedIn>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <SignedOut>
          {/* Wrapping WelcomePage in a div to ensure a single child */}
          <div>
            <WelcomePage />
          </div>
        </SignedOut>
        <SignedIn>
          {/* 
            THIS IS THE FIX:
            We wrap the Calculator component in a single container div.
            This guarantees Clerk's <SignedIn> component has exactly one child.
          */}
          <div>
            <Calculator />
          </div>
        </SignedIn>
      </main>
      
      <footer className="bg-gray-800 text-white py-8 px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-semibold text-lg mb-2">Ubuntu Lobola Guide</h3>
            <p className="text-gray-300 text-sm">Respecting traditions, embracing modern values</p>
            <div className="border-t border-gray-700 pt-4 mt-4">
                <p className="text-gray-400 text-xs">This tool is for educational and guidance purposes only. Always consult with family elders and cultural advisors for important decisions.</p>
            </div>
        </div>
      </footer>
    </div>
  );
}