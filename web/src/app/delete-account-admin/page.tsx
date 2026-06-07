import type { Metadata } from "next";
import AccountDeletionPage from "@/components/AccountDeletionPage";

export const metadata: Metadata = {
  title: "Delete Admin Account | UltimateHealth",
  description: "Confirm deletion of your UltimateHealth admin account.",
};

export default function DeleteAccountAdminPage() {
  return (
    <AccountDeletionPage
      apiUrl="https://uhsocial.in/api/admin/delete-account"
      loginPath="/login-admin"
      title="Delete Admin Account"
      description="You are signed in as an admin. Confirm below to permanently delete this UltimateHealth admin account."
      confirmLabel="Delete Admin Account"
    />
  );
}
