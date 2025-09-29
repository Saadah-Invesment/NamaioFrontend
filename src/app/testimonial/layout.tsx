// app/(dashboard)/layout.tsx or app/layout.tsx (depending on your structure)
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export default function Layout({ children }: { children: React.ReactNode }) {
    return <div>
        <Header />
        <h1 className="text-gray-900 text-xs" > Tezcai | Automated Crypto Trading</h1>
        {children}
        <Footer />
    </div>;
}
