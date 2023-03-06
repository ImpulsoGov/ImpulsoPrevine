//redireciona para home usuarios não logados e usuarios que não tem perfil de acesso aos paineis com dados restritos
const redirectHome = (ctx,session)=>{
    const userIsActive = ctx.req.cookies['next-auth.session-token']
    const userIsActiveSecure = ctx.req.cookies['__Secure-next-auth.session-token']
    let redirect = (!userIsActive || !userIsActiveSecure) && !session?.user.perfis.includes(5 || 8 || 9) 
    if(redirect) {
      return {
        redirect: {
          destination: "/",
          permanent: false, // make this true if you want the redirect to be cached by the search engines and clients forever
        }, 
      }
    }
    return false
}
const redirectHomeNotLooged = (ctx)=>{
  const userIsActive = ctx.req.cookies['next-auth.session-token']
  const userIsActiveSecure = ctx.req.cookies['__Secure-next-auth.session-token']
  let redirect = !userIsActive || !userIsActiveSecure 
  if(!redirect) {
    return {
      redirect: {
        destination: "/",
        permanent: false, // make this true if you want the redirect to be cached by the search engines and clients forever
      }, 
    }
  }
  return false
}

export {redirectHome,redirectHomeNotLooged}