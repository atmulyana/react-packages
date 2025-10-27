import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
    route('keywords', 'routes/keywords.tsx'),
    route('sortable-list', 'routes/sortable-list.tsx'),
    route('userAgent', 'routes/userAgent.tsx'),
] satisfies RouteConfig;
