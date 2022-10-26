export const uploadImageDrupal = (
  chemin_url,
  uploadId,
  setMediaId,
  setEditFormMedia,
  mediaId
) => {
  if (uploadId) {
    setMediaId(uploadId.id);
    setEditFormMedia({
      [chemin_url]: {
        data: {
          type: 'file--file',
          id: mediaId,
          meta: {
            alt: '',
            title: '',
          },
        },
      },
    });
  }
  return;
};
