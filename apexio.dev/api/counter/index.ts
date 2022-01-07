import type { APIHandler } from "aleph/types.d.ts";
import { connect } from "https://deno.land/x/redis/mod.ts";

const redis = await connect({
  hostname: Deno.env.get("REDIS_URL"),
  port: 17158,
  password: Deno.env.get("REDIS_PASS")
});

export const handler: APIHandler = async ({ response }) => {
  const count = parseInt(await redis.get("count") || "0");
  response.json({ count });
};
