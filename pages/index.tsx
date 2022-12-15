import { DesktopMails, Mail } from "@components";
import { MagnifyIcon } from "@icons";
import { useGetMails } from "@modules";

import dayjs from "dayjs";
import { useMemo, useRef, useState } from "react";

export default function Home() {
	const [dateFilter, setDateFilter] = useState("");
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(10);
	const inputRef = useRef<HTMLInputElement>(null);
	const [mailData, setMailData] = useState<Mail[]>([]);
	const [isAsc, setIsAsc] = useState(false);
	const [sortBy, setSortBy] = useState("createdAt");

	const dateParams = useMemo(() => {
		const pattern =
			/\d{4}\/((0+\d)|1+[1-2])\/(([0-2]+\d)|(3+[0-1])) - \d{4}\/((0+\d)|1+[1-2])\/(([0-2]+\d)|(3+[0-1]))/g;

		if (pattern.test(dateFilter)) {
			const dates = dateFilter.split(" - ");

			const from = dayjs(dates[0]).format("YYYY-MM-DDT00:00:00.000Z");
			const to = dayjs(dates[1]).format("YYYY-MM-DDT23:59:59.999Z");

			return { from, to };
		}

		return {};
	}, [dateFilter]);

	const { data, isLoading } = useGetMails(
		{
			page,
			size: pageSize,
			sort: isAsc ? "asc" : "desc",
			sortBy,
			...dateParams,
		},
		{
			onSuccess(_data) {
				setMailData(
					_data.data.map((datum) => ({
						id: datum.id,
						from: datum.from.user.email,
						to: datum.to[0].email,
						more: datum.to.length - 1,
						subject: datum.subject,
						date: dayjs(datum.createdAt).format("YYYY/MM/DD"),
					})),
				);
			},
		},
	);

	return (
		<div className="container mx-auto py-8">
			<div className="flex justify-between mb-6">
				<div className="flex">
					<input
						ref={inputRef}
						className="h-10 w-80 px-4 border border-neutral-200 rounded-l-xl focus:outline-neutral-300"
						placeholder="YYYY/MM/DD - YYYY/MM/DD"
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								setDateFilter(inputRef.current?.value || "");
							}
						}}
					/>
					<button
						type="button"
						className="px-3 bg-slate-50 border-l-0 border border-neutral-200 rounded-r-xl"
						onClick={() => {
							setDateFilter(inputRef.current?.value || "");
						}}
					>
						<MagnifyIcon />
					</button>
				</div>
				<div className="flex items-center gap-4">
					<label htmlFor="page-size" className="text-sm">
						Mails per-page
					</label>
					<select
						id="page-size"
						className="pl-2 pr-4 h-10 border border-neutral-200 focus:outline-neutral-300 rounded-xl"
						value={pageSize}
						onChange={(e) => {
							setPageSize(+e.target.value);
							setPage(0);
						}}
					>
						<option key={2}>2</option>
						<option key={5}>5</option>
						<option key={10}>10</option>
					</select>
				</div>
			</div>

			<p className="text-neutral-600 pb-2 text-sm font-bold border-b border-neutral-200">
				Results: <span className="text-xl">{data?.total || 0}</span>mail(s)
			</p>

			<div className="relative">
				<DesktopMails
					data={mailData}
					sort={{ by: sortBy, asc: isAsc }}
					onSortClick={(label) => {
						if (label !== sortBy) {
							setSortBy(label);
							setIsAsc(false);
						} else {
							setIsAsc((curr) => !curr);
						}
					}}
				/>
				{isLoading && (
					<div className="absolute flex top-0 left-0 w-full h-full items-center justify-center bg-white/70">
						<div className="h-10 w-10 rounded-full border-4 border-t-slate-900 border-slate-400 animate-spin" />
					</div>
				)}
			</div>

			<div className="flex justify-center gap-4 mt-8">
				<button
					type="button"
					className="h-10 px-4 bg-neutral-50 border border-neutral-300 rounded disabled:opacity-50"
					disabled={page < 1}
					onClick={() => setPage((curr) => curr - 1)}
				>
					Prev
				</button>
				<button
					type="button"
					className="h-10 px-4 bg-neutral-50 border border-neutral-300 rounded disabled:opacity-50"
					disabled={page >= Math.floor((data?.total || 0) / pageSize) - 1}
					onClick={() => setPage((curr) => curr + 1)}
				>
					Next
				</button>
			</div>
		</div>
	);
}
