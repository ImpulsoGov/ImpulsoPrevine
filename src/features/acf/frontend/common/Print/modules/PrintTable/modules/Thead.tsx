// TODO: rever esse import
import type {
    ColumnsProps,
    LayoutOrientation,
} from "../../../../PrintModal/model";

export type TheadProps = {
    columns: Array<ColumnsProps>;
    layoutOrientation: LayoutOrientation;
};

export const Thead: React.FC<TheadProps> = ({ columns, layoutOrientation }) => (
    <thead>
        <tr
            className="largura"
            style={{
                backgroundColor: "#E7E7E7",
                marginTop: "82px",
                borderBottom: "solid 1px #757574",
            }}
        >
            {columns.map((column, index) => {
                return (
                    <th
                        style={{
                            padding: column.verticalDivider
                                ? "5px 5px 5px 12px"
                                : "5px",
                            width: column.width[layoutOrientation],
                            borderTopLeftRadius: index !== 0 ? "0" : "8px",
                            borderTopRightRadius:
                                index !== columns.length - 1 ? "0" : "8px",
                            borderBottomLeftRadius: index !== 0 ? "0" : "8px",
                            borderBottomRightRadius:
                                index !== columns.length - 1 ? "0" : "8px",
                            borderRight: column.verticalDivider
                                ? "solid 1px #757574"
                                : "",
                            textAlign: "left",
                            boxSizing: "border-box",
                        }}
                        key={`${column.headerName}${index.toString()}`}
                    >
                        <div>{column.headerName}</div>
                    </th>
                );
            })}
        </tr>
    </thead>
);
