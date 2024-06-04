import Link from "next/link";
import Image from "next/image";

// actions.
import { getCategories } from "@/actions/categories";

const Categories = async () => {
  const categories = await getCategories();

  return (
    <div className="container py-16">
      <h2 className="mb-6 text-2xl font-medium text-gray-800 uppercase">
        shop by category
      </h2>

      <div className="grid grid-cols-3 gap-3">
        {categories?.map(({ id, name, image }) => (
          <div key={id} className="relative overflow-hidden rounded-sm group">
            <Image
              alt={name}
              src={image}
              width={407}
              height={253}
              className="w-full"
            />
            <Link
              href={`/shop?categoryId=${id}`}
              className="absolute inset-0 flex items-center justify-center text-xl font-medium text-white transition bg-black bg-opacity-40 font-roboto group-hover:bg-opacity-60"
            >
              {name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
