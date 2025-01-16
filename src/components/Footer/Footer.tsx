const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 my-8">
      <div className="container mx-auto px-6 mt-8">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-800">
              About Timber Cut
            </h4>
            <p className="text-xs text-gray-600 max-w-2xl">
              Timber Cut is designed for woodworking enthusiasts to preview
              their results conveniently on their mobile phones.
            </p>
            <p className="text-xs text-gray-600">
              If you encounter any issues or have suggestions for additional
              features, please contact us at:
            </p>
            <a
              href="mailto:moonhr153@gmail.com"
              className="text-xs text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium"
            >
              moonhr153@gmail.com
            </a>
          </div>
          <div className="text-xs text-gray-400 mt-4">
            <p>© 2025 MoonHyerim. All rights reserved.</p>
            <p>Last updated: January 16, 2025</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
