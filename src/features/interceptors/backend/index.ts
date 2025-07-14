export { catchErrors } from "./modules/CatchErrors";
export { withUser } from "./modules/WithUser";
export { compose } from "./modules/Compose";
export { parseBody } from "./modules/ParseBody";

// TODO: mover esse tipo pra outro lugar
export type User = {
    municipalitySusId: string;
    teamIne: string;
    profiles: Array<number>;
};
