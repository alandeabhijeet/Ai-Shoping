import React , {useState , useEffect }from 'react'
export default function Ai() {
  const [messages] = useState([
    
    {
      id: 2,
      type: "ai",
      text: "Hello Abhijeet how can i help you today ! feel free to ask anything ",
      timestamp: "10:31 AM",
    },
    {
      id: 3,
      type: "user",
      text: "My order number is #12345",
      timestamp: "10:32 AM",
    },
    {
      id: 4,
      type: "ai",
      text: "Thank you for providing that. I can see your order #12345 was placed yesterday and is currently being processed. Is there something specific you'd like to know about it?",
      timestamp: "10:33 AM",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-700 flex flex-col">
      <div className="flex-1 p-4 sm:p-6 flex flex-col">
        <div className="flex items-center border-b border-gray-600 pb-4">
          <div className="flex items-center space-x-4">
            <i className="fas fa-robot text-3xl text-blue-400"></i>
            <div>
              <h2 className="font-roboto text-xl font-bold text-gray-100">
                AI Assistant
              </h2>
              <p className="font-roboto text-sm text-gray-400">
                Always here to help
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xl rounded-lg px-4 py-2 ${
                  message.type === "user"
                    ? "bg-blue-600 text-white ml-auto"
                    : "bg-gray-800 text-gray-100"
                }`}
              >
                <div className="font-roboto">{message.text}</div>
                <div
                  className={`text-xs mt-1 ${
                    message.type === "user" ? "text-blue-200" : "text-gray-400"
                  }`}
                >
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="pt-4">
          <div className="flex space-x-4">
            <input
              type="text"
              name="message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="font-roboto flex-1 bg-gray-800 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="font-roboto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <i className="fas fa-paper-plane mr-2"></i>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



