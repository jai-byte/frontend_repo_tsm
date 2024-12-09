import React from "react";
import RouteName from "./RouteDetails";
import Login from "./../Components/Auth/Login";
import ForgotPassword from "../Components/Auth/ForgotPassword";
import NewPassword from "../Components/Auth/NewPassword";
import VerifyOTP from "./../Components/Auth/VerifyOTP";
import Dashboard from "../Components/Pages/Dashboard/Dashboard";

import MyProfile from "../Components/Pages/MyProfile/MyProfile";
import MyProfileEdit from "../Components/Pages/MyProfile/MyProfileEdit";

import PasswordReset from "./../Components/Auth/PasswordReset";
import LoginSuccessful from "./../Components/Auth/LoginSuccessful";

import CreateNewContentCreation from "../Components/Pages/ContentCreation/CreateNewContentCreation";
// import CreateNew from "../Components/Pages/ContentCreation/CreateNew";
import CreateContent from "../Components/Pages/ContentCreation/CreateContent";
// import CreateShort from "../Components/Pages/ContentCreation/CreateShort";
import ShortSummary from "../Components/Pages/ContentCreation/ShortSummary";

import ContentSummary from "../Components/Pages/ContentCreation/ContentSummary";
import Draft from "../Components/Pages/ContentCreation/Draft";
import Submitted from "../Components/Pages/ContentCreation/Submitted";
import Pending from "../Components/Pages/ContentCreation/Pending";
import Published from "../Components/Pages/ContentCreation/Published";

import Rejected from "../Components/Pages/ContentCreation/Rejected";
import ReSubmitted from "../Components/Pages/ContentCreation/ReSubmitted";
import Moderator from "../Components/Pages/ContentCreation/Moderator/Moderator";
import ModeratorPending from "../Components/Pages/ContentCreation/Moderator/ModeratorPending";

import ModeratorRejected from "../Components/Pages/ContentCreation/Moderator/ModeratorRejected";
import ModeratorApproved from "../Components/Pages/ContentCreation/Moderator/ModeratorApproved";

import Consumers from "../Components/Pages/UserManagement/Consumers/Consumers";
import ConsumerProfile from "../Components/Pages/UserManagement/Consumers/ConsumerProfile";
import Roles from "../Components/Pages/UserManagement/Roles/Roles";
import CreateRole from "../Components/Pages/UserManagement/Roles/CreateRole";
import RoleDetails from "../Components/Pages/UserManagement/Roles/RoleDetails";
import EditRole from "../Components/Pages/UserManagement/Roles/EditRole";
import MyTeam from "../Components/Pages/UserManagement/MyTeam/MyTeam";
import CreateUser from "../Components/Pages/UserManagement/MyTeam/CreateUser";
import UserProfile from "../Components/Pages/UserManagement/MyTeam/UserProfile";
import UserProfileEdit from "../Components/Pages/UserManagement/MyTeam/UserProfileEdit";
import SubscriptionPlans from "../Components/Pages/SubscriptionPlans/SubscriptionPlans";
import AllTransactions from "../Components/Pages/AllTransactions/AllTransactions";
import CreateSubscriptionPlans from "../Components/Pages/SubscriptionPlans/CreateSubscriptionPlans";
// import ProtectedRoute from "./ProtectedRoute";
import Events from "../Components/Pages/Events/Events";
import CreateEvents from "../Components/Pages/Events/CreateEvents";
import OnlineEvents from "../Components/Pages/Events/OnlineEvents";
import OfflineEvents from "../Components/Pages/Events/OfflineEvents";
import LiveEventDetails from "../Components/Pages/Events/LiveEventDetails";
import EditEventDetails from "../Components/Pages/Events/EditEventDetails";
import PastEventDetails from "../Components/Pages/Events/PastEventDetails";
import EditPastEventDetails from "../Components/Pages/Events/EditPastEventDetails";
import PastOnlineEventDetails from "../Components/Pages/Events/PastOnlineEventDetails";
import ScheduledEventFeedbacks from "../Components/Pages/Events/ScheduledEventFeedbacks";
import ScheduledEventFeedbacksDetail from "../Components/Pages/Events/ScheduledEventFeedbacksDetail";
import ScheduledEventDetails from "../Components/Pages/Events/ScheduledEventDetails";
import TicketSoldEventDetails from "../Components/Pages/Events/TicketSoldEventDetails";
import CreateFAQ from "../Components/Pages/Events/CreateFAQ";
import PreviewFAQ from "../Components/Pages/Events/PreviewFAQ";

import Community from "../Components/Pages/Community/Community/Community";
import CommunityDetail from "../Components/Pages/Community/Community/CommunityDetail";
import EditCommunity from "../Components/Pages/Community/Community/EditCommunity";
import CommunityMembers from "../Components/Pages/Community/Community/CommunityMembers";
import ActivityManagement from "../Components/Pages/Community/ActivityManagement/ActivityManagement";
import ActivityDetails from "../Components/Pages/Community/ActivityManagement/ActivityDetails";
import ActivityDetailsAll from "../Components/Pages/Community/ActivityManagement/ActivityDetailsAll";
import CreateNew from "../Components/Pages/Community/ActivityManagement/CreateNew";
import CreateChallenge from "../Components/Pages/Community/ActivityManagement/CreateChallenge";
import CreateQuest from "../Components/Pages/Community/ActivityManagement/CreateQuest";
import CreatePoll from "../Components/Pages/Community/ActivityManagement/CreatePoll";
import Preview from "../Components/Pages/Community/ActivityManagement/Preview";
import CreateNewActivity from "../Components/Pages/Community/ActivityManagement/CreateNewActivity";
import NewPasswordForUser from "../Components/Auth/NewPasswordForUser";
import Feed from "../Components/Pages/Feed/Feed";
import ConsumerActivityProfile from "../Components/Pages/Feed/ConsumerActivityProfile";
import CommunityViewDetails from "../Components/Pages/Community/Community/CommunityViewDetails";
import CommunityPreviewDetails from "../Components/Pages/Community/Community/CommunityPreviewDetails";
import { element, exact } from "prop-types";
import LeaveNotify from "../Components/Pages/leaveNotification/LeaveNotify";
import AttendanceReport from "../Components/Pages/Report/AttendanceReport";
import TaskPlanner from "../Components/Pages/TaskMangement/TaskPlanner";
import TaskLogs from "../Components/Pages/TaskMangement/TaskLogs";

const AdminRoute = [
  {
    path: RouteName.Auth.Login,
    element: <Login />,
    protected: false,

    exact: true,
  },

  {
    path: RouteName.Auth.ForgotPassword,
    element: <ForgotPassword />,
    protected: false,

    exact: true,
  },
  {
    path: RouteName.Auth.NewPassword,
    element: <NewPassword />,
    protected: false,

    exact: true,
  },
  {
    path: RouteName.Auth.NewPasswordForUser,
    element: <NewPasswordForUser />,
    protected: false,

    exact: true,
  },
  {
    path: RouteName.Auth.VerifyOtp,
    element: <VerifyOTP />,
    protected: false,
    exact: true,
  },
  {
    path: RouteName.Dashboard.DashboardPage,
    element: <Dashboard />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
  },

  //   element: (
  //     <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
  //       {/* <Dashboard /> */}
  //       <MainLayout>
  //         <Dashboard />
  //       </MainLayout>
  //     </ProtectedRoute>
  //   ),
  //   exact: true,
  // },
  {
    path: RouteName.Auth.PasswordReset,
    element: <PasswordReset />,
    protected: false,

    exact: true,
  },
  {
    path: RouteName.Auth.LoginSuccessful,
    element: <LoginSuccessful />,
    protected: false,

    exact: true,
  },
  {
    path: RouteName.MyProfile.MyProfile,
    element: <MyProfile />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <MyProfile />
    //   </ProtectedRoute>
    // ),
  },
  {
    path: RouteName.MyProfile.MyProfileEdit,
    element: <MyProfileEdit />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <MyProfileEdit />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.ContentCreation.CreateLeave,
    element: <CreateNewContentCreation />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   // <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>

    //   //   {/* <CreateNewContentCreation /> */}
    //   // </ProtectedRoute>
    // ),
  },
  {
    path: RouteName.ContentCreation.CreateContent,
    element: <CreateContent />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <CreateContent />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },

  {
    path: RouteName.ContentCreation.ShortSummary,
    element: <ShortSummary />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <ShortSummary />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.leave.notification,
    element: <LeaveNotify />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
  },

  {
    path: RouteName.ContentCreation.ContentSummary,
    element: <ContentSummary />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <ContentSummary />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.ContentCreation.Draft,
    element: <Draft />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <Draft />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.ContentCreation.Submitted,
    element: <Submitted />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,

    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <Submitted />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.ContentCreation.Pending,
    element: <Pending />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <Pending />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.ContentCreation.Published,
    element: <Published />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <Published />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },

  {
    path: RouteName.ContentCreation.Rejected,
    element: <Rejected />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <Rejected />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.ContentCreation.ReSubmitted,
    element: <ReSubmitted />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <ReSubmitted />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },

  {
    path: RouteName.ContentCreation.CreditLeaveCreation,
    element: <Moderator />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <Moderator />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.ContentCreation.Moderator.ModeratorPending,
    element: <ModeratorPending />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <ModeratorPending />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.ContentCreation.Moderator.ModeratorRejected,
    element: <ModeratorRejected />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <ModeratorRejected />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.ContentCreation.Moderator.ModeratorApproved,
    element: <ModeratorApproved />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <ModeratorApproved />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },

  {
    path: RouteName.UserManagement.Consumers.Consumers,
    element: <Consumers />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <Consumers />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.UserManagement.Consumers.ConsumerProfile,
    element: <ConsumerProfile />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <ConsumerProfile />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.UserManagement.Roles.Roles,
    element: <Roles />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <Roles />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.UserManagement.Roles.CreateRole,
    element: <CreateRole />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <CreateRole />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.UserManagement.Roles.RoleDetails,
    element: <RoleDetails />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <RoleDetails />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.UserManagement.Roles.EditRole,
    element: <EditRole />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <EditRole />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.UserManagement.MyTeam.MyTeam,
    element: <MyTeam />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <MyTeam />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.UserManagement.MyTeam.CreateUser,
    element: <CreateUser />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <CreateUser />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.UserManagement.MyTeam.UserProfile,
    element: <UserProfile />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <UserProfile />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.Report.attendanceReport,
    element: <AttendanceReport />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <UserProfile />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.TimeSheet.taskPlanner,
    element: <TaskPlanner />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <UserProfile />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.TimeSheet.taskLogs,
    element: <TaskLogs />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <UserProfile />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.UserManagement.MyTeam.UserProfileEdit,
    element: <UserProfileEdit />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <UserProfileEdit />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.SubscriptionPlans.leaveApply,
    element: <SubscriptionPlans />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <SubscriptionPlans />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.SubscriptionPlans.CreateSubscriptionPlans,
    element: <CreateSubscriptionPlans />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <CreateSubscriptionPlans />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    // path: RouteName.AllTransactions.AllTransactions,
    // element: <AllTransactions />,
    // exact: true,
    // protected: true,
    // redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <AllTransactions />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.Events.Events,
    element: <Events />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <Events />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.Events.CreateEvents,
    element: <CreateEvents />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <CreateEvents />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.Events.OnlineEvents,
    element: <OnlineEvents />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <OnlineEvents />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.Events.OfflineEvents,
    element: <OfflineEvents />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <OfflineEvents />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.Events.LiveEventDetails,
    element: <LiveEventDetails />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <LiveEventDetails />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.Events.EditEventDetails,
    element: <EditEventDetails />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <EditEventDetails />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.Events.PastEventDetails,
    element: <PastEventDetails />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <PastEventDetails />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.Events.EditPastEventDetails,
    element: <EditPastEventDetails />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <EditPastEventDetails />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.Events.PastOnlineEventDetails,
    element: <PastOnlineEventDetails />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <PastOnlineEventDetails />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.Events.ScheduledEventFeedbacks,
    element: <ScheduledEventFeedbacks />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <ScheduledEventFeedbacks />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.Events.ScheduledEventFeedbacksDetail,
    element: <ScheduledEventFeedbacksDetail />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <ScheduledEventFeedbacksDetail />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.Events.ScheduledEventDetails,
    element: <ScheduledEventDetails />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <ScheduledEventDetails />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.Events.TicketSoldEventDetails,
    element: <TicketSoldEventDetails />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <TicketSoldEventDetails />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.Events.CreateFAQ,
    element: <CreateFAQ />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <CreateFAQ />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.Events.PreviewFAQ,
    element: <PreviewFAQ />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <PreviewFAQ />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },

  {
    path: RouteName.Community.Community.Community,
    element: <Community />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <Community />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.Community.Community.CommunityDetail,
    element: <CommunityDetail />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <CommunityDetail />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.Community.Community.CommunityViewDetails,
    element: <CommunityViewDetails />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <CommunityViewDetails />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.Community.Community.CommunityPreviewDetails,
    element: <CommunityPreviewDetails />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <CommunityPreviewDetails />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.Community.Community.EditCommunity,
    element: <EditCommunity />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <EditCommunity />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.Community.Community.CommunityMembers,
    element: <CommunityMembers />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <CommunityMembers />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },

  {
    path: RouteName.Community.ActivityManagement.ActivityManagement,
    element: <ActivityManagement />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <ActivityManagement />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.Community.ActivityManagement.ActivityDetails,
    element: <ActivityDetails />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <ActivityDetails />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.Community.ActivityManagement.ActivityDetailsAll,
    element: <ActivityDetailsAll />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <ActivityDetailsAll />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },

  {
    path: RouteName.Community.ActivityManagement.CreateNew,
    element: <CreateNew />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <CreateNew />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.Community.ActivityManagement.CreateChallenge,
    element: <CreateChallenge />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <CreateChallenge />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.Community.ActivityManagement.CreateActivity,
    element: <CreateNewActivity />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <CreateNewActivity />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.Community.ActivityManagement.Preview,
    element: <Preview />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <Preview />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.Community.ActivityManagement.CreateQuest,
    element: <CreateQuest />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <CreateQuest />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.Community.ActivityManagement.CreatePoll,
    element: <CreatePoll />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <CreatePoll />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.Feed.Feed,
    element: <Feed />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <Feed />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
  {
    path: RouteName.Feed.ConsumerActivityProfile,
    element: <ConsumerActivityProfile />,
    exact: true,
    protected: true,
    redirectPath: RouteName.Auth.Login,
    // element: (
    //   <ProtectedRoute redirectPath={`../${RouteName.Auth.Login}`}>
    //     <ConsumerActivityProfile />
    //   </ProtectedRoute>
    // ),
    // exact: true,
  },
];

export default AdminRoute;
