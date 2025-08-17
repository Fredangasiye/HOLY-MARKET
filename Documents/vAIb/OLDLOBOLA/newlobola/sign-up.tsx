// client/src/pages/sign-up.tsx
import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center py-24">
      <SignUp routing="path" path="/sign-up" />
    </div>
  );
}