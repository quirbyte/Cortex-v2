"use client";
import { motion } from "motion/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SigninPage() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const router = useRouter();

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setEmailError(true);
            return;
        }
        if (!password) {
            setPasswordError(true);
            return;
        }
        setLoading(true);
        try {
            const result = await signIn("credentials", { email, password, redirect: false, callbackUrl: "/dashboard" });
            if (!result?.error && result?.url) {
                router.push(result.url);
            } else {
                setPasswordError(true);
            }
        } catch {
            setPasswordError(true);
        } finally {
            setLoading(false);
        }
    }

    const handleSocial = async (provider: "google" | "linkedin") => {
        const result = await signIn(provider, { redirect: false, callbackUrl: "/dashboard" });
        if (result?.url) router.push(result.url);
    }

    return <div className="relative text-center p-4 w-full flex flex-col justify-center items-center h-full">
        <h1 className="text-3xl font-medium">Welcome back</h1>
        <p className="text-sm font-extralight tracking-wide font-manrope">We're happy to have you back.</p>

        <form onSubmit={handleFormSubmit} className="mt-4 w-full flex flex-col gap-3 justify-center items-center font-manrope">
            <div className="lg:w-[60%] md:w-[60%] w-[80%]">
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" className="border-2 border-zinc-200 px-3 py-2 rounded-xl w-full focus:outline-none focus:border-blue-500" />
                {emailError && <p className="mt-px text-[10px] text-red-500 ml-1 text-left font-medium">Invalid email</p>}
            </div>
            <div className="lg:w-[60%] md:w-[60%] w-[80%]">
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" className="border-2 border-zinc-200 px-3 py-2 rounded-xl w-full focus:outline-none focus:border-blue-500" />
                {passwordError && <p className="mt-px text-[10px] text-red-500 ml-1 text-left font-medium">Invalid password</p>}
            </div>
            <motion.button type="submit" whileHover={{ scale: 0.95 }} disabled={loading} className="mt-5 lg:w-[60%] md:w-[60%] w-[80%] rounded-3xl py-2 text-center text-white bg-blue-500 font-manrope font-semibold disabled:scale-95 disabled:opacity-85">Continue</motion.button>
            <br />
        </form>
        <p className="font-manrope text-xs text-zinc-500">or</p>
        <p className="font-manrope text-xs text-zinc-500">continue with</p>
        <div className="mt-2 flex gap-7 items-center">
            <motion.div onClick={() => handleSocial("google")} whileHover={{ scale: 1.1 }} className="cursor-pointer h-7 w-7 flex justify-center items-center rounded-full">
                <img className="h-5 w-5" src="/google.svg" alt="" />
            </motion.div>
            <motion.div onClick={() => handleSocial("linkedin")} whileHover={{ scale: 1.1 }} className="cursor-pointer h-7 w-7 flex justify-center items-center rounded-full">
                <img className="h-5 w-5" src="/linkedin.svg" alt="" />
            </motion.div>
        </div>
        <div className="absolute bottom-3 flex gap-2 font-manrope text-sm">
            <span>New User?</span>
            <Link href="/signup" className="text-blue-500 font-medium">Sign up</Link>
        </div>
    </div>
}