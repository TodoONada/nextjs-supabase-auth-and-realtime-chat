type Props = {
  timestamp: string
}

export default function DateFormatter({ timestamp }: Props) {
  const date = new Date(timestamp)
  var jstDate = date.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })

  return (
    <>
      {jstDate}
    </>
  )
}