import { NFTStorage, File } from "nft.storage";
import { useState } from "react";

type Tattributes = (
  | {
      trait_type: string;
      value: any;
      display_type?: undefined;
    }
  | {
      display_type: string;
      trait_type: string;
      value: any;
    }
)[];

export const useNFTStorage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const NFT_STORAGE_TOKEN = import.meta.env.VITE_NFTSTORAGE_KEY;
  const NFTStorageClient = new NFTStorage({ token: NFT_STORAGE_TOKEN });

  async function fileFromPath(imageUrl: string) {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const type = blob.type || "application/octet-stream";
    return new File([blob], "image", { type }); // replace "filename.jpg" with your filename
  }

  const uploadToNFTStorage = async (
    collection: string,
    description: string,
    imageUrl: string,
    attributes: Tattributes
  ): Promise<string> => {
    try {
      setLoading(true);

      const image = await fileFromPath(imageUrl);

      const metadata = await NFTStorageClient.store({
        name: "NFT Name",
        description: "NFT description",
        image: image,
        attributes: attributes,
      });

      return metadata.url;
    } catch (err: any) {
      setError(err);
      return "";
    } finally {
      setLoading(false);
    }
  };

  return { uploadToNFTStorage, loading, error };
};
