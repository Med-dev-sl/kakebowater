import { TopNav, SideNav } from "@/components/nav";
import { AuthGuard } from "@/components/auth-guard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-[100dvh]">
        <SideNav />
        <div className="flex-grow overflow-auto">
          <TopNav title="Dashboard" />
          <main>{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
