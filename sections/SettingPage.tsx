import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import SettingPageClient from "@/components/SettingsPageClient";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect("/signin");
    }

    const userId = (session.user as any).id;
    const user = await prisma.user.findFirst({
        where: {
            id: userId
        },
        select: {
            id: true,
            name: true,
            image: true,
            mode: true
        }
    });

    if (!user) {
        redirect("/signin");
    }

    const name = (user.name) ? user.name : "";

    const flattenedUser = {
        id: user.id,
        name,
        image: user.image,
        mode: user.mode
    }

    return <SettingPageClient user={flattenedUser} />
}