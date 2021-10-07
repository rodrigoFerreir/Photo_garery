import React, { useState, useEffect, FormEvent } from 'react';
import { Area, Container, Header, PhotoList, ScreenWarning, UploadForm } from './App.styles';
import * as Photos from "./services/photos";
import { Photo } from "./@types/Photo"
import PhotoItem from './components/PhotoItem';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  const handleFormSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const file = formData.get('image') as File;

    if (file && file.size > 0) {
      setUploading(true);
      //fazendo envio do arquivo
      let result = await Photos.insert(file);

      if (result instanceof Error) {
        alert(result.message)
      } else {
        let newPhotoList = [...photos];
        newPhotoList.push(result)
        setPhotos(newPhotoList)
      }
      setUploading(false)
    }
  }


  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true);
      setPhotos(await Photos.getAll());
      setLoading(false);
    }
    getPhotos();
  }, [])

  return (
    <Container>
      <Area>
        <Header>Galeria de Fotos</Header>

        {/* Area de upload */}

        <UploadForm method="POST" onSubmit={handleFormSubmit}>
          <input type="file" name="image" />
          <input type="submit" value="enviar" />
          {uploading && "enviando..."}
        </UploadForm>

        {/* Lista de fotos */}
        {loading &&
          <ScreenWarning>
            <div>Carregando...</div>
          </ScreenWarning>
        }

        {!loading && photos.length > 0 &&
          <PhotoList>
            {
              photos.map((item, index) => (
                <PhotoItem key={index} url={item.url} name={item.name} />
              ))
            }
          </PhotoList>
        }

        {!loading && photos.length === 0 &&
          <ScreenWarning>
            <div className="emoji">😥</div>
            <div>Não há fotos cadastradas!</div>

          </ScreenWarning>
        }
      </Area>

    </Container>
  );
}

export default App;