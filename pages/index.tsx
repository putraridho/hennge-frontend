import { useGetMails } from "@modules";

export default function Home() {
	const { data } = useGetMails({});
	console.log(data);
	return null;
}
