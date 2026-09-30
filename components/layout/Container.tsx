const Container = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={`mx-auto w-full px-page-mobile md:px-page-tablet lg:max-w-container-lg lg:px-page-desktop xl:max-w-container-xl 2xl:max-w-container-2xl ${className ?? ''}`}
    >
      {children}
    </div>
  )
}

export default Container
