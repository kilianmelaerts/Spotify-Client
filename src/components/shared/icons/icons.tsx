import styles from "./icons.module.scss";

type PlusIconProps = {
	className?: string,
}
export function PlusIcon(props: PlusIconProps){

	const className = [styles["plus-icon"]];

	if(typeof props.className !== "undefined"){
		className.push(props.className);
	}

	const cn = className.join(" ");

	return (
		<svg 
			xmlns="http://www.w3.org/2000/svg" 
			viewBox="0 0 24 24"
			className={cn}
		>
			<path d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z">
			</path>
		</svg>
	);
}

type BinIconProps = {
	className?: string,
}
export function BinIcon(props: BinIconProps){
	const className = [styles["bin-icon"]];

	if(typeof props.className !== "undefined"){
		className.push(props.className);
	}

	const cn = className.join(" ");
	return (
		<svg 
			xmlns="http://www.w3.org/2000/svg" 
			viewBox="0 0 24 24"
			className={cn}
		>
			<path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z">
			</path>
		</svg>
	)
}