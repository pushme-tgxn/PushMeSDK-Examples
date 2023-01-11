const dotenv = require("dotenv");

const PushMeSDK = require("@pushme-tgxn/pushmesdk").default;
const Consts = require("@pushme-tgxn/pushmesdk").Consts;

const main = require("./main");

dotenv.config({ path: `../.env` });
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

main(pushmeClient, TOPIC_SECRET, {
  categoryId: Consts.PushCategory.BUTTON_ACKNOWLEDGE,
  title: "You have not paid your water bill!",
  body: "Please check your latest invoice to ensure you don't get cancelled!",
});
