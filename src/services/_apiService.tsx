import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Bluebird from "bluebird";

Bluebird.config({
	cancellation: true,
	warnings: false,
});

export const callApi = (
	method: "delete" | "get" | "patch" | "post" | "put",
	url: string,
	params: {
		[key: string]: any,
	} = {},
)
: Bluebird<AxiosResponse> =>

	new Bluebird((resolve, reject, onCancel) => {

		const axiosSignal = axios.CancelToken.source();

		const callParams: {[key: string]: any} = {};

		if (Object.keys(params).length) {

			// remove empty parameters
			Object.keys(params)
				.forEach((key) => {
					if (params[key] !== undefined) {
						callParams[key] = params[key];
					}
				});

		}

		const axiosRequest: AxiosRequestConfig = {
			cancelToken: axiosSignal.token,
			method,
			url: url,
		};

		if (method === "get") {

			axiosRequest.params = callParams;

		} else {

			axiosRequest.data = callParams;

		}

		axios(axiosRequest)
			.then((response) => {

				resolve(response);

			})
			.catch((error) => {

				if (axios.isCancel(error)) {

					reject();

				} else {

					reject(error);

				}

			});

		onCancel(() => {
			axiosSignal.cancel();
		});

	});
