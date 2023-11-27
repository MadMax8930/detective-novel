import React, { useCallback, useEffect, useState } from 'react'
import { ContentModalProps } from '@/types'
import useInfoModal from '@/hooks/useInfoModal'
import useNovel from '@/hooks/useNovel'
import { AiOutlineClose } from 'react-icons/ai'
import { Pagination } from '@/components'

const ContentModal: React.FC<ContentModalProps> = ({ visible, onClose, pagination, linesPerPage  }) => {
   const [isVisible, setIsVisible] = useState(!!visible);
   const [currentPage, setCurrentPage] = useState(1);

   const { novelId } = useInfoModal();
   const { data = {} } = useNovel(novelId);

   useEffect(() => {
      setIsVisible(!!visible);
   }, [visible]);

   const handleClose = useCallback(() => {
      setIsVisible(false);
      setTimeout(() => { onClose() }, 300);
   }, [onClose]);

   const handlePageChange = (page: number) => {
      setCurrentPage(page);
   };

   const paginationProps = {
      totalPages: pagination.totalPages,
      currentPage,
      onPageChange: handlePageChange,
   };

   const startIndex = (currentPage - 1) * linesPerPage;
   const endIndex = Math.min(startIndex + linesPerPage, data?.content?.length || 0);
   const linesForCurrentPage = data?.content?.split(/\n|\r\n|\r/).slice(startIndex, endIndex);

   if (!visible) return null;
   
   return (
      <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-auto fixed inset-0">
         <div className="relative w-full mx-auto max-w-screen-xl rounded-md overflow-hidden">
            <div className={`${isVisible ? 'scale-100' : 'scale-0'} pl-2 pt-2 md:pl-4 md:pt-4 transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}>
               <div className="relative w-full max-h-[80vh] mt-4 ml-1 md:ml-2 mb:pb-0 pb-4 md:pt-0 pt-4 md:mb-0 mb-4">
                   <div className="cursor-pointer absolute md:top-3 top-5 right-10 md:right-20 h-8 w-8 md:h-10 md:w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center" 
                        onClick={handleClose}>
                        <AiOutlineClose className="text-white max-sm:hidden" size={20} />
                        <AiOutlineClose className="text-white sm:hidden" size={16} />
                   </div>
                   <div className="absolute md:top-[20%] top[10%] md:left-20 left-10 text-white md:mt-3 mt-1">
                     <p className="text-white text-xl md:text-2l lg:text-3xl h-full font-bold md:mb-8 mb-4">{data?.title}</p>
                   </div>
               </div>
               <div className="px-6 md:px-10 lg:px-20 py-6 md:py-10 lg:py-20 flex flex-col md:h-[90vh] h-[95vh] md:pr-0 pr-3">
                  <p className="text-white md:text-base text-[12px] text-justify overflow-y-scroll px-1 md:px-3 overflow-x-hidden flex-grow mb-4 md:mb-8">{linesForCurrentPage?.join('\n')}</p>
                  {pagination.totalPages > 1 && (
                     <div className="flex justify-center">
                        <Pagination {...paginationProps} />
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   )
}

export default ContentModal