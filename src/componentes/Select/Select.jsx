import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import SelectMUI from "@mui/material/Select";
import PropTypes from "prop-types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

function Select({
	label,
	options,
	handleChange,
	selectedOptions,
	width,
	isMulti,
}) {
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
			},
		},
	};

	return (
		<FormControl sx={{ m: 1, width }}>
			<InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>

			<SelectMUI
				multiple={isMulti}
				value={selectedOptions}
				onChange={handleChange}
				input={<OutlinedInput label={label} />}
				renderValue={
					isMulti ? (selected) => selected.join(", ") : (selected) => selected
				}
				MenuProps={MenuProps}
				sx={{ width: "100%" }}
			>
				{options.map((option) => (
					<MenuItem key={option.id} value={option.descricao}>
						{isMulti && (
							<Checkbox checked={selectedOptions.includes(option.descricao)} />
						)}
						<ListItemText primary={option.descricao} />
					</MenuItem>
				))}
			</SelectMUI>
		</FormControl>
	);
}

Select.defaultProps = {
	isMulti: false,
};

Select.propTypes = {
	isMulti: PropTypes.bool,
};

export default Select;
