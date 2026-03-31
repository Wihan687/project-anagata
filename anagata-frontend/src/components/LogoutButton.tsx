"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();
    return (
        <button 
            onClick={async () => {
                await fetch('/api/auth/logout', { method: 'POST' });
                router.push('/admin');
                router.refresh();
            }}
            style={{
                padding: "10px 20px", 
                background: "#d93025", 
                border: "none", 
                borderRadius: "8px", 
                color: "white", 
                fontWeight: "600",
                cursor: "pointer"
            }}
        >
            Logout
        </button>
    );
}
