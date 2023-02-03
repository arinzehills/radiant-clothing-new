import React from 'react'

const BillingAddress = ({address}) => {
  return (
    <div>
        <div>
            <h5>Address 1: {address.addressLine1}</h5>
            <h5>Address 1: {address.addressLine2}</h5>
            <h5>Postal Code:{address.postalCode}</h5>
            <h5>{address.city+','+address.state+','+address.country}</h5>
        </div>
    </div>
  )
}

export default BillingAddress