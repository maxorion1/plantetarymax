export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    //
    // ROOT DASHBOARD
    //
    if (url.pathname === "/") {
      return new Response(
        JSON.stringify({
          message: "Portal‑OS Worker Runtime Active",
          substrate: "Substrate Online",
          broker: "Broker Online"
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    //
    // SUBSTRATE HEALTH
    //
    if (url.pathname === "/substrate/health") {
      const id = env.SubstrateDO.idFromName("root");
      const stub = env.SubstrateDO.get(id);
      return stub.fetch("https://do/health");
    }

    //
    // SUBSTRATE STORAGE INSPECTOR
    //
    if (url.pathname === "/substrate/storage") {
      const id = env.SubstrateDO.idFromName("root");
      const stub = env.SubstrateDO.get(id);
      return stub.fetch("https://do/storage");
    }

    //
    // BROKER HEALTH
    //
    if (url.pathname === "/broker/health") {
      const id = env.BrokerDO.idFromName("root");
      const stub = env.BrokerDO.get(id);
      return stub.fetch("https://do/health");
    }

    return new Response("Not found", { status: 404 });
  }
};
