const selectRoutes = [
  {
    key: "1",
    pathname: "/",
  },
  {
    key: "2",
    pathname: "/consultas",
  },
  {
    key: "3",
    pathname: "/pacientes",
  },
];

export function getKeyByPathname(pathname: string): string[] {
  const route = selectRoutes.find((route) => route.pathname === pathname);
  return route ? [route.key] : [];
}
