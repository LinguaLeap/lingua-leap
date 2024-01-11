// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import { Message } from '../../../types/Conversations';

type Props = {
  message: Message;
};

/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/control-has-associated-label */
function SendedMessageBubble({ message }: Props) {
  const messageStatus = (status: number): string => {
    if (status === 2) {
      return 'Seen';
    }
    if (status === 1) {
      return 'Delivered';
    }
    return 'Sent';
  };

  return (
    <div className="mt-2">
      <div className="flex justify-end items-start gap-2.5">
        <div className="flex flex-col max-w-2xl min-w-80 leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl ">
          <p className="text-sm font-normal py-2.5 text-gray-900">{message.content}</p>
          <div className="flex justify-start space-x-2">
            <span className="text-sm font-normal text-gray-500">
              {messageStatus(message.status)}
            </span>
            <span className="text-sm font-normal text-gray-500">
              {moment(message.timestamp).format('LT')}
            </span>
          </div>
        </div>
        <img
          src="https://picsum.photos/60"
          className="w-8 h-8 rounded-full"
          alt="Jese image"
        />
      </div>
    </div>
  );
}

export default SendedMessageBubble;
