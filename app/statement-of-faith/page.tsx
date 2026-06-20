// app/statement-of-faith/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Statement of Faith',
  description: 'What Confessed believes — a summary of our confessional commitments.',
}

const ARTICLES = [
  {
    num: '01',
    title: 'Holy Scripture',
    ref: '1689 · Chapter 1',
    body: 'The Holy Scripture is the only sufficient, certain, and infallible rule of all saving knowledge, faith, and obedience. The authority of Scripture depends not upon the testimony of any man or church but wholly upon God, who is truth itself, its author. It is to be received because it is the Word of God.',
  },
  {
    num: '02',
    title: 'The Holy Trinity',
    ref: '1689 · Chapter 2',
    body: 'There is but one only living and true God. In the unity of the Godhead there are three persons: the Father, the Son, and the Holy Spirit — of one substance, power, and eternity. Each person is fully and entirely God, co-equal and co-eternal.',
  },
  {
    num: '03',
    title: 'God\'s Eternal Decree',
    ref: '1689 · Chapter 3',
    body: 'God has freely and unchangeably ordained whatsoever comes to pass. Yet God is neither the author of sin nor does violence to the will of the creature. He has elected some from all eternity to everlasting life, to the praise of his glorious grace.',
  },
  {
    num: '04',
    title: 'Creation',
    ref: '1689 · Chapter 4',
    body: 'In the beginning it pleased God to create the world and all things therein — visible and invisible — for the display of the glory of his eternal power, wisdom, and goodness. Man was created male and female, in the image of God, with knowledge, righteousness, and true holiness.',
  },
  {
    num: '05',
    title: 'The Fall of Man',
    ref: '1689 · Chapter 6',
    body: 'Our first parents fell from their original righteousness and communion with God by eating the forbidden fruit. By this sin they fell under God\'s wrath and curse. All mankind descended from them inherit this corruption and are by nature children of wrath — dead in sin, wholly inclined to evil.',
  },
  {
    num: '06',
    title: 'The Lord Jesus Christ',
    ref: '1689 · Chapter 8',
    body: 'The Son of God, the second person of the Trinity, being very and eternal God, took upon himself man\'s nature — being conceived by the Holy Spirit and born of the Virgin Mary. He is one person with two distinct natures: divine and human. He perfectly fulfilled the law, died as a substitutionary sacrifice for sinners, rose bodily, and ascended to the right hand of the Father.',
  },
  {
    num: '07',
    title: 'Justification by Faith Alone',
    ref: '1689 · Chapter 11',
    body: 'Those whom God effectually calls he also freely justifies — not by infusing righteousness into them, but by pardoning their sins and by accounting and accepting their persons as righteous. This is by imputing the obedience and satisfaction of Christ to them, received by faith alone. Faith is not the ground of justification but the instrument.',
  },
  {
    num: '08',
    title: 'The Church',
    ref: '1689 · Chapter 26',
    body: 'The universal church consists of all the elect of all ages. The local church is a company of visible saints, called and separated from the world by the Word and Spirit of God, joined to the Lord and to one another. Baptism (by immersion of believers) and the Lord\'s Supper are the only ordinances of the church.',
  },
  {
    num: '09',
    title: 'Believers\' Baptism',
    ref: '1689 · Chapter 29',
    body: 'Baptism is an ordinance of the New Testament, instituted by Jesus Christ. The subjects are those who actually profess repentance toward God and faith in and obedience to our Lord Jesus Christ. The mode is immersion — dipping the whole body in water. It is a sign of fellowship with Christ in his death and resurrection.',
  },
  {
    num: '10',
    title: 'The Last Things',
    ref: '1689 · Chapter 31–32',
    body: 'God has appointed a day in which he will judge the world in righteousness by Jesus Christ. The dead shall be raised — the righteous to everlasting life, the wicked to everlasting punishment. Christ will return bodily, visibly, and gloriously. The righteous shall reign with him forever in the new heavens and new earth.',
  },
]

export default function StatementOfFaithPage() {
  return (
    <>
      <style>{`
        .sof-wrap {
          background: #080f1a;
          font-family: var(--font-barlow), sans-serif;
          color: #f0ece0;
          min-height: 100vh;
        }
        .sof-header {
          padding: 72px 64px 56px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          max-width: 900px;
        }
        .sof-eyebrow {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 24px;
        }
        .sof-eyebrow-line { width: 28px; height: 1px; background: #C9A94A; }
        .sof-eyebrow-text {
          font-size: 10px; font-weight: 700; letter-spacing: .2em;
          color: #C9A94A; text-transform: uppercase;
        }
        .sof-title {
          font-family: var(--font-garamond), serif;
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 400; color: #f0ece0;
          margin-bottom: 20px; line-height: 1.1;
        }
        .sof-title em { font-style: italic; color: #C9A94A; }
        .sof-lead {
          font-family: var(--font-garamond), serif;
          font-size: 18px; line-height: 1.8;
          color: rgba(240,236,224,0.5); max-width: 680px;
          margin-bottom: 24px;
        }
        .sof-confession-note {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 10px 18px;
          background: rgba(201,169,74,0.06);
          border: 1px solid rgba(201,169,74,0.15);
          border-radius: 8px;
          font-size: 12px; color: rgba(201,169,74,0.7);
          text-decoration: none;
          transition: border-color .2s;
        }
        .sof-confession-note:hover { border-color: rgba(201,169,74,0.35); }

        .sof-body { padding: 64px 64px 96px; }

        .sof-articles { display: flex; flex-direction: column; gap: 0; }
        .sof-article {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 32px;
          padding: 40px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          align-items: start;
        }
        .sof-article:last-child { border-bottom: none; }

        .sof-article-num {
          font-family: var(--font-garamond), serif;
          font-size: 32px; color: rgba(201,169,74,0.2);
          line-height: 1; padding-top: 4px;
        }
        .sof-article-ref {
          font-size: 10px; font-weight: 700; letter-spacing: .14em;
          color: rgba(201,169,74,0.4); text-transform: uppercase;
          margin-bottom: 8px;
        }
        .sof-article-title {
          font-family: var(--font-garamond), serif;
          font-size: 22px; color: #f0ece0;
          margin-bottom: 14px;
        }
        .sof-article-body {
          font-family: var(--font-garamond), serif;
          font-size: 16px; line-height: 1.85;
          color: rgba(240,236,224,0.55);
        }

        .sof-footer {
          padding: 0 64px 80px;
          max-width: 760px;
        }
        .sof-footer-quote {
          padding: 0 0 0 28px;
          border-left: 3px solid #C9A94A;
          margin-bottom: 32px;
        }
        .sof-footer-quote p {
          font-family: var(--font-garamond), serif;
          font-size: 19px; font-style: italic;
          line-height: 1.75; color: rgba(240,236,224,0.5);
          margin-bottom: 10px;
        }
        .sof-footer-quote cite {
          font-size: 11px; font-weight: 700; letter-spacing: .14em;
          color: #C9A94A; text-transform: uppercase; font-style: normal;
        }
        .sof-footer-note {
          font-family: var(--font-garamond), serif;
          font-size: 15px; line-height: 1.8;
          color: rgba(240,236,224,0.3);
        }
        .sof-footer-note a { color: #C9A94A; text-decoration: none; }
        .sof-footer-note a:hover { text-decoration: underline; }

        @media (max-width: 768px) {
          .sof-header { padding: 48px 20px 40px; }
          .sof-body   { padding: 48px 20px 72px; }
          .sof-footer { padding: 0 20px 64px; }
          .sof-article { grid-template-columns: 1fr; gap: 8px; }
          .sof-article-num { font-size: 24px; }
        }
      `}</style>

      <div className="sof-wrap">
        <div className="sof-header">
          <div className="sof-eyebrow">
            <span className="sof-eyebrow-line" />
            <span className="sof-eyebrow-text">What we believe</span>
            <span className="sof-eyebrow-line" />
          </div>
          <h1 className="sof-title">Statement<br />of <em>Faith</em></h1>
          <p className="sof-lead">
            Confessed stands within the Reformed Baptist confessional tradition.
            The following is a summary of our core theological commitments,
            drawn from the Second London Baptist Confession of Faith (1689) —
            which we hold as a faithful summary of the teaching of Holy Scripture.
          </p>
          <Link
            href="https://www.1689.com"
            target="_blank"
            rel="noopener"
            className="sof-confession-note"
          >
            Read the full 1689 Confession
          </Link>
        </div>

        <div className="sof-body">
          <div className="sof-articles">
            {ARTICLES.map(a => (
              <div key={a.num} className="sof-article">
                <div className="sof-article-num">{a.num}</div>
                <div>
                  <p className="sof-article-ref">{a.ref}</p>
                  <h2 className="sof-article-title">{a.title}</h2>
                  <p className="sof-article-body">{a.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sof-footer">
          <div className="sof-footer-quote">
            <p>"If you confess with your mouth that Jesus is Lord and believe in your heart that God raised him from the dead, you will be saved."</p>
            <cite>Romans 10:9 · ESV</cite>
          </div>
          <p className="sof-footer-note">
            This statement is a summary. For the full and authoritative expression of what we believe,
            we commend the{' '}
            <Link href="https://www.1689.com" target="_blank" rel="noopener">
              Second London Baptist Confession of Faith (1689)
            </Link>
            {' '}to every reader. Questions? <Link href="/contact">Contact us.</Link>
          </p>
        </div>
      </div>
    </>
  )
}
