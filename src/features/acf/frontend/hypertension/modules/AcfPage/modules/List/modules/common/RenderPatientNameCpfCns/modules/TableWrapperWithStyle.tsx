import { Box } from "@mui/material";

export const TableWrapperWithStyle: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    return (
        <Box
            sx={{
                "& .patient-name-cpf-cns": {
                    whiteSpace: "break-spaces !important",
                },
            }}
        >
            {children}
        </Box>
    );
};
