import Link from "next/link";

// icons/images.
import HouseIcon from "../icons/House";
import ChevronRightIcon from "../icons/ChevronRight";

const Breadcrumb = ({ label }) => {
  return (
    <div className="container flex items-center gap-3 py-4">
      <Link href="/" className="text-base text-primary">
        <HouseIcon />
      </Link>
      <span className="text-sm text-gray-400">
        <ChevronRightIcon />
      </span>
      <p className="font-medium text-gray-600">{label}</p>
    </div>
  );
};

export default Breadcrumb;
