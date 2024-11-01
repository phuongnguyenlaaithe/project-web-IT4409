import { assets } from '../assets/assets';
import ProductItem from '../components/ProductItem';

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: [assets.p_img1],
    imageAlt: 'Men Round Neck Pure Cotton T-shirt',
    price: '$35',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: [assets.p_img1],
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: [assets.p_img2_3],
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: [assets.p_img2_3],
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: [assets.p_img2_4],
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: [assets.p_img2_3],
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
];

const Collection = () => {
  return (
    <main className="mx-auto pt-6 border-t border-gray-300">
      <section aria-labelledby="products-heading" className="pb-24 pt-6">
        <h2 id="products-heading" className="sr-only">
          Products
        </h2>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* Filters */}
          <form className="flex flex-col gap-2">
            <h2 className="text-2xl">Filter</h2>
            <div className="w-full border rounded p-4 mt-5">
              <h2 className="text-lg">Categories</h2>
              <div className="flex flex-col gap-4 mt-3">
                <div class="flex items-center">
                  <input
                    id="checked-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checked-checkbox" class="ms-2 text-sm font-normal">
                    Men
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    id="checked-checkbox1"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checked-checkbox1" class="ms-2 text-sm font-normal">
                    Women
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    id="checked-checkbox2"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checked-checkbox2" class="ms-2 text-sm font-normal">
                    Kids
                  </label>
                </div>
              </div>
            </div>

            <div className="w-full border rounded p-4 mt-5">
              <h2 className="text-lg">Type</h2>
              <div className="flex flex-col gap-4 mt-3">
                <div class="flex items-center">
                  <input
                    id="checked-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checked-checkbox" class="ms-2 text-sm font-normal">
                    Topwear
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    id="checked-checkbox1"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checked-checkbox1" class="ms-2 text-sm font-normal">
                    Bottomwaer
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    id="checked-checkbox2"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checked-checkbox2" class="ms-2 text-sm font-normal">
                    Winterwear
                  </label>
                </div>
              </div>
            </div>
          </form>

          {/* Product grid */}
          <div className="lg:col-span-3">
            {/* <ProductList /> */}
            <div>
              <div className="mb-6">
                <div className="flex gap-2 text-3xl">
                  <span className="text-gray-600">All</span>
                  <span className="font-semibold">COLLECTIONS</span>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                  <ProductItem id={product.id} image={product.imageSrc} name={product.name} price={product.price} />
                  // <div key={product.id} className="group relative">
                  //   <div className="w-full h-[260px] overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75">
                  //     <img
                  //       alt={product.imageAlt}
                  //       src={product.imageSrc}
                  //       className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  //     />
                  //   </div>
                  //   <div className="mt-4 flex justify-between flex-col">
                  //     <div>
                  //       <h3 className="text-base text-[#494949]">
                  //         <a href={product.href}>
                  //           <span aria-hidden="true" className="absolute font-medium inset-0" />
                  //           {product.name}
                  //         </a>
                  //       </h3>
                  //     </div>
                  //     <p className="font-medium text-base text-[#494949]">{product.price}</p>
                  //   </div>
                  // </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Collection;
