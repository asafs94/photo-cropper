import { useContext } from "react"

import { AppFontsContext } from "../../hoc/AppFonts"

export const useAppFonts = () => {
    const payload = useContext(AppFontsContext)
    return payload;
}