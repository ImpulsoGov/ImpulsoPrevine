import type { ReactNode } from "react";
import React from "react";
import style from "../../CustomPrint.module.css";
import cx from "classnames";
import type { ModalLabels } from "@features/acf/frontend/common/PrintModal/model";
import type { CustomPrintState } from "@/features/acf/frontend/common/WithCustomPrint/context";
import { Checkbox } from "@mui/material";

type PrintModalContentProps = {
    labels: ModalLabels;
    handleClose: () => void;
    customization: CustomPrintState;
    setCustomization: React.Dispatch<React.SetStateAction<CustomPrintState>>;
};

export const PrintModalContent = ({
    labels,
    customization,
    setCustomization,
    handleClose,
}: PrintModalContentProps): ReactNode => {
    return (
        <div className={style.Content}>
            <Header labels={labels} handleClose={handleClose} />
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

export const Header: React.FC<{
    labels: ModalLabels;
    handleClose: () => void;
}> = ({ labels, handleClose }) => {
    return (
        <>
            <div className={style.ContainerTitle}>
                <div className={style.TitleWithIcon}>
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

                <CloseModal handleClose={handleClose} />
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

export const SplitTeams = ({
    labels,
    customization,
    setCustomization,
}: SplitTeamsProps): ReactNode => {
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
                    orderGroup: prev.orderGroup,
                };
            }
            return { ...prev, [name]: true };
        });
    };
    return (
        <>
            <div className={style.MainCustomizationContainer}>
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
            </div>
        </>
    );
};

type OtherPrintOptionsProps = {
    labels: ModalLabels;
    customization: CustomPrintState;
    setCustomization: React.Dispatch<React.SetStateAction<CustomPrintState>>;
};

export const OtherPrintOptions = ({
    labels,
    customization,
    setCustomization,
}: OtherPrintOptionsProps): ReactNode => {
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
                    <Checkbox
                        name="splitGroupPerPage"
                        checked={customization.splitGroupPerPage}
                        onChange={handleCheckboxChange}
                        sx={{
                            p: 0.5,
                            color: "#A6B5BE",
                            "&.Mui-checked": { color: "#2EB280" },
                        }}
                    />
                    <span>
                        {labels.secondaryCustomOption.splitGroupPerPage}
                    </span>
                </div>

                {labels.secondaryCustomOption.ordering && (
                    <div className={style.SecondaryCustomOption}>
                        <Checkbox
                            name="order"
                            checked={customization.order}
                            onChange={handleCheckboxChange}
                            sx={{
                                p: 0.5,
                                color: "#A6B5BE",
                                "&.Mui-checked": { color: "#2EB280" },
                            }}
                        />
                        <span>{labels.secondaryCustomOption.ordering}</span>
                    </div>
                )}
            </div>
        </>
    );
};

const CloseModal: React.FC<{ handleClose: () => void }> = ({ handleClose }) => {
    return (
        <div className={style.Close}>
            <a className={style.ModalExit} onClick={handleClose} />
        </div>
    );
};
