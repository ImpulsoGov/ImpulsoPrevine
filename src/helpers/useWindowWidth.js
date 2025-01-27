import { useEffect, useState } from "react";

const useWindowWidth = () => {
	const [windowWidth, setWindowWidth] = useState(undefined);
	useEffect(() => {
		const handleWindowResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleWindowResize);
		handleWindowResize();
		return () => window.removeEventListener("resize", handleWindowResize);
	}, []);
	return windowWidth;
};

export { useWindowWidth };
