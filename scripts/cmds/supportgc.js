module.exports = {
  config: {
    name: "supportgc",
    version: "1.1",
    author: "AHMED TARIF",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Join the support group chat"
    },
    longDescription: {
      en: "Join the official support group chat"
    },
    category: "GROUP",
    guide: {
      en: "{prefix}supportgc"
    }
  },

  onStart: async function ({ api, event, threadsData, message }) {
    const supportGroupThreadID = "1330641265235319"; // Your support group thread ID
    const botID = api.getCurrentUserID();

    try {
      // Fetch group members
      const { members } = await threadsData.get(supportGroupThreadID);

      // Check if the user is already in the group
      const userAlreadyInGroup = members.some(
        member => member.userID === event.senderID
      );

      if (userAlreadyInGroup) {
        const alreadyInGroupMessage = `👍🏿 𝗦𝗨𝗣𝗣𝗢𝗥𝗧𝗚𝗖\n☺︎︎────═━┈━═──────☺︎︎
♻ You are already a member of the SupportGc group 🤍\n☺︎︎────═━┈━═──────☺︎︎`;
        return message.reply(alreadyInGroupMessage);
      }

      // Add user to the support group
      await api.addUserToGroup(event.senderID, supportGroupThreadID);

      const successMessage = `👍🏿 𝗦𝗨𝗣𝗣𝗢𝗥𝗧𝗚𝗖\n☺︎︎────═━┈━═──────☺︎︎
🎉 You have been successfully added to SupportGc 👨🏿‍🌾\n☺︎︎────═━┈━═──────☺︎︎`;
      return message.reply(successMessage);

    } catch (error) {
      console.error("Error adding user to support group:", error);

      const failedMessage = `👍🏿 𝗦𝗨𝗣𝗣𝗢𝗥𝗧𝗚𝗖\n☺︎︎────═━┈━═──────☺︎︎
⚠ Failed to add you to SupportGc 😭. Please check if your profile is unlocked or send a friend request and try again ❌\n☺︎︎───═━┈━═───☺︎︎`;
      return message.reply(failedMessage);
    }
  }
};
