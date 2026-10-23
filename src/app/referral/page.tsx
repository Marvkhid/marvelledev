import { ReferralForm } from '@/components/ReferralForm';
import { meta } from '@/lib/seo';

export const metadata = meta('Referral Programme', 'Know a business that needs a website? Introduce them to MarvelleDev and be rewarded under the programme’s agreed conditions.', '/referral');

const steps = ['Identify a business that needs a website or web application.', 'Submit the referral here.', 'I contact the prospective client.', 'We discuss requirements and agree on a project.', 'The client signs off the commercial terms and makes the required payment.', 'The referral becomes eligible for the agreed bonus.', 'The bonus is paid according to the stated payment terms.'];

export default function Referral() {
  return (
    <section className="w">
      <p className="tag">// Referral programme</p>
      <h2>Know a Business That Needs a Website? Get Rewarded for the Introduction.</h2>
      <p className="mut lead">People who refer a client may receive a cash referral bonus when the referred project meets the programme’s agreed conditions. The bonus amount, eligibility rules, payment timing, duplicate handling and refund treatment are published here once configured.</p>
      <div className="g" style={{ marginTop: 28, alignItems: 'start' }}>
        <ol className="pr">{steps.map((s) => <li key={s}>{s}</li>)}</ol>
        <ReferralForm />
      </div>
    </section>
  );
}
