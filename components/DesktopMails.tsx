import { Empty } from "./Empty";

import { Td } from "./Td";
import { Th } from "./Th";

export interface Mail {
	id: string;
	from: string;
	to: string;
	more: number;
	subject: string;
	date: string;
}

interface Sort {
	by: string;
	asc: boolean;
}

export interface DesktopMailsProps {
	data: Mail[];
	sort: Sort;
	onSortClick?: (_label: string) => void;
}

export function DesktopMails({
	data,
	sort,
	onSortClick = () => null,
}: DesktopMailsProps): React.ReactElement {
	if (data.length === 0) {
		return <Empty />;
	}

	return (
		<table className="w-full">
			<thead>
				<tr className="bg-neutral-100">
					<Th
						label="from"
						className="w-1/6"
						sorted={sort.by === "from"}
						asc={sort.asc}
						onClick={onSortClick}
					>
						From
					</Th>
					<Th label="to" className="w-1/6" disabled>
						To
					</Th>
					<Th
						label="subject"
						className="w-1/2"
						sorted={sort.by === "subject"}
						asc={sort.asc}
						onClick={onSortClick}
					>
						Subject
					</Th>
					<Th
						label="createdAt"
						className="w-1/12"
						sorted={sort.by === "createdAt"}
						asc={sort.asc}
						onClick={onSortClick}
					>
						Date
					</Th>
				</tr>
			</thead>
			<tbody>
				{data.map(({ id, from, to, more, subject, date }) => (
					<tr key={id}>
						<Td>{from}</Td>
						<Td>
							<div className="flex items-center justify-between gap-4">
								<span>{`${to}${more && more > 0 ? ", ..." : ""}`}</span>
								{more && more > 0 ? (
									<span className="rounded bg-neutral-400 text-xs text-white font-semibold leading-5 px-1.5">
										+{more}
									</span>
								) : null}
							</div>
						</Td>
						<Td>{subject}</Td>
						<Td>{date}</Td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
