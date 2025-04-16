export function Card({ children, className }: any) {
  return (
    <div className={`bg-white border rounded-xl shadow ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }: any) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}
