import PageHeader from '@/components/shared/PageHeader'
import React from 'react'

const Products = () => {
  return (
    <div className='p-6 space-y-6'>
        <PageHeader title="Məhsullar" pathNames={{dash: "Dash", products: "Məhsullar"}} homeName={"Dashboard"}/>

        <div className='cnt bg-base-100 rounded shadow min-h-24'></div>
    </div>
  )
}

export default Products