"use client";
import { X, Upload, Trash2, Check, Loader2 } from "lucide-react";
import { useState, useRef, Dispatch, SetStateAction } from "react";
import { UserSettingsType } from "./SettingsPageClient";
import { useRouter } from "next/navigation";

export default function ImagePopup({
    user,
    loading,
    setLoading,
    setIsImagePopup,
}: {
    user: UserSettingsType;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setIsImagePopup: (val: boolean) => void;
}) {
    const [imageUrl, setImageUrl] = useState(user.image);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleRemovePhoto = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/user`, {
                method: "POST",
                body: JSON.stringify({
                    id: user.id,
                    image: null
                })
            });
            if (res.ok) {
                router.refresh();
                setIsImagePopup(false);
            }else{
                console.log("Cannot update image")
            }
        } catch (err: any) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const handleUpdatePhoto = async (file: File) => {
        setLoading(true);
        try {

        } catch (err: any) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const handleConfirmPhoto = async () => {
        setLoading(true);
        try {

        } catch (err: any) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            alert("File size exceeds the 2MB profile threshold.");
            return;
        }

        if (imageUrl && imageUrl.startsWith("blob:")) {
            URL.revokeObjectURL(imageUrl);
        }

        setImageFile(file);
        setImageUrl(URL.createObjectURL(file));
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="fixed inset-0 backdrop-blur-md bg-zinc-950/40 flex items-center justify-center w-full z-50 animate-fade-in">
            <div className="w-85 bg-white rounded-2xl border border-zinc-200/80 shadow-2xl relative p-6 flex flex-col items-center gap-6">

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                />

                <button
                    disabled={loading}
                    onClick={() => setIsImagePopup(false)}
                    className="absolute top-4 right-4 h-8 w-8 flex rounded-xl border border-zinc-100 hover:bg-zinc-50 justify-center items-center text-zinc-500 hover:text-black transition-all disabled:opacity-50"
                >
                    <X size={15} />
                </button>

                <div className="text-center w-full mt-2">
                    <h3 className="text-base font-black tracking-tight text-zinc-900">Profile Picture</h3>
                    <p className="text-xs text-zinc-400 mt-0.5">Customize your account avatar presentation</p>
                </div>

                <div className="h-28 w-28 rounded-full bg-zinc-50 border border-zinc-200 p-1 shadow-inner relative group shrink-0">
                    <div className="h-full w-full rounded-full bg-zinc-900 overflow-hidden flex items-center justify-center select-none">
                        {imageUrl ? (
                            <img
                                src={imageUrl} // Changed from user.image to local state imageUrl
                                alt={user.name || "User Avatar"}
                                referrerPolicy="no-referrer"
                                className="h-full w-full object-cover rounded-full"
                            />
                        ) : (
                            <div className="w-full h-full bg-amber-400 flex items-center justify-center font-black text-3xl text-zinc-950">
                                {user.name ? user.name[0].toUpperCase() : ""}
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-full flex flex-col gap-2 mt-2">
                    <div className={`grid ${imageUrl ? "grid-cols-2" : "grid-cols-1"} gap-2`}>
                        <button
                            type="button"
                            onClick={triggerFileInput}
                            disabled={loading}
                            className="py-2.5 px-3 bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-700 hover:text-zinc-900 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
                        >
                            <Upload size={13} />
                            Update
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                handleRemovePhoto();
                                setImageUrl(null);
                                setImageFile(null);
                            }}
                            disabled={loading || !imageUrl}
                            className="py-2.5 px-3 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200/40 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:hidden"
                        >
                            <Trash2 size={13} />
                            Remove
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            if (imageFile) {
                                handleUpdatePhoto(imageFile);
                            }
                            handleConfirmPhoto();
                        }}
                        disabled={loading}
                        className="w-full py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs active:scale-[0.99] disabled:opacity-50"
                    >
                        {loading ? (
                            <Loader2 size={14} className="animate-spin" />
                        ) : (
                            <>
                                <Check size={14} strokeWidth={2.5} />
                                Confirm Photo
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}