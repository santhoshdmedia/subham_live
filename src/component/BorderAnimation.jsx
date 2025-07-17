const BorderAnimation = () => {
  return (
    <>
      <div className="border-l-2 group-hover:h-[10%] h-full  animation  w-2 left-0  size-full absolute top-0"></div>
      <div className="border-t-2 group-hover:w-[10%] w-full  animation  h-1  top-0  size-full absolute left-0"></div>

      <div className="border-r-2 group-hover:h-[10%] h-full animation   w-2 right-0  size-full absolute bottom-0"></div>
      <div className="border-b-2  group-hover:w-[10%] w-full  animation  h-1 bottom-0  size-full absolute right-0"></div>

      <div className="border-l-2 group-hover:h-[10%] h-full animation   w-2 left-0  size-full absolute bottom-0"></div>
      <div className="border-b-2  group-hover:w-[10%] w-full  animation  h-1 bottom-0  size-full absolute left-0"></div>

      <div className="border-r-2 group-hover:h-[10%] h-full  animation  w-2 right-0  size-full absolute top-0"></div>
      <div className="border-t-2 group-hover:w-[10%] w-full  animation  h-1  top-0  size-full absolute right-0"></div>
    </>
  );
};

export default BorderAnimation;
