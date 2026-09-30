type EmptyListProps = {
  title: string
  description: string
}

const EmptyList = ({ title, description }: EmptyListProps) => {
  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-12 rounded-[24px] border border-shuttle-gray-200 bg-shuttle-gray-50 px-32 py-48 text-center"
      role="status"
      aria-live="polite"
    >
      <p className="font-heading text-heading-xs font-semibold text-shuttle-gray-950">
        {title}
      </p>
      <p className="max-w-md font-body text-body-m text-shuttle-gray-400">
        {description}
      </p>
    </div>
  )
}

export default EmptyList
