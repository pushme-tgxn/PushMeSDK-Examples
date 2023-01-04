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

        if (foundAction.hasOwnProperty("textInput")) {
          console.log(
            "responseText:",
            pushStatus.firstValidResponse.responseText
          );
        }
      } else {
        console.log(
          `User responded with "${pushStatus.firstValidResponse.actionIdentifier}"`
        );
      }

      return {
        pushIdent,
        pushStatus,
        foundAction,
        firstValidResponse: pushStatus.firstValidResponse,
      };
    } else {
      console.log("something else?", pushStatus);
    }

    return {
      pushIdent,
      pushStatus,
      foundAction: false,
      firstValidResponse: pushStatus.firstValidResponse,
    };
  } catch (error) {
    console.error(error.toString());
  }
}

module.exports = main;
