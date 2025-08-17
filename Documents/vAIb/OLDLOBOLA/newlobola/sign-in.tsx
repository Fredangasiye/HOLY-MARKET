// client/src/pages/sign-in.tsx
import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center py-24">
      <SignIn routing="path" path="/sign-in" />
    </div>
  );
}