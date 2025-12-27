
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const isResourceLocked = (createdAt: number, lockDays: number): { locked: boolean; remaining: string } => {
  const unlockDate = createdAt + (lockDays * 24 * 60 * 60 * 1000);
  const now = Date.now();
  const diff = unlockDate - now;

  if (diff <= 0) return { locked: false, remaining: '' };

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  return { 
    locked: true, 
    remaining: `${days}d ${hours}h` 
  };
};
