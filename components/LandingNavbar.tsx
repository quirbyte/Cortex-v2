"use client";
import AnimatedButton from "@/DesignComponents/AnimatedButton";
import Link from "next/link";

export default function LandingNavbar() {
    return (
        <nav className="w-full bg-linear-to-r bg-amber-400 rounded-[40px] shadow-lg">
            <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between font-manrope">
                <div className="flex items-center gap-3">
                    <img src="/logo.svg" className="h-9 w-9" alt="Logo" />
                    <span className="font-bold text-xl text-black tracking-wide">Cortex</span>
                </div>
                <div className="flex gap-7 font-bold">
                    <a href="">Features</a>
                    <a href="">Pricing</a>
                    <a href="">Policy</a>
                    <a href="">About Us</a>
                </div>
                <div className="flex gap-4">
                    <Link href="/signin">
                        <AnimatedButton
                            text="Sign in"
                            className="ml-2"
                            initialBg="#FFB900"
                            initialText="#000000"
                            finalBg="#000000"
                            finalText="#ffffff"
                        />
                    </Link>
                    <Link href="/signup">
                        <AnimatedButton
                            text="Sign up"
                            className="ml-2"
                            initialBg="#FFFFFF"
                            initialText="#000000"
                            finalBg="#000000"
                            finalText="#FFFFFF"
                        />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
