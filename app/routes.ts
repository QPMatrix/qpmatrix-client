import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/landing/home.tsx'),

  // All the Api Routes will be here
  route('/api/theme/direction', 'routes/api/theme/direction.ts'),
  route('/api/theme', 'routes/api/theme/theme.ts'),
] satisfies RouteConfig;
