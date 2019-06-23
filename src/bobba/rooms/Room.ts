import RoomModel from "./RoomModel";
import RoomEngine from "./RoomEngine";
import RoomUserManager from "./users/RoomUserManager";
import RoomItemManager from "./items/RoomItemManager";
import ChatManager from "./chats/ChatManager";

export default class Room {
    id: number;
    name: string;
    model: RoomModel;
    engine: RoomEngine;
    roomUserManager: RoomUserManager;
    roomItemManager: RoomItemManager;
    chatManager: ChatManager;

    constructor(id: number, name: string, model: RoomModel) {
        this.id = id;
        this.name = name;
        this.model = model;
        this.engine = new RoomEngine(this);
        this.roomUserManager = new RoomUserManager(this);
        this.roomItemManager = new RoomItemManager(this);
        this.chatManager = new ChatManager(this);
        this.engine.setChatContainer(this.chatManager.container);
    }

    tick(delta: number) {
        this.engine.tick(delta);
        this.roomUserManager.tick(delta);
        this.roomItemManager.tick(delta);
        this.chatManager.tick(delta);
    }

    dispose() {
        this.engine.getStage().visible = false;
        this.engine.getStage().removeChild();
    }
}