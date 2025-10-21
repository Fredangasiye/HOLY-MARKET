"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyPasswordResetCode, confirmPasswordReset, Auth } from "firebase/auth";
import { auth } from "@/lib/firebase";

function ResetPasswordClient() {
  const params = useSearchParams();
  const router = useRouter();
  const oobCode = params.get("oobCode") || "";
  const mode = params.get("mode") || "";

  const [status, setStatus] = useState<"loading" | "ready" | "invalid" | "success" | "error">("loading");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const init = async () => {
      if (!auth || mode !== "resetPassword" || !oobCode) {
        setStatus("invalid");
        return;
      }
      try {
        const email = await verifyPasswordResetCode(auth as Auth, oobCode);
        setEmail(email);
        setStatus("ready");
      } catch {
        setStatus("invalid");
      }
    };
    init();
  }, [oobCode, mode]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    try {
      await confirmPasswordReset(auth as Auth, oobCode, password);
      setStatus("success");
      setTimeout(() => router.push("/auth/login"), 1500);
    } catch (e: any) {
      setError(e?.message || "Failed to reset password");
      setStatus("error");
    }
  };

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Validating link…</div>;
  }
  if (status === "invalid") {
    return <div className="min-h-screen flex items-center justify-center">Invalid or expired reset link.</div>;
  }
  if (status === "success") {
    return <div className="min-h-screen flex items-center justify-center">Password updated! Redirecting…</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white rounded-xl p-6 shadow">
        <h1 className="text-xl font-semibold mb-2">Reset Password</h1>
        <p className="text-gray-600 mb-4">Resetting password for {email}</p>
        {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
        <label className="block text-sm font-medium mb-1">New Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" />
        <label className="block text-sm font-medium mb-1">Confirm Password</label>
        <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full border rounded px-3 py-2 mb-4" />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2">Update Password</button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
      <ResetPasswordClient />
    </Suspense>
  );
}