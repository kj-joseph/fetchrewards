import Bluebird from "bluebird";

export interface IAppState {
	dataError: boolean;
	listData: IList[];
	loading: boolean;
	promises: Bluebird<any>[];
}

export interface IList {
	id: number;
	items: IListItem[];
}

export interface IItemListProps {
	list: IList;
}

export interface IListItem {
	id: number;
	listId: number;
	name: string;
}

export interface IPromise<T> extends Bluebird<T> {
	clear: () => void;
}
