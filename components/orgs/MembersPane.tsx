import { orgType } from "../OrgSettings";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import MembersPaneClient from "./MembersPaneClient";

export type MemberType = {
    id: string;
    userId: string;
    name: string;
    image : string | null;
    email: string | null;
    role: "ADMIN" | "MODERATOR" | "VOLUNTEER";
    joinedAt: string;
    creator: string;
};

export default async function MembersPane({ org }: { org: orgType }) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect("/signin");
    }
    const userId = (session.user as any).id;
    const dbRoles = await prisma.userRole.findMany({
        where: {
            orgId: org.id,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true
                },
            },
            org: {
                select: {
                    createdBy: true
                }
            }
        },
        orderBy: {
            createdAt: "asc",
        },
    });

    const members: MemberType[] = dbRoles.map((record) => ({
        id: record.id,
        userId: record.user.id,
        image: record.user.image,
        name: record.user.name || "Anonymous Member",
        email: record.user.email,
        role: record.role as "ADMIN" | "MODERATOR" | "VOLUNTEER",
        joinedAt: record.createdAt.toISOString(),
        creator: record.org.createdBy
    }));

    const admins = members.filter(m => m.role === "ADMIN");
    const moderators = members.filter(m => m.role === "MODERATOR");
    const volunteers = members.filter(m => m.role === "VOLUNTEER");

    return <MembersPaneClient org={org} admins={admins} moderators={moderators} volunteers={volunteers} userRole={org.role} />
}