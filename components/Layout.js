import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

// layout wrapper component
const Layout = ({ children, title = 'LaunchBase Ecomm Store' }) => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Modern Ecommerce Starter Template" />
      </Head>

      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
