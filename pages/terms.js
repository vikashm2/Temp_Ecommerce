import Layout from '../components/Layout';

/**
 * Terms and Conditions Page
 * Simple scrollable legal text
 */
export default function Terms() {
  /* COPYABLE TERMS SECTION START */
  return (
    <Layout>
      <div className="py-24 px-6 md:px-12 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter underline decoration-purple-500 decoration-8 underline-offset-8">
          TERMS OF <span className="text-gradient">SERVICE</span>
        </h1>
        
        <div className="glass-card p-10 md:p-16 space-y-10 leading-relaxed font-medium text-slate-300">
          {/* Section 1: Usage */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest border-l-4 border-purple-500 pl-6">1. Usage Rights</h2>
            <p>By using the LaunchBase platform, you agree to comply with our fair use policies and community guidelines. All template code is subject to its respective license.</p>
          </section>

          {/* Section 2: Account */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest border-l-4 border-indigo-500 pl-6">2. User Accounts</h2>
            <p>Users are responsible for maintaining the confidentiality of their account credentials. Any unauthorized access should be reported immediately to our support team.</p>
          </section>

          {/* Section 3: Liability */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest border-l-4 border-pink-500 pl-6">3. Limitation of Liability</h2>
            <p>LaunchBase is provided "as is". We are not liable for any direct or indirect damages resulting from the use or inability to use our digital assets.</p>
          </section>

          {/* Last Updated Footer */}
          <p className="text-slate-500 text-sm italic pt-10 border-t border-white/5">
            Last updated: March 15, 2026. Official LaunchBase Documentation.
          </p>
        </div>
      </div>
    </Layout>
  );
  /* COPYABLE TERMS SECTION END */
}
