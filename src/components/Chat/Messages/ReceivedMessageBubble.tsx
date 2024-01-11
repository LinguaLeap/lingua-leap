/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/control-has-associated-label */
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import { Message } from '../../../types/Conversations';

type Props = {
  message: Message;
};
function ReceivedMessageBubble({ message }: Props) {
  return (
    <div className="mt-2">
      <div className="flex items-start gap-2.5">
        <img src="https://picsum.photos/60" className="w-8 h-8 rounded-full" alt="Jese" />
        <div className="flex flex-col max-w-2xl min-w-80 leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl ">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-semibold text-gray-900">
              {`${message.senderId.givenName} ${message.senderId.familyName}`}
            </span>
          </div>
          <p className="text-sm font-normal py-2.5 text-gray-900">{message.content}</p>
          <div className="flex justify-end space-x-2">
            <span className="text-sm font-normal text-gray-500">
              {moment(message.timestamp).format('LT')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReceivedMessageBubble;
