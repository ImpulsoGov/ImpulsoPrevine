"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ErrorPageWhatsAppLink } from "@/constants/whatsAppLinks";

export const ErrorPage = () => {
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        if (session) router.refresh();
    }, [session, router]);

    return (
        <p
            style={{
                margin: "120px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            Erro ao buscar dados, entre em contato com o{" "}
            <Link
                href={ErrorPageWhatsAppLink}
                style={{
                    color: "#1E8E76",
                    marginLeft: "5px",
                    textDecoration: "underline",
                }}
            >
                suporte
            </Link>{" "}
        </p>
    );
};
