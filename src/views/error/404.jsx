function HalamanNotFound() {
  return (
    <div className="h-screen flex justify-center items-center">
      <h1 className="text-3xl font-bold text-center">404</h1>
      <h1>Halaman Not Found</h1>
    </div>
  );
}

function HalamanForbidden() {
  return <h1>403</h1>;
}

export default HalamanNotFound;
