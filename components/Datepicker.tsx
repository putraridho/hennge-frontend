/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import { MONTH_NAMES, WEEKDAY_NAMES } from "@utils";
import { useDayzed } from "dayzed";
import { useState } from "react";

export function Datepicker(): React.ReactElement {
	const [selectedDates, setSelectedDates] = useState<Date | undefined>();
	const { calendars, getBackProps, getDateProps, getForwardProps } = useDayzed({
		onDateSelected: (val) => {
			setSelectedDates(new Date(val.date));
		},
		showOutsideDays: true,
		maxDate: new Date(),
		selected: selectedDates,
	});

	return (
		<>
			{calendars.map((calendar) => (
				<div key={`${calendar.month}-${calendar.year}`} className="inline-block">
					<div className="flex gap-4">
						<button type="button" {...getBackProps({ calendars })}>
							prev
						</button>
						<p>
							{MONTH_NAMES[calendar.month]} {calendar.year}
						</p>
						<button type="button" {...getForwardProps({ calendars })}>
							next
						</button>
					</div>
					<div className="grid grid-cols-7 gap-2">
						{WEEKDAY_NAMES.map((weekday) => (
							<div key={weekday}>{weekday}</div>
						))}
						{calendar.weeks.map((week, idx) =>
							week.map((day, idx_) =>
								day === "" ? (
									<div key={`${calendar.month}-${calendar.year}-${idx}-${idx_}`} />
								) : (
									<button
										type="button"
										key={`${calendar.month}-${calendar.year}-${idx}-${idx_}`}
										{...getDateProps({ dateObj: day })}
										className={`${
											day.selected
												? `text-red-500`
												: day.selectable
												? "text-black"
												: "text-neutral-200"
										} ${day.prevMonth || day.nextMonth ? "opacity-40" : "opacity-100"}`}
									>
										{day.date.getDate()}
									</button>
								),
							),
						)}
					</div>
				</div>
			))}
		</>
	);
}
