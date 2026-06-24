import { Suspense } from "react";
import HomePage from "@/sections/HomePage";
import EventPage from "@/sections/EventsPage";
import OrgPage from "@/sections/OrgPage";
import BookingsPage from "@/sections/BookingPage";
import SettingsPage from "@/sections/SettingPage";
import HelpPage from "@/sections/HelpPage";
import { LoadingTabSkeleton } from "@/DesignComponents/loader";

export const dynamic = "force-dynamic";

export type OptionTypes = "home" | "events" | "orgs" | "bookings" | "settings" | "help";

interface PageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const currentTab = (resolvedParams.tab as OptionTypes) || "home";

  return (
    <>
      {currentTab === "home" && (
        <Suspense key="home" fallback={<LoadingTabSkeleton data={"dashboard"} />}>
          <HomePage />
        </Suspense>
      )}

      {currentTab === "events" && (
        <Suspense key="events" fallback={<LoadingTabSkeleton data={"events"} />}>
          <EventPage />
        </Suspense>
      )}

      {currentTab === "orgs" && (
        <Suspense key="orgs" fallback={<LoadingTabSkeleton data={"user organizations"} />}>
          <OrgPage />
        </Suspense>
      )}

      {currentTab === "bookings" && (
        <Suspense key="bookings" fallback={<LoadingTabSkeleton data={"user bookings"} />}>
          <BookingsPage />
        </Suspense>
      )}

      {currentTab === "settings" && (
        <Suspense key="settings" fallback={<LoadingTabSkeleton data={"user settings"} />}>
          <SettingsPage />
        </Suspense>
      )}

      {currentTab === "help" && <HelpPage />}
    </>
  );
}