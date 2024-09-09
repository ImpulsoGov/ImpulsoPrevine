import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios"
import FormData from "form-data"
import { API_URL_USUARIOS } from "../../../constants/API_URL";

export const cargo_nome = async (token,cpf)=>{
  let config = {
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
    console.log(error);
  });
}

const getToken = async(credentials)=>{
  let data = new FormData();
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
    let cargonome = await cargo_nome(response.data.access_token,credentials.username.replace(/\D/g, ''))
    return {...response.data,mail:credentials.username,...cargonome}
  })
  .catch(function (error) {
    console.log(error);
  });

}

export const authOptions = {
secret: process.env.NEXTAUTH_SECRET,
providers: [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "Credentials",
    // The credentials is used to generate a suitable form on the sign in page.
    // You can specify whatever fields you are expecting to be submitted.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      username: { label: "Username", type: "text" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
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
refetchInterval: 1,
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
    session.user = token.user;
    return Promise.resolve(session);
  },
  signIn: async ({credentials})=> {
    return credentials
  },
},
pages: {
  signIn: '/inicio',
  signOut: '/auth/signout',
}
}

export default NextAuth(authOptions)