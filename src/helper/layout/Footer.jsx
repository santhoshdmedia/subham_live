import { Link } from "react-router-dom";
import { ICON_HELPER } from "../helper/IconHelper";
import { IMAGE_HELPER } from "../helper/Imagehelper";

const Footer = () => {
  const socialIcons = [
    {
      id: 1,
      title: ICON_HELPER.FACEBOOK_ICON,
      path: "#",
    },
    {
      id: 2,
      title: ICON_HELPER.YOUTUBE_ICON,
      path: "#",
    },
    {
      id: 3,
      title: ICON_HELPER.INSTAGRAM_ICON,
      path: "#",
    },
  ];
  const paymentLogos = [IMAGE_HELPER.visaLogo, IMAGE_HELPER.RupayLogo];
  const quickLinks = [
    {
      id: 1,
      title: "Home",
      path: "/",
    },
    {
      id: 2,
      title: "About Us",
      path: "/aboutus",
    },
    {
      id: 3,
      title: "Tour",
      path: "/destination",
    },
    {
      id: 4,
      title: "Blogs",
      path: "/blogs",
    },
    {
      id: 5,
      title: "Contact",
      path: "/contact",
    },
  ];

  const policy = [
    {
      id: 1,
      name: "Privacy Policy",
      path: "/privacypolicy",
    },
    {
      id: 2,
      name: "Travel Policy",
      path: "/travelpolicy",
    },
    {
      id: 3,
      name: "Terms & Conditions",
      path: "/termsandconditions",
    },
  ];

  return (
    <footer className="relative bg-black text-white pb-10 pt-52">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${IMAGE_HELPER.footerbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="relative z-10 px-6 sm:px-[6vw]">
        <div className="flex lg:flex-row flex-col">
          <div className="lg:flex md:flex lg:w-[40%]">
            <div className="flex md:w-[40%] lg:w-[60%] flex-col mb-4">
              <Link to="/" className="w-[150px] h-auto pt-2">
                <img src={IMAGE_HELPER.SubhamWhiteLogo} alt="logo" />
              </Link>
              <p className="text-2xl pt-3 pb-2 font-bold font-pri_head">
                Want to Take <br /> Tour Packages?
              </p>

              <div className="pt-5">
                <img src={IMAGE_HELPER.playstore} alt="Play Store" className="w-[150px] h-[40px] object-cover" />
                <img src={IMAGE_HELPER.appstore} alt="App Store" className="w-[150px] h-[40px] object-cover mt-2" />
              </div>
            </div>

            <div className="md:w-[60%] lg:w-[40%] mb-4">
              <h4 className="font-bold text-lg font-pri_head mb-2">Quick Link</h4>
              <ul className="space-y-1">
                {quickLinks.map((res) => (
                  <li key={res.id}>
                    <Link to={res.path} className={`hover:text-primary hover:opacity-100 font-pri_para opacity-80 ${location.pathname === res.path ? "text-primary" : "text-white"}`}>
                      {res.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:flex md:flex lg:w-[60%]">
            <div className="lg:w-[40%] md:w-[40%] ">
              <h4 className="font-bold font-pri_head text-lg mb-2 flex items-center gap-1">
                <ICON_HELPER.PHONE_ICON className="text-primary" /> More Enquiry
              </h4>
              <p className="mb-1 hover:text-primary hover:opacity-100 font-pri_para opacity-80">+91 7448893535</p>

              <h4 className="font-bold font-pri_head text-lg mb-2 flex items-center gap-2">
                <ICON_HELPER.TELIGRAM_ICON className="text-primary" /> Send Mail
              </h4>
              <p className="mb-1 hover:text-primary hover:opacity-100 font-pri_para opacity-80">info@sailsubham.com</p>

              <h4 className="font-bold font-pri_head text-lg mb-2 flex items-center gap-2">
                <ICON_HELPER.MAPMARKER_ICON className="text-primary" /> Address
              </h4>
              <p className="mb-1 hover:text-primary hover:opacity-100 font-pri_para opacity-80">
                No : 35, Kumutham Salai, <br /> Annamalai Nagar Main Road, <br /> Annamalai Nagar, Trichy - 620018, <br /> Tamil Nadu,India.
              </p>
            </div>

            <div className="md:w-[60%] lg:w-[60%]">
              <h4 className="font-bold font-pri_head text-lg mb-4">We Are Here</h4>
              <p className="mb-4 font-pri_para opacity-80">Dedicated to providing the best service, we are always here to support you on your journey.</p>

              <h4 className="font-bold font-pri_head text-lg mb-4">Payment Partner</h4>
              <div className="flex space-x-2">
                {paymentLogos.map((logo, index) => (
                  <img key={index} src={logo} alt={`Payment Logo ${index}`} className="w-12 rounded-lg bg-white object-cover" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <hr className="my-5 opacity-30" />

        <div className="mt-4 flex flex-col lg:flex-row justify-between items-center space-y-5 lg:space-y-0">
          <div className="flex space-x-4">
            {socialIcons.map((Icon) => (
              <Link key={Icon.id} to={Icon.path} className="text-gray-400 hover:text-white hover:bg-primary hover:border-primary rounded-full border p-1">
                <Icon.title className="p-0.5" />
              </Link>
            ))}
          </div>
          <div className="flex lg:flex-row flex-col items-center gap-2">
            <p className="text-sm font-pri_para opacity-80">&copy; Copyright 2024 Subham | Design by</p>
            <Link to="https://weboney.in/" className="underline font-bold hover:text-primary font-pri_head text-sm">
              Weboney
            </Link>
          </div>
          <div className="text-sm space-x-4">
            {policy.map((res, index) => {
              return (
                <Link key={index} to={res.path} className={`hover:text-primary ${location.pathname === res.path ? "text-primary" : "text-white"} hover:opacity-100 font-pri_head font-semibold opacity-80`}>
                  {res.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
