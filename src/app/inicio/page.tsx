import { InicioAPSRequest } from '@/services/inicio/inicioAPS'
import { InicioEquipeRequest } from '@/services/inicio/inicioEquipe'
import { cargoTransform } from '@helpers/cargoTransform'
import { Inicio } from './Inicio'
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { unificarSituacaoPorIndicadores } from '@/helpers/inicio/unificarSituacaoPorIndicadores';
import { SituacaoPorIndicador } from '@/types/inicio';
import Link from 'next/link';

const InicioPage = async() => {
    const session = await getServerSession(nextAuthOptions);
    let situacaoIndicadores = [];

    if (!session || !session.user) return <p>Usuário não autenticado</p>;

    if(session?.user?.perfis.includes(5) || session?.user?.perfis.includes(8)) {
        situacaoIndicadores = await InicioAPSRequest(session?.user?.municipio_id_sus,session?.user?.access_token)
    }

    if(session?.user?.perfis.includes(9)) {
        situacaoIndicadores = await InicioEquipeRequest(session?.user?.municipio_id_sus,session?.user?.equipe,session?.user?.access_token)
    }

    const cargo = cargoTransform(session.user.cargo);
    const situacaoPorIndicador: SituacaoPorIndicador = await unificarSituacaoPorIndicadores(situacaoIndicadores);

    return situacaoIndicadores.length > 0 ?
    <Inicio cargo={cargo} situacaoPorIndicador={situacaoPorIndicador} /> :
    <p style={{margin: "120px", display: "flex", justifyContent: "center", alignItems: "center" }}>Erro ao buscar dados, entre em contato com o <Link href="https://api.whatsapp.com/send?phone=5511941350260&text=Ol%C3%A1,%20gostaria%20de%20falar%20com%20uma%20atendente" style={{ color: '#1E8E76', marginLeft: "5px", textDecoration: "underline"}}>suporte</Link> </p>
}

export default InicioPage;
