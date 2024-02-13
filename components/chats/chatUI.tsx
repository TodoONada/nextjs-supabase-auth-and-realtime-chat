import DateFormatter from '@/components/date';

interface Props {
  item: any,
}

export default function ChatUI(props: Props) {
  const { item } = props

  return (
    <>
      <img
        src="/user.png"
        className="object-cover h-8 w-8 rounded-full"
        alt=""
      />
      <div>
        <div
          className={item.isMyMessage ? "mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white" : "ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"}
        >
          {item.message}
        </div>
        <p className='text-gray-500 font-normal text-xs truncate text-right w-full'>
          <DateFormatter timestamp={item.created_at} />
          <span className='isAlreadyRead'>{item.isMyMessage && item.isAlreadyRead ? "既読" : ""}</span>
        </p>
      </div>
    </>
  )
}