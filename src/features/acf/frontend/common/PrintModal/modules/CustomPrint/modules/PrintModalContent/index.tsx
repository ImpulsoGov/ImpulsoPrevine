import React from "react";
import style from "../../CustomPrint.module.css";
import cx from "classnames";
import type { ModalLabels } from "../../../../model";
import type { CustomPrintState } from "@/features/acf/frontend/common/WithCustomPrint/context";

type PrintModalContentProps = {
    labels: ModalLabels;
    customization: CustomPrintState;
    setCustomization: React.Dispatch<React.SetStateAction<CustomPrintState>>;
};

export const PrintModalContent: React.FC<PrintModalContentProps> = ({
    labels,
    customization,
    setCustomization,
}) => {
    return (
        <div className={style.Content}>
            <Header labels={labels} />
            <SplitTeams
                labels={labels}
                customization={customization}
                setCustomization={setCustomization}
            />
            {customization.grouping && (
                <OtherPrintOptions
                    labels={labels}
                    customization={customization}
                    setCustomization={setCustomization}
                />
            )}
        </div>
    );
};

export const Header: React.FC<{ labels: ModalLabels }> = ({ labels }) => {
    return (
        <>
            <div className={style.ContainerTitle}>
                <img
                    src="https://media.graphassets.com/tkjDWpANQ9SzsdACBiEI"
                    width="28px"
                    height="28px"
                    alt="Icone de brilho"
                    className={style.TitleIcon}
                />
                <h4 className={cx(style.Title, style.ResetSpaces)}>
                    {labels.title}
                </h4>
            </div>

            <h5
                className={cx(
                    style.MainPersonalizationTitle,
                    style.ResetSpaces
                )}
            >
                {labels.primaryCustomOption.title}
            </h5>

            <p className={cx(style.MainPrintDescription, style.ResetSpaces)}>
                {labels.primaryCustomOption.description}
            </p>
        </>
    );
};

type SplitTeamsProps = {
    labels: ModalLabels;
    customization: CustomPrintState;
    setCustomization: React.Dispatch<React.SetStateAction<CustomPrintState>>;
};

export const SplitTeams: React.FC<SplitTeamsProps> = ({
    labels,
    customization,
    setCustomization,
}) => {
    const handleChangeTeamSplit = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const { name, value } = e.target;
        setCustomization((prev) => {
            if (value === "WithoutSplitTeam") {
                return {
                    grouping: false,
                    splitGroupPerPage: false,
                    order: false,
                };
            }
            return { ...prev, [name]: true };
        });
    };
    return (
        <>
            <div className={style.MainCustomizationOption}>
                <input
                    onChange={handleChangeTeamSplit}
                    className={style.MainCustomizationInput}
                    type="radio"
                    value="WithSplitTeam"
                    checked={customization.grouping}
                    name="grouping"
                    id="splitTeam"
                />
                <label htmlFor="splitTeam">
                    {labels.primaryCustomOption.splitTeam}
                </label>
            </div>

            <div className={style.MainCustomizationOption}>
                <input
                    onChange={handleChangeTeamSplit}
                    className={style.MainCustomizationInput}
                    type="radio"
                    value="WithoutSplitTeam"
                    checked={!customization.grouping}
                    name="grouping"
                    id="noSplit"
                />
                <label htmlFor="noSplit">
                    {labels.primaryCustomOption.noSplit}
                </label>
            </div>
        </>
    );
};

type OtherPrintOptionsProps = {
    labels: ModalLabels;
    customization: CustomPrintState;
    setCustomization: React.Dispatch<React.SetStateAction<CustomPrintState>>;
};

export const OtherPrintOptions: React.FC<OtherPrintOptionsProps> = ({
    labels,
    customization,
    setCustomization,
}) => {
    const handleCheckboxChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const { name, checked: isChecked } = e.target;
        setCustomization({
            ...customization,
            [name]: isChecked,
        });
    };
    return (
        <>
            <hr className={style.Separator} />

            <h5
                className={cx(
                    style.SecondaryCustomizationsTitle,
                    style.ResetSpaces
                )}
            >
                {labels.secondaryCustomOption.title}
            </h5>

            <div className={style.SecondaryCustomizationsContainer}>
                <div className={style.Recommendation}>
                    <img
                        src="https://media.graphassets.com/WMvmmV6JTKZ1OhELfymQ"
                        width="14px"
                        height="14px"
                        alt="Ícone de estrela"
                        className={style.RecommendationIcon}
                    />
                    <span className={style.RecommendationText}>
                        {labels.secondaryCustomOption.recommendation}
                    </span>
                </div>

                <div className={style.SecondaryCustomOption}>
                    <input
                        onChange={handleCheckboxChange}
                        type="checkbox"
                        checked={customization.splitGroupPerPage}
                        name="splitGroupPerPage"
                        id="splitGroupPerPage"
                    />
                    <label htmlFor="splitGroupPerPage">
                        {labels.secondaryCustomOption.splitGroupPerPage}
                    </label>
                </div>

                {labels.secondaryCustomOption.ordering && (
                    <div className={style.SecondaryCustomOption}>
                        <input
                            onChange={handleCheckboxChange}
                            type="checkbox"
                            checked={customization.order}
                            name="order"
                            id="order"
                        />
                        <label htmlFor="order">
                            {labels.secondaryCustomOption.ordering}
                        </label>
                    </div>
                )}
            </div>
        </>
    );
};
