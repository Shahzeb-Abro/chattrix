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
