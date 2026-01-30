import GraduateSubjects from '../../src/components/Revamp/Common/GraduateSubjects';

export default function GraduateSubjectsNext() {
  return (
    <GraduateSubjects />
  );
}

export async function getServerSideProps(context) {
  const { industryId } = context.params;
  
  return {
    props: {
      industryId: industryId || null,
    },
  };
}
