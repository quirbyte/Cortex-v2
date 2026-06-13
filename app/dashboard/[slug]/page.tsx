import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import OrgSettings from "@/components/OrgSettings";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function OrgDetailedPage({ params }: Props) {
    const { slug } = await params;
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect("/signin");
    }
    const userId = (session.user as any).id;
    const orgData = await prisma.organization.findFirst({
        where: {
            slug: slug,
            Roles: {
                some: {
                    userId: userId, // Enforces that the user must belong to this org
                },
            },
        },
        select: {
            id : true,
            name: true,
            slug: true,
            createdAt: true,
            Roles: {
                where: { userId: userId },
                select: { role: true }
            }
        }
    });
    if (!orgData) {
        return <div className="w-full h-full flex justify-center items-center">
            You are not allowed to access this page
        </div>
    }
    const org = {
        id : orgData.id,
        slug : orgData.slug,
        name : orgData.name,
        createdAt : orgData?.createdAt.toISOString(),
        role : orgData?.Roles[0].role
    }
    return <div className="w-full h-full flex justify-center items-center">
        <OrgSettings org={org} />
    </div>
}