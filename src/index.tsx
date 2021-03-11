import Bluebird from "bluebird";
import React from "react";
import { render } from "react-dom";

import { IAppState, IList, IPromise } from "interfaces";

import ItemList from "components/itemList";

// load site css
import "styles/main.scss";

// load static files
import "static/.htaccess";
import "static/robots.txt";

import { getFilteredListData } from "services/listService";

class AppIndex<Props> extends React.Component<Props, IAppState> {

	state: IAppState = {
		dataError: false,
		listData: null,
		loading: true,
		promises: [],
	};

	constructor(props: Props) {
		super(props);
	}

	componentDidMount(): void {

		this.getData();


	}

	componentWillUnmount() {

		if (this.state.promises.length) {

			this.state.promises.forEach((listener) => {
				listener.cancel();
			});

			this.setState({
				promises: [],
			});

		}

	}

	addPromise = (promise: Bluebird<any>): IPromise<any> => {

		const storedPromise: IPromise<any> = Object.assign(promise, {
			clear: () => {
				if (storedPromise.isPending()) {
					storedPromise.cancel();
				}
				this.state.promises.splice(this.state.promises.indexOf(storedPromise), 1);
			},
		});

		this.state.promises.push(storedPromise);

		return storedPromise;

	};

	getData = (): void => {

		const loadListData = this.addPromise(getFilteredListData());

		loadListData
			.then((listData: IList[]) => {
				this.setState({
					listData,
					loading: false,
				});
			})
			.catch((error) => {
				console.error(error);
				this.setState({
					dataError: true,
					loading: false,
				});
			})
			.finally(loadListData.clear);

	};

	render(): JSX.Element {

		return (

			<>

				{this.state.loading ?

					<p className="loading">Data loading...</p>

					: this.state.dataError ?

						<p className="error">Sorry, there was an error loading the data.  Please refresh the page to try again.</p>

						:

						<>

							<h1>Lists!</h1>

							<div className="lists">

								{this.state.listData.map(list =>

									<ItemList list={list} key={list.id} />

								)}

							</div>

						</>

				}


			</>

		);
	}

}


render(
	<AppIndex />,
	document.getElementById("root"));
