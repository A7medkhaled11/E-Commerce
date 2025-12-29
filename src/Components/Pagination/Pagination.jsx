import React from 'react'
import{Pagination as BPagination} from 'react-bootstrap';
import { useSelector } from 'react-redux';
export default function Pagination({total ,handleChangePage , limit , currentpage}) {
    const {isDark} = useSelector(state=>state.darkmode)
    const pages = Math.ceil(total/limit);
  return (
    <BPagination className='justify-content-center mt-2' data-bs-theme={isDark ? 'dark' : 'light'}>
        {currentpage!==1&&(<BPagination.First onClick={()=>{handleChangePage(1)}} />
)}
           <BPagination.Prev onClick={()=>{handleChangePage(currentpage-1)}} disabled={currentpage==1} />
           {new Array(pages).fill(0).map((_,index)=>{
           return <BPagination.Item  key={index} onClick={()=>{handleChangePage(index+1)}}active={currentpage==index+1}>{index+1}</BPagination.Item>
           })}
           <BPagination.Next onClick={()=>{handleChangePage(currentpage+1)}}disabled={currentpage==pages} />
                   {currentpage!==pages && (<BPagination.Last  onClick={()=>{handleChangePage(pages)}} />)}
      
    </BPagination>
  )
}