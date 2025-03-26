"use client";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

const CardLarge = dynamic(() =>
    import("@impulsogov/design-system").then((mod) => mod.CardLarge),
);
const Greeting = dynamic(() =>
    import("@impulsogov/design-system").then((mod) => mod.Greeting),
);

const GestaoDeUsuarios = () => {
    const { data: session } = useSession();
    if (session) {
        return (
            session?.user.perfis.includes(2) && (
                <>
                    <Greeting
                        cargo={session?.user?.cargo}
                        greeting="Bem vindo(a)"
                        municipio_uf={session?.user.municipio}
                        nome_usuario={session?.user.nome}
                        texto=""
                    />
                    <div
                        style={
                            window.screen.width >= 1024
                                ? {
                                      display: "grid",
                                      gridTemplateColumns: "auto auto",
                                      columnGap: "24px",
                                      gridRowGap: "24px",
                                      marginLeft: "80px",
                                      marginRight: "45px",
                                      marginBottom: "20px",
                                  }
                                : {
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: "15px",
                                      marginLeft: "15px",
                                  }
                        }
                    >
                        <>
                            <CardLarge
                                icon="https://media.graphassets.com/jo1S3VXcTCyTFw4Ke697"
                                links={[
                                    {
                                        label: "Individual",
                                        link: "/gestao-usuarios/cadastro/individual",
                                    },
                                    {
                                        label: "Lotes",
                                        link: "/gestao-usuarios/cadastro/lotes",
                                    },
                                ]}
                                texto="Aqui você pode cadastrar novos usuarios, de forma individual ou por lotes"
                                titulo="Cadastros"
                                theme="ColorIP"
                            />
                            <CardLarge
                                icon="https://media.graphassets.com/6cOfkxeyT7245Fn19kgU"
                                links={[
                                    {
                                        label: "Painel de Acompanhamento",
                                        link: "/gestao-usuarios/gestao-trilha",
                                    },
                                    {
                                        label: "Adicionar/Remover Acesso Individual",
                                        link: "/",
                                    },
                                    {
                                        label: "Adicionar/Remover Acesso Por Lotes",
                                        link: "/",
                                    },
                                ]}
                                texto="Insira de remova acessos para as trilhas de capacitação e acompanhe os acessos atuais por municipio"
                                titulo="Gestão Trilha"
                                theme="ColorIP"
                            />
                            <CardLarge
                                icon="https://media.graphassets.com/6cOfkxeyT7245Fn19kgU"
                                links={[
                                    {
                                        label: "Painel de Acompanhamento",
                                        link: "/",
                                    },
                                    {
                                        label: "Adicionar/Remover perfil em lote",
                                        link: "/",
                                    },
                                ]}
                                texto="Insira ou remova perfis de acesso e acompanhe os perfis atuais por municipio"
                                titulo="Gestão de Perfis"
                                theme="ColorIP"
                            />
                        </>
                    </div>
                </>
            )
        );
    }
};

export default GestaoDeUsuarios;
