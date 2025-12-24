interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "transparent"
  className?: string
}

export default function Button({
  children,
  variant = "primary",
  onClick,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const baseStyles =
    "text-white rounded-full p-[1.5px] flex items-center transition-all cursor-pointer"
  const variants = {
    primary: "",
    secondary: " ",
    transparent: " ",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={{
        background:
          "linear-gradient(122deg,rgba(255, 255, 255, 1) 2%, #211d1c 15%, #211d1c 85%, rgba(255, 255, 255, 1) 98%)",
      }}
      {...props}>
      <span className='text-sm font-medium rounded-full px-6 py-2.5 flex items-center !bg-[#211d1c] border-none'>
        {children}
      </span>
    </button>
  )
}
