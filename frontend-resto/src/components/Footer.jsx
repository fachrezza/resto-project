export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-10">
      <div className="container mx-auto px-5 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Resto App • Built with ❤️
      </div>
    </footer>
  );
}