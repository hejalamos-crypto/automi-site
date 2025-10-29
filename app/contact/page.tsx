// app/contact/page.tsx
export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <form className="bg-white p-8 rounded-lg shadow">
          <input type="text" placeholder="Name" className="w-full p-3 mb-4 border rounded" />
          <input type="email" placeholder="Email" className="w-full p-3 mb-4 border rounded" />
          <textarea placeholder="Message" rows={5} className="w-full p-3 mb-4 border rounded"></textarea>
          <button className="w-full py-3 bg-black text-white rounded hover:bg-gray-800">Send</button>
        </form>
        <div>
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 mb-6"></div>
          <p className="font-medium">Melbourne, VIC 3000</p>
          <p>+61 3 9876 5432</p>
          <p>parts@automi.com</p>
        </div>
      </div>
    </div>
  );
}