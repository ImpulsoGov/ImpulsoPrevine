export const slotProps = {
    listbox: {
        sx: {
            '& .MuiAutocomplete-option[aria-selected="true"]': {
                backgroundColor: "#DEF7EC",
            },
            '& .MuiAutocomplete-option[aria-selected="false"]:hover': {
                backgroundColor: "#F4F4F4",
            },
            "& .MuiAutocomplete-option.Mui-focused": {
                backgroundColor: "#FFF",
            },
            '& .MuiAutocomplete-option.Mui-focused[aria-selected="true"]': {
                backgroundColor: "#DEF7EC",
            },
            '& .MuiAutocomplete-option.Mui-focused[aria-selected="true"]:hover':
                {
                    backgroundColor: "#BCF0DA",
                },
        },
    },
    paper: {
        sx: {
            '& .MuiAutocomplete-option[aria-selected="true"]': {
                color: "#000000de",
            },
            '& .MuiAutocomplete-option[aria-selected="true"]:hover': {
                color: "#000000de",
            },
        },
    },
};
