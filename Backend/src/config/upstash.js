import {Ratelimit} from "@upstash/ratelimit"
import {Redis} from "@upstash/redis"

import dotenv from "dotenv";

dotenv.config();

// create a ratelimiter of 100 req per min.
const ratelimit = new Ratelimit({
    redis:Redis.fromEnv(),
    limiter:Ratelimit.slidingWindow(10,"10 s")
});

export default ratelimit; 