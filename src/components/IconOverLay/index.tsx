
import React from 'react';
import useStyles from './styles';


interface Props {
    IconComponent?: React.ElementType
}

export default function IconOverlay({ IconComponent }: Props) {

    const classes = useStyles();

    let icon: React.ReactNode;
    if(IconComponent){
        icon = <IconComponent className={classes.Icon} />
    }

    return (
        <div className={classes.Root}>
            {icon}
        </div>
    )
}
