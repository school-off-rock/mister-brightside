import { Values } from '../constants/values'

const { FRAPI_IMAGE_URL } = Values

function setImageUrl(img) {
  return `${FRAPI_IMAGE_URL}${img}`
}

export class User {
  constructor({ face_id, person_label, creation_date, thumb_image_url }) {
    this.id = face_id
    this.label = person_label
    this.createdAt = creation_date
    this.imageUrl = setImageUrl(thumb_image_url)
  }
}
