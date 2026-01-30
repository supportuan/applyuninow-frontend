import { UserListingHeader } from "../components/UserModule/InternalUser/UserListingHeader";
import { UserListingTable } from "../components/UserModule/InternalUser/UserListingTable";

const InternalUserListing = () => {
  return (
    <div className="p-2 lg:p-4 mb-10">
      <UserListingHeader />
      <UserListingTable />
    </div>
  );
};

export default InternalUserListing;