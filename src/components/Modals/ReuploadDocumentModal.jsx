export const ReuploadDocumentModal = () => {
  return (
    <div className="bg-tab w-[500px] absolute rounded-xl flex flex-col py-5">
      <p className="text-white text-center mb-10">
        Are you asking the Student to Re-Upload this Document?
      </p>

      <div className="flex justify-between px-5">
        <button className="px-6 py-2  theme-btn-fill rounded-lg">
          <span>No</span>
        </button>
        <button className="px-6 py-2 submit rounded-lg">Yes</button>
      </div>
    </div>
    
  );
};
