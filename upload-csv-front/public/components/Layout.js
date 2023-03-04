import React from 'react'
import Link from 'next/link'


export default function Layout({ children }) {
  return (
    <div className='w-100 bg-light text-dark body'> 
        <div className='header'>
            <h5 className='title'>1,000,000+ CSV Uploader</h5>
        </div>       
        { children }
    </div>
  )
}
