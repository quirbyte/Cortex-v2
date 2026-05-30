import AnimatedC from "@/components/AnimatedC";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return <div className="relative min-h-screen w-screen flex">
        <div className="absolute left-8 top-8">
            <img src="/logo.svg" className="text-black h-8 w-8" alt="" />
        </div>
        <div className="bg-amber-300 w-[50%] h-screen lg:block md:block hidden">
            <div className="h-full w-full flex justify-center items-center">
                <AnimatedC />
            </div>
        </div>
        <div className="bg-white h-screen lg:w-[50%] md:w-[50%] w-full">
            <div className="w-full block md:hidden lg:hidden bg-amber-300 h-20 rounded-br-2xl rounded-bl-2xl">
            </div>
            <div className="w-full md:h-full lg:h-full h-[calc(100vh-80px)] overflow-x-hidden flex items-center justify-center">
                {children}
            </div>
        </div>
    </div>
}