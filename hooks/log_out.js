import { signOut } from "next-auth/react"

export const log_out = (session)=>{
    if(session){
        const time_out = new Date(session.expires) - new Date()
        if (time_out > 0) {
            const timer = setTimeout(() => {
              signOut();
            }, time_out);
            // Limpa o timer quando o componente desmontar ou a sessão mudar
            return () => clearTimeout(timer);
          } else {
            signOut();
          }
    }
}