import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import OrgClient from "@/components/OrgClient";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export type OrganizationType = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  role: "ADMIN" | "MODERATOR" | "VOLUNTEER";
};

export default async function OrgPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/signin");
  }
  const userId = (session.user as any).id;

  const userRoles = await prisma.userRole.findMany({
    where: {
      userId: userId,
    },
    select: {
      role: true,
      org: {
        select: {
          id: true,
          name: true,
          slug: true,
          createdAt: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  }) || [];

  const flattenedOrgs: OrganizationType[] = userRoles.map((record) => ({
    id: record.org.id,
    name: record.org.name,
    slug: record.org.slug,
    createdAt: record.org.createdAt.toISOString(),
    role: record.role as "ADMIN" | "MODERATOR" | "VOLUNTEER",
  }));

  return <OrgClient userOrgs={flattenedOrgs} />;
}