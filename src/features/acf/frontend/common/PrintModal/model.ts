export type ModalLabels = {
    title: string;
    primaryCustomOption: {
        title: string;
        description: string;
        splitTeam: string;
        noSplit: string;
    };
    secondaryCustomOption: {
        title: string;
        recommendation: string;
        splitGroupPerPage: string;
        ordering?: string;
    };
    button: string;
};
