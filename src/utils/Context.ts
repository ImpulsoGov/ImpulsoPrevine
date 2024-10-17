import { createContext, Dispatch, SetStateAction } from 'react';

const Context = createContext<[string, Dispatch<SetStateAction<string>>]>(["", () => {}]);

export default Context;