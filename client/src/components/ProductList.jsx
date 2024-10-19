import { assets } from "../assets/assets";

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: assets.about_img,
    imageAlt: "Men Round Neck Pure Cotton T-shirt",
    price: '$35',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: assets.p_img1,
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: assets.p_img2_3,
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: assets.p_img2_4,
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: assets.p_img2_3,
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
];

const ProductList = () => {
  return (
    <div>
      <div className="mb-6">
        <div className="flex gap-2 text-3xl">
          <span className="text-gray-600">All</span>
          <span className="font-semibold">COLLECTIONS</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="group relative">
            <div className="w-full h-[260px] overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75">
              <img
                alt={product.imageAlt}
                src={product.imageSrc}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between flex-col">
              <div>
                <h3 className="text-base text-[#494949]">
                  <a href={product.href}>
                    <span aria-hidden="true" className="absolute font-medium inset-0" />
                    {product.name}
                  </a>
                </h3>
              </div>
              <p className="font-medium text-base text-[#494949]">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
