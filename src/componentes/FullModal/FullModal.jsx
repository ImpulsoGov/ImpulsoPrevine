import React from "react";
import style from "./FullModal.module.css";

const FullModal = ({ logo, children, back, backLink }) => {
	return (
		<div className={style.FullModalContainer}>
			<div className={style.FullModalLeftContainer}>
				<a className={style.FullModalBackButton} href={backLink}>
					<img src={back} />
				</a>
				<div className={style.FullModalLogo}>
					<img src={logo} />
				</div>
			</div>
			<div className={style.FullModalRightContainer}>{children}</div>
		</div>
	);
};

export { FullModal };
