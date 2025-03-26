import { type Dispatch, type SetStateAction, createContext } from "react";

const Context = createContext<[string, Dispatch<SetStateAction<string>>]>([
    "",
    () => {},
]);

export default Context;
