import { StaffListingHeader } from "../components/UserModule/InternalUser/StaffListingHeader";
import { StaffListingTable } from "../components/UserModule/InternalUser/StaffListingTable";

const InternalStaffsListing = () => {
  return (
    <div className="p-2 lg:p-4 mb-10">
      <StaffListingHeader />
      <StaffListingTable />
    </div>
  );
};

export default InternalStaffsListing;