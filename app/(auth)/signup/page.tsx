"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return <div className="relative text-center p-4 w-full flex flex-col justify-center items-center h-full">
        <h1 className="text-3xl font-medium">Welcome to Cortex</h1>
        <p className="text-sm font-extralight tracking-wide font-manrope">We're happy to have you here.</p>

        <form className="mt-4 w-full flex flex-col gap-3 justify-center items-center font-manrope">
            <div className="lg:w-[60%] md:w-[60%] w-[80%]">
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="name" className="border-2 border-zinc-200 px-3 py-2 rounded-xl w-full focus:outline-none focus:border-blue-500" />
                <p className="mt-px text-[10px] text-red-500 ml-1 text-left font-medium">Invalid name</p>
            </div>
            <div className="lg:w-[60%] md:w-[60%] w-[80%]">
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" className="border-2 border-zinc-200 px-3 py-2 rounded-xl w-full focus:outline-none focus:border-blue-500" />
                <p className="mt-px text-[10px] text-red-500 ml-1 text-left font-medium">Invalid email</p>
            </div>
            <div className="lg:w-[60%] md:w-[60%] w-[80%]">
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" className="border-2 border-zinc-200 px-3 py-2 rounded-xl w-full focus:outline-none focus:border-blue-500" />
                <p className="mt-px text-[10px] text-red-500 ml-1 text-left font-medium">Invalid password</p>
            </div>
        </form>
        <motion.button whileHover={{ scale: 0.95 }} className="mt-5 lg:w-[60%] md:w-[60%] w-[80%] rounded-3xl py-2 text-center text-white bg-blue-500 font-manrope font-semibold">Continue</motion.button>
        <br />
        <p className="font-manrope text-xs text-zinc-500">or</p>
        <p className="font-manrope text-xs text-zinc-500">continue with</p>
        <div className="mt-2 flex gap-6 justify-center">
            <motion.div whileHover={{ scale: 1.1, backgroundColor: "#d6c1c1" }} className="cursor-pointer h-7 w-7 flex justify-center items-center rounded-full">
                <img className="h-5 w-5" src="/google.svg" alt="" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.1, backgroundColor: "#d6c1c1" }} className="cursor-pointer h-7 w-7 flex justify-center items-center rounded-full">
                <img className="h-5 w-5" src="/facebook.svg" alt="" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.1, backgroundColor: "#d6c1c1" }} className="cursor-pointer h-7 w-7 flex justify-center items-center rounded-full">
                <img className="h-5 w-5" src="/apple.svg" alt="" />
            </motion.div>
        </div>
        <div className="absolute bottom-3 flex gap-2 font-manrope text-sm">
            <span>Have an account already?</span>
            <Link href="/signin" className="text-blue-500 font-medium">Sign in</Link>
        </div>
    </div>
}