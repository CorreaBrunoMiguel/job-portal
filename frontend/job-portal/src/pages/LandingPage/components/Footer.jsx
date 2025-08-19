import { Briefcase } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gray-50 text-gray-900">
      <div className="relative z-10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          {/* Main Footer Content */}
          <div className="space-y-8 text-center">
            {/* Logo/Brand */}
            <div className="space-y-4">
              <div className="mb-6 flex items-center justify-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">JobPortal</h3>
              </div>
              <p className={`mx-auto max-w-md text-sm text-gray-600`}>
                Connecting talented professionals with innovative companies
                worldwide. Your career success is our mission .
              </p>
            </div>
            {/* Copyright */}
            <div className="space-y-2">
              <p className={`text-sm text-gray-600`}>
                &copy; {new Date().getFullYear()} DevCorrêa
              </p>
              <p className={`text-xs text-gray-500`}>Made with 💘</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
