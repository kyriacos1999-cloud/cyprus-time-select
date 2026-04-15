import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'REPLIC8'

interface CodOrderProps {
  customerName?: string
  customerEmail?: string
  phone?: string
  city?: string
  address?: string
  products?: string
  total?: string
}

const CodOrderNotificationEmail = ({
  customerName = 'Customer',
  customerEmail = '',
  phone = '',
  city = '',
  address = '',
  products = 'Watch',
  total = '0',
}: CodOrderProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New COD Order from {customerName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Cash on Delivery Order</Heading>
        <Text style={text}>A new COD order has been placed on {SITE_NAME}.</Text>
        <Hr style={hr} />
        <Section>
          <Text style={label}>Customer</Text>
          <Text style={value}>{customerName}</Text>
          {customerEmail && <Text style={value}>{customerEmail}</Text>}
          {phone && <Text style={value}>{phone}</Text>}
        </Section>
        <Section>
          <Text style={label}>Delivery</Text>
          <Text style={value}>{address}{city ? `, ${city}` : ''}</Text>
        </Section>
        <Section>
          <Text style={label}>Products</Text>
          <Text style={value}>{products}</Text>
        </Section>
        <Section>
          <Text style={label}>Total Due</Text>
          <Text style={totalStyle}>€{total}</Text>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>This is an automated notification from {SITE_NAME}.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: CodOrderNotificationEmail,
  subject: (data: Record<string, any>) =>
    `New COD Order — €${data.total || '0'} from ${data.customerName || 'Customer'}`,
  displayName: 'COD order notification',
  to: 'kyriacos1999@gmail.com',
  previewData: {
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    phone: '+357 99 123456',
    city: 'Nicosia',
    address: '123 Main St',
    products: 'Atlas GMT',
    total: '330',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px 28px' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#1a1a1a', margin: '0 0 16px' }
const text = { fontSize: '14px', color: '#555', lineHeight: '1.5', margin: '0 0 12px' }
const label = { fontSize: '11px', color: '#999', textTransform: 'uppercase' as const, letterSpacing: '0.1em', margin: '16px 0 4px' }
const value = { fontSize: '14px', color: '#1a1a1a', margin: '0 0 4px' }
const totalStyle = { fontSize: '20px', fontWeight: 'bold' as const, color: '#1a1a1a', margin: '0' }
const hr = { borderColor: '#e5e5e5', margin: '20px 0' }
const footer = { fontSize: '11px', color: '#aaa', margin: '24px 0 0' }
