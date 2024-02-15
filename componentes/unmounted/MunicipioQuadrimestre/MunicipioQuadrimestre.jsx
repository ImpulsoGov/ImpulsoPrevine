import { useSession } from "next-auth/react";
import PropTypes from "prop-types";
import React, { useMemo } from "react";
import { obterDadosQuadrimestre } from "../../../utils/quadrimestre";
import styles from "./MunicipioQuadrimestre.module.css";

const MunicipioQuadrimestre = ({ data }) => {
  const { data: session } = useSession();
  const quadrimestreFormatado = useMemo(() => {
    if (data) {
      const { quadrimestre, ano } = obterDadosQuadrimestre(data);
      return ` - Q${quadrimestre}/${ano.slice(-2)}`;
    }

    return "";
  }, [data]);

  return (
    <div className={styles.Container}>
      {session.user.municipio + quadrimestreFormatado}
    </div>
  )
};

MunicipioQuadrimestre.propTypes = {
  data: PropTypes.string,
};

MunicipioQuadrimestre.defaultProps = {
  data: "",
};

export default MunicipioQuadrimestre;
