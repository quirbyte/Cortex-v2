import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
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
    const isAllowed = await prisma.userRole.findFirst({
        where: {
            userId,
            org: {
                slug
            }
        }
    });
    console.log(userId);
    if (!isAllowed) {
        return <div className="w-full h-full flex justify-center items-center">
            You are not allowed to access this page
        </div>
    }
    return <div className="w-full h-full flex justify-center items-center">
        This is {slug} page
    </div>
}