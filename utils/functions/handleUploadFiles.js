import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase_config";
import { v4 } from "uuid";

export const handleUploadFiles = async (avatar, path) => {
  if (avatar) {
    const fileRef = ref(storage, `${path}/${Date.now() + v4()}`);
    const fileInfo = await uploadBytes(fileRef, avatar);

    const downloadURL = await getDownloadURL(fileRef);

    return { downloadURL, fileInfo };
  }
};
