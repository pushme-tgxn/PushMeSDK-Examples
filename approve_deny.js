import * as dotenv from "dotenv";
import PushMeSDK from "@pushme-tgxn/pushmesdk";

dotenv.config({ path: `./.env` });
let { TOPIC_SECRET, BACKEND_URL } = process.env;

if (!TOPIC_SECRET || TOPIC_SECRET == "") {
  throw new Error("Missing TOPIC_SECRET in .env");
}

if (!BACKEND_URL || BACKEND_URL == "") {
  BACKEND_URL = null;
}

const pushmeClient = new PushMeSDK({
  backendUrl: BACKEND_URL,
});

import main from "./main.js";

main(pushmeClient, TOPIC_SECRET, {
  title: "Would you like approve this request?",
  body: "Login to xyz.com / Approve Requests etc",
  categoryId: "button.approve_deny",
});
