import { Awaitable, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios"
import FormData from "form-data"
import { API_URL_USUARIOS } from "@constants/API_URL";
import * as Sentry from "@sentry/nextjs";
interface Credentials {
  username: string;
  password: string;
}

interface User {
  id: string;
  nome: string;
  mail: string;
  cargo: string;
  municipio: string;
  equipe: string;
  municipio_id_sus: string;
  perfis: number[];
  access_token: string;
  token_type: string;
}
const cargo_nome = async (token : string,cpf : string ) : Promise<{ cargo: string; nome: string }>=>{
  const config = {
    method: 'get',
    url: API_URL_USUARIOS+'suporte/ger_usuarios/cargo-nome?id='+cpf+'&id_cod=2',
    headers: { 
      'Authorization': 'Bearer '+token
    }
  };
  return await axios(config)
  .then(function (response) {
    return response.data.cadastro[0]
  })
  .catch(function (error) {
    console.error(error);
    throw new Error("Erro ao buscar cargo e nome");
  });
}

const getToken = async(credentials : Credentials) : Promise<Awaitable<User | null>>=>{
  const data = new FormData();
  data.append('username', credentials.username);
  data.append('password', credentials.password);
  const config = {
    method: 'post',
    url: API_URL_USUARIOS + 'suporte/usuarios/token',
    headers: { 
      ...data.getHeaders()
    },
    data : data
  };
  return await axios(config)
  .then(async(response)=> {
    const cargonome = await cargo_nome(response.data.access_token,credentials.username.replace(/\D/g, ''))
    return {...response.data,mail:credentials.username,...cargonome}
  })
  .catch(function (error) {
    console.error(error);
    return null;
  });

}

export const nextAuthOptions : NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: Record<"username" | "password", string> | undefined)  {
        if (!credentials) return null;
        const token = await getToken(credentials)  
        if (token) {
          // Any object returned will be saved in `user` property of the JWT
          return token
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60,
    updateAge: 8 * 60 * 60
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 8 * 60 * 60
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);

      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      token.user && (session.user = token.user as User);
      if(token?.expires) session.expires = new Date(token.expires as number).toISOString();
      return Promise.resolve(session);
    },
  },
  pages: {
    signIn: '/inicio',
    signOut: '/auth/signout',
  },
  events: {
   signIn:({user}) => {
      Sentry.setUser({id:user.id})
   },
    signOut:() => {
        Sentry.setUser(null)
    },
  }
}