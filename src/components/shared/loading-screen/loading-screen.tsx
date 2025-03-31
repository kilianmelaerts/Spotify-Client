import styles from "./loading-screen.module.scss";

// Basic spinner
export function LoadingScreen(){
	return (
		<div className={styles["loading-screen-container"]}>
			<div className={styles.spinner}></div>
		</div>
	)
}