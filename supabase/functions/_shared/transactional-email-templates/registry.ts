/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  to?: string
  displayName?: string
  previewData?: Record<string, any>
}

import { template as codOrderNotification } from './cod-order-notification.tsx'
import { template as stripeOrderNotification } from './stripe-order-notification.tsx'
import { template as customerOrderConfirmation } from './customer-order-confirmation.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'cod-order-notification': codOrderNotification,
  'stripe-order-notification': stripeOrderNotification,
  'customer-order-confirmation': customerOrderConfirmation,
}
