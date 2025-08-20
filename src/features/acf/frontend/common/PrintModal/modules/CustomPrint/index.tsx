import React, { useContext, useState } from "react";
import { ButtonColorSubmitIcon } from "@impulsogov/design-system";
import style from "./CustomPrint.module.css";
import cx from "classnames";
import type { ModalLabels } from "../../model";
import { CustomPrintContext } from "../../../WithCustomPrint/context";

const DEFAULT_LABELS = {
    title: "",
    primaryCustomOption: {
        title: "",
        description: "",
        splitTeam: "",
        noSplit: "",
    },
    secondaryCustomOption: {
        title: "",
        recomendation: "",
        splitGroupPerPage: "", //folha vira page, nao confundir com page de pagination
        order: "",
    },
    button: "",
};

type Props = {
    labels: ModalLabels;
    handleClose: () => void;
    onPrintClick: () => void;
    groupedValues: { yes: string; no: string };
};

// TODO: dividir em componentes menores?
export const CustomPrint: React.FC<Props> = ({
    labels = DEFAULT_LABELS,
    handleClose,
    onPrintClick,
    groupedValues,
}) => {
    // const {customization, setCustomization} = useContext(CustomPrintContext)

    // function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    //   const { name, value, checked: isChecked, type } = e.target;

    //   setCustomization({
    //     ...customization,
    //     [name]: type === "checkbox" ? isChecked : value
    //   });
    // }

    return (
        <div className={style.Container} data-testid="PersonalizacaoImpressao">
            {/* <div className={style.Close}>
        <a
          className={style.ModalExit}
          onClick={handleClose}
          data-testid="FecharPersonalizacaoImpressao"
        />
      </div>

      <div className={style.Conteudo}>
        <div className={style.TituloContainer}>
          <img
            src="https://media.graphassets.com/tkjDWpANQ9SzsdACBiEI"
            width="28px"
            height="28px"
            alt="Icone de brilho"
            className={style.IconeTitulo}
          />
          <h4 className={cx(style.Titulo, style.ResetEspacamento)}>
            {labels.title}
          </h4>
        </div>

        <h5 className={cx(style.TituloPersonalizacaoPrincipal, style.ResetEspacamento)}>
          {labels.primaryCustomOption.title}
        </h5>

        <p className={cx(style.DescricaoPersonalizacaoPrincipal, style.ResetEspacamento)}>
          {labels.primaryCustomOption.description}
        </p>

        <div className={style.OpcaoPersonalizacaoPrincipal}>
          <input
            onChange={handleChange}
            className={style.InputPersonalizacaoPrincipal}
            type="radio"
            value={groupedValues.yes}
            checked={customization.grouping === groupedValues.yes}
            name="grouping"
            id="splitTeam"
          />
          <label htmlFor="splitTeam">
            {labels.primaryCustomOption.splitTeam}
          </label>
        </div>

        <div className={style.OpcaoPersonalizacaoPrincipal}>
          <input
            onChange={handleChange}
            className={style.InputPersonalizacaoPrincipal}
            type="radio"
            value={groupedValues.no}
            checked={customization.grouping === groupedValues.no}
            name="grouping"
            id="noSplit"
          />
          <label htmlFor="noSplit">
            {labels.primaryCustomOption.noSplit}
          </label>
        </div>

        {
          customization.grouping === groupedValues.yes && (
            <>
              <hr className={style.Linha}/>

              <h5 className={cx(style.TituloPersonalizacoesSecundarias, style.ResetEspacamento)}>
                {labels.secondaryCustomOption.title}
              </h5>

              <div className={style.ContainerPersonalizacoesSecundarias}>
                <div className={style.Recomendacao}>
                  <img
                    src="https://media.graphassets.com/WMvmmV6JTKZ1OhELfymQ"
                    width="14px"
                    height="14px"
                    alt="Ícone de estrela"
                    className={style.IconeRecomendacao}
                  />
                  <span className={style.TextoRecomendacao}>
                    {labels.secondaryCustomOption.recomendation}
                  </span>
                </div>

                <div className={style.OpcaoPersonalizacaoSecundaria}>
                  <input
                    onChange={handleChange}
                    type="checkbox"
                    checked={customization.splitGroupPerPage}
                    name="splitGroupPerPage"
                    id="splitGroupPerPage"
                  />
                  <label htmlFor="splitGroupPerPage">
                    {labels.secondaryCustomOption.splitGroupPerPage}
                  </label>
                </div>

                {labels.secondaryCustomOption.order && (
                  <div className={style.OpcaoPersonalizacaoSecundaria}>
                    <input
                      onChange={handleChange}
                      type="checkbox"
                      checked={customization.order}
                      name="order"
                      id="order"
                    />
                    <label htmlFor="order">
                      {labels.secondaryCustomOption.order}
                    </label>
                  </div>
                )}
              </div>
            </>
          )
        }
      </div>
 */}
            <div className={style.ContainerBotao}>
                <ButtonColorSubmitIcon
                    label={labels.button}
                    submit={onPrintClick}
                />
            </div>
        </div>
    );
};
