"use client";
import { useRouter } from "next/navigation";
import { Calendar, Plus, X, Upload } from "lucide-react";
import EventCard from "./EventCard";
import { orgEventType } from "./OrgEventsPane";
import { useState } from "react";

export default function OrgEventsPaneClient({ orgEvents, currentRole, orgId, slug }: { orgEvents: orgEventType[]; currentRole: string; orgId: string; slug: string }) {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [venue, setVenue] = useState<string>("");
    const [dateTime, setDateTime] = useState<string>("");
    const [capacity, setCapacity] = useState("");
    const [price, setPrice] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const router = useRouter();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && tagInput.trim()) {
            e.preventDefault();
            const cleanedTag = tagInput.trim().toUpperCase();
            if (!tags.includes(cleanedTag)) {
                setTags([...tags, cleanedTag]);
            }
            setTagInput("");
        }
    }

    const handleRemoveTag = (tagDelete: string) => {
        setTags(tags.filter((tag) => tag !== tagDelete));
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            alert("File size exceeds the 2MB profile threshold.");
            return;
        }

        if (imageUrl) {
            URL.revokeObjectURL(imageUrl);
        }

        setImageFile(file);
        setImageUrl(URL.createObjectURL(file));
    }

    const resetForm = () => {
        setName("");
        setCapacity("");
        setVenue("");
        setDateTime("");
        setDesc("");
        setPrice("");
        setTags([]);
        setTagInput("");

        if (imageUrl) {
            URL.revokeObjectURL(imageUrl);
        }
        setImageUrl("");
        setImageFile(null);
    }

    const handleCreateEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !venue.trim() || !dateTime) {
            alert("Please fill in all required parameters (Title, Venue, Date & Time).");
            return;
        }
        setUploading(true);
        const formData = new FormData();
        formData.append("name", name);
        formData.append("desc", desc);
        formData.append("venue", venue);
        formData.append("startsAt", new Date(dateTime).toISOString());
        formData.append("capacity", capacity);
        formData.append("price", price);
        formData.append("orgId", orgId);
        formData.append("tags", JSON.stringify(tags));

        if (imageFile) {
            formData.append("imageFile", imageFile);
        }

        try {
            const res = await fetch(`/api/event`, {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Failed to create event");
            }
            router.refresh();
            resetForm();
            setIsFormOpen(false);
        } catch (error) {
            console.error("Database save issue:", error);
            alert(error instanceof Error ? error.message : "Something went wrong");
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <div className="w-full space-y-6 font-manrope">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-1 md:pb-3 border-b border-black/5 dark:border-zinc-800">
                    <div className="space-y-0.5">
                        <h2 className="text-base sm:text-lg font-bold tracking-tight text-black dark:text-white flex items-center gap-2">
                            <Calendar size={16} className="text-zinc-400 sm:w-4.5 sm:h-4.5" />
                            Organization Events
                        </h2>
                        <p className="text-[10px] sm:text-xs text-zinc-400 font-medium leading-relaxed">
                            Schedule scheduling slots, track live ticketing capacity, and modify parameters under <span className="font-mono text-zinc-600 dark:text-blue-500 font-bold">/{slug}</span>
                        </p>
                    </div>
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="inline-flex items-center justify-center gap-1.5 bg-black text-white text-[11px] sm:text-xs font-bold py-2 sm:py-2.5 px-3.5 sm:px-4 rounded-lg sm:rounded-xl hover:bg-zinc-800 transition active:scale-95 shadow-sm self-start sm:self-center shrink-0 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                    >
                        <Plus size={13} strokeWidth={2.5} className="sm:w-3.5 sm:h-3.5" />
                        Create Event
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    {orgEvents.map((event) => (
                        <EventCard key={event.id} id={event.id} event={event} currentRole={currentRole} />
                    ))}
                </div>
            </div>
            <form onSubmit={handleCreateEvent} className={`fixed inset-0 z-50 overflow-hidden font-manrope transition-all duration-300 ${isFormOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
                <div
                    className={`absolute inset-0 bg-black/10 backdrop-blur-sm transition-opacity duration-300 ${isFormOpen ? "opacity-100" : "opacity-0"}`}
                />
                <div className={`absolute inset-y-0 right-0 max-w-md w-full bg-white dark:bg-black dark:border-zinc-800 shadow-2xl border-l border-zinc-200/80 flex flex-col transition-transform duration-300 ease-in-out transform ${isFormOpen ? "translate-x-0" : "translate-x-full"}`}>
                    <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                        <div>
                            <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-1.5">
                                <Plus size={15} strokeWidth={2.5} />
                                Create New Event
                            </h3>
                            <p className="text-[10px] sm:text-xs text-zinc-400 font-medium">Add parameters to deploy a global listing slot.</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsFormOpen(false)}
                            className="h-8 w-8 flex items-center justify-center rounded-xl text-zinc-400 hover:bg-zinc-50 hover:text-black transition"
                        >
                            <X size={16} />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
                        <div className="space-y-1">
                            <label className="font-bold text-zinc-700 tracking-tight block">Event Title</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g., Tech Synergy Summit"
                                className="w-full px-3 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:border-zinc-400 placeholder:text-zinc-300 transition text-zinc-800 font-medium dark:border-zinc-800 dark:placeholder:text-zinc-600 dark:text-zinc-400"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="font-bold text-zinc-700 tracking-tight block">Description</label>
                            <textarea
                                rows={3}
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder="Brief breakdown summary about schedules, nodes, or targets..."
                                className="w-full px-3 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:border-zinc-400 placeholder:text-zinc-300 transition text-zinc-800 font-medium resize-none dark:border-zinc-800 dark:placeholder:text-zinc-600 dark:text-zinc-400"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="font-bold text-zinc-700 tracking-tight block">Venue / Location</label>
                            <input
                                type="text"
                                value={venue}
                                onChange={(e) => setVenue(e.target.value)}
                                placeholder="e.g., Convention Hall B, Salt Lake"
                                className="w-full px-3 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:border-zinc-400 placeholder:text-zinc-300 transition text-zinc-800 font-medium dark:border-zinc-800 dark:placeholder:text-zinc-600 dark:text-zinc-400"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="font-bold text-zinc-700 tracking-tight block">Date & Time</label>
                                <input
                                    type="datetime-local"
                                    value={dateTime}
                                    onChange={(e) => setDateTime(e.target.value)}
                                    className="w-full px-3 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:border-zinc-400 transition text-zinc-600 font-mono dark:border-zinc-800 dark:placeholder:text-zinc-600 dark:text-zinc-400"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-zinc-700 tracking-tight block">Ticket Capacity</label>
                                <input
                                    type="number"
                                    value={capacity}
                                    onChange={(e) => setCapacity(e.target.value)}
                                    placeholder="e.g., 200"
                                    className="w-full px-3 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:border-zinc-400 placeholder:text-zinc-300 transition text-zinc-800 font-mono dark:border-zinc-800 dark:placeholder:text-zinc-600 dark:text-zinc-400"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="font-bold text-zinc-700 tracking-tight block">Ticket Price (INR)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono font-bold text-zinc-400 text-xs">₹</span>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="0 (Leaves ticket free)"
                                    className="w-full pl-6 pr-3 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:border-zinc-400 placeholder:text-zinc-300 transition text-zinc-800 font-mono dark:border-zinc-800 dark:placeholder:text-zinc-600 dark:text-zinc-400"
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="font-bold text-zinc-700 tracking-tight block">Category Tags</label>
                            <div className="w-full px-3 py-1.5 border border-zinc-200 rounded-xl focus-within:border-zinc-400 transition flex flex-wrap gap-1.5 items-center bg-white min-h-9.5  dark:bg-zinc-950 dark:border-zinc-800">
                                {
                                    tags.map((tag) => (
                                        <span key={tag} className="inline-flex items-center gap-1 pl-2 pr-1 py-0.5 rounded-md text-[10px] font-bold font-mono bg-zinc-100 text-zinc-600 border border-zinc-200/40">
                                            {tag}
                                            <button onClick={() => handleRemoveTag(tag)} type="button" className="h-3.5 w-3.5 rounded hover:bg-zinc-200 flex items-center justify-center text-zinc-400 transition">
                                                <X size={10} />
                                            </button>
                                        </span>
                                    ))
                                }
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type tag & press Enter"
                                    className="flex-1 min-w-15 bg-transparent outline-none text-zinc-800 font-medium placeholder:text-zinc-300 py-0.5 dark:border-zinc-800 dark:placeholder:text-zinc-600 dark:text-zinc-400"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="font-bold text-zinc-700 tracking-tight block">Cover Image</label>
                            <label className="w-full p-4 border border-dashed border-zinc-200 rounded-xl bg-zinc-50/50 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-zinc-50 hover:border-zinc-300 transition group relative min-h-27.5 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900 dark:hover:border-zinc-800">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    disabled={uploading}
                                />
                                {imageUrl ? (
                                    <div className="w-full aspect-16/7 rounded-lg overflow-hidden relative">
                                        <img src={imageUrl} alt="Uploaded Banner" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition text-white text-[10px] font-bold dark:text-zinc-900">
                                            Change Thumbnail Image
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <Upload size={14} className="text-zinc-400 group-hover:text-zinc-600 transition mb-1" />
                                        <span className="text-[10px] font-bold text-zinc-500">
                                            {uploading ? "Uploading to Server..." : "Upload cover thumbnail"}
                                        </span>
                                        <span className="text-[8px] text-zinc-400 font-medium mt-0.5 font-mono">PNG, JPG up to 2MB (16:7 aspect)</span>
                                    </>
                                )}
                            </label>
                        </div>
                    </div>
                    <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 bg-zinc-50/40 grid grid-cols-2 gap-2.5">
                        <button
                            type="button"
                            onClick={() => { setIsFormOpen(false); resetForm(); }}
                            className="w-full py-2.5 rounded-xl border border-zinc-200 text-zinc-700 font-bold hover:bg-zinc-50 hover:text-black transition active:scale-95 text-xs dark:border-none dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={uploading}
                            className="w-full py-2.5 rounded-xl bg-black text-white font-bold hover:bg-zinc-800 shadow-sm transition active:scale-95 text-xs disabled:opacity-50 disabled:pointer-events-none dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                        >
                            {uploading ? "Publishing..." : "Publish Event"}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}