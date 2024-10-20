import { Web3Storage } from 'web3.storage';

const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN || '' });

export const uploadToIPFS = async (file: File): Promise<string> => {
  const cid = await client.put([file]);
  return `https://${cid}.ipfs.dweb.link/${file.name}`;
};

export const retrieveFromIPFS = async (cid: string): Promise<any> => {
  const res = await client.get(cid);
  if (!res?.ok) {
    throw new Error(`Failed to get ${cid}`);
  }
  const files = await res.files();
  return files[0];
};