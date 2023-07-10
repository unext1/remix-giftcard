import { Link } from '@remix-run/react';

export default function Hero() {
  return (
    <div className="bg-background">
      <div className="relative isolate overflow-hidden ">
        <div className="mx-auto max-w-7xl lg:grid py-32 lg:grid-cols-2 px-4 lg:py-56 relative">
          <div className="my-auto">
            <div className="mx-auto max-w-2xl my-auto">
              <div className="max-w-lg">
                <div>
                  <h1 className="text-left font-semibold text-4xl sm:text-8xl text-white">
                    <span className="text-primary">Q</span>Pong
                  </h1>
                  <p className="mt-6 text-base">
                    Enhance your online shopping experience with personalized gift cards tailored to your preferences.
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-x-6">
                  <Link
                    to="login"
                    className="btn btn-primary text-sm font-semibold leading-6 transition hover:translate-x-1"
                  >
                    Login
                  </Link>
                  <Link to="#about" className="text-sm font-semibold leading-6 transition hover:translate-x-1 ">
                    About <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen ">
            <div
              className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] h-full skew-x-[-30deg] bg-neutral shadow-xl shadow-background/10 md:-mr-20 lg:-mr-36"
              aria-hidden="true"
            />
            {/* <ImageComponent
              src="https://imgur.com/yfxwuzF"
              alt="illustration"
              className="rounded-xl h-[400px] lg:h-[500px] w-full object-cover shadow-[0px 0px 16px 3px rgba(85,102,81,1)]"
              // style={{ boxShadow: "0px 0px 16px 3px rgba(85,102,81,1)" }}
            /> */}
            <img
              src="https://cdn3d.iconscout.com/3d/premium/thumb/gift-card-5580691-4668671.png"
              alt="illustration"
              className="rounded-xl w-[350px] opacity-80 hover:scale-110 transition hover:rotate-12 object-cover"
            />
          </div>
        </div>
        {/* <div className="absolute inset-x-0 bottom-0 -z-10 h-20 bg-gradient-to-t from-background via-background sm:h-20" /> */}
      </div>
    </div>
  );
}
