import Link from "next/link";
import Image from "next/image";

// icons/images.
import OfferImage from "/public/offer.jpg";

const Advertisement = () => {
  return (
    <div className="container pb-16">
      <Link href="/shop">
        <Image src={OfferImage} alt="Offer" className="w-full" />
      </Link>
    </div>
  );
};

export default Advertisement;
