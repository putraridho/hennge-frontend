import { UserModel, UsersControllerService } from "@services";
import { AxiosError } from "axios";
import { QueryOptions, useQuery } from "react-query";

async function getUsers() {
	return UsersControllerService.usersControllerGetAllUsers();
}

interface GetUserParams {
	id: string;
}

async function getUser(params?: GetUserParams) {
	return UsersControllerService.usersControllerGetUser(params);
}

export function useGetUsers(options?: QueryOptions<UserModel[], AxiosError, UserModel[]>) {
	return useQuery("get users", getUsers, options);
}

export function useGetUser(
	params?: GetUserParams,
	options?: Omit<QueryOptions<UserModel, AxiosError, UserModel>, "queryFn">,
) {
	return useQuery(["get user", params], async () => getUser(params), options);
}
