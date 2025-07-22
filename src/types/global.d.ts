export interface IMessage {
  _id: string;
  content: string;
  createdAt: string;
  isRead: boolean;
  receiver: {
    _id: string;
    name: string;
    imgUrl: string;
  };
  deliveredAt: string;
  sender: {
    _id: string;
    name: string;
    imgUrl: string;
  };
}

export interface IUser {
  _id: string;
  name: string;
  lastMessage: {
    content: string;
    createdAt: string;
    sender: string;
  };
  imgUrl: string;
  unreadCount: number;
}

export interface IChat {
  id: string;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  sender: string;
  imgUrl: string;
  unreadCount: number;
}
