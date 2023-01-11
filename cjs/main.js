async function main(client, secret, pushRequest) {
  try {
    const { pushIdent } = await client.push.pushToTopic(secret, pushRequest);
    console.log(`Created Push Ident: ${pushIdent}`);

    const pushStatus = await client.push.longPollPushStatus(pushIdent);

    if (pushStatus.firstValidResponse) {
      const foundAction = client.getNotificationAction(
        pushStatus.firstValidResponse.categoryIdentifier,
        pushStatus.firstValidResponse.actionIdentifier
      );

      if (foundAction) {
        console.log("User responded with valid action ", foundAction);
      } else {
        console.log(
          `User responded with "${pushStatus.firstValidResponse.actionIdentifier}"`
        );
      }

      if (pushStatus.firstValidResponse.responseText) {
        console.log(
          `User entered "${pushStatus.firstValidResponse.responseText}"`
        );
      }
    } else {
      console.log("something else?", pushStatus);
    }
  } catch (error) {
    console.error(error.toString());
  }
}

module.exports = main;
