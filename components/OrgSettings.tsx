import OrgSettingsClient from "./orgs/OrgSettingsClient";
import { Suspense } from "react";
import OverviewPane from "./orgs/OverviewPane";
import MembersPane from "./orgs/MembersPane";
import OrgEventsPane from "./orgs/OrgEventsPane";
import OrgSettingsPane from "./orgs/OrgSettingsPane";

export type orgType = {
    id: string;
    name: string;
    slug: string;
    createdAt: string;
    role: string;
}

export default async function OrgSettings({ org, userId }: { org: orgType; userId: string }) {
    return (
        <Suspense fallback={<div className="p-4 font-mono text-xs text-zinc-400">Loading layout matrices...</div>}>
            <OrgSettingsClient
                org={org}
                overviewSlot={<OverviewPane org={org} />}
                membersSlot={<MembersPane org={org} />}
                eventsSlot={<OrgEventsPane org={org} />}
                settingsSlot={<OrgSettingsPane org={org} userId={userId} />}
            />
        </Suspense>
    );
}