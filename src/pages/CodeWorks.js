import React, { useEffect, useState } from 'react';

function CodeWorks({ codeworkNFTBlockchain }) {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    const loadWorks = async () => {
      const totalSupply = await codeworkNFTBlockchain.methods.totalSupply().call();
      const temp = [];
      for (let i = 1; i <= totalSupply; i++) {
        const metadataURL = await codeworkNFTBlockchain.methods.tokenURI(i).call();
        temp.push(metadataURL);
        console.log(metadataURL);
      }
      setWorks(temp);
    }

    if (codeworkNFTBlockchain) loadWorks();
  }, [codeworkNFTBlockchain])

  return (
    <div>
      {works.map(work => <p>{work}</p>)}
    </div>
  )
}

export default CodeWorks;
