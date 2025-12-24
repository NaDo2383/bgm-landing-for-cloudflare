interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export default function Input({ label, className = "", ...props }: InputProps) {
  return (
    <div className='w-full'>
      {label && (
        <label className='block text-sm font-medium text-gray-300 mb-2'>{label}</label>
      )}
      <input
        className={`w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors ${className}`}
        {...props}
      />
    </div>
  )
}
