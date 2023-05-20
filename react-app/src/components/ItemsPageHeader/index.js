import React from 'react'
import './ItemsPageHeader.css'

export default function ItemsPageHeader() {
  return (
    <div className='items-header-container'>
        <div className='items-header'>
            <div className='text-container'>
                <div className='items-header-text'>Wow, you gotta be kidding me with these cleats!</div>
                <div className='items-header-small-text'>Check out our cleats now</div>
            </div>
            <img className='items-header-image' src="https://supercleats-pics.s3.amazonaws.com/splash1.jpg" alt="items header cleats" />
        </div>
        <div className='items-header'>
            <div className='text-container'>
                <div className='items-header-text'>These are top notch sporting balls for kicking</div>
                <div className='items-header-small-text'>Check out the ball selection</div>
            </div>
            <img className='items-header-image' src="https://supercleats-pics.s3.amazonaws.com/splash2.jpg" alt="items header cleats" />
        </div>
        <div className='items-header'>
            <div className='text-container'>
                <div className='items-header-text'>Short socks, long socks, double socks, we have every sock here!</div>
                <div className='items-header-small-text'>Don't ask about if we have it because we DO</div>
            </div>
            <img className='items-header-image' src="https://supercleats-pics.s3.amazonaws.com/sock2.jpg" alt="items header cleats" />
        </div>
    </div>
  )
}
