import React from 'react'
import { Button } from '@/components'
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md'
import { DEFAULT_COVER, BOOK_MAX_CHARS } from '@/constants'
import { BookAnimationProps } from '@/types'

const BookAnimation: React.FC<BookAnimationProps> = ({ novel, onPrevClick, onNextClick }) => {
 
   const truncate = (text: string, maxChars: number) => {
     if (text.length <= maxChars) {
       return text;
     } else {
       return text.substring(0, maxChars) + '...';
     }
   };
 
   const truncatedText = truncate(novel.preview || novel.description, BOOK_MAX_CHARS);

  return (
    <div className="relative">
      <div className='book-container'>
         <div className="book-card">
            <div className="book-image-box">
               <div className="book-inside"></div>
               <img src={novel?.coverImage || DEFAULT_COVER} alt="Book Cover" />
            </div>
            <div className="book-details-box">
               <h1>{novel.title}</h1>
               <p>{truncatedText}</p>
               <p className="text-id">❞NovelId: {novel.id}❞</p>
               <p className="text-right">{novel.genre}</p>
               <p className="text-right">by {novel.author}</p>
            </div>
         </div>
      </div>
      <div className="absolute left-20 top-40 text-grey">
         <Button tooltip="Prev" action={onPrevClick} leftIcon={<MdKeyboardDoubleArrowLeft size={70} />} />
      </div>
      <div className="absolute right-32 top-40 text-grey">
         <Button tooltip="Next" action={onNextClick} rightIcon={<MdKeyboardDoubleArrowRight size={70} />} />
      </div>
    </div>
  )
}

export default BookAnimation