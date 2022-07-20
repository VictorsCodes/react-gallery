import { Photo } from "../types/photo";
import { storage } from "../utils/firebase";
import { ref, getDownloadURL, listAll, uploadBytes } from "firebase/storage";

export const getAllPhotos = async () => {
  let list: Photo[] = [];

  const imagesFolder = ref(storage, "images");
  const images = await listAll(imagesFolder);

  for (let i in images.items) {
    const urlImage = await getDownloadURL(images.items[i]);

    list.push({
      name: images.items[i].name,
      url: urlImage,
    });
  }

  return list;
};

export const uploadPhoto = async (file: File) => {
  if (["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
    let newFile = ref(storage, `images/${file.name}`);
    let upload = await uploadBytes(newFile, file);
    let url = await getDownloadURL(upload.ref);
    return {
      name: upload.ref.name,
      url,
    } as Photo;
  } else {
    return new Error(`Formato de foto nao permitido`);
  }
};
