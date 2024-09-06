/**
 * An array of public routes that do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/forgot-password",
  "/new-password",
];
/**
 * An array of routes that are your for authentication
 * this route will redirect user to /dashboard if they are already authenticated
 * @type {string[]}
 */
export const authRoutes = [
  "/login",
]
/**
 * The default route to redirect to after login
 * @type {string}
 */
export const DEFAULT_ROUTE_REDIRECT = "/dashboard";
