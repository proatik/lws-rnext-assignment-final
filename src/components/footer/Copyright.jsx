import Image from "next/image";

// icons/images.
import MethodsImage from "/public/methods.png";

const Copyright = () => {
  return (
    <div className="py-4 bg-gray-800">
      <div className="container flex items-center justify-between">
        <p className="text-white">© TailCommerce - All Right Reserved</p>
        <div>
          <Image alt="Methods" src={MethodsImage} className="w-auto h-5" />
        </div>
      </div>
    </div>
  );
};

export default Copyright;
