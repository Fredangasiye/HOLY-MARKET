import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Link } from "wouter";
import Calculator from "./calculator";
import WelcomePage from "./welcome";
import { Heart } from "lucide-react";

export default function AppLayout() {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-primary-green text-white py-6 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🇿🇦</div>
            <h1 className="text-2xl md:text-3xl font-bold text-black drop-shadow-lg">My Lobola</h1>
          </div>
          <div className="flex items-center gap-4">
            {session ? (
              <button 
                onClick={() => supabase.auth.signOut()} 
                className="bg-white text-primary-green font-semibold py-2 px-4 rounded-lg"
              >
                Sign Out
              </button>
            ) : (
              <Link href="/auth" className="bg-white text-primary-green font-semibold py-2 px-4 rounded-lg cursor-pointer">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {session ? <Calculator /> : <WelcomePage />}
      </main>
      
      <footer className="bg-gray-800 text-white py-8 px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center">
            {/* ... your footer content ... */}
        </div>
      </footer>
    </div>
  );
}