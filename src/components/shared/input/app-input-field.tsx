import { ReactElement, useMemo, useState } from 'react';
import styles from './app-input-field.module.scss';

type AppInputFieldProps = React.InputHTMLAttributes<HTMLInputElement>;

/**
 * 
 * @param props React.InputHTMLAttributes<HTMLInputElement>
 * @returns styled input field
 */
export function AppInputField(props: AppInputFieldProps){
	const {
		className,
		...remainingProps
	} = props;

	const inputClassNames: string[] = [styles.input];

	if(typeof className === "string")
		inputClassNames.push(className);

	const joinedClassName = inputClassNames.join(" ");

	return (
		<div className={styles.root}>
			<input className={joinedClassName} {...remainingProps}/>					
		</div>	
	)
}

type AppInputFieldWithSelectAndResultsProps = AppInputFieldProps & {
	/** Children will be added inside the select results */
	children: ReactElement[] | ReactElement;
}

/**
 * 
 * @param props AppInputFieldWithSelectProps
 * @returns styled input field with items in a select dropdown
 */
export function AppInputFieldWithSelectAndResults(props: AppInputFieldWithSelectAndResultsProps){
	const {children, ...remainingProps} = props;
	const [hasFocus, setHasFocus] = useState(false);

	const itemContainerCn = useMemo(() => {
		let cn = [styles["select-items-container"]];

		if(!hasFocus){
			cn = [styles.hide, ...cn];
		}

		const result = cn.join(" ");

		return result;
	}, [hasFocus]);

	return(
		<div 
			className={styles["input-with-select-container"]} 
			onFocus={() => setHasFocus(true)}
			onBlur={() => setHasFocus(false)}
		>
			<AppInputField {...remainingProps}/>
			<div className={itemContainerCn}>
				<div 
					className={styles["select-items-scoll-container"]}
					onMouseDown={(e) => e.preventDefault()}
				>
					{props.children}
				</div>
			</div>
		</div>
	)
	
}