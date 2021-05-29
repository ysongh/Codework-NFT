import React, { useState } from 'react';
import { NFTStorage, File } from 'nft.storage';

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDExOWRBOTc2MDY5MjVjMTZCNUM4OEM4OTUyZjRjNzk3YzRjMTZjNTkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMjI1NTQ1NTg2NSwibmFtZSI6ImNvZGV3b3JrLW5mdCJ9.1NcfT7L6QbvOKJTM6XytnkcJW2KfX6yUvQu_NBWXg3c';
const client = new NFTStorage({ token: apiKey })

function Form() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [imageName, setImageName] = useState('');
  const [imageType, setImageType] = useState('');

  const getImage = event => {
    const file = event.target.files[0];
    console.log(file);
    setImage(file);
    setImageName(file.name);
    setImageType(file.type);
  }

  const upload = async () => {
    const metadata = await client.store({
      name: name,
      description: description,
      image: new File([image], imageName, { type: imageType })
    })
    console.log(metadata.url);
  }

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type="file" onChange={getImage} />
      <br />
      <button onClick={upload}>Create</button>
    </div>
  )
}

export default Form;
