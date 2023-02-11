import React from "react";

const errorHandler = (err:any) => {
	console.log(err)
	if (err.message === "Network Error") {
		return ["Network error", { toastId: err.config.url }];
	} else {
		return [err.response.data.message.split(".")[0], {
			toastId: err.response.data.error,
		}];
	}
};

export default errorHandler;