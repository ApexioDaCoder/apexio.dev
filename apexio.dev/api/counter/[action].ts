import type { APIHandler } from "aleph/types.d.ts";
import { connect } from "https://deno.land/x/redis/mod.ts";

const redis = await connect({
  hostname: Deno.env.get("REDIS_URL"),
  port: 17158,
  password: Deno.env.get("REDIS_PASS")
});

export const handler: APIHandler = async ({ router, response }) => {
  let count = parseInt(await redis.get("count") || "0");

  switch (router.params["action"]) {
    case "increase":
      count++;
      await redis.set("count", count.toString());
      response.json({ count });
      break;
    case "decrease":
      count--;
      await redis.set("count", count.toString());
      response.json({ count });
      break;
    default:
      response.status = 400;
      response.json({
        error: "UnknownAction",
        status: 400,
        message: `undefined action '${router.params["action"]}'`,
      });
      break;
  }
};
