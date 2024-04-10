import React, { createContext, useContext, useEffect } from "react";

export function createRouter<T extends string>(
  validRoutes: Record<T, React.ReactNode>
) {
  const context = createContext("/");

  const nav = {
    navigate: (route: string) => window.history.pushState({}, "", route),
    Router: () => {
      const [route, setRoute] = React.useState<string>(
        window.location.pathname
      );

      useEffect(() => {
        setRoute(window.location.pathname as string);
      }, []);

      return (
        <context.Provider value={route}>
          {validRoutes[route as T] || nav.NotFound()}
        </context.Provider>
      );
    },
    NotFound: () => {
      const currentPath = useContext(context);

      return (
        <div>
          <h1>404</h1>
          <p>Could not find {currentPath}</p>
        </div>
      );
    },
  };

  return nav;
}
