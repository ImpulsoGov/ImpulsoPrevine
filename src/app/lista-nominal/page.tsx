import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { ListaNominal } from "./ListaNominal";

const ListaNominalPage = async() => {
    const session = await getServerSession(nextAuthOptions);

    if (!session || !session.user) return <p>Usuário não autenticado</p>;

    return <ListaNominal />
}
export default ListaNominalPage;
