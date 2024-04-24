import ErrorIcon from "../icons/ErrorIcon";

const Error = () => {
  return (
    <div className="w-full h-full md:min-h-[500px] min-h-[300px]  flex justify-center items-center">
      <div>
        <h3 className="font-bold md:text-5xl flex items-center justify-center text-[#7D0A0A]">
          Server Error
          <span className="md:w-20 md:h-20 w-10 h-10">
            <ErrorIcon />
          </span>
        </h3>
        <h6 className="text-xs md:text-xl">Too many sending requests !</h6>
      </div>
    </div>
  );
};

export default Error;
