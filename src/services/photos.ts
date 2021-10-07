import { Photo } from "../@types/Photo";

import { storage } from '../libs/firebase';
import { ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage';
import { v4 as uuid } from 'uuid';

//retorna todos os arquivos dentro da pasta referenciada
export const getAll = async () => {
    let list: Photo[] = [];
    const imagesFolder = ref(storage, "images");  //criando referencia no storage do firebase
    const photoList = await listAll(imagesFolder); //listando todas os arquivos dentro da pasta (images);

    for (let i in photoList.items) {
        let photoUrl = await getDownloadURL(photoList.items[i])
        list.push({
            name: photoList.items[i].name,
            url: photoUrl,
        })
    }

    return list
}

//enviando dados para firebase
export const insert = async (file: File) => {
    //aceita apenas os tipode de arquivos listados;
    if (['image/jpeg', 'image/jpg', 'image/png', 'image/svg'].includes(file.type)) {

        let randomName = uuid();
        let newFile = ref(storage, `images/${randomName}`)

        let upload = await uploadBytes(newFile, file);
        let photoURL = await getDownloadURL(upload.ref)

        return {
            name: upload.ref.name,
            url: photoURL
        } as Photo

    } else {
        return new Error('Tipo de arquivo não permitido.')
    }
}