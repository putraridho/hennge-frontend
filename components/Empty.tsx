import Image from "next/image";

export function Empty(): React.ReactElement {
	return (
		<div className="flex items-center justify-center h-[25rem]">
			<Image
				src="/images/logo.png"
				alt="mail archiver"
				className="mx-auto"
				width={117}
				height={124}
				priority
			/>
		</div>
	);
}
