export default function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className="font-mono text-5xl font-bold">{children}</h1>
    </>
  );
}
