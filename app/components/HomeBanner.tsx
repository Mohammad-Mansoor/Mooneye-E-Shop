import Image from "next/image";

const HomeBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-sky-500 to-sky-700 mb-8 hover:shadow-xl">
      <div className="mx-auto flex flex-col md:flex-row px-8 py-12 items-center justify-evenly gap-2 ">
        <div className="text-center mb-8 md:mb-0">
          <h1 className="text-4xl md:text-6xl text-white font-bold mb-4">
            Summer Discount
          </h1>
          <p className="text-lg md:text-xl text-white mb-2">
            Enjoy discount on selected items
          </p>
          <p className="text-2xl md:text-5xl text-yellow-500 font-bold ">
            Get 50% off
          </p>
        </div>
        <div className="w-1/3 relative aspect-video">
          <Image
            src="/banner-image.png"
            alt="banner image"
            className="object-contain"
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
