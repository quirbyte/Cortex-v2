"use client";
import { useState, useEffect } from "react";
import { X, Loader2, Plus } from "lucide-react";
import { orgEventType } from "./OrgEventsPane";
import { useRouter } from "next/navigation";

interface EditSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  event: orgEventType;
}

export default function EditEventSidebar({ isOpen, onClose, event }: EditSidebarProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(event.name);
  const [desc, setDesc] = useState<string>(event.desc || "");
  const [venue, setVenue] = useState(event.venue);
  const [startsAt, setStartsAt] = useState("");
  const [price, setPrice] = useState(event.price);
  const [capacity, setCapacity] = useState(event.capacity);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>(event.tags || []);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName(event.name);
      setDesc(event.desc || "");
      setVenue(event.venue);
      setPrice(event.price);
      setCapacity(event.capacity);
      setTags(event.tags || []);

      if (event.startsAt) {
        const date = new Date(event.startsAt);
        const offset = date.getTimezoneOffset() * 60000;
        const localISOTime = new Date(date.getTime() - offset).toISOString().slice(0, 16);
        setStartsAt(localISOTime);
      }
    }
  }, [event, isOpen]);

  if (!isOpen) return null;

  const handleAddTag = (e: React.KeyboardEvent | React.MouseEvent) => {
    if (e.type === "keydown" && (e as React.KeyboardEvent).key !== "Enter") return;
    e.preventDefault();

    const cleanedTag = tagInput.trim().toUpperCase();
    if (cleanedTag && !tags.includes(cleanedTag)) {
      setTags([...tags, cleanedTag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleCloseAndClear = () => {
    setTagInput("");
    setImageFile(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("id", event.id);
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("venue", venue);
      formData.append("startsAt", new Date(startsAt).toISOString());
      formData.append("price", String(price));
      formData.append("capacity", String(capacity));
      formData.append("tags", JSON.stringify(tags));

      if (imageFile) {
        formData.append("imageFile", imageFile);
      }

      const res = await fetch("/api/event", {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        router.refresh();
        handleCloseAndClear();
      } else if (res.status === 413) {
        const data = await res.json();
        alert(data.error || "The image file you attached is too heavy.");
        return;
      } else {
        alert("Failed to update event");
      }
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 transition-opacity" />

      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col border-l border-zinc-200 transition-transform duration-300 transform translate-x-0 font-manrope">

        <div className="p-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
          <div>
            <h3 className="font-bold text-zinc-900 text-base">Edit Event</h3>
            <p className="text-xs text-zinc-500">Update your event parameters</p>
          </div>
          <button type="button" onClick={handleCloseAndClear} className="p-1.5 rounded-lg text-zinc-400 hover:bg-zinc-200 hover:text-zinc-700 transition">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 text-zinc-800">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">Event Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
              className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-black transition" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">Description</label>
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} required rows={3}
              className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-black transition resize-none" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">Venue</label>
            <input type="text" value={venue} onChange={(e) => setVenue(e.target.value)} required
              className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-black transition" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">Date & Time</label>
            <input type="datetime-local" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} required
              className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-black transition" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">Price (₹)</label>
              <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required min="0"
                className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-black transition" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">Capacity</label>
              <input type="number" value={capacity} onChange={(e) => setCapacity(Number(e.target.value))} required min="1"
                className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-black transition" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">Tags</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Type tag and press Enter"
                className="flex-1 px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-black transition"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 border border-zinc-200 rounded-lg hover:bg-zinc-50 text-zinc-600 flex items-center justify-center transition"
              >
                <Plus size={16} />
              </button>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2.5 p-2 bg-zinc-50 border border-zinc-100 rounded-lg">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 pl-2 pr-1 py-0.5 rounded-md text-[10px] font-bold font-mono bg-white text-zinc-700 border border-zinc-200/60 uppercase tracking-tight"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="p-0.5 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition"
                    >
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">Replace Image (Optional)</label>
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full text-xs text-zinc-500 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200 file:cursor-pointer" />
          </div>

          <div className="pt-4 border-t border-zinc-100 flex items-center justify-end gap-2 bg-white">
            <button type="button" onClick={handleCloseAndClear} disabled={loading}
              className="px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 border border-zinc-200 rounded-lg transition disabled:opacity-50">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="px-4 py-2 text-sm font-semibold text-white bg-black hover:bg-zinc-800 rounded-lg transition flex items-center gap-1.5 disabled:bg-zinc-400">
              {loading && <Loader2 size={14} className="animate-spin" />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
}