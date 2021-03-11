import Bluebird from "bluebird";
import { callApi } from "services/_apiService";
import { IList, IListItem } from "interfaces";

export const getFilteredListData = (): Bluebird<IList[]> =>

	new Bluebird((resolve, reject, onCancel) => {

		const apiCall = callApi(
			"get",
			"data/listdata.json",
			// "https://fetch-hiring.s3.amazonaws.com/hiring.json",
		);

		onCancel(() => {
			apiCall.cancel();
		});

		apiCall
			.then((response) => {
				const listData: IList[] = [];
				const rawList: IListItem[] = response.data;

				for (const listId of rawList.map(x => x.listId)
					.filter((value, index, self) => self.indexOf(value) === index)
					.sort((a, b) => a > b ? 1 : a < b ? -1 : 0)
				) {
					listData.push({
						id: listId,
						items: rawList
							.filter(item => item.name && item.listId === listId)
							.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
					});
				}

				resolve(listData);

			})
			.catch((error) =>

				reject(error)

			);

		onCancel(() => {
			apiCall.cancel();
		});

	});
