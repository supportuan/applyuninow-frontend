import { Link } from "react-router-dom";

export const UserListingHeader = () => {
  return (
    <>
      <div className="flex items-center  justify-between mb-3">
        <h1 className=" audio text-white relative text-xl md:text-2xl">External User Listing</h1>
        <button className="submit py-2 px-5 rounded-lg font-semibold relative text-[#000000] ">
          <Link to="/users/create-user?type=external"> +New User</Link>
        </button>
      </div>
      <hr className=" border-t-line border-t" />
    </>
  );
};
