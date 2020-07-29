const InitState = {
  routes: [
    { id: 1, name: "Dashboard", route: "/", icon: "explore" },
    { id: 2, name: "Admins", route: "/admins", icon: "admin_panel_settings" },
    { id: 3, name: "Users", route: "/users", icon: "people" },
    { id: 4, name: "Artisans", route: "/artisans", icon: "people" },
    { id: 5, name: "Roles", route: "/roles", icon: "work" },
    { id: 6, name: "Permissions", route: "/permissions", icon: "lock" },
    {
      id: 7,
      name: "Configuration",
      route: "/configuration",
      icon: "settings_input_svideo",
    },
    { id: 8, name: "Settings", route: "/settings", icon: "settings" },
  ],
};
const routersReducer = (state = InitState, action) => {
  switch (action.type) {
    case "routers":
      return {
        menu: action.data,
      };

    default:
      return state;
  }
};
export default routersReducer;
