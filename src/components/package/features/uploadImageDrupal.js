export const uploadImageDrupal = (
  uploadId,
  setMediaId,
  setFormMediaValues,
  mediaId,
  alt,
  title
) => {
  if (uploadId) {
    setMediaId(uploadId.id);
    setFormMediaValues({
      field_image: {
        data: {
          type: 'file--file',
          id: mediaId,
          meta: {
            alt: alt,
            title: title,
          },
        },
      },
    });
  }
  return;
};
