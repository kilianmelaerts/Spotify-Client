import styles from "./app-button.module.scss";

export enum AppButtonVariation{
	Transparant = "Transparant",
	Default = "Default"
}

type AppButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variation: AppButtonVariation,
};

export function AppButton(props: AppButtonProps){
	const { className, ...remainingProps } = props;

	const classNames = [styles.root];

	if(typeof className !== "undefined"){
		classNames.push(className);
	}

	switch(props.variation){
		case AppButtonVariation.Transparant:
			classNames.push(styles.Transparant);
			break;
		default:
			classNames.push(styles.green);
			break;
	}

	const cn = classNames.join(" ");
	
	return (
		<button {...remainingProps} className={cn}/>
	);
}