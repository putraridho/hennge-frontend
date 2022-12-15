import { SVGProps } from "react";

export function MagnifyIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 17.9803 18"
			width={17.9803}
			height={18}
			{...props}
		>
			<path
				d="M17.81684,17.04048,12.86753,12.064a7.33089,7.33089,0,1,0-.79573.79645L17.018,17.83373a.5629.5629,0,1,0,.79885-.79325ZM7.32474,13.47375a6.16023,6.16023,0,0,1-6.16583-6.1546V7.31352a6.16022,6.16022,0,1,1,6.16583,6.16023Z"
				fill="currentColor"
			/>
		</svg>
	);
}
