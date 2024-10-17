type Menu = {
  label: string;
  url: string;
  sub?: Menu[];
};

const subMenuListasNominais: Menu[] = [
    { label: "Citopatológico", url: "/busca-ativa/citopatologico" },                              
    { label: "Diabetes", url: "/busca-ativa/diabeticos?initialTitle=0&painel=0" },
    { label: "Hipertensão", url: "/busca-ativa/hipertensos?initialTitle=0&painel=0" },
    { label: "Pré-Natal", url: "/busca-ativa/gestantes?initialTitle=0&painel=0" },
    { label: "Vacinação", url: "/busca-ativa/vacinacao" },
  ]
const loggedMenu = (session : any)=>{
    const menus : Menu[] = [{ label: "Início", url: "/inicio" }]
    if(session?.user.perfis.includes(5) || session?.user.perfis.includes(8) || session?.user.perfis.includes(9)) menus.push(
        {
            label: "Listas Nominais", 
            url: "",
            sub: subMenuListasNominais,
        }
    )
    if(session?.user.perfis.includes(7)) menus.push({ label: "Trilhas", url: "/capacitacoes" })
    menus.push({ label: "Dados Públicos - Q1/24", url: "/analise" })
    return menus
}
const notLoggedMenu = (res : any)=>{
    return [res.menus[0], res.menus[1]]
    .concat([{ label: "Apoio aos Municípios", url: "/apoio" },
    { label: "FAQ", url: "/faq" }, 
    { label: "Blog", url: "/blog" }]) 
}

export const menuNavBar = (session : any, res : any)=> session ? loggedMenu(session) : notLoggedMenu(res)