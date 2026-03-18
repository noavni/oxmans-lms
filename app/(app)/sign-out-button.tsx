"use client";

import { signOut } from "next-auth/react";
import { SignOut } from "@phosphor-icons/react";

export function SignOutButton({ iconOnly = false }: { iconOnly?: boolean }) {
  if (iconOnly) {
    return (
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="p-2 rounded-lg text-ink-subtle hover:text-ink hover:bg-rule/60 transition-all"
        style={{ border: "none", background: "transparent", cursor: "none" }}
      >
        <SignOut className="w-4 h-4" />
      </button>
    );
  }

  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 text-ink-subtle hover:text-orange-red hover:bg-orange-red/[.06]"
      style={{ border: "none", background: "transparent", cursor: "none", fontFamily: "inherit" }}
    >
      <SignOut className="w-4 h-4 flex-shrink-0" />
      Sign Out
    </button>
  );
}
