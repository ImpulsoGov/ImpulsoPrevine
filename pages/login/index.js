import { useSession, signIn, signOut, getProviders, getSession, getCsrfToken } from "next-auth/react"
import { useState } from "react";
import { LogOut } from "../../componentes/LogOut/LogOut";
const Index = (props) =>{
    const [senha, setSenha] = useState("");
    const [username, setUsername] = useState("");
    const { data: session,status } = useSession()
  return (
    <>
        <p>................</p>
        <p>................</p>
        <p>................</p>
        <p>{status}</p>
        {Object.values(props.providers).map((provider) => {
        return (
          <div key={provider.name}>
            <input 
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => {setUsername(e.target.value)}}
            />

            <input 
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => {setSenha(e.target.value)}}
            />

            <button onClick={() => signIn('credentials', { redirect: true,username:username, password: senha })}>
              Sign in with {provider.name}
            </button>
            <div onClick={() => signOut()}>Sign out</div>
            <LogOut out={signOut} />
          </div>
        );
      })}
        <p>................</p>
        <p>................</p>
        <p>................</p>
        <p>................</p>
        <p>................</p>

    </>
  );
}

export async function getServerSideProps(context) {
    const {req}  = context;
    const session = await getSession({ req });
  
    if (session) {
      return {
        redirect: { destination: "/" },
      };
    }
  
    return {
      props: {
        providers: await getProviders(context),
        csrfToken: await getCsrfToken(context),
      },
    };
  }
  

export default Index;



