import Link from "next/link";
import Image from "next/image";

// icons/images.
import Logo from "/public/logo.svg";
import FacebookIcon from "../icons/Facebook";
import InstagramIcon from "../icons/Instagram";
import TwitterIcon from "../icons/Twitter";
import GithubIcon from "../icons/Github";

const Footer = () => {
  return (
    <footer className="pt-16 pb-12 bg-white border-t border-gray-100">
      <div className="container grid grid-cols-1 ">
        <div className="col-span-1 space-y-4">
          <Image src={Logo} alt="Logo" className="w-30" />
          <div className="mr-2">
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
              hic?
            </p>
          </div>

          <div className="flex space-x-5">
            <Link href="#" className="text-gray-400 hover:text-gray-500">
              <FacebookIcon />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-500">
              <InstagramIcon />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-500">
              <TwitterIcon />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-500">
              <GithubIcon />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 col-span-2 gap-4 mt-2">
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
                Solutions
              </h3>
              <div className="mt-4 space-y-4">
                <Link
                  href="#"
                  className="block text-base text-gray-500 hover:text-gray-900"
                >
                  Marketing
                </Link>
                <Link
                  href="#"
                  className="block text-base text-gray-500 hover:text-gray-900"
                >
                  Analytics
                </Link>
                <Link
                  href="#"
                  className="block text-base text-gray-500 hover:text-gray-900"
                >
                  Commerce
                </Link>
                <Link
                  href="#"
                  className="block text-base text-gray-500 hover:text-gray-900"
                >
                  Insights
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
                Support
              </h3>
              <div className="mt-4 space-y-4">
                <Link
                  href="#"
                  className="block text-base text-gray-500 hover:text-gray-900"
                >
                  Pricing
                </Link>
                <Link
                  href="#"
                  className="block text-base text-gray-500 hover:text-gray-900"
                >
                  Guides
                </Link>
                <Link
                  href="#"
                  className="block text-base text-gray-500 hover:text-gray-900"
                >
                  API Status
                </Link>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
                Solutions
              </h3>
              <div className="mt-4 space-y-4">
                <Link
                  href="#"
                  className="block text-base text-gray-500 hover:text-gray-900"
                >
                  Marketing
                </Link>
                <Link
                  href="#"
                  className="block text-base text-gray-500 hover:text-gray-900"
                >
                  Analytics
                </Link>
                <Link
                  href="#"
                  className="block text-base text-gray-500 hover:text-gray-900"
                >
                  Commerce
                </Link>
                <Link
                  href="#"
                  className="block text-base text-gray-500 hover:text-gray-900"
                >
                  Insights
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
                Support
              </h3>
              <div className="mt-4 space-y-4">
                <Link
                  href="#"
                  className="block text-base text-gray-500 hover:text-gray-900"
                >
                  Pricing
                </Link>
                <Link
                  href="#"
                  className="block text-base text-gray-500 hover:text-gray-900"
                >
                  Guides
                </Link>
                <Link
                  href="#"
                  className="block text-base text-gray-500 hover:text-gray-900"
                >
                  API Status
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
