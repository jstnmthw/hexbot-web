export function Footer() {
  return (
    <footer className="py-4 border-t border-border">
      <div className="container mx-auto px-4 text-center text-muted">
        <p className="text-sm">&copy; {new Date().getFullYear()} HexBot. All rights reserved.</p>
      </div>
    </footer>
  );
}
