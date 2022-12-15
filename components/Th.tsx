import { ArrowUpIcon } from "@icons";

export interface ThProps {
	label: string;
	className?: string;
	sorted?: boolean;
	asc?: boolean;
	disabled?: boolean;
	onClick?: (_label: string) => void;
	children: React.ReactNode;
}

export function Th({
	label,
	className,
	sorted = false,
	asc = false,
	disabled,
	onClick = () => null,
	children,
}: ThProps): React.ReactElement {
	return (
		<th
			className={[
				"px-2 py-3 text-sm text-slate-600 text-left font-semibold border-b border-neutral-200",
				className || "",
			].join(" ")}
			onClick={() => onClick(label)}
		>
			<div
				className={`inline-flex items-center gap-2 ${
					!disabled ? "cursor-pointer" : "cursor-default"
				}`}
			>
				{children}
				{sorted && <ArrowUpIcon className={asc ? "rotate-0" : "rotate-180"} />}
			</div>
		</th>
	);
}
