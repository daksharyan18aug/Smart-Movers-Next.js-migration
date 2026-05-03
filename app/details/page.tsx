export default function DetailsPage() {
  return (
    <main>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Details</h1>
          <p className="text-gray-500 text-sm mb-6">Service details will appear here.</p>
          <a href="/" className="inline-block bg-blue-700 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-600 transition">Back to Home</a>
        </div>
      </div>
    </main>
  )
}