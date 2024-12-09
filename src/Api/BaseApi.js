import axios from "axios";
import baseApi from "./config";

const BaseApi = (props) => {
  // Admin Object
  const adminObject = JSON.parse(localStorage.getItem("TajurbaAdminToken"));
  // Request Configuration  ///
  const configuration = {
    method: props.method,
    baseURL: baseApi.baseurl,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    tokenRequired: props.tokenRequired,
  };
  // Request Data
  if (props.method === "POST") {
    // configuration.data = props.data;
    configuration.data = {
      action: props?.action,
      flag: props.flag,
      page_no: props?.page_no,
      limit: props?.limit,
      createdAt: props?.createdAt,
      filter: props?.filter,
      command: [
        {
          agent: props.agent,
          function: props.function,
        },
      ],
      baseURL: props?.url,
      ...props.data,
    };
  }

  // Request Params
  if (props.method === "GET") {
    configuration.params = props.params;
  }

  // Request Header Authorization
  if (props.tokenRequired) {
    if (adminObject) {
      configuration.headers.Authorization =
        adminObject && `bearer ${adminObject}`;
    } else {
      configuration.headers.Authorization =
        props.token && `bearer ${props.token}`;
    }
  }

  // Return Request
  return axios(configuration);
};

export default BaseApi;
