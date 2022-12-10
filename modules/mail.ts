import { GetAllMailsRes, MailsControllerService } from "@services";
import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";

interface GetMailsParams {
	page?: number | undefined;
	size?: number | undefined;
	sort?: string | undefined;
	sortBy?: string | undefined;
	from?: string | undefined;
	to?: string | undefined;
}
async function getMails(params?: GetMailsParams) {
	return MailsControllerService.mailsControllerGetAll(params);
}

export function useGetMails(
	params?: GetMailsParams,
	options?: Omit<UseQueryOptions<GetAllMailsRes, AxiosError, GetAllMailsRes>, "queryFn">,
) {
	return useQuery(["get mails", params], async () => getMails(params), options);
}
