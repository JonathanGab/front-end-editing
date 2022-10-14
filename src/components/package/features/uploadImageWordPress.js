export const uploadImageWordPress = (
  uploadId,
  setMediaId,
  setFormMediaValues,
  tabInput,
  mediaId
) => {
  if (uploadId) {
    setMediaId(uploadId.id);
    setFormMediaValues({ ...tabInput, featured_media: mediaId });
  }
  return;
};
