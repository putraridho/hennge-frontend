export interface TdProps {
	className?: string;
	children: React.ReactNode;
}

export function Td({ className, children }: TdProps): React.ReactElement {
	return (
		<td
			className={[
				"px-2 py-3 border-b border-neutral-200 text-ellipsis whitespace-nowrap",
				className || "",
			].join(" ")}
		>
			{children}
		</td>
	);
}
