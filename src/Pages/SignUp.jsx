import { SignUp } from "@clerk/clerk-react";
export default function Sign() {
    return (
        <>
            <div className="flex justify-center">
                <SignUp path="/signup" routing="path" signInUrl="/login">
                    <div className="mt-4">
                        <button className="w-full text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
                            Sign Up with Clerk
                        </button>
                    </div>
                </SignUp>
            </div>
        </>
    )
}