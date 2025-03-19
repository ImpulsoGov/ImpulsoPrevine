'use client';

import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export const AuthErrorPage = () => {
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        if (session) router.refresh();
    }, [session, router]);

    return <div style={{padding: "200px", textAlign: "center"}}>Usuário não autenticado, realize login em ACESSO RESTRITO no canto superior direito da tela</div>;
}