
----------------------:JOURNEY:----------------------
The 10 Day Cortex MVP Todo:

Day 1 — Wallet System

Wallet created automatically on user registration
Dashboard shows current balance
Add money to wallet UI + API route
Transaction history page


Day 2 — Organization Creation

Create organization form — name, slug
Slug auto-generated from name, editable
Organization dashboard page
User becomes ADMIN automatically on creation


Day 3 — Organization Management

Invite members by email — assign ADMIN or VOLUNTEER role
Members list page showing all users and their roles
Remove member functionality
Only ADMIN can access this page — middleware protection


Day 4 — Event Creation

Create event form — name, desc, venue, startsAt, price, capacity
Events listed under organization dashboard
Only ADMIN can create events
Basic event detail page


Day 5 — Browse Events + Ticket Booking

Public browse events page showing all upcoming events
Event detail page with book ticket button
Booking logic — check wallet balance, check capacity, deduct balance, create booking
Handle edge cases — insufficient balance, sold out event


Day 6 — My Bookings + QR Generation

My bookings page showing all user bookings
QR code generated per booking using qrCode field
Display QR code on booking detail page
Use qrcode npm package — simple, reliable


Day 7 — Volunteer QR Scanner

Volunteer dashboard — only accessible to VOLUNTEER and ADMIN roles
QR scanner using device camera — use html5-qrcode npm package
On scan — validate ticket against DB
Mark isUsed = true, set usedAt timestamp
Show success or already used message


Day 8 — Role Based Access Control Polish

Middleware protecting all org routes by role
ADMIN sees full dashboard — events, members, analytics
VOLUNTEER sees only scanner
Regular user sees browse events and my bookings only
Test all role flows end to end


Day 9 — Analytics + Polish

Basic org dashboard analytics — tickets sold, revenue, attendance rate
Loading states on all pages
Error handling — proper error messages not blank screens
Empty states — no events found, no bookings yet
Mobile responsive check


Day 10 — Deployment + README

Deploy to Vercel
Environment variables configured correctly
Test full flow on production — register, create org, create event, book ticket, scan QR
README — problem statement, features, tech stack, architecture, live link, screenshots
Record 90 second demo video


The daily 3 hr structure:

First 30 mins — plan exactly what you're building today, no surprises
Next 2 hrs — build, no AI writing code, Google only when stuck
Last 30 mins — test what you built, fix obvious bugs, commit to GitHub

------------------------:BUGS & FUTURE Features:-----------------------

1. BFCache (Back-Forward Cache) on page back swipe
2. Error correct description auth forms
3. cloudinary image delete on event deletion
4. alert system with custom alert popups for every alert
