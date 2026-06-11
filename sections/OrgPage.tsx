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
  const userOrgs = await prisma.organization.findMany({
    where: {
      createdBy: userId
    },
    select: {
      id: true,
      name: true,
      slug: true,
      createdAt: true,
      Roles: {
        where: {
          userId
        },
        select: {
          role: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  }) || [];

  const flattendOrgs: OrganizationType[] = userOrgs.map((org) => ({
    id: org.id,
    name: org.name,
    slug: org.slug,
    createdAt: org.createdAt.toISOString(), 
    role: org.Roles[0]?.role || "ADMIN", 
  }));


  return <OrgClient userOrgs={flattendOrgs} />;
}