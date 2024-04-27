import FileType from "file-type";

class RealFileExtension {
  getRealFileExtension = async (e) => {
    return new Promise((resolve, reject) => {
      FileType.fromBlob(e).then((res) => {
        return resolve(res);
      });
    }).then((result) => {
      return result?.mime;
    });
  };
}

export default new RealFileExtension();
