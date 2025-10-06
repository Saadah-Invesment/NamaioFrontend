// app/(dashboard)/layout.tsx or app/layout.tsx (depending on your structure)
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export default function Layout({ children }: { children: React.ReactNode }) {
    return <div>
        <Header />
        {children}
        <Footer />
        <h1 className="bg-white" > Namaio | Automated Crypto Trading</h1>
    </div>;
}
