// app/about/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'What Confessed is, why it exists, and what it believes.',
}

const VALUES = [
  {
    label: 'Confessional',
    desc: 'We stand within a confessional tradition — the 1689 Second London Baptist Confession of Faith as a faithful and accurate summary of the teaching of Scripture. We did not invent our theology. We received it. We hold it. We contend for it.',
  },
  {
    label: 'Presuppositional',
    desc: 'We do not begin from neutral ground. Every worldview begins with presuppositions. Ours begin with Scripture — the self-attesting Word of the living God. Our apologetics expose the internal incoherence of every system that rejects Christ as Lord.',
  },
  {
    label: 'Accessible',
    desc: 'Serious theology does not require an academic degree to understand. Every article, episode, and study on Confessed is written to be read by the person in the pew, the student in the library, and the seeker with honest questions.',
  },
  {
    label: 'Missional',
    desc: 'Every piece of content ultimately points toward the gospel of Jesus Christ. Doctrine is not an end in itself. It is the architecture of a life spent knowing, loving, and proclaiming the God who saves sinners by grace alone.',
  },
  {
    label: 'Excellent',
    desc: 'The God we serve deserves our best. We will not produce content that is careless, shallow, or poorly reasoned. In writing, video, audio, and design — we pursue excellence as an act of worship.',
  },
]

const SERIES = [
  {
    name: 'Articles of Faith',
    ref: 'Ephesians 4:13',
    desc: 'The flagship systematic theology series. A structured walk through every major Christian doctrine — from the doctrine of Scripture to eschatology — from a strictly Reformed Baptist confessional standpoint. The doctrinal backbone of Confessed.',
  },
  {
    name: 'The 1689 Project',
    ref: '2 Timothy 1:13',
    desc: 'Article by article through the Second London Baptist Confession of Faith. Each entry grounds one article exegetically in Scripture, traces it historically through church history, and applies it practically to the local church today.',
  },
  {
    name: 'Iron & Ink',
    ref: '1 Peter 3:15',
    desc: 'Presuppositional apologetics in practice. Equipping believers to defend the faith against atheism, secularism, Islam, Roman Catholicism, Eastern Orthodoxy, and theological liberalism. Every entry follows a consistent structure: understand, expose, proclaim.',
  },
  {
    name: 'Other Paths',
    ref: 'Jude 1:3',
    desc: 'Careful, irenic, but precise engagement with other Christian traditions. Always steel-manning the opposing view before responding. Not hostile — truthful. The goal is clarity, not victory.',
  },
  {
    name: 'Reasoned Grace',
    ref: 'Isaiah 1:18',
    desc: 'The front door of Confessed. Designed specifically for the honest non-believer — intellectually rigorous, never condescending, always gospel-centred. Every entry ends with a clear and warm presentation of the gospel.',
  },
  {
    name: 'The Particular Path',
    ref: 'Jeremiah 6:16',
    desc: 'The story of Reformed Baptist Christianity — from the English Particular Baptists of the 1600s to the present. Figures, confessions, controversies, and continuity. History that forms identity.',
  },
  {
    name: 'Daily Office',
    ref: 'Psalm 119:105',
    desc: 'Short daily devotionals tied to a structured Bible reading plan. Designed for the rhythms of ordinary Christian life. Reformed in theology. Warm in tone. Brief by design.',
  },
  {
    name: 'Consistent Truth',
    ref: '2 Corinthians 10:5',
    desc: 'Cultural commentary from a Reformed Baptist worldview. Current events, philosophy, ethics, science, and the arts — examined through the lens of Scripture, showing that the Christian worldview alone accounts for logic, morality, and meaning.',
  },
]

export default function AboutPage() {
  return (
    <>
      <style>{`
        .ab-wrap {
          background: #080f1a;
          font-family: var(--font-barlow), sans-serif;
          color: #f0ece0;
        }

        /* Hero */
        .ab-hero {
          padding: 96px 64px 80px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          max-width: 1000px;
        }
        .ab-eyebrow {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 28px;
        }
        .ab-eyebrow-line { width: 28px; height: 1px; background: #C9A94A; }
        .ab-eyebrow-text {
          font-size: 10px; font-weight: 700; letter-spacing: .2em;
          color: #C9A94A; text-transform: uppercase;
        }
        .ab-hero-title {
          font-family: var(--font-garamond), serif;
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 400; line-height: 1.1;
          color: #f0ece0; margin-bottom: 28px;
        }
        .ab-hero-title em { font-style: italic; color: #C9A94A; }
        .ab-hero-lead {
          font-family: var(--font-garamond), serif;
          font-size: clamp(18px, 2.5vw, 22px);
          line-height: 1.8; color: rgba(240,236,224,0.6);
          max-width: 720px;
        }

        /* Sections */
        .ab-section {
          padding: 80px 64px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .ab-section:last-child { border-bottom: none; }

        .ab-section-label {
          font-size: 10px; font-weight: 700; letter-spacing: .2em;
          color: rgba(201,169,74,0.5); text-transform: uppercase;
          margin-bottom: 20px;
        }
        .ab-section-title {
          font-family: var(--font-garamond), serif;
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 400; color: #f0ece0;
          margin-bottom: 24px; line-height: 1.2;
        }
        .ab-section-title em { font-style: italic; color: #C9A94A; }

        .ab-prose {
          font-family: var(--font-garamond), serif;
          font-size: 18px; line-height: 1.85;
          color: rgba(240,236,224,0.65);
          max-width: 760px;
        }
        .ab-prose + .ab-prose { margin-top: 20px; }

        /* Pull quote */
        .ab-quote {
          margin: 48px 0;
          padding: 0 0 0 32px;
          border-left: 3px solid #C9A94A;
          max-width: 640px;
        }
        .ab-quote p {
          font-family: var(--font-garamond), serif;
          font-size: 22px; font-style: italic;
          line-height: 1.7; color: rgba(240,236,224,0.7);
          margin-bottom: 12px;
        }
        .ab-quote cite {
          font-size: 11px; font-weight: 700; letter-spacing: .14em;
          color: #C9A94A; text-transform: uppercase; font-style: normal;
        }

        /* Name meaning cards */
        .ab-name-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 12px;
          overflow: hidden;
          margin-top: 40px;
        }
        .ab-name-card {
          background: #0b1929;
          padding: 32px 28px;
        }
        .ab-name-card-num {
          font-size: 10px; font-weight: 700; letter-spacing: .16em;
          color: rgba(201,169,74,0.4); text-transform: uppercase;
          margin-bottom: 12px;
        }
        .ab-name-card-title {
          font-family: var(--font-garamond), serif;
          font-size: 20px; color: #f0ece0;
          margin-bottom: 12px;
        }
        .ab-name-card-desc {
          font-family: var(--font-garamond), serif;
          font-size: 15px; line-height: 1.7;
          color: rgba(240,236,224,0.45); font-style: italic;
        }

        /* Values */
        .ab-values { display: flex; flex-direction: column; gap: 0; margin-top: 40px; }
        .ab-value {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 32px;
          padding: 28px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          align-items: start;
        }
        .ab-value:last-child { border-bottom: none; }
        .ab-value-label {
          font-size: 13px; font-weight: 700; letter-spacing: .06em;
          color: #C9A94A; padding-top: 3px;
        }
        .ab-value-desc {
          font-family: var(--font-garamond), serif;
          font-size: 17px; line-height: 1.8;
          color: rgba(240,236,224,0.6);
        }

        /* Series grid */
        .ab-series-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 12px;
          overflow: hidden;
          margin-top: 40px;
        }
        .ab-series-card {
          background: #0b1929;
          padding: 28px;
        }
        .ab-series-ref {
          font-size: 10px; font-weight: 700; letter-spacing: .14em;
          color: rgba(201,169,74,0.5); text-transform: uppercase;
          margin-bottom: 8px;
        }
        .ab-series-name {
          font-family: var(--font-garamond), serif;
          font-size: 19px; color: #f0ece0;
          margin-bottom: 10px;
        }
        .ab-series-desc {
          font-family: var(--font-garamond), serif;
          font-size: 14px; line-height: 1.7;
          color: rgba(240,236,224,0.4); font-style: italic;
        }

        /* Stat row */
        .ab-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 12px;
          overflow: hidden;
          margin-top: 40px;
        }
        .ab-stat {
          background: #0b1929;
          padding: 32px 24px;
          text-align: center;
        }
        .ab-stat-num {
          font-family: var(--font-garamond), serif;
          font-size: 40px; color: #C9A94A;
          line-height: 1; margin-bottom: 8px;
        }
        .ab-stat-label {
          font-size: 10px; font-weight: 700; letter-spacing: .14em;
          color: rgba(240,236,224,0.3); text-transform: uppercase;
        }

        /* CTA */
        .ab-cta {
          display: flex; gap: 12px; align-items: center;
          margin-top: 40px; flex-wrap: wrap;
        }
        .ab-btn-gold {
          background: #C9A94A; border: none; color: #080f1a;
          padding: 13px 28px; border-radius: 8px;
          font-size: 13px; font-weight: 700; letter-spacing: .06em;
          text-decoration: none; font-family: var(--font-barlow), sans-serif;
          transition: background .2s;
        }
        .ab-btn-gold:hover { background: #b89840; }
        .ab-btn-ghost {
          background: transparent; border: 1px solid rgba(255,255,255,0.15);
          color: rgba(240,236,224,0.65);
          padding: 12px 24px; border-radius: 8px;
          font-size: 13px; font-weight: 500;
          text-decoration: none; font-family: var(--font-barlow), sans-serif;
          transition: all .2s;
        }
        .ab-btn-ghost:hover { border-color: rgba(201,169,74,0.4); color: #f0ece0; }

        /* Responsive */
        @media (max-width: 1024px) {
          .ab-hero    { padding: 72px 40px 64px; }
          .ab-section { padding: 64px 40px; }
          .ab-name-cards  { grid-template-columns: 1fr 1fr; }
          .ab-stats { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .ab-hero    { padding: 56px 20px 48px; }
          .ab-section { padding: 48px 20px; }
          .ab-name-cards  { grid-template-columns: 1fr; }
          .ab-series-grid { grid-template-columns: 1fr; }
          .ab-value { grid-template-columns: 1fr; gap: 8px; }
          .ab-stats { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .ab-stats { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="ab-wrap">

        {/* Hero */}
        <div className="ab-hero">
          <div className="ab-eyebrow">
            <span className="ab-eyebrow-line" />
            <span className="ab-eyebrow-text">Reformed · Confessional · Baptist</span>
            <span className="ab-eyebrow-line" />
          </div>
          <h1 className="ab-hero-title">
            Theology for the<br />church, <em>not the academy</em>
          </h1>
          <p className="ab-hero-lead">
            Confessed is a Reformed Baptist theology, apologetics, and discipleship platform
            built for the digital age. Rooted in the historic Christian faith as confessed
            by the Particular Baptists of the 17th century. Carrying that faith confidently
            into every conversation, culture, and challenge of the 21st.
          </p>
        </div>

        {/* Vision */}
        <div className="ab-section">
          <p className="ab-section-label">Vision</p>
          <h2 className="ab-section-title">Why <em>Confessed</em> exists</h2>
          <p className="ab-prose">
            The digital world is full of voices — many of them loud, few of them grounded.
            Reformed theology has a long and glorious history of producing serious, careful,
            faithful content. But in the age of short-form video and algorithmic distraction,
            that tradition has struggled to find a home that matches the quality of the
            message it carries.
          </p>
          <p className="ab-prose">
            Confessed exists to change that. Not with cheap production or clickbait theology —
            but with the kind of content that treats its audience as adults capable of engaging
            serious ideas seriously. Articles that take a position and defend it. Apologetics
            that engage the best objections. History that forms identity. Devotionals that
            feed the soul without flattering it.
          </p>
          <div className="ab-quote">
            <p>"For I am not ashamed of the gospel, for it is the power of God for salvation to everyone who believes — to the Jew first and also to the Greek."</p>
            <cite>Romans 1:16 · ESV</cite>
          </div>
          <p className="ab-prose">
            We are building the Reformed Baptist equivalent of The Gospel Coalition, Ligonier
            Ministries, or Desiring God — not as a copy, but as something distinct: confessionally
            Baptist, presuppositionally consistent, and built from the African continent for the
            entire world.
          </p>
        </div>

        {/* Mission */}
        <div className="ab-section">
          <p className="ab-section-label">Mission</p>
          <h2 className="ab-section-title">What we are <em>here to do</em></h2>
          <p className="ab-prose">
            To make Reformed Baptist theology accessible, compelling, and missional —
            producing content that equips the saint, engages the seeker, and answers the critic.
          </p>
          <p className="ab-prose">
            Through articles, video, audio, structured curriculum, and a Bible reader,
            Confessed is a full theological home for anyone willing to follow the truth
            wherever it leads. We are not a denomination, a church, or a seminary. We are
            a media platform — a digital publishing house with a confessional anchor and
            a missionary heart.
          </p>
          <div className="ab-stats">
            {[
              { num: '8', label: 'Content Series' },
              { num: '1689', label: 'Our Confession' },
              { num: '1', label: 'Gospel' },
              { num: '∞', label: 'Audience' },
            ].map(s => (
              <div key={s.label} className="ab-stat">
                <div className="ab-stat-num">{s.num}</div>
                <div className="ab-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* The name */}
        <div className="ab-section">
          <p className="ab-section-label">The Name</p>
          <h2 className="ab-section-title">Why <em>Confessed?</em></h2>
          <p className="ab-prose">
            The name was chosen because it carries three layers of meaning simultaneously —
            and that multiplicity is precisely what makes it right.
          </p>
          <div className="ab-name-cards">
            {[
              {
                num: '01',
                title: 'The Declaration',
                desc: 'Romans 10:9 — "If you confess with your mouth that Jesus is Lord." The name is a direct echo of the foundational act of Christian faith. Every piece of content on this platform flows from that confession.',
              },
              {
                num: '02',
                title: 'The Confession',
                desc: 'The confessional tradition — the 1689 Second London Baptist Confession of Faith, the Apostles\' Creed, the Nicene Creed. The name signals that this platform stands within a historic, settled body of doctrine — not an ad hoc theology.',
              },
              {
                num: '03',
                title: 'The Settled Conviction',
                desc: 'Passive voice — not "we confess" but "it has been confessed." The truth precedes us. We did not invent it. We received it. We hold it. We are stewards of something far older and far greater than ourselves.',
              },
            ].map(c => (
              <div key={c.num} className="ab-name-card">
                <p className="ab-name-card-num">{c.num}</p>
                <p className="ab-name-card-title">{c.title}</p>
                <p className="ab-name-card-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="ab-section">
          <p className="ab-section-label">Core Values</p>
          <h2 className="ab-section-title">What we <em>stand for</em></h2>
          <div className="ab-values">
            {VALUES.map(v => (
              <div key={v.label} className="ab-value">
                <span className="ab-value-label">{v.label}</span>
                <p className="ab-value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* The 1689 */}
        <div className="ab-section">
          <p className="ab-section-label">Our Anchor</p>
          <h2 className="ab-section-title">The <em>1689 Confession</em></h2>
          <p className="ab-prose">
            Confessed is explicitly and unapologetically Reformed Baptist. We hold the
            Second London Baptist Confession of Faith (1689) as a faithful and accurate
            summary of the teaching of Holy Scripture. It is not Scripture — no confession is.
            But it is the best human articulation of what Scripture teaches that we know of,
            and we are glad to stand under it.
          </p>
          <p className="ab-prose">
            This places us in a particular stream of the church — the stream of Benjamin Keach,
            William Kiffin, John Gill, Charles Haddon Spurgeon, and the Particular Baptists
            who refused both the sacramentalism of Rome and the revivalism of Arminianism,
            and held to the doctrines of grace with full Baptist convictions.
          </p>
          <div className="ab-quote">
            <p>"Hold fast the pattern of sound words which you have heard from me, in faith and love which are in Christ Jesus."</p>
            <cite>2 Timothy 1:13 · ESV</cite>
          </div>
          <p className="ab-prose">
            We are not ashamed of our confessional identity. We believe confessionalism is
            not a limitation on theological inquiry but a protection of theological integrity.
            The 1689 did not fall from heaven — it was hammered out by men who read their
            Bibles carefully, knew church history deeply, and were willing to die for what
            they believed. We receive their work with gratitude.
          </p>
        </div>

        {/* Inspiration */}
        <div className="ab-section">
          <p className="ab-section-label">Inspiration</p>
          <h2 className="ab-section-title">Built from <em>Africa,</em> for the world</h2>
          <p className="ab-prose">
            Confessed is built from Nairobi, Kenya. That is not incidental. It is a statement.
            The Reformed faith is not the property of the Western church. It never was.
            The doctrines of grace are the doctrines of Scripture — and Scripture belongs
            to every tribe, tongue, people, and nation that God has redeemed.
          </p>
          <p className="ab-prose">
            The African church is one of the most vibrant expressions of Christianity on
            the planet. It is also, in many places, theologically vulnerable — susceptible
            to prosperity theology, experiential excess, and a shallow engagement with the
            Word. We believe the Reformed confessional tradition is exactly what many
            African believers need and are ready for. And we believe African theological
            voices have something vital to offer the global church.
          </p>
          <p className="ab-prose">
            Confessed is our contribution to that conversation. Serious. Confessional.
            African. Global.
          </p>
        </div>

        {/* Series */}
        <div className="ab-section">
          <p className="ab-section-label">Content</p>
          <h2 className="ab-section-title">Eight series.<br /><em>One confession.</em></h2>
          <p className="ab-prose">
            Confessed is organised into eight content series, each with a distinct audience,
            purpose, and format. Together they form a complete discipleship pipeline —
            from the honest non-believer to the theologically mature pastor.
          </p>
          <div className="ab-series-grid">
            {SERIES.map(s => (
              <div key={s.name} className="ab-series-card">
                <p className="ab-series-ref">{s.ref}</p>
                <p className="ab-series-name">{s.name}</p>
                <p className="ab-series-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="ab-section">
          <p className="ab-section-label">Join us</p>
          <h2 className="ab-section-title">Read. <em>Learn. Contend.</em></h2>
          <p className="ab-prose">
            If you are a believer who wants to go deeper — start with the articles.
            If you are a skeptic with honest questions — start with Reasoned Grace.
            If you want to write — apply to become a contributor.
            If you want to stay connected — subscribe to the newsletter.
          </p>
          <div className="ab-cta">
            <Link href="/articles" className="ab-btn-gold">Read the articles</Link>
            <Link href="/sign-up" className="ab-btn-ghost">Create an account</Link>
            <Link href="/contact" className="ab-btn-ghost">Get in touch</Link>
          </div>
        </div>

      </div>
    </>
  )
}
