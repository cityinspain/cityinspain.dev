export default function TextContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="font-mono text-xl py-8 space-y-8 leading-8">
        {children}
      </div>
    </>
  );
}
