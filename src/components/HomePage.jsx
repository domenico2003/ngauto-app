import { FileUpload } from "primereact/fileupload";

const HomePage = () => {
  return (
    <div className="card">
      <FileUpload
        name="demo[]"
        url={"/api/upload"}
        multiple
        accept="image/*"
        maxFileSize={1000000}
        pt={{
          content: { className: "surface-ground" },
          message: {
            root: {
              className: "w-1rem",
            },
          },
        }}
        emptyTemplate={
          <p className="m-0">Drag and drop files to here to upload.</p>
        }
      />
    </div>
  );
};
export default HomePage;
