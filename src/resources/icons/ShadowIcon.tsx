import React from 'react'

export default function ShadowIcon({ width="1em", height="1em", fill="currentColor" }: any) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"  width={width} height={height} viewBox="0 0 16 16">
            <path fill={fill} d="M14 2v-2h-14v14h2v2h14v-14h-2zM13 13h-12v-12h12v12z"/>
        </svg>
    )
}
