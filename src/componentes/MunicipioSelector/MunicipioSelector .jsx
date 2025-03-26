import { SearchBar } from "@impulsogov/design-system/dist/SearchBar/SearchBar";
import { data } from "@utils/Municipios";

const MunicipioSelector = (props) => {
    return (
        <div style={{ marginLeft: "80px" }}>
            {props.municipio && (
                <SearchBar
                    data={data}
                    theme="White"
                    municipio={props.municipio}
                    setMunicipio={props.setMunicipio}
                />
            )}
        </div>
    );
};
export default MunicipioSelector;
