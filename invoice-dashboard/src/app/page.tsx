import Image from "next/image";

export default function Home() {
  return (
    <>
      <h1>AI-Powered Invoice Dashboard</h1>
      <p>Dashboard to manage invoices using AI</p>
      <Image
        src="/invoice-dashboard.png"
        alt="Invoice Dashboard"
        width={800}
        height={600}
      />
    </>
  );
}
