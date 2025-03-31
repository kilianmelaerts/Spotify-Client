import { CSSProperties, ReactElement, useMemo } from "react";
import styles from "./main-layout.module.scss";
import { HeaderLayout } from "../header-layout/header-layout";
import { PlaylistsLayoutProps } from "../playlists-layout/playlists-layout";
import { useDispatch, useSelector } from "react-redux";
import { PopupSwitch, PopupTypes } from "../../components/shared/popup/popup-switch/popup-switch";
import { globalSelectors } from "../../containers/global/globalSelectors";

type Props<ContentProps> = {
	id?: string,
	style?: CSSProperties,
	className?: string,
	// Only accept 2 children
	children: [
		ReactElement<PlaylistsLayoutProps>,
		ReactElement<ContentProps>,
	],
}

export function MainLayout<ContentProps>(props: Props<ContentProps>): JSX.Element{
	const popupIsOpen = useSelector(globalSelectors.getPopupOpenStatus);

	const className: string = useMemo(() => {
		return [styles.root, props.className].filter(Boolean).join(" ");
	}, [props.className]);

	return(
		<div id={props.id} className={className} style={props.style}>

			{popupIsOpen && (
				<PopupSwitch
					popupType={PopupTypes.CreatePlaylist}
				/>
			)}

			<div className={styles.header}>
				 <HeaderLayout/>
			</div>
			<div className={styles["content-container"]}>
				<div className={styles["playlists-menu"]}>
					{props.children[0]}
				</div>
				<div className={styles["playlist-content-container"]}>
					{props.children[1]}
				</div>
			</div>
		</div>
	)
}