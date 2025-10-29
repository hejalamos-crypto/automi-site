// app/contact/page.tsx
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* FORM */}
        <div className="bg-white p-8 rounded-lg shadow">
          <form>
            <input type="text" placeholder="Name" className="w-full p-3 mb-4 border rounded" />
            <input type="email" placeholder="Email" className="w-full p-3 mb-4 border rounded" />
            <textarea placeholder="Message" rows={5} className="w-full p-3 mb-4 border rounded"></textarea>
            <button className="w-full py-3 bg-black text-white rounded hover:bg-gray-800">
              Send Message
            </button>
          </form>
        </div>

        {/* MAP + INFO */}
        <div>
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 mb-6 flex items-center justify-center">
            <p className="text-gray-600">Google Map Here</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-black" />
              <span>Melbourne, VIC 3000, Australia</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-black" />
              <span>+61 3 9876 5432</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-black" />
              <span>parts@automi.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}