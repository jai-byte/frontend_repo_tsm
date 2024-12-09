import { notification } from "antd";

const RouteName = {
  Auth: {
    Login: "/",
    VerifyOtp: "verify-otp",
    NewPassword: "new-password",
    NewPasswordForUser: "new-password-user/:mailId",
    ForgotPassword: "forgot-password",
    PasswordReset: "password-reset",
    LoginSuccessful: "login-successful",
  },
  Dashboard: {
    DashboardPage: "dashboard",
  },
  MyProfile: {
    MyProfile: "my-profile/:id",
    MyProfileEdit: "my-profile-edit",
  },
  ContentCreation: {
    CreateLeave: "create-leave",
    CreditLeaveCreation: "leave-credit-create",
    CreateNewContentCreation: "create-new-content-creation",
    CreateContent: "create-new-content-creation/create-content/:id",
    CreateShort: "create-short",
    ShortSummary: "short-summary",
    ContentSummary: "content-summary",
    Draft: "draft",
    Submitted: "submitted",
    Pending: "submitted/pending/:id",
    Published: "submitted/published/:id",
    Rejected: "submitted/rejected/:id",
    ReSubmitted: "submitted/re-submitted/:id",

    Moderator: {
      Moderator: "moderator",
      ModeratorPending: "moderator/moderator-pending/:id",
      ModeratorRejected: "moderator/moderator-rejected/:id",
      ModeratorApproved: "moderator/moderator-approved/:id",
    },
  },
  leave: {
    notification: "notification",
  },
  Report: {
    attendanceReport: "attendance-report",
  },
  TimeSheet: {
    taskPlanner: "task-planner",
    taskLogs: "task-logs",
  },
  UserManagement: {
    Consumers: {
      Consumers: "consumers",
      ConsumerProfile: "consumers/consumer-profile/:id",
    },
    Roles: {
      Roles: "roles",
      CreateRole: "roles/create-role",
      RoleDetails: "roles/role-details/:status/:id",
      EditRole: "edit-role",
    },
    MyTeam: {
      MyTeam: "my-team",
      CreateUser: "my-team/create-user",
      UserProfile: "my-team/user-profile/:status/:id",
      UserProfileEdit: "user-profile-edit",
    },
  },
  SubscriptionPlans: {
    leaveApply: "leave-apply",
    SubscriptionPlans: "subscription-plans",
    CreateSubscriptionPlans: "subscription-plans/create-subscription-plans",
  },
  // AllTransactions: {
  //   AllTransactions: "all-transactions",
  // },

  Events: {
    Events: "events",
    CreateEvents: "events/create-events/:eventType",
    OnlineEvents: "online-events",
    OfflineEvents: "offline-events",
    LiveEventDetails:
      "events/event-details/:eventType/:eventScheduled/:status/:id",
    EditEventDetails: "edit-event-details",
    PastEventDetails:
      "events/past-event-details/:eventType/:eventScheduled/:status/:id",
    EditPastEventDetails: "edit-past-event-details",
    PastOnlineEventDetails:
      "events/past-online-event-details/:eventType/:eventScheduled/:status/:id",
    ScheduledEventFeedbacks:
      "events/scheduled-event-feedbacks/:eventType/:eventScheduled/:status/:id",
    ScheduledEventFeedbacksDetail:
      "events/scheduled-event-feedbacks-detail/:eventType/:eventScheduled/:status/:id/:feedBack_id",
    ScheduledEventDetails: "events/scheduled-event-details",
    TicketSoldEventDetails:
      "events/ticket-sold-event-details/:eventType/:eventScheduled/:status/:id",
    CreateFAQ: "events/create-FAQ/:id",
    PreviewFAQ: "preview-FAQ",
  },

  Community: {
    Community: {
      Community: "community",
      CommunityDetail: "community/community-detail/:type/:id",
      CommunityViewDetails:
        "community/activity-details-all/:type/:activityType/:id",
      CommunityPreviewDetails:
        "community/preview/:type/:activityType/:commu_id/:id",

      EditCommunity: "edit-community",
      CommunityMembers: "community/community-members/:type/:id",
    },
    // Route changes pending from here

    ActivityManagement: {
      ActivityManagement: "activity-management",
      ActivityDetails: "activity-management/activity-details/:id",
      ActivityDetailsAll: "activity-management/activity-details-all/:type/:id",
      CreateNew: "activity-management/create-new",
      CreateActivity: "activity-management/create-new-activity/:type/:id",
      CreateChallenge: "activity-management/create-challenge",
      CreateQuest: "activity-management/create-quest",
      CreatePoll: "activity-management/create-poll",
      Preview: "activity-management/preview/:type/:commu_id/:id",
    },
  },
  Feed: {
    Feed: "create-holiday",
    ConsumerActivityProfile: "feed/consumer-activity-profile/:id",
  },

  PageNotFound: "",
};

export default RouteName;
