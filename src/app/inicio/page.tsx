import { InicioAPSRequest } from '@/services/inicio/inicioAPS'
import { InicioEquipeRequest } from '@/services/inicio/inicioEquipe'
// import { cargoTransform } from '@helpers/cargoTransform'
// import { Inicio } from './Inicio'
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
// import { unificarSituacaoPorIndicadores } from '@/helpers/inicio/unificarSituacaoPorIndicadores';
// import { SituacaoPorIndicador } from '@/types/inicio';

const InicioPage = async() => {
    const session = await getServerSession(nextAuthOptions);
    let situacaoIndicadores;

    if (!session || !session.user) return <p>Usuário não autenticado</p>;

    if(session?.user?.perfis.includes(5) || session?.user?.perfis.includes(8)) {
        situacaoIndicadores = await InicioAPSRequest(session?.user?.municipio_id_sus,session?.user?.access_token)
    }

    if(session?.user?.perfis.includes(9)) {
        situacaoIndicadores = await InicioEquipeRequest(session?.user?.municipio_id_sus,session?.user?.equipe,session?.user?.access_token)
    }
    console.log("-------------------------", situacaoIndicadores);

    // const cargo = cargoTransform(session.user.cargo);
    // const situacaoPorIndicador: SituacaoPorIndicador = await unificarSituacaoPorIndicadores(situacaoIndicadores);

    // return <Inicio cargo={cargo} situacaoPorIndicador={situacaoPorIndicador} />
    return <h1>Inicio</h1>
}

export default InicioPage;
