import DashboardHeader from "@/components/dashboard-header";

const DosenKoordinator = () => {
  return (
    <>
      <DashboardHeader
        breadcrumbItems={[
          { name: "Dashboard", url: "koordinator" },
          { name: "Mahasiswa", url: "koordinator/mahasiswa" },
        ]}
        titleItems={[
          {
            title: `Dosen Pembimbing`,
            subtitle:
              "Berikut adalah data mahasiswa bimbingan dari Tugas Akhir",
          },
        ]}
      />
      <div className="flex flex-col justify-center"></div>
    </>
  );
};

export default DosenKoordinator;
