import React from "react";

import { IItemListProps } from "interfaces";

export default class ItemList extends React.Component<IItemListProps> {

	constructor(props: IItemListProps) {
		super(props);
	}

	render(): JSX.Element {

		return (

			<div className="list">

				<h2>List {this.props.list.id}</h2>

				<ul>

					{this.props.list.items.map((item, index) =>

						<li key={index}>{item.name}</li>

					)}

				</ul>

			</div>

		);

	}

}
