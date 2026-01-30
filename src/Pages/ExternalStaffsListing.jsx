import { StaffListingHeader } from "../components/UserModule/ExternalUser/StaffListingHeader";
import { StaffListingTable } from "../components/UserModule/ExternalUser/StaffListingTable";

const ExternalStaffsListing = () => {
  return (
    <div className="p-2 lg:p-4 mb-10">
    <StaffListingHeader />
      <StaffListingTable />
    </div>
  );
};
export default ExternalStaffsListing;