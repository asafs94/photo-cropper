import React, { Fragment } from 'react';
import AppImageContainer from '../../../containers/AppImageContainer';
import EditableImage from '../../../types/EditableImage';
import useStyles from './styles'

interface Coins_Props {
    images?: Array<EditableImage>;
    onImageContextMenu: (imageId: string) => (event: React.MouseEvent) => void;
}

const rows = [1, 2, 3, 4, 5, 6];

export default function Coins({ images = [], onImageContextMenu }: Coins_Props) {
    const classes = useStyles();
    return (
        <div className={classes.Root}>
            {rows.map(row => {
                return <Fragment key={row} >
                    {images.map((image, index) =>
                        <AppImageContainer key={`${image.id}-coins`} onContextMenu={onImageContextMenu(image.id)} className={classes.Coin} id={image.id} />
                    )}
                </Fragment>
            })}
        </div>
    )
}
