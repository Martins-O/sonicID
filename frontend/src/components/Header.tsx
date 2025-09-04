export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">SonicID</h1>
            </div>
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              <a href="/" className="text-gray-600 hover:text-gray-900">Identity Wallet</a>
              <a href="/demo" className="text-gray-600 hover:text-gray-900">E-commerce Demo</a>
              <a href="/admin" className="text-gray-600 hover:text-gray-900">Admin Panel</a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Sonic Mainnet</span>
            </div>
            
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}