
import { montserrat } from '../ui/fonts';
import Image from 'next/image';


export default function AcmeLogo() {
  return (
    <div
      className={`${montserrat.className} flex flex-row items-center leading-none text-white`}
    >
      <Image src="/images/logo_paro.png" alt="Paro" width={200} height={100} />
    </div>
  );
}
