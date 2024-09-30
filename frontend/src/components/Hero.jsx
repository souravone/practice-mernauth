import { Link } from "react-router-dom";
export default function Hero() {
  return (
    <>
      {/*<!-- Component: User profile card --> */}
      <div className="overflow-hidden mx-auto rounded bg-white text-center  text-slate-500 shadow-md shadow-slate-200 w-[60%]">
        {/*  <!-- Body--> */}
        <div className="p-6 flex">
          <header className="mb-4">
            <h3 className="text-2xl m-6 font-medium text-slate-700">
              MERN Authentication
            </h3>
            <p className=" text-slate-400 text-xl">
              This is a boilerplate for MERN authentication that stores a JWT in
              an HTTP-Only cookie. It also uses Redux toolkit and the Tailwind
              library.
            </p>
          </header>
        </div>
        {/*  <!-- Action base sized with lead icon buttons  --> */}
        <div className="flex justify-center gap-10 p-6 pt-0">
          <Link
            to="/login"
            className="inline-flex h-10  items-center justify-center gap-2 whitespace-nowrap rounded bg-emerald-500 px-5 md:px-10 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
          >
            <span className="order-2">Sign In</span>
          </Link>
          <Link
            to="/register"
            className="inline-flex h-10  items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded bg-emerald-50 px-5 md:px-10 text-sm font-medium tracking-wide text-emerald-500 transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-100 disabled:text-emerald-400 disabled:shadow-none"
          >
            <span className="order-2">Sign Up</span>
          </Link>
        </div>
      </div>
      {/*<!-- End User profile card --> */}
    </>
  );
}
