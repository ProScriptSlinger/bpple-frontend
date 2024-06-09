import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase_config";
import { v4 } from "uuid";

export const handleUploadFiles = async (file, path) => {
  if (file) {
    const fileRef = ref(storage, `${path}/${Date.now() + v4()}`);
    const fileInfo = await uploadBytes(fileRef, file);

    const downloadURL = await getDownloadURL(fileRef);

    return { downloadURL, fileInfo };
  }
};
