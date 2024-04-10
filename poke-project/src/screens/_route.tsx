import React from "react";

// export declare function createRouterCtx<Routes extends string>() : RouterCtx<Routes>;

export declare function createRoute<Params extends string>({
  params,
  ui,
}: {
  params: readonly Params[];
  ui: React.ReactNode;
}): {
  routeParams: Params;
};

export declare function createRouter<Path extends string>(
  routes: Record<Path, ReturnType<typeof createRoute>>
): {
  [K in Path]: {
    useParams: () => (typeof routes)[K];
  };
};

createRoute({
  params: ["1", "2", "3"],
  ui: <div>Home</div>,
});

const ret = createRouter({
  "/": createRoute({
    params: ["1"],
    ui: <div>Home</div>,
  }),
  "/fight": createRoute({
    params: ["2"],
    ui: <div>Fight</div>,
  }),
});
