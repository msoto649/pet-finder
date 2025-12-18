export default function Button({ children, variant = 'primary', onClick, type = 'button', className = '' }) {
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition duration-200';
  
  const variants = {
    primary: 'bg-orange-600 text-white hover: bg-orange-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'border-2 border-orange-600 text-orange-600 hover: bg-orange-50'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}