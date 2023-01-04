require("dotenv").config({ path: `../.env` });

let { TOPIC_SECRET, BACKEND_URL } = process.env;
if (!TOPIC_SECRET || TOPIC_SECRET == "") {
  throw new Error("Missing TOPIC_SECRET in .env");
}
if (!BACKEND_URL || BACKEND_URL == "") {
  BACKEND_URL = null;
}

const {
  default: PushMeSDK,
  NotificationDefinitions,
} = require("@pushme-tgxn/pushmesdk");

const main = require("./main");

const pushmeClient = new PushMeSDK({
  backendUrl: BACKEND_URL,
});

main(pushmeClient, TOPIC_SECRET, {
  title: "You have not paid your water bill!",
  body: "Please check your latest invoice to ensure you don't get cancelled!",
  categoryId: "button.acknowledge",
});
