const Dashboard = () => {
  return (
    <h1 className="text-3xl font-bold">
      Haii,,,{localStorage.getItem("username")}
    </h1>
  );
};

export default Dashboard;
