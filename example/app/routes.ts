import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
    route('ellipsis', 'routes/ellipsis.tsx'),
    route('keywords', 'routes/keywords.tsx'),
    route('rect', 'routes/rect.tsx'),
    route('simple-images-slider', 'routes/simple-images-slider.tsx'),
    route('sortable-list', 'routes/sortable-list.tsx'),
    route('userAgent', 'routes/userAgent.tsx'),
] satisfies RouteConfig;
