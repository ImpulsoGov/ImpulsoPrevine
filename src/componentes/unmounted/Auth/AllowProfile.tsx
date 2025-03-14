import type { Session } from "next-auth"
import type { ProfileIdValue } from "@/types/profile"

export type AllowProfileProps = React.PropsWithChildren<{
    user: Session['user'],
    error: React.ReactElement,
    profileID: ProfileIdValue
}>

export const AllowProfile= ({
    children,
    user,
    error,
    profileID
}: AllowProfileProps)=>{
    if(!user.perfis.includes(profileID)) return error
    return children
}