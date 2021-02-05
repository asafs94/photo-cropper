import { Button } from '@material-ui/core'
import React from 'react'
import ImageUpload from '../ImageUpload'

export default function Toolbar({onUpload}: any) {
    return (
        <div>
            <ImageUpload onUpload={onUpload} />
        </div>
    )
}
