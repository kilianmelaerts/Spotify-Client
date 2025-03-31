import { ReactElement, useCallback } from "react";
import styles from "./app-popup-container.module.scss";
import { PopupContentType } from "../../../../types/popup/popup";
import { closePopup } from "../../../../containers/global/globalSlice";
import { useDispatch } from "react-redux";

type AppPopupContainerProps = {
	// Ensures only 1 child of type PopupContentType
	children: ReactElement<PopupContentType>,
}

export function AppPopupContainer(props: AppPopupContainerProps){
	const dispatch = useDispatch();
	
	const onClosePopupClick = useCallback(() => {
		dispatch(closePopup());
	}, [dispatch]);

	return (
		<div className={styles.root}>
			<div className={styles["popup-container"]}>
				<div className={styles["close-btn-container"]} onClick={onClosePopupClick}>
					<div className={styles["close-btn"]}> x </div>
				</div>
				{props.children}
			</div>
		</div>
	);
}