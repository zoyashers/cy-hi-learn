"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const missions = [
  {
    number: "03",
    category: "DIGITAL FORENSICS",
    title: "Suspicious USB Device",
    description:
      "Determine how a suspicious device was used to compromise a workstation.",
    difficulty: "BEGINNER",
    xp: "+300 XP",
    time: "~35 MIN",
    href: "/missions/suspicious-usb-device",
  },
  {
    number: "01",
    category: "NETWORK FORENSICS",
    title: "Trace the Intrusion",
    description:
      "Follow network activity and reconstruct how an attacker entered the environment.",
    difficulty: "INTERMEDIATE",
    xp: "+400 XP",
    time: "~45 MIN",
    href: "/missions/trace-the-intrusion",
  },
  {
    number: "02",
    category: "INCIDENT RESPONSE",
    title: "The Compromised Account",
    description:
      "Investigate unusual account activity and determine what happened.",
    difficulty: "INTERMEDIATE",
    xp: "+350 XP",
    time: "~40 MIN",
    href: "/missions/compromised-account",
  },
];

export default function HomePage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <main className={`cyhi-landing ${visible ? "is-visible" : ""}`}>

     {/* =========================================================
         NAVIGATION
     ========================================================= */}
     <nav className="cyhi-nav">

       <div className="cyhi-nav-links">
         <a href="#how-it-works">How it works</a>
         <a href="#missions">Missions</a>
         <a href="#learning">Learning</a>
         <a href="#pricing">Pricing</a>
       </div>

       {/* CENTRE LOGO */}
       <Link href="/" className="cyhi-nav-logo">
         <img
           src="/banner.png"
           alt="CY-HI Learn"
         />
       </Link>

       <div className="cyhi-nav-actions">
         <Link href="/dashboard" className="cyhi-signin">
           Sign in
         </Link>

         <Link href="/dashboard" className="cyhi-nav-button">
           Enter platform <span>↗</span>
         </Link>
       </div>

     </nav>




      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="cyhi-hero">
        <div className="cyhi-hero-grid" />
        <div className="cyhi-hero-glow cyhi-glow-one" />
        <div className="cyhi-hero-glow cyhi-glow-two" />

        {/* =======================================================
            BANNER
            This is ABOVE the hero content and dashboard.
        ======================================================= */}
        
        {/* =======================================================
            HERO MAIN AREA
            LEFT = TEXT
            RIGHT = DASHBOARD PREVIEW
        ======================================================= */}
        <div className="cyhi-hero-main">

          {/* =====================================================
              HERO CONTENT — LEFT
          ===================================================== */}
          <div className="cyhi-hero-content">
            <div className="cyhi-status">
              <span />
              CYBERSECURITY LEARNING PLATFORM
            </div>

            <h1>
              Don't just learn
              <br />
              <span>cybersecurity.</span>
              <br />
              <em>Investigate it.</em>
            </h1>
            <p className="cyhi-hero-tagline">
              <span>Learn. Practice. Grow.</span>
              <br />
              <span className="cyhi-blue">Cyber Learning.</span>{" "}
              <span>Human Impact.</span>
            </p>
            <p>
              CY-HI Learn turns cybersecurity education into practical
              investigations, realistic scenarios and evidence-driven
              learning.
            </p>

            <div className="cyhi-hero-actions">
              <Link href="/dashboard" className="cyhi-primary">
                Start investigating
                <span>→</span>
              </Link>

              <a href="#how-it-works" className="cyhi-secondary">
                See how it works
                <span>↓</span>
              </a>
            </div>

            <div className="cyhi-hero-meta">
              <span>BUILT FOR</span>

              <div>
                <span>Students</span>
                <i />
                <span>Educators</span>
                <i />
                <span>Future Investigators</span>
              </div>
            </div>
          </div>

          {/* =====================================================
              PRODUCT PREVIEW — RIGHT
          ===================================================== */}
          <div className="cyhi-product-wrap">
            <div className="cyhi-product-window">

              <div className="cyhi-window-bar">
                <div className="cyhi-window-dots">
                  <i />
                  <i />
                  <i />
                </div>

                <span>CY-HI / STUDENT WORKSPACE</span>

                <strong>
                  <b /> ONLINE
                </strong>
              </div>

              <div className="cyhi-product-body">

                <aside className="cyhi-preview-sidebar">
                  <div className="cyhi-preview-logo">
                    CY
                  </div>

                  <span>⌂</span>
                  <span className="active">◈</span>
                  <span>◇</span>
                  <span>↗</span>
                </aside>

                <div className="cyhi-preview-main">

                  <div className="cyhi-preview-header">
                    <div>
                      <small>STUDENT WORKSPACE</small>
                      <h3>Good to see you, Alex.</h3>
                    </div>

                    <div className="cyhi-preview-avatar">
                      A
                    </div>
                  </div>

                  <div className="cyhi-preview-hero">
                    <div>
                      <small>
                        YOUR INVESTIGATION JOURNEY
                      </small>

                      <h4>
                        Learn to think like a
                        <br />
                        <span>cyber investigator.</span>
                      </h4>

                      <button type="button">
                        Continue learning →
                      </button>
                    </div>

                    <div className="cyhi-preview-level">
                      <small>LEVEL</small>

                      <strong>07</strong>

                      <div className="cyhi-preview-ring">
                        <div>
                          <strong>1,350</strong>
                          <span>XP</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="cyhi-preview-stats">
                    <div>
                      <small>MISSIONS</small>
                      <strong>12</strong>
                    </div>

                    <div>
                      <small>SKILLS</small>
                      <strong>08</strong>
                    </div>

                    <div>
                      <small>STREAK</small>
                      <strong>06</strong>
                    </div>

                    <div>
                      <small>ACCURACY</small>
                      <strong>84%</strong>
                    </div>
                  </div>

                  <div className="cyhi-preview-investigation">
                    <div>
                      <small>CURRENT INVESTIGATION</small>

                      <h4>
                        Suspicious USB Device
                      </h4>

                      <span>
                        DIGITAL FORENSICS
                      </span>

                      <div className="cyhi-preview-progress">
                        <i />
                      </div>
                    </div>

                    <strong>80%</strong>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          THE PROBLEM
      ========================================================= */}
      <section className="cyhi-problem">
        <div className="cyhi-section-label">
          THE PROBLEM
        </div>

        <h2>
          Cybersecurity isn't learned
          <br />
          by watching someone else do it.
        </h2>

        <p>
          Real investigators don't just remember definitions. They analyse
          evidence, connect events, make decisions and explain why those
          decisions matter.
        </p>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}
      <section id="how-it-works" className="cyhi-process">
        <div className="cyhi-section-heading">
          <div>
            <span className="cyhi-section-label">
              HOW CY-HI LEARN WORKS
            </span>

            <h2>
              Learn it.
              <br />
              Investigate it.
              <br />
              Understand why.
            </h2>
          </div>

          <p>
            A learning experience designed around the way cybersecurity
            skills are actually developed.
          </p>
        </div>

        <div className="cyhi-process-grid">

          <article className="cyhi-process-card">
            <span>01</span>

            <div className="cyhi-process-icon">
              ◇
            </div>

            <small>LEARN</small>

            <h3>
              Understand the concept.
            </h3>

            <p>
              Build the technical foundation before entering an
              investigation.
            </p>
          </article>

          <article className="cyhi-process-card featured">
            <span>02</span>

            <div className="cyhi-process-icon">
              ◈
            </div>

            <small>INVESTIGATE</small>

            <h3>
              Put knowledge into practice.
            </h3>

            <p>
              Analyse evidence and solve realistic cybersecurity
              scenarios.
            </p>
          </article>

          <article className="cyhi-process-card">
            <span>03</span>

            <div className="cyhi-process-icon">
              ◎
            </div>

            <small>UNDERSTAND</small>

            <h3>
              Understand the why.
            </h3>

            <p>
              Connect technical findings with context, behaviour and
              investigative reasoning.
            </p>
          </article>

        </div>
      </section>

      {/* =========================================================
          MISSIONS
      ========================================================= */}
      <section id="missions" className="cyhi-missions">

        <div className="cyhi-section-heading">
          <div>
            <span className="cyhi-section-label">
              INVESTIGATION MISSIONS
            </span>

            <h2>
              Learn by solving
              <br />
              real problems.
            </h2>
          </div>

          <Link
            href="/missions"
            className="cyhi-text-link"
          >
            Explore missions →
          </Link>
        </div>

        <div className="cyhi-mission-grid">

          {missions.map((mission, index) => (
            <Link
              key={mission.number}
              href={mission.href}
              className={`cyhi-mission-card ${
                index === 0 ? "featured" : ""
              }`}
            >
              <div className="cyhi-mission-number">
                {mission.number}
              </div>

              <div className="cyhi-mission-content">

                <span>
                  {mission.category}
                </span>

                <h3>
                  {mission.title}
                </h3>

                <p>
                  {mission.description}
                </p>

                <div className="cyhi-mission-meta">
                  <span>
                    {mission.difficulty}
                  </span>

                  <span>
                    {mission.xp}
                  </span>

                  <span>
                    {mission.time}
                  </span>
                </div>

              </div>

              <strong className="cyhi-mission-arrow">
                →
              </strong>
            </Link>
          ))}

        </div>
      </section>

      {/* =========================================================
          LEARNING PATHS
      ========================================================= */}
      <section id="learning" className="cyhi-learning">

        <div className="cyhi-learning-visual">

          <div className="cyhi-orbit orbit-a" />
          <div className="cyhi-orbit orbit-b" />

          <div className="cyhi-learning-ring">
            <div>
              <strong>64%</strong>
              <span>PATH COMPLETE</span>
            </div>
          </div>

          <div className="cyhi-floating-card floating-a">
            <b>01</b>
            Digital Forensics
          </div>

          <div className="cyhi-floating-card floating-b">
            <b>02</b>
            Network Forensics
          </div>

          <div className="cyhi-floating-card floating-c">
            <b>03</b>
            Incident Response
          </div>

        </div>

        <div className="cyhi-learning-copy">

          <span className="cyhi-section-label">
            LEARNING PATHS
          </span>

          <h2>
            Build skills that
            <br />
            <span>actually connect.</span>
          </h2>

          <p>
            CY-HI Learn brings digital forensics, network investigation,
            incident response, threat intelligence and attacker thinking
            together into one connected learning journey.
          </p>

          <div className="cyhi-learning-points">

            <div>
              <span>✓</span>
              Practical investigation skills
            </div>

            <div>
              <span>✓</span>
              Evidence-driven learning
            </div>

            <div>
              <span>✓</span>
              Progress you can actually see
            </div>

          </div>

          <Link
            href="/learning"
            className="cyhi-primary"
          >
            Explore learning paths
            <span>→</span>
          </Link>

        </div>
      </section>

      {/* =========================================================
          WHY CY-HI
      ========================================================= */}
      <section className="cyhi-why">

        <div className="cyhi-section-heading">

          <div>
            <span className="cyhi-section-label">
              WHY CY-HI LEARN
            </span>

            <h2>
              From knowing the
              <br />
              <span>answer</span> to knowing
              <br />
              how to find it.
            </h2>
          </div>

          <p>
            Cybersecurity is rarely about being given the answer.
            CY-HI Learn is designed to develop the investigation habits
            behind the technical knowledge.
          </p>

        </div>

        <div className="cyhi-why-grid">

          <article className="cyhi-why-card">
            <span>01</span>

            <div className="cyhi-why-icon">
              ⌁
            </div>

            <small>THINK</small>

            <h3>
              Follow the evidence.
            </h3>

            <p>
              Learn to question what you see, identify what matters and
              build conclusions from evidence.
            </p>
          </article>

          <article className="cyhi-why-card featured">
            <span>02</span>

            <div className="cyhi-why-icon">
              ◈
            </div>

            <small>INVESTIGATE</small>

            <h3>
              Make the connection.
            </h3>

            <p>
              Connect logs, files, network activity and user behaviour
              to reconstruct what actually happened.
            </p>
          </article>

          <article className="cyhi-why-card">
            <span>03</span>

            <div className="cyhi-why-icon">
              ◎
            </div>

            <small>EXPLAIN</small>

            <h3>
              Defend your findings.
            </h3>

            <p>
              Build the confidence to explain what you found, why it
              matters and how you reached your conclusion.
            </p>
          </article>

        </div>
      </section>


{/* =========================================================
    BUILT FOR THE NEXT GENERATION
========================================================= */}
<section className="cyhi-built-for">

  <div className="cyhi-built-copy">

    <span className="cyhi-section-label">
      BUILT FOR THE NEXT GENERATION
    </span>

    <h2>
      One platform.
      <br />
      <span>Different journeys.</span>
    </h2>

    <p>
      Whether you're learning your first forensic technique,
      teaching a cohort or building a practical cybersecurity
      programme, CY-HI Learn is designed around investigation.
    </p>

  </div>

  <div className="cyhi-built-list">

    <article className="cyhi-built-row">

      <div className="cyhi-built-number">
        01
      </div>

      <div className="cyhi-built-label">
        STUDENTS
      </div>

      <div className="cyhi-built-content">

        <h3>
          Learn by doing.
        </h3>

        <p>
          Replace passive learning with practical investigations
          that develop technical skills, judgement and confidence.
        </p>

        <Link href="/learning">
          Explore learning →
        </Link>

      </div>

      <span className="cyhi-built-arrow">
        ↗
      </span>

    </article>


    <article className="cyhi-built-row">

      <div className="cyhi-built-number">
        02
      </div>

      <div className="cyhi-built-label">
        EDUCATORS
      </div>

      <div className="cyhi-built-content">

        <h3>
          Teach through evidence.
        </h3>

        <p>
          Give learners structured scenarios while gaining
          visibility into their progress, skills and investigation
          performance.
        </p>

        <a href="#contact">
          Talk to us →
        </a>

      </div>

      <span className="cyhi-built-arrow">
        ↗
      </span>

    </article>


    <article className="cyhi-built-row">

      <div className="cyhi-built-number">
        03
      </div>

      <div className="cyhi-built-label">
        INSTITUTIONS
      </div>

      <div className="cyhi-built-content">

        <h3>
          Turn cybersecurity education into practical experience.
        </h3>

        <p>
          Create a consistent environment for delivering
          hands-on cybersecurity learning at scale.
        </p>

        <a href="#contact">
          Discuss a pilot →
        </a>

      </div>

      <span className="cyhi-built-arrow">
        ↗
      </span>

    </article>

  </div>

</section>


{/* =========================================================
    PLATFORM FEATURES
========================================================= */}
<section className="cyhi-features">

  <div className="cyhi-section-heading">

    <div>

      <span className="cyhi-section-label">
        THE PLATFORM
      </span>

      <h2>
        Everything needed to
        <br />
        <span>investigate.</span>
      </h2>

    </div>

    <p>
      CY-HI Learn combines practical investigations, structured
      learning and measurable progression into one experience.
    </p>

  </div>


  <div className="cyhi-feature-accordion">

    {/* =====================================================
        01
    ===================================================== */}
    <details className="cyhi-feature-item" open>

      <summary>

        <div className="cyhi-feature-number">
          01
        </div>

        <div className="cyhi-feature-title">
          <span>
            INVESTIGATION MISSIONS
          </span>

          <h3>
            Realistic scenarios.
          </h3>
        </div>

        <div className="cyhi-feature-symbol">
          +
        </div>

      </summary>

      <div className="cyhi-feature-expanded">

        <div className="cyhi-feature-expanded-visual">
          <div className="cyhi-feature-terminal">

            <span>CASE / 001</span>

            <div className="cyhi-terminal-line">
              <i />
              EVIDENCE DETECTED
            </div>

            <div className="cyhi-terminal-line">
              <i />
              TIMELINE RECONSTRUCTED
            </div>

            <div className="cyhi-terminal-line">
              <i />
              INVESTIGATION ACTIVE
            </div>

          </div>
        </div>

        <div className="cyhi-feature-expanded-copy">

          <p>
            Work through cases that require you to analyse evidence,
            make decisions and reach a conclusion.
          </p>

          <Link href="/missions">
            Explore missions →
          </Link>

        </div>

      </div>

    </details>


    {/* =====================================================
        02
    ===================================================== */}
    <details className="cyhi-feature-item">

      <summary>

        <div className="cyhi-feature-number">
          02
        </div>

        <div className="cyhi-feature-icon">
          ⌁
        </div>

        <div className="cyhi-feature-title">

          <span>
            EVIDENCE-DRIVEN
          </span>

          <h3>
            Follow the trail.
          </h3>

        </div>

        <div className="cyhi-feature-symbol">
          +
        </div>

      </summary>

      <div className="cyhi-feature-expanded">

        <div />

        <div className="cyhi-feature-expanded-copy">

          <p>
            Build investigative thinking by working from evidence
            rather than memorised answers.
          </p>

        </div>

      </div>

    </details>


    {/* =====================================================
        03
    ===================================================== */}
    <details className="cyhi-feature-item">

      <summary>

        <div className="cyhi-feature-number">
          03
        </div>

        <div className="cyhi-feature-icon">
          ◉
        </div>

        <div className="cyhi-feature-title">

          <span>
            PROGRESSION
          </span>

          <h3>
            See your skills grow.
          </h3>

        </div>

        <div className="cyhi-feature-symbol">
          +
        </div>

      </summary>

      <div className="cyhi-feature-expanded">

        <div />

        <div className="cyhi-feature-expanded-copy">

          <p>
            Track missions, XP, skills and learning progress as
            your investigation experience develops.
          </p>

        </div>

      </div>

    </details>


    {/* =====================================================
        04
    ===================================================== */}
    <details className="cyhi-feature-item">

      <summary>

        <div className="cyhi-feature-number">
          04
        </div>

        <div className="cyhi-feature-icon">
          ▦
        </div>

        <div className="cyhi-feature-title">

          <span>
            LEARNING PATHS
          </span>

          <h3>
            Connect the disciplines.
          </h3>

        </div>

        <div className="cyhi-feature-symbol">
          +
        </div>

      </summary>

      <div className="cyhi-feature-expanded">

        <div />

        <div className="cyhi-feature-expanded-copy">

          <p>
            Move between forensics, networking, incident response
            and threat intelligence as one connected journey.
          </p>

          <Link href="/learning">
            Explore learning paths →
          </Link>

        </div>

      </div>

    </details>


    {/* =====================================================
        05
    ===================================================== */}
    <details className="cyhi-feature-item">

      <summary>

        <div className="cyhi-feature-number">
          05
        </div>

        <div className="cyhi-feature-icon">
          ↗
        </div>

        <div className="cyhi-feature-title">

          <span>
            ANALYTICS
          </span>

          <h3>
            Make progress visible.
          </h3>

        </div>

        <div className="cyhi-feature-symbol">
          +
        </div>

      </summary>

      <div className="cyhi-feature-expanded">

        <div />

        <div className="cyhi-feature-expanded-copy">

          <p>
            Turn activity and performance into useful insight
            for learners and educators.
          </p>

        </div>

      </div>

    </details>

  </div>

</section>



      {/* =========================================================
          PRICING
      ========================================================= */}
      <section id="pricing" className="cyhi-pricing">

        <div className="cyhi-section-heading">

          <div>
            <span className="cyhi-section-label">
              PRICING
            </span>

            <h2>
              Start learning.
              <br />
              <span>Scale when you're ready.</span>
            </h2>
          </div>

          <p>
            Simple access for individual learners, with flexible options
            for educators and institutions.
          </p>

        </div>

        <div className="cyhi-pricing-grid">

          <article className="cyhi-price-card">

            <span className="cyhi-price-label">
              LEARNER
            </span>

            <h3>
              Free
            </h3>

            <p className="cyhi-price-description">
              Explore CY-HI Learn and start building practical
              cybersecurity skills.
            </p>

            <div className="cyhi-price-line" />

            <ul>
              <li>✓ Selected investigation missions</li>
              <li>✓ Learning paths</li>
              <li>✓ Progress tracking</li>
              <li>✓ XP and achievements</li>
            </ul>

            <Link
              href="/dashboard"
              className="cyhi-price-button"
            >
              Start learning →
            </Link>

          </article>

          <article className="cyhi-price-card featured">

            <div className="cyhi-price-badge">
              COMING SOON
            </div>

            <span className="cyhi-price-label">
              PRO LEARNER
            </span>

            <h3>
              More to investigate.
            </h3>

            <p className="cyhi-price-description">
              Expanded investigations, advanced learning paths and
              deeper practical experiences.
            </p>

            <div className="cyhi-price-line" />

            <ul>
              <li>✓ Advanced missions</li>
              <li>✓ Extended learning paths</li>
              <li>✓ Advanced progress analytics</li>
              <li>✓ Additional practical content</li>
            </ul>

            <a
              href="#contact"
              className="cyhi-price-button"
            >
              Join the waitlist →
            </a>

          </article>

          <article className="cyhi-price-card">

            <span className="cyhi-price-label">
              EDUCATION
            </span>

            <h3>
              For institutions.
            </h3>

            <p className="cyhi-price-description">
              Bring investigation-based cybersecurity learning to your
              students, programme or institution.
            </p>

            <div className="cyhi-price-line" />

            <ul>
              <li>✓ Lecturer tools</li>
              <li>✓ Student progress visibility</li>
              <li>✓ Course integration</li>
              <li>✓ Institution-wide deployment</li>
            </ul>

            <a
              href="#contact"
              className="cyhi-price-button"
            >
              Talk to CY-HI →
            </a>

          </article>

        </div>
      </section>

      {/* =========================================================
          FAQ
      ========================================================= */}
      <section className="cyhi-faq">

        <div className="cyhi-faq-intro">

          <span className="cyhi-section-label">
            FAQ
          </span>

          <h2>
            Questions before
            <br />
            <span>you investigate?</span>
          </h2>

          <p>
            A few things you might want to know before getting started.
          </p>

        </div>

        <div className="cyhi-faq-list">

          <details>
            <summary>
              What is CY-HI Learn?
              <span>+</span>
            </summary>

            <p>
              CY-HI Learn is a cybersecurity learning platform built
              around practical investigation. Instead of only consuming
              lessons, learners analyse scenarios, work with evidence and
              build investigative reasoning.
            </p>
          </details>

          <details>
            <summary>
              Do I need cybersecurity experience?
              <span>+</span>
            </summary>

            <p>
              No. Learning paths can begin with foundational concepts and
              progressively introduce more complex investigations.
            </p>
          </details>

          <details>
            <summary>
              Is CY-HI Learn only for digital forensics?
              <span>+</span>
            </summary>

            <p>
              No. The platform is designed to connect digital forensics,
              network investigation, incident response, threat intelligence
              and broader cybersecurity skills.
            </p>
          </details>

          <details>
            <summary>
              Can universities use CY-HI Learn?
              <span>+</span>
            </summary>

            <p>
              Yes. CY-HI Learn is being designed with educators and
              institutions in mind, including learner progression and
              educational analytics.
            </p>
          </details>

          <details>
            <summary>
              Is CY-HI Learn available now?
              <span>+</span>
            </summary>

            <p>
              The platform is currently being developed and tested. You can
              explore the prototype and follow the project as new
              investigations and learning experiences are released.
            </p>
          </details>

        </div>
      </section>

      {/* =========================================================
          EDUCATOR / INSTITUTION CTA
      ========================================================= */}
      <section className="cyhi-education-cta">

        <div>

          <span className="cyhi-section-label">
            FOR EDUCATORS & INSTITUTIONS
          </span>

          <h2>
            Bring investigation-based
            <br />
            <span>learning to your programme.</span>
          </h2>

          <p>
            Interested in using CY-HI Learn with your students or
            institution? We're currently exploring pilot programmes and
            educational partnerships.
          </p>

        </div>

        <a
          href="#contact"
          className="cyhi-primary"
        >
          Discuss a pilot
          <span>→</span>
        </a>

      </section>

      {/* =========================================================
          CONTACT
      ========================================================= */}
      <section id="contact" className="cyhi-contact">

        <div className="cyhi-contact-grid" />

        <div className="cyhi-contact-content">

          <span className="cyhi-section-label">
            GET IN TOUCH
          </span>

          <h2>
            Want to build better
            <br />
            <span>cybersecurity education?</span>
          </h2>

          <p>
            Whether you're a student, educator, researcher or institution,
            we'd love to hear from you.
          </p>

          <div className="cyhi-contact-actions">

            <a
              href="mailto:cyhilearn@gmail.com"
              className="cyhi-primary"
            >
              Contact CY-HI
              <span>→</span>
            </a>

            <a
              href="#pricing"
              className="cyhi-secondary"
            >
              View pricing
              <span>↓</span>
            </a>

          </div>
        </div>

        <div className="cyhi-contact-terminal">

          <div>
            <span>STATUS</span>
            <strong>OPEN FOR COLLABORATION</strong>
          </div>

          <div>
            <span>EMAIL</span>
            <strong>CYHILEARN@GMAIL.COM</strong>
          </div>

          <div>
            <span>FOCUS</span>
            <strong>
              PRACTICAL CYBERSECURITY EDUCATION
            </strong>
          </div>

        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="cyhi-final">

        <div className="cyhi-final-grid" />

        <span className="cyhi-section-label">
          YOUR INVESTIGATION STARTS HERE
        </span>

        <h2>
          Stop memorising.
          <br />
          <span>Start investigating.</span>
        </h2>

        <p>
          Build the skills, judgement and confidence to approach
          cybersecurity like an investigator.
        </p>

        <Link
          href="/dashboard"
          className="cyhi-primary"
        >
          Enter CY-HI Learn
          <span>→</span>
        </Link>

      </section>

      {/* =========================================================
          FOOTER
          NO LOGO IMAGE HERE — only footer text.
      ========================================================= */}
      <footer className="cyhi-footer">

        <div className="cyhi-footer-main">

          <Link
            href="/"
            className="cyhi-brand"
          >
            <div className="cyhi-brand-mark">
              CY
            </div>

            <div className="cyhi-brand-text">
              <strong>CY-HI</strong>
              <span>LEARN</span>
            </div>
          </Link>

          <p>
            Cybersecurity education through investigation,
            evidence and practical experience.
          </p>

        </div>

        <div className="cyhi-footer-links">

          <div>
            <strong>EXPLORE</strong>

            <a href="#how-it-works">
              How it works
            </a>

            <a href="#missions">
              Missions
            </a>

            <a href="#learning">
              Learning paths
            </a>

            <a href="#pricing">
              Pricing
            </a>
          </div>

          <div>
            <strong>PLATFORM</strong>

            <Link href="/dashboard">
              Student workspace
            </Link>

            <Link href="/missions">
              Investigation missions
            </Link>

            <Link href="/learning">
              Learning paths
            </Link>
          </div>

          <div>
            <strong>CONTACT</strong>

            <a href="mailto:cyhilearn@gmail.com">
              cyhilearn@gmail.com
            </a>

            <a href="#contact">
              Partnerships
            </a>

            <a href="#contact">
              For educators
            </a>
          </div>

          <div>
            <strong>LEGAL</strong>

            <Link href="/privacy">
              Privacy
            </Link>

            <Link href="/terms">
              Terms
            </Link>

            <Link href="/cookies">
              Cookies
            </Link>
          </div>

        </div>

        <div className="cyhi-footer-bottom">

          <span>
            © 2026 CY-HI Learn. All rights reserved.
          </span>

          <span>
            Built for practical cybersecurity education.
          </span>

        </div>

      </footer>

    </main>
  );
}
