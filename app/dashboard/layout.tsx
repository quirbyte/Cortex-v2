import SidebarLayout from "@/components/SidebarLayout";

export const dynamic = "force-dynamic";

export type OptionTypes = "home" | "events" | "orgs" | "bookings" | "settings" | "help";

interface DashboardLayoutProps {
    children: React.ReactNode
    searchParams: Promise<{ tab?: string }>;
}

export default async function DashboardPage({ children }: DashboardLayoutProps) {
    return (
        <SidebarLayout>
            <div className="h-full w-full">
                {children}
            </div>
        </SidebarLayout>
    );
}