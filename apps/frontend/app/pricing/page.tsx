import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PricingPage() {
  return (
    <>
      <Navbar />

      <section className="hero" style={{ paddingBottom: "40px" }}>
        <h1>Simple Pricing.</h1>
        <p className="text-muted">Start for free. Upgrade anytime.</p>
      </section>

      <section className="pricing">
        <div className="price-card">
          <h2>Free</h2>
          <p className="text-muted">Perfect for getting started</p>
        </div>

        <div className="price-card glow">
          <h2>Pro</h2>
          <p className="text-muted">£7.99/mo — For serious learners</p>
        </div>

        <div className="price-card">
          <h2>Premium</h2>
          <p className="text-muted">£14.99/mo — For career‑focused learners</p>
        </div>

        <div className="price-card">
          <h2>Universities</h2>
          <p className="text-muted">Custom pricing</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
