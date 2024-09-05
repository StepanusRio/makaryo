import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

async function DashboardPage() {
  const session = await auth();
  if (!session) {
    // Redirect to login page
    redirect("/login");
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session.user.Nama}</p>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  );
}

export default DashboardPage;
