import { ModalType } from "./enums";

export type Modal = {
    type: ModalType.ImageEditor,
    payload: { imageId: string, imageSize: { width: string | number, height: string | number } },
} | {
    type: ModalType.Settings,
    payload: any
}