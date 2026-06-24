import SidebarLayout from "@/components/SidebarLayout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth";
import { prisma } from "../lib/prisma";

export const dynamic = "force-dynamic";

export type OptionTypes = "home" | "events" | "orgs" | "bookings" | "settings" | "help";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect("/signin");
    }
    
    const userId = (session.user as any).id;
    const user = await prisma.user.findFirst({
        where: {
            id: userId
        },
    });
    
    if (!user) {
        redirect("/signin");
    }
    
    return (
        <SidebarLayout user={user}>
            <div className="h-full w-full">
                {children}
            </div>
        </SidebarLayout>
    );
}