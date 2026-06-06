"use client";
import SidebarLayout from "@/components/SidebarLayout";
import BookingsPage from "@/sections/BookingPage";
import EventPage from "@/sections/EventsPage";
import HelpPage from "@/sections/HelpPage";
import HomePage from "@/sections/HomePage";
import OrgPage from "@/sections/OrgPage";
import SettingsPage from "@/sections/SettingPage";
import { useState } from "react";

export type optionTypes = "home" | "events" | "orgs" | "bookings" | "settings" | "help";

export default function DashboardPage() {
  const [option, setOption] = useState<optionTypes>("home");
  return (
    <SidebarLayout option={option} setOption={setOption}>
      <div>
        {option === "home" && <HomePage />}
        {option === "events" && <EventPage />}
        {option === "orgs" && <OrgPage />}
        {option === "bookings" && <BookingsPage />}
        {option === "settings" && <SettingsPage />}
        {option === "help" && <HelpPage />}
      </div>
    </SidebarLayout>
  )
};