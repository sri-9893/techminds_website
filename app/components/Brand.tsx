import Image from 'next/image';

export default function Brand() {
  return <span className="brand"><span className="company-logo-crop"><Image src="/images/company-logo.jpeg" alt="" width={1024} height={1536} sizes="96px" className="company-logo-image" /></span><span className="brand-name"><strong>Tech Minds</strong><small>IT SOLUTIONS</small></span></span>;
}
