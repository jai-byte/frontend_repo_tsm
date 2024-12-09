import BaseApi from "./BaseApi";

// const CommanApi = {
//   CommanApiCall: (props) => {
//     return BaseApi({
//       method: "POST",
//       data: props.data,
//       agent: props.agent,
//       action: "command",
//       tokenRequired: false,
//     });
//   },
//   ApicallWithAuth: (props) => {
//     return BaseApi({
//       method: "POST",
//       data: props.data,
//       agent: props.agent,
//       action: "command",
//       tokenRequired: true,
//     });
//   },
// };

const API = {
  CommanApiCall: (props) => {
    // console.log("rops?.function", props?.function);
    if (props?.page_no && props?.limit && props?.filter) {
      return BaseApi({
        method: "POST",
        data: props.data,
        agent: props.agent,
        action: "command",
        function: props?.function ? props?.function : null,
        tokenRequired: props?.tokenRequired ? false : true,
        flag: props?.flag ? props?.flag : null,
        page_no: props?.page_no ? props?.page_no : null,
        limit: props?.limit ? props?.limit : null,
        // createdAt: props?.createdAt ? props?.createdAt : null,
        filter: props?.filter ? props?.filter : null,
      });
    } else {
      return BaseApi({
        method: "POST",
        data: props.data,
        agent: props.agent,
        url: props.url,
        action: "command",
        function: props?.function ? props?.function : null,
        tokenRequired: props?.tokenRequired ? false : true,
        flag: props?.flag ? props?.flag : null,
      });
    }
  },
  ApiCallWithAuth: (props) => {
    return BaseApi({
      method: "POST",
      data: props.data,
      agent: props.agent,
      action: "command",
      tokenRequired: true,
    });
  },
  Auth: {
    LoginAPI: (props) => {
      return BaseApi({
        method: "POST",
        data: props.data,
        agent: props.agent,
        action: "command",
        tokenRequired: false,
      });
    },
    ForgotPass: (props) => {
      return BaseApi({
        method: "POST",
        agent: props.agent,
        action: "command",
        data: props.data,
        tokenRequired: false,
      });
    },
    VerifyOTP: (props) => {
      return BaseApi({
        method: "POST",
        agent: props.agent,
        action: "command",
        data: props.data,
        tokenRequired: false,
      });
    },
    ChangePassword: (props) => {
      return BaseApi({
        method: "POST",
        agent: props.agent,
        action: "command",
        data: props.data,
        tokenRequired: false,
      });
    },
    ResendOtp: (props) => {
      return BaseApi({
        method: "POST",
        url: `users/resend-otp`,
        data: props.data,
        tokenRequired: false,
      });
    },
    UpdateProfileAPI: (props) => {
      return BaseApi({
        method: "POST",
        url: `/users/admin-update-user`,
        data: props.data,
        tokenRequired: true,
      });
    },
  },
  Role: {
    RoleList: (props) => {
      return BaseApi({
        method: "POST",
        url: `role/list`,
        data: props?.data,
        tokenRequired: true,
      });
    },
    UserCreate: (props) => {
      return BaseApi({
        method: "POST",
        url: `users/admin-create-user`,
        data: props?.data,
        tokenRequired: true,
      });
    },
    RoleDetails: (props) => {
      return BaseApi({
        method: "POST",
        url: `role/show`,
        data: props?.data,
        tokenRequired: true,
      });
    },
    RoleUpdate: (props) => {
      return BaseApi({
        method: "POST",
        url: `role/update`,
        data: props?.data,
        tokenRequired: true,
      });
    },
    ROlePrivilage: (props) => {
      return BaseApi({
        method: "GET",
        url: `role/new-role`,
        data: props?.data,
        tokenRequired: true,
      });
    },
    RoleCreate: (props) => {
      return BaseApi({
        method: "POST",
        url: `role/create`,
        data: props?.data,
        tokenRequired: true,
      });
    },
  },

  Consumer: {
    ConsumerList: (props) => {
      return BaseApi({
        method: "POST",
        url: `users/consumer-list-user`,
        data: props?.data,
        tokenRequired: true,
      });
    },
    ConsumerDetails: (props) => {
      return BaseApi({
        method: "POST",
        url: `users/consumer-user-detail`,
        data: { id: props.id },
        tokenRequired: true,
      });
    },
    ConsumerDetailsUpdate: (props) => {
      return BaseApi({
        method: "POST",
        url: `users/consumer-update-user`,
        data: props.data,
        tokenRequired: true,
      });
    },
  },

  MyTeam: {
    UserList: (props) => {
      return BaseApi({
        method: "POST",
        url: `users/admin-list-user`,
        data: props?.data,
        tokenRequired: true,
      });
    },
    UserDetails: (props) => {
      return BaseApi({
        method: "POST",
        url: `users/admin-user-detail`,
        data: props?.data,
        tokenRequired: true,
      });
    },
    UserDetailsUpdate: (props) => {
      return BaseApi({
        method: "POST",
        url: `users/admin-update-user`,
        data: props.data,
        tokenRequired: true,
      });
    },
  },

  NavbarMenu: {
    MenuList: (props) => {
      return BaseApi({
        method: "GET",
        url: `menu/menulistadmin`,
        data: props.data,
        tokenRequired: true,
      });
    },
  },
  Book: {
    CategoryList: (props) => {
      return BaseApi({
        method: "GET",
        url: `category/list`,
        data: props?.data,
        tokenRequired: true,
      });
    },
    TempalteList: (props) => {
      return BaseApi({
        method: "GET",
        url: `contentTemplate/list?searchkey=&page=1&limit=10`,
        data: props?.data,
        tokenRequired: true,
      });
    },
    // Create book API
    CreateBook: (props) => {
      return BaseApi({
        method: "POST",
        url: `book/create`,
        data: props?.data,
        tokenRequired: true,
      });
    },
    CreateContent: (props) => {
      return BaseApi({
        method: "POST",
        url: `/content/createorupdate`,
        data: props?.data,
        tokenRequired: true,
      });
    },
    BookDetails: (props) => {
      return BaseApi({
        method: "POST",
        url: `book/show`,
        data: props?.data,
        tokenRequired: true,
      });
    },
  },

  Setting: {
    CreateCategory: (props) => {
      return BaseApi({
        method: "POST",
        url: `category/create`,
        data: props?.data,
        tokenRequired: true,
      });
    },
    UpdateCategory: (props) => {
      return BaseApi({
        method: "POST",
        url: `category/update`,
        data: props?.data,
        tokenRequired: true,
      });
    },
    ShowSingleCategory: (props) => {
      return BaseApi({
        method: "POST",
        url: `category/show`,
        data: props?.data,
        tokenRequired: true,
      });
    },
    ShowCategoryList: (props) => {
      return BaseApi({
        method: "GET",
        url: `category/list`,
        data: props?.data,
        tokenRequired: true,
      });
    },
  },
  Draft: {
    DraftList: (props) => {
      return BaseApi({
        method: "POST",
        url: `book/list`,
        data: props?.data,
        tokenRequired: true,
      });
    },
  },
};

export default API;
