import React from 'react'
import FooterPolicy from './footer-policy'
import { ShopPolicy } from 'lib/shopify/types'

export default function FooterPolicies({policies}: {policies: ShopPolicy[]}) {
  return (
    <nav>
      {
        Array.isArray(policies) ? policies.map((policy: ShopPolicy) => {
          if (policy.id) {
            return (
              <FooterPolicy key={policy.title} policy={policy}/>
            )
          }
        }) : null
      }
    </nav>
  )
}
