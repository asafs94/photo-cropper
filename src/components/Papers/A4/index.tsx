import React from 'react';
import classes from './styles.module.scss';

interface A4_Props {
    className?: string,
    children?: React.ReactNode,
    rootRef?: any
}

export default function A4({className='', children, rootRef}: A4_Props) {
    const rootClassName=['A4',classes.Root, className].join(' ')
    return (
        <div className={rootClassName} ref={rootRef}>
            {children}
        </div>
    )
}
