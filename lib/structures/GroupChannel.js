"use strict";

const Collection = require("../util/Collection");
const Endpoints = require("../rest/Endpoints");
const PrivateChannel = require("./PrivateChannel");
const User = require("./User");

/**
* [USER ACCOUNT] Represents a group channel. See PrivateChannel docs for additional properties.
* @extends PrivateChannel
* @prop {String} id The ID of the channel
* @prop {String} mention A string that mentions the channel
* @prop {Call?} call The current group call, if any
* @prop {Call?} lastCall The previous group call, if any
* @prop {Collection<User>} recipients The recipients in this private channel
* @prop {String} name The name of the group channel
* @prop {String?} icon The hash of the group channel icon
* @prop {String?} iconURL The URL of the group channel icon
* @prop {String} ownerID The ID of the user that is the group owner
*/
class GroupChannel extends PrivateChannel { // (╯°□°）╯︵ ┻━┻
    constructor(data, client) {
        super(data, client);
        this.recipients = new Collection(User);
        data.recipients.forEach((recipient) => {
            this.recipients.add(client.options.restMode ? new User(recipient, client) : client.users.add(recipient, client));
        });
        this.update(data);
    }

    update(data) {
        if(data.name !== undefined) {
            this.name = data.name;
        }
        if(data.owner_id !== undefined) {
            this.ownerID = data.owner_id;
        }
        if(data.icon !== undefined) {
            this.icon = data.icon;
        }
    }

    toJSON(props = []) {
        return super.toJSON([
            "icon",
            "name",
            "ownerID",
            "recipients",
            ...props
        ]);
    }
}

module.exports = GroupChannel;
