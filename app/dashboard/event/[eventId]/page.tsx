import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import EventPageInd from "@/components/EventPageInd";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type Props = {
    params: Promise<{ eventId: string }>;
};

async function getEventData(eventId: string) {
    return await prisma.event.findFirst({
        where: { id: eventId },
        include: { createdBy: true },
    });
}

export type eventDataType = Awaited<ReturnType<typeof getEventData>>;

export default async function IndividualEventPage({ params }: Props) {
    const { eventId } = await params;
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
        redirect("/signin");
    }
    
    const userId = (session.user as any).id;
    const eventData = await getEventData(eventId);

    if (!eventData) {
        return (
            <div className="h-100 w-full flex justify-center items-center text-sm dark:text-white text-black">
                Event Not Found! Error 404
            </div>
        );
    }

    return <EventPageInd event={eventData} userId={userId} />;
}