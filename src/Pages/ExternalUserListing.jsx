import { UserListingHeader } from "../components/UserModule/ExternalUser/UserListingHeader";
import { UserListingTable } from "../components/UserModule/ExternalUser/UserListingTable";

const ExternalUserListing = () => {
  return (
    <div className="p-2 lg:p-4 mb-10">
      <UserListingHeader />
      <UserListingTable />
    </div>
  );
};
export default ExternalUserListing