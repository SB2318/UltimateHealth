import type { Metadata } from "next";
import AccountDeletionPage from "@/components/AccountDeletionPage";

export const metadata: Metadata = {
  title: "Delete Account | UltimateHealth",
  description: "Confirm deletion of your UltimateHealth account.",
};

export default function DeleteAccountPage() {
  return (
    <AccountDeletionPage
      apiUrl="https://uhsocial.in/api/user/delete-account"
      loginPath="/login"
      title="Delete Your Account"
      description="You are signed in. Confirm below to permanently delete your UltimateHealth account."
      confirmLabel="Delete My Account"
    />
  );
}
